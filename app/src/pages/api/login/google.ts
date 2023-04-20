import { NextApiRequest, NextApiResponse } from 'next';
import { LoginService } from '@/backend/openai/application/loginService';
import { GoogleUserInfo} from '@/bff/types/firestore/usersCollection';
import { ReqLoginGoogle, ResLoginGoogle } from '@/bff/types/login';

// api/login/googleの理由は、twitterやfacebookなどのログインも増える可能性を考慮するため
// あと、loginは割と特殊な処理なので、api/login/配下にまとめておきたい
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method !== 'POST') {
    res.status(400).json({ error: { message: '無効なリクエストです' } });
  }
  
  // リクエストボディの取得
  const reqBody: ReqLoginGoogle = req.body;
  const googleUserInfo: GoogleUserInfo = reqBody.googleUserInfo;

  try {
    const loginService = new LoginService();
    const user = await loginService.loginWithGoogle(googleUserInfo);

    const resBody: ResLoginGoogle = { 
      body: {
        name: user.name || '',
        image: user.image || '',
      }
    };

    res.status(200).json(resBody);
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
}
