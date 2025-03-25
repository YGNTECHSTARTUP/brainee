"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { ArrowLeft, SendIcon, SquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "/api/chat",
    });

  return (
    <div className="flex flex-col min-w-full min-h-svh mx-auto rounded-xl bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
      {/* Gradient Header with Glass Effect */}
      <header className="w-full p-6 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md">
    <Link href={"/"}>
    <span><ArrowLeft/></span>
    </Link>  
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-md">
         💡 Chatbot for Your Intellectual Properties Protection
        </h1>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-6 space-y-6 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-center">
            <p className="text-lg text-gray-300 mt-4 animate-pulse">
              Welcome to the Chatbot! Ask me anything.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex flex-col">
              {message.role === "assistant" ? (
                <div className="flex items-start gap-3">
                  <div className="p-2 border border-white/30 rounded-full bg-white/10 backdrop-blur-md shadow-sm">
                    <Image src="/gemini.svg" alt="AI" width={20} height={20} />
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 max-w-[70%] shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                    <div className="text-sm ">
                      <Markdown>{message.content}</Markdown>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-indigo-400 to-indigo-600-400/80 rounded-xl p-4 max-w-[70%] shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                    <p className="text-sm text-white">{message.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input Area with Frosted Glass */}
      <form
  onSubmit={handleSubmit}
  className="bg-white/10 backdrop-blur-lg px-4 py-4 flex items-center gap-3 border-t border-white/20 shadow-inner"
>
  <div className="relative flex-1">
    <Textarea
      placeholder="Type your message..."
      className="rounded-xl pr-12 min-h-[64px] bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-md shadow-inner transition duration-300 placeholder:text-white/60"
      rows={1}
      value={input}
      onChange={handleInputChange}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (input.trim() !== "") handleSubmit(e);
        }
      }}
    />

    {!isLoading ? (
      <Button
        type="submit"
        size="icon"
        disabled={!input || isLoading}
        className="absolute bottom-3 right-3 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all"
        aria-label="Send"
      >
        <SendIcon className="w-5 h-5 text-white" />
      </Button>
    ) : (
      <Button
        type="button"
        size="icon"
        onClick={stop}
        className="absolute bottom-3 right-3 rounded-full bg-red-600 hover:bg-red-700 shadow-lg transition-all"
        aria-label="Stop"
      >
        <SquareIcon className="w-5 h-5 text-white" fill="white" />
      </Button>
    )}
  </div>
</form>


      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
