import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Sparkles } from "lucide-react";
import { Chatbot } from "./Chatbot";

interface ChatButtonProps {
  className?: string;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ className = "" }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setShowTooltip(false);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
        {/* Tooltip */}
        {showTooltip && !isChatOpen && (
          <div className="absolute bottom-16 right-0 mb-2 mr-1 animate-fade-up">
            <div className="relative">
              <div className="bg-card text-foreground px-3.5 py-2.5 rounded-xl shadow-xl border border-primary/30 max-w-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <p className="text-xs font-medium text-foreground">
                    Ask CyberSafe AI Assistant
                  </p>
                </div>
                <button
                  type="button"
                  className="h-5 w-5 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowTooltip(false)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Button */}
        <Button
          onClick={handleOpenChat}
          size="lg"
          className={`h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 relative group flex items-center justify-center p-0 border border-primary/40 ${
            isChatOpen ? "scale-95 opacity-80" : ""
          }`}
          disabled={isChatOpen}
        >
          <Bot className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
        </Button>
      </div>

      {/* Chatbot Component */}
      <Chatbot isOpen={isChatOpen} onClose={handleCloseChat} />
    </>
  );
};

export default ChatButton;
