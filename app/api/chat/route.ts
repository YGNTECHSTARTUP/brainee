import { google } from "@ai-sdk/google";
import { type CoreMessage, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    system: "You are an expert in intellectual property (IP) law with deep knowledge in patents, trademarks, copyrights, trade secrets, licensing, and infringement. When answering, guide users step by step—start with basic principles, build to advanced ideas, and use clear, real-world examples. Be concise, logical, and focus on key points to ensure understanding. Refer back to prior context to maintain continuity. If a question falls outside IP law, politely redirect to the appropriate specialist. Your goal is to make IP law accessible, clear, and engaging.",
    messages,
  });

  return result.toDataStreamResponse();
}