import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from 'openai';
import { Readable } from 'stream';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type ChatRequest = {
  model: string;
  messages: [];
  tempature: number | null;
  top_p: number | null;
  n: number | null;
  stream: boolean | null;
  stop: string | string[] | null;
  max_tokens: number | null;
  presence_penalty: number | null;
  frequency_penalty: number | null;
  logit_bias: { [key: string]: number } | null;
  user: string | null;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }
  // プロンプトを作成
  // プロンプトを受け取る
  const message = req.body.message || '';
  if (message.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid message',
      },
    });
    return;
  }
  console.log(message);

  try {
    const response: any = await openai.createChatCompletion(
      {
        model: 'gpt-3.5-turbo',
        messages: createChatCompletionMessage(message),
        stream: true,
        temperature: 0.6,
      },
      { responseType: 'stream' }
    );
    // console.log(completion.data.choices[0].message);

    const stream = response.data as any as Readable;

    // stream.on('data', (chunk: any) => {
    //   try {
    //     let str: string = chunk.toString();

    //     // // [DONE] は最後の行なので無視
    //     // if (str.indexOf('[DONE]') > 0) {
    //     //   return;
    //     // }

    //     // nullは無視
    //     // if (str.indexOf('delta":{}') > 0) {
    //     //   return;
    //     // }

    //     console.log(str);
    //     // ※APIからの応答をクライアントに返す。後で説明。
    //     const lines: Array<string> = str.split('\n');
    //     lines.forEach((line) => {
    //       // 先頭部分は削除
    //       if (line.startsWith('data: ')) {
    //         line = line.substring('data: '.length);
    //       }

    //       // 空行は無視
    //       if (line.trim() == '') {
    //         return;
    //       }

    //       // JSONにparse
    //       const data = JSON.parse(line);
    //       if (
    //         data.choices[0].delta.content === null ||
    //         data.choices[0].delta.content === undefined
    //       ) {
    //         return;
    //       }

    //       // 標準出力（確認用）
    //       process.stdout.write(data.choices[0].delta.content);

    //       // フロントに返却
    //       res.write(JSON.stringify({ result: data.choices[0].delta.content }));
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });
    stream.on('end', () => {
      console.log('end＝＝＝＝＝＝＝＝＝＝');
      res.end();
    });
    stream.on('error', (error) => {
      console.error(error);
      res.end(JSON.stringify({ error: true, message: 'Error generating response.' }));
    });

    stream.pipe(res);
    // console.log(stream);
    return res.status(200);
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    });
  }
}

const createChatCompletionMessage = (message: string): ChatCompletionRequestMessage[] => {
  return [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: message },
  ];
};
