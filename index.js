import Express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
const app = Express();
const API_KEY = "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";
const port = 3001;
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);
app.use(cors());
app.use(Express.json());
app.post("/", async (req, res) => {
  const message = req.body.message;
  const temperature = req.body.temperature;
  const model = req.body.model;
  const response = await openai.createCompletion({
    model: model,
    prompt: message,
    max_tokens: 16,
    temperature: temperature,
  });

  res.send(response.data.choices[0].text);
});

app.get("/models", async (req, res) => {
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.listModels();
  res.send(response.data["data"]);
});

app.listen(port, () => {
  console.log("Server is running on PORT:", port);
});
