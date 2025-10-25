import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Clock, MessageSquare, Smile } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { useLanguage } from "../lib/LanguageContext";

export function AnalyticsPage() {
  const { t } = useLanguage();

  const metrics = [
    {
      title: t.analytics.avgSessionDuration,
      value: "4.2m",
      change: `+15% ${t.analytics.fromLastWeek}`,
      icon: Clock,
      trend: "up" as const,
    },
    {
      title: t.analytics.messagesPerSession,
      value: "8.5",
      change: `+5% ${t.analytics.fromLastWeek}`,
      icon: MessageSquare,
      trend: "up" as const,
    },
    {
      title: t.analytics.userSatisfaction,
      value: "4.6/5",
      change: `+0.3 ${t.analytics.fromLastWeek}`,
      icon: Smile,
      trend: "up" as const,
    },
    {
      title: t.analytics.resolutionRate,
      value: "87%",
      change: `+3% ${t.analytics.fromLastWeek}`,
      icon: TrendingUp,
      trend: "up" as const,
    },
  ];

  const conversationsByHour = [
    { hour: "00:00", conversations: 45 },
    { hour: "03:00", conversations: 23 },
    { hour: "06:00", conversations: 67 },
    { hour: "09:00", conversations: 189 },
    { hour: "12:00", conversations: 234 },
    { hour: "15:00", conversations: 198 },
    { hour: "18:00", conversations: 156 },
    { hour: "21:00", conversations: 89 },
  ];

  const intentDistribution = [
    { name: t.analytics.intents.accountSupport, value: 35, color: "#8b5cf6" },
    { name: t.analytics.intents.productInfo, value: 28, color: "#3b82f6" },
    { name: t.analytics.intents.billing, value: 18, color: "#10b981" },
    { name: t.analytics.intents.technicalIssue, value: 12, color: "#f59e0b" },
    { name: t.analytics.intents.other, value: 7, color: "#6b7280" },
  ];

  const sentimentTrend = [
    { date: "Oct 17", [t.analytics.positive]: 72, [t.analytics.neutral]: 23, [t.analytics.negative]: 5 },
    { date: "Oct 18", [t.analytics.positive]: 68, [t.analytics.neutral]: 26, [t.analytics.negative]: 6 },
    { date: "Oct 19", [t.analytics.positive]: 75, [t.analytics.neutral]: 20, [t.analytics.negative]: 5 },
    { date: "Oct 20", [t.analytics.positive]: 71, [t.analytics.neutral]: 24, [t.analytics.negative]: 5 },
    { date: "Oct 21", [t.analytics.positive]: 78, [t.analytics.neutral]: 18, [t.analytics.negative]: 4 },
    { date: "Oct 22", [t.analytics.positive]: 74, [t.analytics.neutral]: 21, [t.analytics.negative]: 5 },
    { date: "Oct 23", [t.analytics.positive]: 76, [t.analytics.neutral]: 20, [t.analytics.negative]: 4 },
  ];

  const responseTimeData = [
    { range: "0-1s", count: 450 },
    { range: "1-2s", count: 320 },
    { range: "2-3s", count: 180 },
    { range: "3-5s", count: 90 },
    { range: "5s+", count: 45 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground">{t.analytics.title}</h2>
          <p className="text-muted-foreground mt-1">{t.analytics.subtitle}</p>
        </div>
        <Select defaultValue="7days">
          <SelectTrigger className="w-48">
            <SelectValue placeholder={t.analytics.selectPeriod} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">{t.analytics.today}</SelectItem>
            <SelectItem value="7days">{t.analytics.last7Days}</SelectItem>
            <SelectItem value="30days">{t.analytics.last30Days}</SelectItem>
            <SelectItem value="90days">{t.analytics.last90Days}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversations by Hour */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{t.analytics.conversationsByHour}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversationsByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
              <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="conversations" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Intent Distribution */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{t.analytics.conversationIntents}</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={intentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {intentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Trend */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{t.analytics.sentimentAnalysis}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sentimentTrend}>
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
              <Legend />
              <Line type="monotone" dataKey={t.analytics.positive} stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey={t.analytics.neutral} stroke="#6b7280" strokeWidth={2} />
              <Line type="monotone" dataKey={t.analytics.negative} stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Response Time Distribution */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{t.analytics.responseTimeDistribution}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseTimeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} />
              <YAxis type="category" dataKey="range" stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Performing Metrics */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">{t.analytics.performanceInsights}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm text-muted-foreground">{t.analytics.mostActiveHours}</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">12:00 PM - 1:00 PM</span>
                <span className="text-sm text-muted-foreground">234 {t.analytics.conv}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">3:00 PM - 4:00 PM</span>
                <span className="text-sm text-muted-foreground">198 {t.analytics.conv}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">9:00 AM - 10:00 AM</span>
                <span className="text-sm text-muted-foreground">189 {t.analytics.conv}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm text-muted-foreground">{t.analytics.commonTopics}</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t.analytics.topics.accountSettings}</span>
                <span className="text-sm text-muted-foreground">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t.analytics.topics.productInformation}</span>
                <span className="text-sm text-muted-foreground">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t.analytics.topics.billingQuestions}</span>
                <span className="text-sm text-muted-foreground">18%</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm text-muted-foreground">{t.analytics.quickStats}</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t.analytics.avgFirstResponse}</span>
                <span className="text-sm text-muted-foreground">1.2s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t.analytics.peakConcurrency}</span>
                <span className="text-sm text-muted-foreground">45 {t.analytics.users}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t.analytics.escalationRate}</span>
                <span className="text-sm text-muted-foreground">13%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
