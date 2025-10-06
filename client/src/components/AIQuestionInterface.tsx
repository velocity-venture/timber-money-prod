import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIQuestionInterface() {
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your expert financial advisor with over 30 years of experience as a CPA, financial planner, and money manager. I've analyzed your financial documents and I'm here to help you understand your credit score, create debt elimination strategies, and build a path to financial freedom. What would you like to know about your finances?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const suggestedQuestions = [
    "What's affecting my credit score and how can I improve it?",
    "Give me a step-by-step plan to improve my credit score",
    "How can I remove negative items from my credit report?",
    "What's the fastest way to boost my credit score?",
    "How can I improve my debt-to-income ratio?",
    "Should I pay off collections or let them fall off?",
    "How do credit utilization ratios affect my score?",
    "Should I close old credit cards or keep them open?",
  ];

  // Load chat history on mount
  const { data: chatHistory } = useQuery<any[]>({
    queryKey: ["/api/chat/history"],
    staleTime: 0,
  });

  useEffect(() => {
    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
      const formattedHistory = chatHistory.map((msg: any, index: number) => ({
        id: `history-${index}`,
        role: msg.role as "user" | "assistant",
        content: msg.content,
        timestamp: new Date(msg.createdAt),
      }));
      setMessages([messages[0], ...formattedHistory]);
    }
  }, [chatHistory]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest("POST", "/api/chat", { message });
      const data = await res.json();
      return data.response;
    },
    onSuccess: (response) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      queryClient.invalidateQueries({ queryKey: ["/api/chat/history"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = () => {
    if (!input.trim() || sendMessageMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = input;
    setInput("");

    sendMessageMutation.mutate(messageToSend);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <Card data-testid="card-ai-chat">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Ask Your AI Financial Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[85%] rounded-lg p-3
                    ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }
                  `}
                  data-testid={`message-${message.id}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {sendMessageMutation.isPending && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg p-3 bg-muted">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Analyzing your financial situation...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => handleQuestionClick(question)}
                className="text-xs"
                data-testid={`suggested-${i}`}
              >
                {question}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about your finances..."
              data-testid="input-question"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              data-testid="button-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
