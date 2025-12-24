import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
//     const prompt = `
// Create a list of three open-ended and engaging questions formatted as a single string.
// Each question should be separated by '||'.
// These questions are for an anonymous social messaging platform like Qooh.me.
// Avoid personal or sensitive topics.
// Focus on universal themes that encourage friendly interaction.

// Example format:
// "What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?"
// `;

    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     { role: "user", content: prompt }
    //   ],
    //   temperature: 0.7,
    //   max_tokens: 200,
    // });

    // const text = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ result: "What’s something small that made you smile today?||If you could instantly master one skill, what would it be?||What’s a place you’d love to visit someday?" });

  } catch (error) {
    console.error("Suggest messages error:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 }
    );
  }
}
