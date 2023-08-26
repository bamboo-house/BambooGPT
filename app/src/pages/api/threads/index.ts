import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultSession } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/backend/utils/prisma';
import { ResGetThreads, ResPostThread } from '@/bff/types/thread';

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

    switch (req.method) {
      case 'GET':
        const threadRecords = await prisma.thread.findMany({
          where: {
            userId: userRecord.id,
          },
        });

        const resGetBody: ResGetThreads = {
          body: threadRecords,
        };
        res.status(200).json(resGetBody);
        break;
      case 'POST':
        const threadRecord = await prisma.thread.create({
          data: {
            userId: userRecord.id,
            name: 'test',
          },
        });

        const resPostBody: ResPostThread = {
          body: threadRecord,
        };
        res.status(200).json(resPostBody);
        break;
      case 'DELETE':
        await prisma.thread.deleteMany({
          where: {
            userId: userRecord.id,
          },
        });
      default:
        res.status(400).json({ error: { message: '無効なリクエストです' } });
    }
  } catch (e) {
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e.message } });
  }
}
