import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenaiChatsService } from '@/backend/application/openaiChatsService';
import { ReqPostOpenaiChat } from '@/bff/types/openai/chats';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      res.status(400).json({ error: { message: '無効なリクエストです' } });
    }

    // headersの取得・認証
    // const idToken = req.headers.authorization?.split('Bearer ')[1];
    // if (!idToken) {
    //   console.error('idToken is null');
    //   res.status(400).json({ error: { message: '無効なリクエストです' } });
    // }
    // await verifyAndAuthenticateUser(idToken as string);

    // リクエストボディの取得・検証
    const reqBody: ReqPostOpenaiChat = req.body;
    const { threadId, chatContent } = reqBody;
    if (reqBody.chatContent.messages[reqBody.chatContent.messages.length - 1].content === '') {
      res.status(400).json({
        error: {
          message: 'Please enter a valid message',
        },
      });
    }

    // メイン処理
    // resはできるだけプレゼンテーション層で管理する
    const resWrite = (text: string) => {
      res.write(JSON.stringify({ text: text }));
    };
    const resEnd = () => {
      res.end();
    };
    const openaiChatsService = new OpenaiChatsService();
    openaiChatsService.run(threadId, chatContent, resWrite, resEnd);
  } catch (e) {
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e.message } });
  }
}
