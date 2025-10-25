import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, Filter, Download, MessageSquare, User, Bot, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from "../lib/LanguageContext";

export function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const { t } = useLanguage();

  const conversations = [
    {
      id: 1,
      userId: "user_8x2k9",
      status: "completed",
      messages: 12,
      duration: "5m 32s",
      timestamp: `2 ${t.overview.timeAgo.minutesAgo}`,
      sentiment: "positive",
      preview: "Hello, I need help with my account...",
    },
    {
      id: 2,
      userId: "user_3m7n1",
      status: "completed",
      messages: 8,
      duration: "3m 15s",
      timestamp: `23 ${t.overview.timeAgo.minutesAgo}`,
      sentiment: "neutral",
      preview: "Can you tell me about your services?",
    },
    {
      id: 3,
      userId: "user_5p2w8",
      status: "active",
      messages: 4,
      duration: "1m 20s",
      timestamp: `1 ${t.overview.timeAgo.hourAgo}`,
      sentiment: "neutral",
      preview: "I'm looking for information about...",
    },
    {
      id: 4,
      userId: "user_9k4l2",
      status: "escalated",
      messages: 15,
      duration: "8m 45s",
      timestamp: `2 ${t.overview.timeAgo.hoursAgo}`,
      sentiment: "negative",
      preview: "This is not working as expected...",
    },
    {
      id: 5,
      userId: "user_1w7q3",
      status: "completed",
      messages: 6,
      duration: "2m 50s",
      timestamp: `3 ${t.overview.timeAgo.hoursAgo}`,
      sentiment: "positive",
      preview: "Thank you for your help!",
    },
  ];

  const conversationDetails = {
    id: 1,
    userId: "user_8x2k9",
    status: "completed",
    startTime: "Oct 23, 2025 3:45 PM",
    endTime: "Oct 23, 2025 3:51 PM",
    duration: "5m 32s",
    messages: [
      {
        id: 1,
        sender: "user",
        content: "Hello, I need help with my account settings",
        timestamp: "3:45 PM",
      },
      {
        id: 2,
        sender: "agent",
        content: "Hello! I'd be happy to help you with your account settings. What specific setting would you like to adjust?",
        timestamp: "3:45 PM",
      },
      {
        id: 3,
        sender: "user",
        content: "I want to change my email address",
        timestamp: "3:46 PM",
      },
      {
        id: 4,
        sender: "agent",
        content: "I can guide you through changing your email address. For security purposes, you'll need to verify your current email first. Would you like me to send a verification code to your current email?",
        timestamp: "3:46 PM",
      },
      {
        id: 5,
        sender: "user",
        content: "Yes, please send the code",
        timestamp: "3:47 PM",
      },
      {
        id: 6,
        sender: "agent",
        content: "I've sent a verification code to your current email address. Please enter the code when you receive it.",
        timestamp: "3:47 PM",
      },
    ],
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === "completed") {
      return "bg-green-500/10 text-green-600 dark:text-green-400";
    } else if (status === "active") {
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    } else {
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl text-foreground">{t.conversations.title}</h2>
            <p className="text-muted-foreground mt-1">{t.conversations.subtitle}</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            {t.conversations.exportData}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder={t.conversations.searchConversations} className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t.conversations.filterStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.conversations.allStatus}</SelectItem>
              <SelectItem value="active">{t.conversations.active}</SelectItem>
              <SelectItem value="completed">{t.conversations.completed}</SelectItem>
              <SelectItem value="escalated">{t.conversations.escalated}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conversations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1 space-y-3">
          {conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedConversation === conversation.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{conversation.userId}</p>
                    <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                  </div>
                </div>
                <Badge className={getStatusBadgeClass(conversation.status)}>
                  {t.conversations.status[conversation.status as keyof typeof t.conversations.status]}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate mb-3">{conversation.preview}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {conversation.messages} {t.conversations.messages}
                </span>
                <span>{conversation.duration}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Conversation Details */}
        <Card className="lg:col-span-2 p-6">
          {selectedConversation ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-foreground">{t.conversations.conversationHash}{conversationDetails.id}</h3>
                    <Badge className="bg-green-500/10 text-green-600 dark:text-green-400">
                      {t.conversations.status[conversationDetails.status as keyof typeof t.conversations.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.conversations.user}: {conversationDetails.userId}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  {t.conversations.openFullView}
                </Button>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground">{t.conversations.startTime}</p>
                  <p className="text-sm text-foreground mt-1">{conversationDetails.startTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t.conversations.duration}</p>
                  <p className="text-sm text-foreground mt-1">{conversationDetails.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t.conversations.messages}</p>
                  <p className="text-sm text-foreground mt-1">{conversationDetails.messages.length}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {conversationDetails.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "agent" ? "" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "agent"
                          ? "bg-gradient-to-br from-purple-600 to-blue-600"
                          : "bg-gradient-to-br from-blue-600 to-purple-600"
                      }`}
                    >
                      {message.sender === "agent" ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`flex-1 ${message.sender === "agent" ? "text-left" : "text-right"}`}
                    >
                      <div
                        className={`inline-block max-w-md p-3 rounded-lg ${
                          message.sender === "agent"
                            ? "bg-muted text-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center py-12">
              <div>
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground">{t.conversations.selectConversation}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.conversations.selectConversationDesc}
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
