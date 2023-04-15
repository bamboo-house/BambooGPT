import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenaiService } from '@/backend/openai/application/openaiService';

type ChatResponseBody = {
  error?: {
    message: string;
  };
  text?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChatResponseBody>) {
  const { method } = req;
  console.log('method: ', method);
  switch (method) {
    case 'GET':
      res.status(200).json({ text: 'GETリクエスト' });
      break;
    case 'POST':
      console.log('======================');
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
        const openaiService = new OpenaiService();
        // TODO: テスト的にCompletionを利用している
        openaiService.createCompletion(
          'text-ada-001',
          message,
          0.3,
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
      break;
    case 'PATCH':
      res.status(200).json({ text: 'PATCHリクエスト' });
      break;
    default:
      res.status(200).json({ text: 'GET/POST/PATCHでもないリクエストです。' });
      break;
  }
}
