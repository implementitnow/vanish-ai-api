// api/gpt.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { prompt } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `User said: "${prompt}". Provide a one-sentence, emotionally supportive quote.`,
      max_tokens: 50,
      temperature: 0.8,
    });

    const quote = completion.data.choices[0].text.trim();
    res.status(200).json({ quote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate quote." });
  }
}
