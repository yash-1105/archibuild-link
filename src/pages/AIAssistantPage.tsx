import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aiResponses } from "@/data/mockData";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

const AIAssistantPage = () => {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "ai", content: "👋 Hi Sarah! I'm your BYLD AI Assistant. I can help you with project insights, task summaries, budget analysis, and more. Try one of the suggested prompts below or ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Show project status",
    "What tasks are pending?",
    "Any delays?",
    "Budget summary",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    const userMsg: Message = { id: `u${Date.now()}`, role: "user", content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = aiResponses[msg] || `I've analyzed your request: "${msg}"\n\nBased on the current data:\n\n• 4 active projects in your portfolio\n• Overall completion rate: 54%\n• Budget utilization: 42%\n\nWould you like me to dive deeper into any specific area?`;
      setMessages(prev => [...prev, { id: `a${Date.now()}`, role: "ai", content: response }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="h-14 border-b border-border flex items-center px-6 shrink-0 bg-card">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg byld-gradient flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-foreground text-sm">AI Assistant</h2>
            <p className="text-[10px] text-success flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success" /> Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === "ai" ? "byld-gradient" : "bg-secondary"}`}>
              {msg.role === "ai" ? <Bot className="h-4 w-4 text-primary-foreground" /> : <User className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className={`max-w-[70%] rounded-xl px-4 py-3 ${msg.role === "user" ? "byld-gradient text-primary-foreground rounded-tr-sm" : "bg-card border border-border text-foreground rounded-tl-sm"}`}>
              <div className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg byld-gradient flex items-center justify-center shrink-0"><Bot className="h-4 w-4 text-primary-foreground" /></div>
            <div className="bg-card border border-border rounded-xl rounded-tl-sm px-4 py-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 2 && (
        <div className="px-6 pb-2 bg-background">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="h-3 w-3 text-warning" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Suggested</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map(prompt => (
              <button key={prompt} onClick={() => handleSend(prompt)} className="px-3 py-1.5 rounded-lg bg-card border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">{prompt}</button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <Input placeholder="Ask anything about your projects..." className="flex-1 h-11 bg-secondary/50 border-border text-sm rounded-xl" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} />
          <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="byld-gradient text-primary-foreground border-0 h-11 w-11 p-0 rounded-xl shadow-md">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
