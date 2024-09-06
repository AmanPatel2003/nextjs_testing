// src/app/api/add-question/route.js

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { question, options, correctAnswer } = await req.json();

    // Validate incoming data
    if (
      !question ||
      !options ||
      options.length !== 4 ||
      correctAnswer === undefined
    ) {
      console.log("Invalid data:", { question, options, correctAnswer });
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // Generate a unique key for each question
    const questionId = `question:${Date.now()}`;

    const questionData = {
      question,
      options,
      correctAnswer,
    };

    // Log the data being sent to Upstash
    console.log("Sending data to Upstash:", { questionId, questionData });

    // Send request to Upstash Redis REST API
    const response = await fetch(
      `${process.env.KV_REST_API_URL}/set/${questionId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      }
    );

    // Log the response from Upstash
    console.log("Response from Upstash:", response);

    if (response.ok) {
      return NextResponse.json({ message: "Question added successfully!" });
    } else {
      const error = await response.json();
      console.log("Error response from Upstash:", error);
      return NextResponse.json(
        { message: "Error adding question", error },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error adding question:", error.message);
    return NextResponse.json(
      { message: "Error adding question", error: error.message },
      { status: 500 }
    );
  }
}
