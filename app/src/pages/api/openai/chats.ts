import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenaiService } from '@/backend/application/openaiService';
import { verifyAndAuthForFirestore } from '@/backend/utils/verifyAndAuthForFirestore';

type ChatResponseBody = {
  text?: string;
  error?: {
    message: string;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChatResponseBody>) {
  try {
    switch (req.method) {
      case 'GET':
        res.status(200).json({ text: 'GETリクエスト' });
        break;

      case 'POST':
        console.log('======================');
        // headersの取得
        const idToken = req.headers.authorization?.split('Bearer ')[1];
        if (!idToken) {
          res.status(400).json({ error: { message: '無効なリクエストです' } });
        }
        const userAuth = await verifyAndAuthForFirestore(idToken as string);

        const body = req.body;
        console.log('req.body: ', req.body);
        const { userId, threadId, content } = body;
        const { model, prompt } = content;

        if (prompt === '') {
          res.status(400).json({
            error: {
              message: 'Please enter a valid message',
            },
          });
        }
        console.log('prompt', prompt);
        try {
          const openaiService = new OpenaiService();
          // TODO: テスト的にCompletionを利用している
          openaiService.createCompletion(
            model,
            prompt,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            true,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
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
  } catch (e) {
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e } });
  }
}
