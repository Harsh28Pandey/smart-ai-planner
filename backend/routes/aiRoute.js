import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful study assistant." },
                { role: "user", content: message }
            ]
        });

        res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {

        res.status(500).json({
            error: "AI Error"
        });

    }

});

export default router;