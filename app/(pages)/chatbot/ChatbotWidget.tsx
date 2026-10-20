
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevent the chatbot from appearing inside its own iframe.
  if (pathname === "/chatbot") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] sm:bottom-5 sm:right-5">
      {isOpen && (
        <div className="mb-4 flex h-[min(650px,calc(100dvh-110px))] w-[min(420px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
            <div>
              <h2 className="font-semibold">Medical Assistant</h2>
              <p className="text-xs text-blue-100">
                Ask us a question
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="rounded-full p-2 text-xl hover:bg-blue-700"
            >
              ×
            </button>
          </div>

          <iframe
            src="/chatbot"
            title="Medical chatbot"
            className="h-full min-h-0 w-full flex-1 border-0"
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close medical chatbot" : "Open medical chatbot"}
        aria-expanded={isOpen}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:h-16 sm:w-16"
      >
        {isOpen ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
