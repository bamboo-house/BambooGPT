import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultSession, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/backend/utils/prisma';
import { ResGetThread } from '@/bff/types/thread';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || !session.user) {
      return res.status(400).json({ error: { message: 'ログインしてください' } });
    }
    const { user, expires }: DefaultSession = session;
    if (!user || !user.email) {
      return res.status(400).json({ error: { message: '再ログインしてください' } });
    }

    const userRecord = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userRecord || !userRecord.id) {
      return res.status(400).json({ error: { message: 'ユーザーが存在しません' } });
    }

    const threadId = req.query.threadId as string;

    switch (req.method) {
      case 'GET':
        const threadRecord = await prisma.thread.findUnique({
          where: { id: Number(threadId) },
        });
        if (!threadRecord) {
          return res.status(400).json({ error: { message: 'スレッドが存在しません' } });
        }

        if (threadRecord.userId !== userRecord.id) {
          return res.status(400).json({ error: { message: 'リソースへのアクセスが無効です' } });
        }

        const resGetBody: ResGetThread = {
          body: {
            id: threadRecord.id,
            userId: threadRecord.userId,
            name: threadRecord.name,
            createdAt: threadRecord.createdAt,
            updatedAt: threadRecord.updatedAt,
          },
        };
        res.status(200).json(resGetBody);
        break;
      case 'DELETE':
        await prisma.thread
          .delete({
            where: {
              id: Number(threadId),
              userId: userRecord.id,
            },
          })
          .catch((e) => {
            throw new Error('スレッドが存在しません or 無効なユーザーです');
          });
        res.status(200).json({ success: true });
        break;
      default:
        res.status(400).json({ error: { message: '無効なリクエストです' } });
    }
  } catch (e) {
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e.message } });
  }
}
