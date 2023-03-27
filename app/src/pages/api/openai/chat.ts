import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

import * as serviceAccount from '../../../../firebase-test-serviceAccount.json';
import { initializeApp, applicationDefault, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import admin from 'firebase-admin';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// type ChatRequest = {
//   model: string;
//   messages: [];
//   tempature: number | null;
//   top_p: number | null;
//   n: number | null;
//   stream: boolean | null;
//   stop: string | string[] | null;
//   max_tokens: number | null;
//   presence_penalty: number | null;
//   frequency_penalty: number | null;
//   logit_bias: { [key: string]: number } | null;
//   user: string | null;
// };

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
  console.log('messages: ', message);

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

    const stream = response.data;

    stream.on('data', (chunk: any) => {
      console.log('================= START =================');
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

        // フロントに返却
        res.write(JSON.stringify({ text: data.choices[0].delta.content }));
      });
    });

    stream.on('end', () => {
      console.log('================= END =================');
      res.end();
    });

    stream.on('error', (error: any) => {
      console.error(error);
      res.end(JSON.stringify({ error: true, message: 'Error generating response.' }));
    });

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
