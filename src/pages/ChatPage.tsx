import { useState } from "react";
import { Send, Hash, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatChannels, chatMessages } from "@/data/mockData";

const ChatPage = () => {
  const [activeChannel, setActiveChannel] = useState("ch1");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);

  const channelMessages = messages.filter(m => m.channel === activeChannel);
  const currentChannel = chatChannels.find(c => c.id === activeChannel);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      sender: "Sarah Chen",
      avatar: "SC",
      message: message.trim(),
      timestamp: new Date().toISOString(),
      channel: activeChannel,
    };
    setMessages(prev => [...prev, newMsg]);
    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Channel List */}
      <div className="w-64 border-r border-border/50 bg-card/50 flex flex-col shrink-0 hidden md:flex">
        <div className="p-3 border-b border-border/30">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input placeholder="Search channels..." className="pl-8 h-8 bg-secondary/50 border-border/50 text-xs" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {chatChannels.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                activeChannel === ch.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Hash className="h-3.5 w-3.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{ch.name}</p>
                {ch.lastMessage && <p className="text-[10px] text-muted-foreground truncate">{ch.lastMessage}</p>}
              </div>
              {ch.unread > 0 && (
                <span className="w-5 h-5 rounded-full byld-gradient flex items-center justify-center text-[9px] font-bold text-primary-foreground shrink-0">
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-12 border-b border-border/50 flex items-center px-4 shrink-0">
          <Hash className="h-4 w-4 text-muted-foreground mr-2" />
          <h2 className="font-semibold text-foreground text-sm">{currentChannel?.name}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {channelMessages.map(msg => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === "Sarah Chen" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${msg.sender === "Sarah Chen" ? "byld-gradient text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {msg.avatar}
              </div>
              <div className={`max-w-[70%] ${msg.sender === "Sarah Chen" ? "text-right" : ""}`}>
                <div className="flex items-center gap-2 mb-1" style={{ justifyContent: msg.sender === "Sarah Chen" ? "flex-end" : "flex-start" }}>
                  <span className="text-xs font-medium text-foreground">{msg.sender}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className={`rounded-xl px-4 py-2.5 text-sm ${
                  msg.sender === "Sarah Chen"
                    ? "byld-gradient text-primary-foreground rounded-tr-sm"
                    : "bg-secondary text-foreground rounded-tl-sm"
                }`}>
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Input
              placeholder={`Message #${currentChannel?.name}...`}
              className="flex-1 h-10 bg-secondary/50 border-border/50 text-sm rounded-xl"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="byld-gradient text-primary-foreground border-0 h-10 w-10 p-0 rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
