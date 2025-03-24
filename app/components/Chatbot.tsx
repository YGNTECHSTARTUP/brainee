"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { SendIcon, SquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/chat",
    });

  return (
    <div className="flex flex-col min-w-full min-h-screen mx-auto rounded-lg shadow-2xl bg-gradient-to-br from-black via-gray-900 to-blue-900">
      {/* Gradient Header */}
      <header className="w-full p-5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-center shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
          Chat Bot for Your Intellectual Properties Protection
        </h1>
      </header>

      <div className="flex-1 overflow-auto p-6">
        {messages.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-lg text-gray-300 mt-4">
              Welcome to the Chatbot! Ask me anything.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-4">
          {messages.map((message) =>
            message.role === "assistant" ? (
              <div key={message.id} className="flex items-start gap-3">
                <div className="p-2 border border-blue-600 rounded-full">
                  <Image src="/gemini.svg" alt="AI" width={20} height={20} />
                </div>
                <div className="bg-blue-800/30 backdrop-blur-md border border-blue-700 rounded-lg p-3 max-w-[70%]">
                  <div className="text-sm text-blue-100">
                    <Markdown>{message.content}</Markdown>
                  </div>
                </div>
              </div>
            ) : (
              <div key={message.id} className="flex justify-end">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm text-white">{message.content}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/70 backdrop-blur-sm -mt-16 px-4 py-3 flex items-center gap-2 border-t border-gray-700"
      >
        <div className="relative flex-1 ">
          <Textarea
            placeholder="Type your message..."
            className="rounded-lg pr-12 min-h-[64px] bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={1}
            value={input}
            onChange={handleInputChange}
          />

          {!isLoading ? (
            <Button
              type="submit"
              size="icon"
              disabled={!input || isLoading}
              className="absolute bottom-3 right-3 rounded-full bg-blue-600 hover:bg-blue-700 transition"
            >
              <SendIcon className="w-5 h-5 text-white" />
              <span className="sr-only">Send</span>
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              disabled={!isLoading}
              onClick={stop}
              className="absolute bottom-3 right-3 rounded-full bg-red-600 hover:bg-red-700 transition"
            >
              <SquareIcon className="w-5 h-5 text-white" fill="white" />
              <span className="sr-only">Stop</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
