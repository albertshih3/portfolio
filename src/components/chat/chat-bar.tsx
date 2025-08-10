"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Send, MessageCircle, ChevronDown } from "lucide-react";
import ReactMarkdown from 'react-markdown';

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

export default function ChatBar({ isOpen, setIsOpen }: ChatBarProps) {
  const [popupMessage, setPopupMessage] = useState("");
  const [bottomMessage, setBottomMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [placeholderOpacity, setPlaceholderOpacity] = useState(1);
  const [userClosedChat, setUserClosedChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastScrollY = useRef(0);

  const placeholderTexts = [
    "Ask a question... \"What does Albert do?\"",
    "Ask a question... \"What's their experience?\"",
    "Ask a question... \"What projects has Albert built?\"",
    "Ask a question... \"What languages does Albert know?\"",
    "Ask a question... \"Where did Albert study?\"",
    "Ask a question... \"What's Albert's background?\""
  ];

  const handleCloseChat = () => {
    setUserClosedChat(true);
    setIsOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Auto-open chatbox when first message is sent (unless user manually closed it)
  useEffect(() => {
    if (messages.length > 0 && !isOpen && !userClosedChat) {
      setIsOpen(true);
    }
  }, [messages, isOpen, setIsOpen, userClosedChat]);

  // Bounce animation on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000); // Animation completes after 1 second (0.2s delay + 0.8s animation)

    return () => clearTimeout(timer);
  }, []);

  // Scroll detection to hide/show chat bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Rotate placeholder text with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setPlaceholderOpacity(0);
      
      // After fade out completes, change text and fade in
      setTimeout(() => {
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
        setPlaceholderOpacity(1);
      }, 300); // Wait for fade out to complete
      
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [placeholderTexts.length]);

  const sendMessage = async (messageText: string, clearInput: () => void) => {
    console.log('sendMessage called with message:', messageText);
    if (!messageText.trim() || isLoading) {
      console.log('Early return - empty message or loading');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    console.log('Adding user message:', userMessage);
    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      console.log('New messages array:', newMessages);
      return newMessages;
    });
    clearInput();
    setIsLoading(true);

    // Auto-open the chatbox when sending a message
    console.log('Current isOpen state:', isOpen);
    if (!isOpen) {
      console.log('Opening chatbox');
      setUserClosedChat(false); // Reset the flag when user sends a new message
      setIsOpen(true);
    }

    try {
      console.log('Sending request to /api/chat');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      let aiResponseText = "";
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "",
        isUser: false,
        timestamp: new Date(),
      };

      console.log('Adding AI message placeholder:', aiMessage);
      setMessages(prev => [...prev, aiMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        aiResponseText += chunk;
        
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessage.id 
            ? { ...msg, text: aiResponseText }
            : msg
        ));
      }
      console.log('Streaming complete');
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit called - delegating to sendMessage');
    await sendMessage(popupMessage, () => setPopupMessage(""));
  };

  return (
    <>
      {/* Chatbox - appears above the bottom bar */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed bottom-24 sm:bottom-20 md:bottom-16 right-2 sm:right-4 md:right-6 w-[95vw] sm:w-96 h-[70vh] sm:h-[550px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl flex flex-col z-[100] overflow-hidden"
            style={{ 
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
              {/* Chatbox Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700 text-white relative">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="font-medium text-white">AI Assist</h3>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCloseChat();
                  }}
                  className="p-2 hover:bg-white/20 rounded-md transition-colors cursor-pointer relative z-50 flex items-center justify-center min-w-[32px] min-h-[32px] bg-white/10"
                  type="button"
                  aria-label="Close chat"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-gray-900">
                {messages.length === 0 && (
                  <div className="text-center py-6 text-gray-600 dark:text-gray-400">
                    <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Ask me about Albert!</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">I can help with questions about his experience, skills, and projects.</p>
                  </div>
                )}
                
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                        msg.isUser 
                          ? 'bg-blue-600 text-white rounded-br-md' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
                      }`}
                    >
                      {msg.isUser ? (
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-3 py-2 rounded-2xl rounded-bl-md bg-gray-100 dark:bg-gray-800">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* AI Disclosure */}
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  AI Assist is powered by Google Gemini, mistakes may occur. 
                </p>
              </div>

              {/* Chatbox Input */}
              <div className="p-3 bg-white dark:bg-gray-900">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={popupMessage}
                    onChange={(e) => setPopupMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!popupMessage.trim() || isLoading}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
        )}
      </AnimatePresence>

      {/* Tesla-style Bottom Chat Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[90] flex justify-center pointer-events-none transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div
          className={`m-4 w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-lg backdrop-blur-xl flex items-center px-6 py-3 pointer-events-auto transition-all duration-300 ease-out`}
          style={{ 
            backdropFilter: 'blur(20px)',
            animation: !hasAnimated ? 'chatBounceIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s 1 forwards' : 'none',
            transform: !hasAnimated ? 'translateY(100px)' : 'translateY(0)',
            opacity: !hasAnimated ? 0 : 1
          }}
        >
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <input
              type="text"
              value={bottomMessage}
              onChange={e => setBottomMessage(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base font-medium"
              placeholder={placeholderTexts[currentPlaceholderIndex]}
              style={{ 
                '--placeholder-opacity': placeholderOpacity 
              } as React.CSSProperties & { '--placeholder-opacity': number }}
              onKeyDown={async (e) => {
                if (e.key === 'Enter' && bottomMessage.trim()) {
                  await sendMessage(bottomMessage, () => setBottomMessage(""));
                }
              }}
              disabled={isLoading}
            />
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={async () => {
                if (bottomMessage.trim()) {
                  await sendMessage(bottomMessage, () => setBottomMessage(""));
                }
              }}
              disabled={!bottomMessage.trim() || isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Ask"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
