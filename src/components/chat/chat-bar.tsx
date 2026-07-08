"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, MessageCircle, X, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const placeholderTexts = [
  'Ask anything… "What has Albert built?"',
  'Ask anything… "What\'s his experience with AI?"',
  'Ask anything… "What languages does he know?"',
  'Ask anything… "Tell me about his projects."',
  'Ask anything… "Where did Albert study?"',
];

export default function ChatBar({ isOpen, setIsOpen }: ChatBarProps) {
  const [bottomMessage, setBottomMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [userClosedChat, setUserClosedChat] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderOpacity, setPlaceholderOpacity] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelInputRef = useRef<HTMLInputElement>(null);
  const lastScrollY = useRef(0);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus panel input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => panelInputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Auto-open on first message
  useEffect(() => {
    if (messages.length > 0 && !isOpen && !userClosedChat) {
      setIsOpen(true);
    }
  }, [messages, isOpen, setIsOpen, userClosedChat]);

  // Bounce in animation on load
  useEffect(() => {
    const t = setTimeout(() => setHasAnimated(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 100) setIsVisible(false);
      else if (y < lastScrollY.current) setIsVisible(true);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rotate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderOpacity(0);
      setTimeout(() => {
        setPlaceholderIndex((i) => (i + 1) % placeholderTexts.length);
        setPlaceholderOpacity(1);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (text: string, clearInput: () => void) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    clearInput();
    setIsLoading(true);

    if (!isOpen) {
      setUserClosedChat(false);
      setIsOpen(true);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!response.ok) throw new Error("Request failed");
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream");

      const aiMessage: Message = {
        // eslint-disable-next-line react-hooks/purity
        id: (Date.now() + 1).toString(),
        text: "",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        // eslint-disable-next-line react-hooks/immutability
        accumulated += new TextDecoder().decode(value);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMessage.id ? { ...m, text: accumulated } : m
          )
        );
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Something went wrong. Please try again.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUserClosedChat(true);
    setIsOpen(false);
  };

  return (
    <>
      {/* ── Centered chat panel ─────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              className="relative w-full max-w-2xl flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden"
              style={{ height: "min(78vh, 700px)" }}
              initial={{ scale: 0.96, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.7 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="AI assistant chat"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-stone-950 dark:bg-stone-950 border-b border-stone-800 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-stone-950" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-white text-sm leading-tight">
                      Ask About Albert
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span className="text-xs text-stone-400">Powered by Google Gemini</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close chat"
                  className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center pb-8">
                    <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/30 rounded-full flex items-center justify-center mb-4">
                      <MessageCircle className="w-7 h-7 text-amber-600 dark:text-amber-500" />
                    </div>
                    <p className="font-display font-semibold text-stone-900 dark:text-stone-50 mb-1">
                      Ask me about Albert
                    </p>
                    <p className="text-sm text-stone-400 dark:text-stone-500 max-w-xs">
                      I can answer questions about his experience, projects, skills, and background.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2 justify-center">
                      {["What has he built?", "What's his tech stack?", "Where did he study?"].map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q, () => {})}
                          className="px-3.5 py-1.5 text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-full hover:bg-amber-100 dark:hover:bg-amber-950/40 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!msg.isUser && (
                      <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mr-2.5 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.isUser
                          ? "bg-amber-600 text-white rounded-br-md"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-bl-md"
                      }`}
                    >
                      {msg.isUser ? (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-p:leading-relaxed prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-headings:font-display prose-headings:font-semibold prose-headings:text-stone-900 dark:prose-headings:text-stone-50 prose-strong:font-semibold prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-code:text-amber-700 dark:prose-code:text-amber-400 prose-code:bg-amber-50 dark:prose-code:bg-amber-950/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mr-2.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-stone-100 dark:bg-stone-800">
                      <div className="flex space-x-1 items-center h-4">
                        <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
                        <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Disclaimer */}
              <div className="px-5 py-2 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 flex-shrink-0">
                <p className="text-xs text-stone-400 dark:text-stone-500 text-center">
                  AI responses may not always be accurate.
                </p>
              </div>

              {/* Input */}
              <div className="px-4 py-3 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex-shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(popupMessage, () => setPopupMessage(""));
                  }}
                  className="flex gap-2"
                >
                  <input
                    ref={panelInputRef}
                    type="text"
                    value={popupMessage}
                    onChange={(e) => setPopupMessage(e.target.value)}
                    placeholder="Ask a question…"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 text-sm bg-stone-100 dark:bg-stone-800 border border-transparent focus:border-amber-400 dark:focus:border-amber-600 focus:outline-none rounded-xl text-stone-900 dark:text-stone-50 placeholder-stone-400 dark:placeholder-stone-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!popupMessage.trim() || isLoading}
                    aria-label="Send message"
                    className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 dark:disabled:bg-stone-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating bottom trigger bar ─────────────────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[90] flex justify-center pointer-events-none transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div
          className="m-4 w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-full shadow-lg flex items-center px-5 py-2.5 pointer-events-auto gap-3"
          style={{
            animation: !hasAnimated
              ? "chatBounceIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s 1 forwards"
              : "none",
            transform: !hasAnimated ? "translateY(100px)" : "translateY(0)",
            opacity: !hasAnimated ? 0 : 1,
          }}
        >
          <div className="w-7 h-7 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <input
            type="text"
            value={bottomMessage}
            onChange={(e) => setBottomMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && bottomMessage.trim()) {
                sendMessage(bottomMessage, () => setBottomMessage(""));
              }
            }}
            disabled={isLoading}
            placeholder={placeholderTexts[placeholderIndex]}
            className="flex-1 bg-transparent outline-none text-sm text-stone-900 dark:text-stone-50 placeholder-stone-400 dark:placeholder-stone-500 min-w-0"
            style={{
              "--placeholder-opacity": placeholderOpacity,
            } as React.CSSProperties & { "--placeholder-opacity": number }}
          />
          <button
            onClick={() => {
              if (bottomMessage.trim()) {
                sendMessage(bottomMessage, () => setBottomMessage(""));
              }
            }}
            disabled={!bottomMessage.trim() || isLoading}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-200 dark:disabled:bg-stone-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full transition-colors flex-shrink-0"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
            ) : (
              "Ask"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
