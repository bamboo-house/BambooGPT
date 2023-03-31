import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenaiService } from '@/application/openaiService';

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

type ChatResponseBody = {
  error?: {
    message: string;
  };
  text?: string;
};

export default async function (req: NextApiRequest, res: NextApiResponse<ChatResponseBody>) {
  const openaiService = new OpenaiService();
  const message = req.body.message || '';
  if (message.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid message',
      },
    });
  }
  console.log('messages: ', message);

  try {
    openaiService.createChatCompletion(
      'gpt-3.5-turbo',
      message,
      0.6,
      (text: string) => {
        res.write(JSON.stringify({ text: text }));
      },
      () => {
        res.end();
      }
    );
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    });
  }
}
