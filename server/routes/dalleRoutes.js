import express from 'express';
import * as dotenv from 'dotenv';
import Post from '../mongodb/models/post.js';
import OpenAI from 'openai';
const router = express.Router();
dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

router.route('/').get((req, res) => {
  res.send('Hello from DALLE-E');
});

router.route('/').post(async (req, res)=>{
    try {
        const {prompt} = req.body;
        const aiResponse = await openai.images.generate({
           prompt,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({photo: image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;  // Export the router to be used in index.js
