
"use client";

import {
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

interface ChatbotApiResponse {
  reply?: string;
  answer?: string;
  response?: string;
  message?: string;
  error?: string;
}

const SUGGESTED_QUESTIONS = [
  "What services does the clinic offer?",
  "How can I book an appointment?",
  "What are the clinic opening hours?",
  "Tell me about the doctors",
];

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome-message",
  role: "assistant",
  content:
    "Hello! 👋 Welcome to our clinic. I'm your virtual assistant. I can help you learn about our doctors, services, clinic timings, and appointment process. How can I help you today?",
};

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h2 className="mb-3 mt-2 text-xl font-bold text-slate-900">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h3 className="mb-3 mt-5 flex items-center gap-2 text-base font-bold text-slate-900">
      <span className="h-5 w-1 shrink-0 rounded-full bg-blue-600" />
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="mb-2 mt-4 text-sm font-bold text-slate-800">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-3 last:mb-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-blue-500">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 mt-2 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-blue-600">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="pl-1">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900">
      {children}
    </strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-3 rounded-r-lg border-l-4 border-blue-400 bg-blue-50 px-4 py-3 text-slate-700">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-blue-600 underline decoration-blue-200 underline-offset-2 hover:text-blue-800"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[280px] border-collapse text-left text-xs sm:text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-blue-50 text-slate-800">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-slate-200 px-3 py-3 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-slate-100 px-3 py-3 align-top">
      {children}
    </td>
  ),
  hr: () => <hr className="my-4 border-slate-200" />,
  code: ({ children }) => (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-blue-700">
      {children}
    </code>
  ),
};

function AssistantResponse({ content }: { content: string }) {
  return (
    <div className="min-w-0 break-words text-sm leading-7 text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    INITIAL_MESSAGE,
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  async function sendMessage(
    event?: FormEvent<HTMLFormElement>,
    suggestedMessage?: string
  ) {
    event?.preventDefault();

    const messageText = (suggestedMessage ?? input).trim();

    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText,
    };

    const conversationHistory = [
      ...messages.filter(
        (message) => message.id !== "welcome-message"
      ),
      userMessage,
    ].map(({ role, content }) => ({ role, content }));

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setError("");
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          history: conversationHistory,
        }),
      });

      const data: ChatbotApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to get a response. Please try again."
        );
      }

      const reply =
        data.reply ??
        data.answer ??
        data.response ??
        data.message;

      if (typeof reply !== "string" || !reply.trim()) {
        throw new Error(
          "The server returned an empty response. Please try again."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply.trim(),
        },
      ]);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    setInput(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${Math.min(
      event.target.scrollHeight,
      140
    )}px`;
  }

  function startNewChat() {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setError("");
    textareaRef.current?.focus();
  }

  return (
    <main className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-slate-50 px-0 py-0 text-slate-900 sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-hidden bg-white sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-sm">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl">
              🩺
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                Clinic Assistant
              </h1>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <p className="text-xs text-slate-500 sm:text-sm">
                  Virtual assistant
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={startNewChat}
            disabled={isLoading}
            className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="hidden sm:inline">
              New conversation
            </span>
            <span className="sm:hidden">New chat</span>
          </button>
        </header>

        {/* Conversation */}
        <section
          className="min-h-0 flex-1 overflow-y-auto bg-slate-50 px-3 py-5 sm:px-6 sm:py-6"
          aria-label="Chat conversation"
          aria-live="polite"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            {messages.length === 1 && (
              <div className="mb-2 mt-2 text-center sm:mt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  🏥
                </div>
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  How can we help you?
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Ask us about medical services, doctors, clinic hours,
                  or appointments.
                </p>
              </div>
            )}

            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-2.5 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm">
                      🩺
                    </div>
                  )}

                  <div
                    className={`min-w-0 max-w-[88%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[78%] ${
                      isUser
                        ? "rounded-br-sm bg-blue-600 text-white"
                        : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap break-words text-sm leading-7">
                        {message.content}
                      </p>
                    ) : (
                      <AssistantResponse content={message.content} />
                    )}
                  </div>

                  {isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm">
                      👤
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-end gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm">
                  🩺
                </div>
                <div
                  className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-4 shadow-sm"
                  role="status"
                  aria-label="Assistant is typing"
                >
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                  <span className="ml-1 text-xs text-slate-500">
                    Preparing a response...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </section>

        {/* Suggested questions */}
        {messages.length === 1 && (
          <section className="border-t border-slate-100 bg-white px-3 py-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Suggested questions
              </p>

              <div className="grid grid-cols-2 gap-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() =>
                      void sendMessage(undefined, question)
                    }
                    disabled={isLoading}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-left text-sm text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="mr-2 text-blue-600">↗</span>
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Error message */}
        {error && (
          <div
            className="mx-3 mt-2 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-6"
            role="alert"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError("")}
              className="font-bold"
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        {/* Message input */}
        <footer className="border-t border-slate-200 bg-white px-3 py-4 sm:px-6 sm:py-5">
          <form
            onSubmit={(event) => void sendMessage(event)}
            className="mx-auto max-w-3xl"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-slate-300 bg-white p-2 shadow-sm transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask your question..."
                aria-label="Type your message"
                rows={1}
                maxLength={4000}
                disabled={isLoading}
                className="max-h-[140px] min-h-[44px] flex-1 resize-none bg-transparent px-3 py-3 text-sm leading-5 text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 2 11 13" />
                  <path d="m22 2-7 20-4-9-9-4Z" />
                </svg>
              </button>
            </div>

            <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
              AI-generated responses may not always be accurate. For
              emergencies, contact local emergency services.
            </p>
          </form>
        </footer>
      </div>
    </main>
  );
}
