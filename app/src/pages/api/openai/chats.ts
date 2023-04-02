import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenaiService } from '@/openai/application/openaiService';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET':
      res.status(200).json({ text: 'GETリクエスト' });
      break;
    case 'POST':
      res.status(200).json({ text: 'POSTリクエスト' });
      break;
    case 'PATCH':
      res.status(200).json({ text: 'PATCHリクエスト' });
      break;
    default:
      res.status(200).json({ text: 'GET/POST/PATCHでもないリクエストです。' });
      break;
  }
}
