import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

import Post from "../mongodb/models/post";

dotenv.config();

const router = express.Router();

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data[0].b64_json;

    res.status(200).json({ image });
  } catch (error) {
    res.status(404).json(error.response.data.error.message);
  }
});

export default router;
