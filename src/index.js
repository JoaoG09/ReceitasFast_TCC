import { GoogleGenAI } from "@google/genai";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Substitua pela sua chave de API do Google Generative AI
const apiKey = "AIzaSyDChI3sZGL-8sW45zUCXEoG55RlYNV6sig";
const genAI = new GoogleGenAI({ apiKey });
const model = genAI.model({ model: "gemini-pro" });

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/gerar-resposta', async (req, res) => {
    const prompt = req.body.prompt;

    if (!prompt) {
        return res.status(400).send({ error: 'Prompt não fornecido.' });
    }

    try {
        const result = await model.generateContent({
            contents: [{ parts: [{ text: prompt }] }],
        });
        const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        res.json({ resposta: responseText });
    } catch (error) {
        console.error("Erro ao gerar resposta da IA:", error);
        res.status(500).send({ error: 'Erro ao gerar resposta da IA.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor Node.js rodando na porta ${port}`);
});