import { NextApiRequest, NextApiResponse } from 'next';

// api/login/googleの理由は、twitterやfacebookなどのログインも増える可能性を考慮するため
// あと、loginは割と特殊な処理なので、api/login/以下にまとめておきたい
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // firestoreに接続する
  // IdToken検証する
  // usersドキュメントに登録されているか確認する
  //  されている場合は
  //    - フィールドを取得する
  //  されてない場合は
  //    - usersコレクションにドキュメント追加する
  // フィールド情報を返す
  //  - name
  //  - email
}
