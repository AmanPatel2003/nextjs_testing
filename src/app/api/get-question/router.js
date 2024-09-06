// src/app/api/get-question/route.js

import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const questionId = searchParams.get("questionId");

  try {
    const response = await fetch(
      `${process.env.KV_REST_API_URL}/get/${questionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const error = await response.json();
      return NextResponse.json(
        { message: "Error fetching question", error },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error fetching question:", error.message);
    return NextResponse.json(
      { message: "Error fetching question", error: error.message },
      { status: 500 }
    );
  }
}
