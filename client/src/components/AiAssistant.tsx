import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Key, Check, Bot, User, RefreshCw } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { askGemini, type ChatMessage } from "@/lib/gemini";

const QUICK_PROMPTS = [
  "Car parking shade rate in Lahore?",
  "Difference between PVC and HDPE?",
  "How to get a quote and site visit?",
  "Tell me about your latest projects",
];

export function AiAssistant() {
  const { content } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: `Hello! I am your **AI Architectural Consultant** for ${content?.company?.name || "TSP Tensile (Form/Field)"}. 
I have crawled and indexed all website projects, fabrics (PVC, HDPE, PTFE, ETFE), specifications, and pricing procedures. 

How can I assist your project today? *(You can ask in English, Roman Urdu, or اردو)*`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const [keySaved, setKeySaved] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ff_gemini_api_key");
    if (saved) setCustomKey(saved);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await askGemini(query, messages, content);
      const assistantMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: "assistant",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "assistant",
          text: "Sorry, I encountered a temporary issue. You can reach our engineering desk directly at WhatsApp: +92 300 1234567.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKey = () => {
    if (customKey.trim()) {
      localStorage.setItem("ff_gemini_api_key", customKey.trim());
    } else {
      localStorage.removeItem("ff_gemini_api_key");
    }
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowKeyModal(false);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([
      {
        id: String(Date.now()),
        sender: "assistant",
        text: `Chat reset. I am ready with full site knowledge! Ask anything about our tensile structures, prices, or materials.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#0d1f2d] text-[#e8ded2] rounded-full shadow-2xl border border-[#2a3b4c] hover:border-[#6a9080] transition-all group"
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
            aria-label="Open AI Assistant"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6a9080] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6a9080]"></span>
            </span>
            <Sparkles size={18} className="text-[#6a9080] group-hover:rotate-12 transition-transform" />
            <span className="font-medium text-sm tracking-wide">Tensile AI</span>
          </motion.button>
        )}
      </div>

      {/* Assistant Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#0c1821] text-[#f2efe9] rounded-2xl shadow-2xl border border-[#1f2f3e] flex flex-col overflow-hidden"
            style={{
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7)",
            }}
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-[#112233] border-b border-[#1f2f3e] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1b3044] border border-[#2b4257] flex items-center justify-center text-[#6a9080]">
                  <Bot size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold tracking-wide">Tensile AI Expert</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#6a9080]/20 text-[#86b29f] font-mono">
                      Gemini
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Full site indexed A to Z
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <button
                  onClick={() => setShowKeyModal(true)}
                  title="Configure Gemini API Key"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-[#1c2e40] transition"
                >
                  <Key size={16} />
                </button>
                <button
                  onClick={clearChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-[#1c2e40] transition"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-[#1c2e40] transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-[#0e1c27] border-b border-[#1b2b3a] flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#162736] hover:bg-[#20364a] text-gray-300 hover:text-white border border-[#223548] transition text-[11px]"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-[#1a2d3f] border border-[#2b4157] flex items-center justify-center text-[#6a9080] shrink-0 mt-0.5">
                      <Sparkles size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-[13px] ${
                      m.sender === "user"
                        ? "bg-[#6a9080] text-black font-medium rounded-tr-none"
                        : "bg-[#142332] text-gray-200 border border-[#1f3347] rounded-tl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        m.sender === "user" ? "text-black/60" : "text-gray-500"
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>

                  {m.sender === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-[#6a9080]/30 border border-[#6a9080]/50 flex items-center justify-center text-[#6a9080] shrink-0 mt-0.5">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-[#1a2d3f] border border-[#2b4157] flex items-center justify-center text-[#6a9080] shrink-0">
                    <Sparkles size={14} className="animate-spin" />
                  </div>
                  <div className="bg-[#142332] border border-[#1f3347] rounded-2xl rounded-tl-none px-4 py-3 text-xs text-gray-400 flex items-center gap-2">
                    <span>Consulting structural knowledge...</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6a9080] animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6a9080] animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6a9080] animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#112233] border-t border-[#1f2f3e] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in Urdu, Roman Urdu, or English..."
                className="flex-1 bg-[#0c1821] text-[#f2efe9] text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#22364a] focus:outline-none focus:border-[#6a9080] transition placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-[#6a9080] hover:bg-[#7ba392] disabled:opacity-40 disabled:cursor-not-allowed text-black flex items-center justify-center transition shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gemini API Key Modal */}
      <AnimatePresence>
        {showKeyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#101e2c] border border-[#23384e] text-white p-5 rounded-2xl max-w-sm w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Key size={16} className="text-[#6a9080]" />
                  Google Gemini API Key
                </h4>
                <button onClick={() => setShowKeyModal(false)} className="text-gray-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Add your free API key from{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#6a9080] underline"
                >
                  Google AI Studio
                </a>{" "}
                for full live Gemini 2.0/1.5 generation. (Without a key, the assistant runs on our built-in architectural knowledge engine).
              </p>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                className="w-full bg-[#0a141e] border border-[#22374b] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#6a9080]"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveKey}
                  className="px-3.5 py-1.5 text-xs bg-[#6a9080] text-black font-semibold rounded-lg flex items-center gap-1.5 hover:bg-[#7aa291] transition"
                >
                  {keySaved ? <Check size={14} /> : null}
                  {keySaved ? "Saved!" : "Save Key"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
