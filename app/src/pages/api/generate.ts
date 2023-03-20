import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { MongoClient, Db } from 'mongodb';
import * as serviceAccount from '../../../firebase-test-serviceAccount.json';
import { initializeApp, applicationDefault, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import admin from 'firebase-admin';
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const dbName = process.env.MONGO_DB_NAME;
// const client: MongoClient = new MongoClient(process.env.MONGO_URI!);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // if (!configuration.apiKey) {
  //   res.status(500).json({
  //     error: {
  //       message: 'OpenAI API key not configured, please follow instructions in README.md',
  //     },
  //   });
  //   return;
  // }

  const input = req.body.input || '';
  if (input.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid input',
      },
    });
    return;
  }

  try {
    // const completion = await openai.createCompletion({
    //   model: 'text-davinci-003',
    //   prompt: prompt,
    //   temperature: 0.6,
    // });
    // console.log(completion.data);
    // res.status(200).json({ result: completion.data.choices[0].text });

    // await client.connect();
    // console.log('Connected successfully to server');
    // const db: Db = client.db(dbName);
    // // prettier-ignore
    // const query = { "name": "sample_user_001" };
    // const result = await db.collection('prompts').findOne(query);
    // console.log(result);
    // Firestore初期化

    if (admin.apps.length === 0) {
      initializeApp({
        credential: cert(serviceAccount as any),
      });
    }

    const db = getFirestore();
    // 全てのデータ取得
    const docRef = await db.collection('prompts').doc('takeuchi').get();
    const docRef2 = db.collection('prompts').doc();
    await docRef2.set({
      name: 'Osaka',
      country: 'Japan',
    });
    const fres = await db.collection('prompts').add({
      name: 'Tokyo',
      country: 'Japan',
    });

    const snapshot = await db.collection('prompts').get();
    console.log('ifififififiififififififififiif=~=================================');
    console.log(snapshot.docs[0].data());
    console.log(snapshot.size);
    console.log(snapshot.empty);
    console.log('Added document with ID', fres.id);

    console.log('ifififififiififififififififiif=~=================================');

    res.status(200).json({ result: { email: 'unko' } });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}
