import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }
  // プロンプトを作成
  // レスポンスを受け取る
  const prompt = req.body.prompt || '';
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid prompt',
      },
    });
    return;
  }
  console.log(prompt);

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.6,
    });
    console.log(completion.data.choices[0].text);
    // res.status(200).json({ result: completion.data.choices[0].text });

    return res.status(200).json({ result: completion.data.choices[0].text });
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    });
  }
}
