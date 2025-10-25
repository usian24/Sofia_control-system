import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Key, Copy, Eye, EyeOff, Plus, Trash2, RefreshCw, AlertCircle } from "lucide-react";
import { Switch } from "./ui/switch";
import { useLanguage } from "../lib/LanguageContext";

export function ApiKeysPage() {
  const [showKey, setShowKey] = useState<{ [key: number]: boolean }>({});
  const { t } = useLanguage();

  const apiKeys = [
    {
      id: 1,
      name: t.apiKeys.productionApiKey,
      key: "clave_secreta_no_revelar",
      created: "Oct 15, 2025",
      lastUsed: `2 ${t.overview.timeAgo.hoursAgo}`,
      status: "active",
      requests: "145.2K",
    },
    {
      id: 2,
      name: t.apiKeys.developmentApiKey,
      key: "clave_desarrollo_no_revelar",
      created: "Oct 10, 2025",
      lastUsed: `5 ${t.overview.timeAgo.minutesAgo}`,
      status: "active",
      requests: "23.8K",
    },
    {
      id: 3,
      name: t.apiKeys.stagingApiKey,
      key: "clave_pruebas_no_revelar",
      created: "Oct 1, 2025",
      lastUsed: t.apiKeys.never,
      status: "inactive",
      requests: "0",
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleKeyVisibility = (id: number) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl text-foreground">{t.apiKeys.title}</h2>
          <p className="text-muted-foreground mt-1">
            {t.apiKeys.subtitle}
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          {t.apiKeys.createNewKey}
        </Button>
      </div>

      {/* Warning Banner */}
      <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-foreground">{t.apiKeys.keepKeysSecure}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {t.apiKeys.securityWarning}
          </p>
        </div>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id} className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground">{apiKey.name}</h3>
                    <p className="text-sm text-muted-foreground">{t.apiKeys.created} {apiKey.created}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      apiKey.status === "active"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                    }
                  >
                    {t.apiKeys.status[apiKey.status as keyof typeof t.apiKeys.status]}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* API Key */}
              <div className="space-y-2">
                <Label>{t.apiKeys.apiKey}</Label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={showKey[apiKey.id] ? apiKey.key : "••••••••••••••••••••••••••••••••"}
                      readOnly
                      className="pr-10 font-mono text-sm"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="gap-2"
                  >
                    {showKey[apiKey.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {t.apiKeys.copy}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    {t.apiKeys.rotate}
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">{t.apiKeys.totalRequests}</p>
                  <p className="text-sm text-foreground mt-1">{apiKey.requests}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t.apiKeys.lastUsed}</p>
                  <p className="text-sm text-foreground mt-1">{apiKey.lastUsed}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t.apiKeys.rateLimit}</p>
                  <p className="text-sm text-foreground mt-1">1000{t.apiKeys.perMin}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* API Configuration */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">{t.apiKeys.apiConfiguration}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="base-url">{t.apiKeys.baseUrl}</Label>
              <Input
                id="base-url"
                value="https://api.sofia.ai/v1"
                readOnly
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-url">{t.apiKeys.webhookUrl}</Label>
              <Input
                id="webhook-url"
                placeholder={t.apiKeys.webhookPlaceholder}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="text-sm text-foreground">{t.apiKeys.enableWebhooks}</p>
              <p className="text-xs text-muted-foreground">{t.apiKeys.receiveNotifications}</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="text-sm text-foreground">{t.apiKeys.ipAllowlist}</p>
              <p className="text-xs text-muted-foreground">{t.apiKeys.restrictApiAccess}</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="text-sm text-foreground">{t.apiKeys.corsConfiguration}</p>
              <p className="text-xs text-muted-foreground">{t.apiKeys.enableCrossOrigin}</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Documentation Link */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-foreground">{t.apiKeys.apiDocumentation}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t.apiKeys.apiDocDesc}
            </p>
            <Button variant="outline" className="mt-4">
              {t.apiKeys.viewDocumentation}
            </Button>
          </div>
          <Key className="w-12 h-12 text-purple-600 dark:text-purple-400 opacity-50" />
        </div>
      </Card>

      {/* Rate Limits */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">{t.apiKeys.rateLimits}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="text-sm text-foreground">{t.apiKeys.standardPlan}</p>
              <p className="text-xs text-muted-foreground">{t.apiKeys.currentPlanLimits}</p>
            </div>
            <Badge>{t.apiKeys.status.active}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{t.apiKeys.requestsPerMinute}</p>
              <p className="text-2xl text-foreground mt-1">1,000</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.apiKeys.requestsPerDay}</p>
              <p className="text-2xl text-foreground mt-1">100,000</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.apiKeys.concurrentConnections}</p>
              <p className="text-2xl text-foreground mt-1">50</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
