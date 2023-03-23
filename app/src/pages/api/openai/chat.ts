import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

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
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: createChatCompletionMessage(message),
      temperature: 0.6,
    });
    console.log(completion.data.choices[0].message);

    return res.status(200).json({ result: completion.data.choices[0].message?.content });
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
