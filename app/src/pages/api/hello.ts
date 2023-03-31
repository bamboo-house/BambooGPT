// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/');
    const users = await response.json();
    if (users[0].name === 'Leanne Graham') {
      throw new Error('No users found!');
    }
    res.status(200).json({ name: users[0].name });
  } catch (error) {
    console.log('error: ', error.message);
    res.status(500).json({ name: error.message });
  }
  // res.status(400).send({ name: 'Bad Request!' });
  // throw new Error('=================error');
  // res.status(200).json({ name: users[0].name });
}
