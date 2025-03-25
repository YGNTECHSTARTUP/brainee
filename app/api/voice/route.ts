import { google } from "@ai-sdk/google"
import { type CoreMessage, streamText } from "ai"
import { HfInference } from "@huggingface/inference"

export const maxDuration = 30

// Ensure Hugging Face API key is set
if (!process.env.HUGGINGFACE_API_KEY) {
  throw new Error("Missing Hugging Face API key in environment variables")
}

// Initialize Hugging Face inference client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function POST(req: Request) {
  try {
    // Parse request JSON
    const { messages }: { messages: CoreMessage[] } = await req.json()

    // Extract the latest user message
    const latestUserMessage = messages.findLast((m) => m.role === "user")

    if (latestUserMessage) {
      try {
        // Generate embeddings using Hugging Face
        const embedding = await hf.featureExtraction({
          model: "sentence-transformers/all-MiniLM-L6-v2",
          inputs: latestUserMessage.content,
        })

        console.log("Generated embedding for user message:", embedding)
        // Process embedding as needed (e.g., for search, retrieval, etc.)
      } catch (error) {
        console.error("Error generating embedding:", error)
      }
    }

    // Stream response from Google Gemini
    const result = await streamText({
      model: google("models/gemini-1.5-flash-latest"),
      system:
        "You are an expert in intellectual property (IP) law with deep knowledge in patents, trademarks, copyrights, trade secrets, licensing, and infringement. When answering, guide users step by step—start with basic principles, build to advanced ideas, and use clear, real-world examples. Be concise, logical, and focus on key points to ensure understanding. Refer back to prior context to maintain continuity. If a question falls outside IP law, politely redirect to the appropriate specialist. Your goal is to make IP law accessible, clear, and engaging.",
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error handling POST request:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
