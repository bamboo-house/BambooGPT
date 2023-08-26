import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultSession, getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from '@/backend/utils/prisma';
import { ResGetThreadListWithLatestChat } from '@/bff/types/thread';

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
          include: {
            chats: {
              orderBy: { createdAt: 'desc' },
            },
          },
        });

        console.dir(threadRecords, { depth: null });
        // const resGetBody: ResGetThreadListWithLatestChat = {
        //   body: result,
        // };
        // res.status(200).json(resGetBody);
        break;
      default:
        res.status(400).json({ error: { message: '無効なリクエストです' } });
    }
  } catch (e) {
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e.message } });
  }
}
