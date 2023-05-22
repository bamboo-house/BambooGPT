import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
  CreateChatCompletionRequestStop,
} from 'openai';
import { PromptGateway } from '@/backend/infrastructure/promptGateway';

type CreateChatCompletionType = {
  model: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
    name?: string;
  }[];
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: CreateChatCompletionRequestStop;
  max_tokens?: number | undefined;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: { [key: string]: number } | null;
  user?: string | undefined;
  resWrite: (text: string) => void;
  resEnd: () => void;
};

type CreateCompletionType = {
  model: string;
  prompt: string;
  suffix?: string | null;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number | null;
  echo?: boolean;
  stop?: string | string[] | null;
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  logit_bias?: { [key: string]: number } | null;
  user?: string | null;
  resWrite: (text: string) => void;
  resEnd: () => void;
};

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
  async createChatCompletion({
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
  }: CreateChatCompletionType): Promise<void> {
    const response: any = await this._openai.createChatCompletion(
      {
        model,
        messages: messages,
        temperature,
        top_p,
        n,
        stream,
        stop,
        max_tokens,
        presence_penalty,
        frequency_penalty,
        logit_bias,
        user,
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
        if (data.choices[0].delta.content === null || data.choices[0].delta.content === undefined) {
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
      // this._promptGateway.create('shuto', result);
      resEnd();
    });

    streamRes.on('error', (error: any) => {
      console.error(error);
    });
  }

  // ======================================
  // Completions
  // プロンプトが与えられると、モデルは1つまたは複数の予測された完了を返し、
  // 各位置での代替トークンの確率も返すことができる
  // ======================================
  async createCompletion({
    model = 'text-ada-001',
    prompt,
    suffix = null,
    max_tokens = 16,
    temperature = 1,
    top_p = 1,
    n = 1,
    stream = false,
    logprobs = null,
    echo = false,
    stop = null,
    presence_penalty = 0,
    frequency_penalty = 0,
    best_of = 1,
    logit_bias = null,
    user = null,
    resWrite,
    resEnd,
  }: CreateCompletionType): Promise<void> {
    const response: any = await this._openai.createCompletion(
      {
        model,
        prompt: prompt,
      },
      { responseType: 'stream' }
    );

    const streamRes = response.data;

    let result = '';
    console.log('================= createCompletion START =================');

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
        if (data.choices[0].text === null || data.choices[0].text === undefined) {
          return;
        }
        const text = data.choices[0].text;
        result += text;

        // フロントに返却
        resWrite(text);
      });
    });

    streamRes.on('end', () => {
      console.log('recieved message:', result);
      console.log('================= END =================');
      // this._promptGateway.create('shuto', result);
      resEnd();
    });

    streamRes.on('error', (error: any) => {
      console.error(error);
    });
  }
}
