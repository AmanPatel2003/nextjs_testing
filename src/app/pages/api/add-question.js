// pages/api/add-question.js

import { kv } from "@vercel/kv"; // Import Vercel KV

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { question, options, correctAnswer } = req.body;

      if (!question || !options || !correctAnswer) {
        return res.status(400).json({ message: "Invalid data provided" });
      }

      // Generate a unique key for the question
      const questionId = `question_${Date.now()}`;

      // Save the question data to Vercel KV
      await kv.set(questionId, { question, options, correctAnswer });

      return res.status(200).json({ message: "Question added successfully!" });
    } catch (error) {
      console.error("Error adding question:", error);
      return res.status(500).json({ message: "Error adding question." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
