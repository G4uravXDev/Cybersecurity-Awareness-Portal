import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Shield,
  MessageCircle,
} from "lucide-react";
import { geminiAI, ChatMessage } from "@/lib/geminiApi";

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickResponses, setShowQuickResponses] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content: `👋 Hello! I'm **CyberSafe AI**, your cybersecurity assistant.

I'm here to help you with:
• 🛡️ **Security threats** and protection strategies
• 📚 **Learning** cybersecurity concepts
• 🔍 **Incident response** guidance
• 💡 **Best practices** and recommendations

What cybersecurity topic would you like to explore today?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    setInputMessage("");
    setShowQuickResponses(false);
    setIsLoading(true);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const aiResponse = await geminiAI.sendMessage(textToSend);

      // Add AI response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `❌ I apologize, but I'm experiencing technical difficulties. Please try again in a moment.

In the meantime, you can:
• Check our **Learning Center** for cybersecurity courses
• Review **Threat Intelligence** for latest security updates
• Browse our **News Center** for cybersecurity articles`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowQuickResponses(true);
    geminiAI.clearHistory();
  };

  const formatMessage = (content: string) => {
    // Process markdown formatting into rich, legible components
    const lines = content.split("\n");
    return (
      <div className="space-y-1">
        {lines.map((line, index) => {
          const trimmed = line.trim();

          // Horizontal rule
          if (trimmed === "---") {
            return <hr key={index} className="my-2 border-border/60" />;
          }

          // Headers
          if (line.startsWith("### ")) {
            return (
              <h4 key={index} className="text-xs font-bold text-foreground mt-2 mb-1 uppercase tracking-wider text-primary">
                {line.replace(/^###\s+/, "")}
              </h4>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <h3 key={index} className="text-sm font-bold text-foreground mt-2.5 mb-1 text-primary">
                {line.replace(/^##\s+/, "")}
              </h3>
            );
          }

          // HTML formatted line for bold, italic, and inline code
          const formattedLine = line
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic opacity-90">$1</em>')
            .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted/80 text-primary font-mono text-[11px]">$1</code>');

          // Bullet points
          if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("* ")) {
            const bulletContent = formattedLine.replace(/^[•\-\*]\s+/, "");
            return (
              <div key={index} className="flex items-start gap-1.5 pl-1 my-0.5">
                <span className="text-primary mt-1 text-[10px] leading-none">•</span>
                <span className="flex-1" dangerouslySetInnerHTML={{ __html: bulletContent }} />
              </div>
            );
          }

          // Numbered lists
          const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
          if (numberedMatch) {
            const num = numberedMatch[1];
            const textContent = numberedMatch[2]
              .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em class="italic opacity-90">$1</em>')
              .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted/80 text-primary font-mono text-[11px]">$1</code>');
            return (
              <div key={index} className="flex items-start gap-1.5 pl-1 my-0.5">
                <span className="text-primary font-semibold text-[11px] min-w-[14px]">{num}.</span>
                <span className="flex-1" dangerouslySetInnerHTML={{ __html: textContent }} />
              </div>
            );
          }

          // Empty line
          if (!trimmed) {
            return <div key={index} className="h-1" />;
          }

          // Standard paragraph
          return (
            <p key={index} className="my-0.5 leading-relaxed">
              <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
            </p>
          );
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      <Card className="w-full max-w-md h-[580px] pointer-events-auto shadow-2xl border-border/80 bg-card flex flex-col overflow-hidden animate-scale-in">
        <CardHeader className="pb-3 pt-3 px-4 bg-muted/30 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">CyberSafe AI</CardTitle>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  SOC Analyst Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 p-0 rounded-lg text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`flex-1 max-w-[80%] ${
                      message.role === "user" ? "text-right" : ""
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl text-xs leading-relaxed ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted/40 border border-border/60 text-foreground"
                      }`}
                    >
                      <div className="text-xs">
                        {formatMessage(message.content)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Responses */}
              {showQuickResponses && messages.length <= 1 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    💡 Try asking about:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {geminiAI.getQuickResponses().map((response, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start text-left h-auto py-2 px-3"
                        onClick={() => handleSendMessage(response.question)}
                      >
                        <span className="mr-2">{response.icon}</span>
                        <span className="text-xs">{response.question}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">
                          CyberSafe AI is thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cybersecurity..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                <Shield className="h-3 w-3 inline mr-1" />
                Secure AI-powered assistance
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-xs"
              >
                Clear Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
