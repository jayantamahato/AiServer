import Express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
const app = Express();
const port = 3001;
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
app.use(cors());
app.use(Express.json());
app.post("/", async (req, res) => {
  const data = req.body.message;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: data,
    max_tokens: 100,
    temperature: 0.5,
  });
  console.log("Me:", data);

  console.log("Response:", response.data.choices[0].text);
  res.send(response.data.choices[0].text);
});

app.listen(port, () => {
  console.log("Server is running on PORT:", port);
});
