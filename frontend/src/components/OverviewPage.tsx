import { MessageSquare, Users, Clock, TrendingUp, Activity } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "../lib/LanguageContext";

export function OverviewPage() {
  const { t } = useLanguage();

  const metrics = [
    {
      title: t.overview.totalConversations,
      value: "12,458",
      change: `+12.5% ${t.overview.fromLastMonth}`,
      icon: MessageSquare,
      trend: "up" as const,
    },
    {
      title: t.overview.activeUsers,
      value: "3,842",
      change: `+8.2% ${t.overview.fromLastMonth}`,
      icon: Users,
      trend: "up" as const,
    },
    {
      title: t.overview.avgResponseTime,
      value: "1.2s",
      change: `-0.3s ${t.overview.fromLastMonth}`,
      icon: Clock,
      trend: "up" as const,
    },
    {
      title: t.overview.successRate,
      value: "94.8%",
      change: `+2.1% ${t.overview.fromLastMonth}`,
      icon: TrendingUp,
      trend: "up" as const,
    },
  ];

  const conversationData = [
    { date: "Oct 17", conversations: 420 },
    { date: "Oct 18", conversations: 389 },
    { date: "Oct 19", conversations: 512 },
    { date: "Oct 20", conversations: 478 },
    { date: "Oct 21", conversations: 595 },
    { date: "Oct 22", conversations: 623 },
    { date: "Oct 23", conversations: 587 },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "conversation",
      message: t.overview.newConversation,
      user: "user_8x2k9",
      time: `2 ${t.overview.timeAgo.minutesAgo}`,
      status: "success",
    },
    {
      id: 2,
      type: "config",
      message: t.overview.agentConfigUpdated,
      user: "admin@sofia.ai",
      time: `15 ${t.overview.timeAgo.minutesAgo}`,
      status: "info",
    },
    {
      id: 3,
      type: "conversation",
      message: t.overview.conversationCompleted,
      user: "user_3m7n1",
      time: `23 ${t.overview.timeAgo.minutesAgo}`,
      status: "success",
    },
    {
      id: 4,
      type: "error",
      message: t.overview.apiRateLimit,
      user: t.overview.system,
      time: `1 ${t.overview.timeAgo.hourAgo}`,
      status: "warning",
    },
    {
      id: 5,
      type: "conversation",
      message: t.overview.newConversation,
      user: "user_5p2w8",
      time: `1 ${t.overview.timeAgo.hourAgo}`,
      status: "success",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversation Trends */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-foreground">{t.overview.conversationTrends}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t.overview.last7Days}</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={conversationData}>
              <defs>
                <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="conversations"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorConversations)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-foreground">{t.overview.recentActivity}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.overview.latestEvents}</p>
            </div>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  activity.status === "success" ? "bg-green-500" :
                  activity.status === "warning" ? "bg-yellow-500" :
                  activity.status === "info" ? "bg-blue-500" : "bg-red-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* System Status */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">{t.overview.systemStatus}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t.overview.agentStatus}</span>
              <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">{t.overview.online}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t.overview.apiStatus}</span>
              <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">{t.overview.operational}</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t.overview.database}</span>
              <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">{t.overview.connected}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t.overview.queueStatus}</span>
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20">{t.overview.processing}</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t.overview.uptime}</span>
              <span className="text-sm text-foreground">99.98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t.overview.lastDeploy}</span>
              <span className="text-sm text-foreground">2h</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
