import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';

type CreateChatCompletionType = CreateChatCompletionRequest & {
  resWrite: (text: string) => void;
  resEnd: () => void;
};

export class OpenaiFeature {
  private _configuration: Configuration;
  private _openai: OpenAIApi;

  constructor() {
    this._configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this._openai = new OpenAIApi(this._configuration);

    if (!this._configuration.apiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }
  }

  // ======================================
  // Chat
  // チャット会話が与えられた場合、モデルはチャット完了応答を返す。
  // ======================================
  createChatCompletion({
    model,
    messages,
    temperature,
    top_p,
    n,
    stream = true,
    stop,
    max_tokens,
    presence_penalty,
    frequency_penalty,
    logit_bias,
    user,
    resWrite,
    resEnd,
  }: CreateChatCompletionType): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: any = await this._openai.createChatCompletion(
          {
            model: model,
            messages: messages,
            temperature: temperature,
            top_p: top_p,
            n: n,
            stream: stream,
            stop: stop,
            max_tokens: max_tokens,
            presence_penalty: presence_penalty,
            frequency_penalty: frequency_penalty,
            logit_bias: logit_bias,
            user: user,
          },
          { responseType: 'stream' }
        );

        const streamRes = response.data;

        let result = '';
        console.log('================= createChatCompletion START =================');

        streamRes.on('data', (chunk: any) => {
          let str: string = chunk.toString();

          // [DONE] は最後の行なので無視
          if (str.indexOf('[DONE]') > 0) {
            return;
          }

          // nullは無視;
          if (str.indexOf('delta":{}') > 0) {
            return;
          }

          // ※APIからの応答をクライアントに返す。後で説明。
          const lines: Array<string> = str.split('\n');
          lines.forEach((line) => {
            if (line.startsWith('data: ')) {
              line = line.substring('data: '.length);
            }

            // 空行は無視
            if (line.trim() == '') {
              return;
            }

            // JSONにparse
            const data = JSON.parse(line);
            if (
              data.choices[0].delta.content === null ||
              data.choices[0].delta.content === undefined
            ) {
              return;
            }
            const text = data.choices[0].delta.content;
            result += text;

            // フロントに返却
            resWrite(text);
          });
        });

        streamRes.on('end', () => {
          console.log(result);
          console.log('================= END =================');
          resEnd();
          resolve(result);
        });

        streamRes.on('error', (error: any) => {
          console.error(error);
          reject(error);
        });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  // ======================================
  // function call付きのChat
  // ======================================
  createChatCompletionWithFunctionCall() {}

  // ======================================
  // Completions
  // プロンプトが与えられると、モデルは1つまたは複数の予測された完了を返し、
  // 各位置での代替トークンの確率も返すことができる
  // ======================================
  // async createCompletion({
  //   model = 'text-ada-001',
  //   prompt,
  //   suffix = null,
  //   max_tokens = 16,
  //   temperature = 1,
  //   top_p = 1,
  //   n = 1,
  //   stream = false,
  //   logprobs = null,
  //   echo = false,
  //   stop = null,
  //   presence_penalty = 0,
  //   frequency_penalty = 0,
  //   best_of = 1,
  //   logit_bias = null,
  //   user = null,
  //   resWrite,
  //   resEnd,
  // }: CreateCompletionType): Promise<void> {
  //   const response: any = await this._openai.createCompletion(
  //     {
  //       model,
  //       prompt: prompt,
  //     },
  //     { responseType: 'stream' }
  //   );

  //   const streamRes = response.data;

  //   let result = '';
  //   console.log('================= createCompletion START =================');

  //   streamRes.on('data', (chunk: any) => {
  //     let str: string = chunk.toString();

  //     // [DONE] は最後の行なので無視
  //     if (str.indexOf('[DONE]') > 0) {
  //       return;
  //     }

  //     // nullは無視;
  //     if (str.indexOf('delta":{}') > 0) {
  //       return;
  //     }

  //     // ※APIからの応答をクライアントに返す。後で説明。
  //     const lines: Array<string> = str.split('\n');
  //     lines.forEach((line) => {
  //       if (line.startsWith('data: ')) {
  //         line = line.substring('data: '.length);
  //       }

  //       // 空行は無視
  //       if (line.trim() == '') {
  //         return;
  //       }

  //       // JSONにparse
  //       const data = JSON.parse(line);
  //       if (data.choices[0].text === null || data.choices[0].text === undefined) {
  //         return;
  //       }
  //       const text = data.choices[0].text;
  //       result += text;

  //       // フロントに返却
  //       resWrite(text);
  //     });
  //   });

  //   streamRes.on('end', () => {
  //     console.log('recieved message:', result);
  //     console.log('================= END =================');
  //     resEnd();
  //   });

  //   streamRes.on('error', (error: any) => {
  //     console.error(error);
  //   });
  // }
}
