import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // プロンプトを作成
    // レスポンスを受け取る

    return res.status(200).json({ result: 'test' });
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    });
  }
}
