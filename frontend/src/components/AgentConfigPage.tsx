import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Bot, Save, RefreshCw, AlertCircle } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export function AgentConfigPage() {
  const [agentEnabled, setAgentEnabled] = useState(true);
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl text-foreground">{t.agentConfig.title}</h2>
          <p className="text-muted-foreground mt-1">
            {t.agentConfig.subtitle}
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">
          <Bot className="w-3 h-3 mr-1" />
          {t.agentConfig.agentRunning}
        </Badge>
      </div>

      {/* Agent Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-foreground">{t.agentConfig.agentStatusTitle}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t.agentConfig.enableDisableAgent}
            </p>
          </div>
          <Switch checked={agentEnabled} onCheckedChange={setAgentEnabled} />
        </div>
      </Card>

      {/* Basic Configuration */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">{t.agentConfig.basicSettings}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">{t.agentConfig.agentName}</Label>
              <Input id="agent-name" placeholder="Sofía" defaultValue="Sofía" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-version">{t.agentConfig.version}</Label>
              <Input id="agent-version" placeholder="v1.0.0" defaultValue="v1.2.3" disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-description">{t.agentConfig.agentDescription}</Label>
            <Textarea
              id="agent-description"
              placeholder={t.agentConfig.agentDescriptionPlaceholder}
              rows={3}
              defaultValue={t.agentConfig.defaultDescription}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">{t.agentConfig.modelSelection}</Label>
            <Select defaultValue="gpt-4">
              <SelectTrigger id="model">
                <SelectValue placeholder={t.agentConfig.selectModel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4 ({t.agentConfig.recommended})</SelectItem>
                <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="custom">{t.agentConfig.customModel}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Personality & Behavior */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">{t.agentConfig.personalityBehavior}</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-prompt">{t.agentConfig.systemPrompt}</Label>
            <Textarea
              id="system-prompt"
              placeholder={t.agentConfig.systemPromptPlaceholder}
              rows={6}
              defaultValue={t.agentConfig.defaultSystemPrompt}
            />
            <p className="text-xs text-muted-foreground">
              {t.agentConfig.systemPromptDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone">{t.agentConfig.responseTone}</Label>
              <Select defaultValue="professional">
                <SelectTrigger id="tone">
                  <SelectValue placeholder={t.agentConfig.selectTone} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">{t.agentConfig.professional}</SelectItem>
                  <SelectItem value="friendly">{t.agentConfig.friendly}</SelectItem>
                  <SelectItem value="casual">{t.agentConfig.casual}</SelectItem>
                  <SelectItem value="formal">{t.agentConfig.formal}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">{t.agentConfig.primaryLanguage}</Label>
              <Select defaultValue="es">
                <SelectTrigger id="language">
                  <SelectValue placeholder={t.agentConfig.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">{t.agentConfig.spanish}</SelectItem>
                  <SelectItem value="en">{t.agentConfig.english}</SelectItem>
                  <SelectItem value="multi">{t.agentConfig.multilingual}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Parameters */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">{t.agentConfig.advancedParameters}</h3>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">{t.agentConfig.temperature}</Label>
              <span className="text-sm text-muted-foreground">{temperature[0]}</span>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={2}
              step={0.1}
              value={temperature}
              onValueChange={setTemperature}
            />
            <p className="text-xs text-muted-foreground">
              {t.agentConfig.temperatureDescription}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="max-tokens">{t.agentConfig.maxTokens}</Label>
              <span className="text-sm text-muted-foreground">{maxTokens[0]}</span>
            </div>
            <Slider
              id="max-tokens"
              min={256}
              max={4096}
              step={256}
              value={maxTokens}
              onValueChange={setMaxTokens}
            />
            <p className="text-xs text-muted-foreground">
              {t.agentConfig.maxTokensDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeout">{t.agentConfig.responseTimeout}</Label>
              <Input id="timeout" type="number" placeholder="30" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retry">{t.agentConfig.maxRetry}</Label>
              <Input id="retry" type="number" placeholder="3" defaultValue="3" />
            </div>
          </div>
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">{t.agentConfig.featuresCapabilities}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <p className="text-sm text-foreground">{t.agentConfig.contextMemory}</p>
              <p className="text-xs text-muted-foreground">{t.agentConfig.contextMemoryDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <p className="text-sm text-foreground">{t.agentConfig.sentimentAnalysis}</p>
              <p className="text-xs text-muted-foreground">{t.agentConfig.sentimentAnalysisDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <p className="text-sm text-foreground">{t.agentConfig.autoEscalation}</p>
              <p className="text-xs text-muted-foreground">{t.agentConfig.autoEscalationDesc}</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <p className="text-sm text-foreground">{t.agentConfig.multilingualSupport}</p>
              <p className="text-xs text-muted-foreground">{t.agentConfig.multilingualSupportDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          {t.agentConfig.saveConfiguration}
        </Button>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          {t.agentConfig.resetToDefault}
        </Button>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-foreground">{t.agentConfig.configWarningTitle}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {t.agentConfig.configWarningDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
