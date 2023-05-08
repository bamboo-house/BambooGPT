import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';
import { PromptGateway } from '@/backend/infrastructure/promptGateway';

export class OpenaiService {
  private _configuration: Configuration;
  private _openai: OpenAIApi;
  private _promptGateway: PromptGateway;

  constructor() {
    this._configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this._openai = new OpenAIApi(this._configuration);
    this._promptGateway = new PromptGateway();

    if (!this._configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }
  }

  // ======================================
  // Chat
  // チャット会話が与えられた場合、モデルはチャット完了応答を返す。
  // ======================================
  async createChatCompletion(
    model: string,
    message: string,
    temperature: number,
    resWrite: (text: string) => void,
    resEnd: () => void
  ): Promise<void> {
    const response: any = await this._openai.createChatCompletion(
      {
        model,
        messages: this.createChatCompletionMessage(message),
        stream: true,
        temperature,
      },
      { responseType: 'stream' }
    );

    const stream = response.data;

    let result = '';
    console.log('================= START =================');

    stream.on('data', (chunk: any) => {
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
        if (data.choices[0].delta.content === null || data.choices[0].delta.content === undefined) {
          return;
        }
        const text = data.choices[0].delta.content;
        result += text;

        // フロントに返却
        resWrite(text);
      });
    });

    stream.on('end', () => {
      console.log(result);
      console.log('================= END =================');
      // this._promptGateway.create('shuto', result);
      resEnd();
    });

    stream.on('error', (error: any) => {
      console.error(error);
    });
  }

  private createChatCompletionMessage = (message: string): ChatCompletionRequestMessage[] => {
    return [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message },
    ];
  };

  // ======================================
  // Completions
  // プロンプトが与えられると、モデルは1つまたは複数の予測された完了を返し、
  // 各位置での代替トークンの確率も返すことができる
  // ======================================
  async createCompletion(
    model: string,
    prompt: string,
    temperature: number,
    resWrite: (text: string) => void,
    resEnd: () => void
  ): Promise<void> {
    const response: any = await this._openai.createCompletion(
      {
        model,
        prompt: prompt,
        max_tokens: 7,
        stream: true,
        temperature,
        top_p: 1,
        n: 1,
        logprobs: null,
      },
      { responseType: 'stream' }
    );

    const stream = response.data;

    let result = '';
    console.log('================= START =================');

    stream.on('data', (chunk: any) => {
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
        if (data.choices[0].text === null || data.choices[0].text === undefined) {
          return;
        }
        const text = data.choices[0].text;
        result += text;

        // フロントに返却
        resWrite(text);
      });
    });

    stream.on('end', () => {
      console.log('recieved message:', result);
      console.log('================= END =================');
      // this._promptGateway.create('shuto', result);
      resEnd();
    });

    stream.on('error', (error: any) => {
      console.error(error);
    });
  }
}
