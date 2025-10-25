import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Tag,
  Plus,
  Search,
  Filter,
  Users,
  TrendingUp,
  MessageSquare,
  Gift,
  Edit,
  Trash2,
  Send,
  Mail,
  Smartphone,
  Bot,
  Eye,
  Target,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from "../lib/LanguageContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { MetricCard } from "./MetricCard";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  score: "high" | "medium" | "low";
  scoreValue: number;
  lastInteraction: string;
  interactions: number;
  hasDiscount?: boolean;
}

export function TagsPage() {
  const { t } = useLanguage();
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showTagDialog, setShowTagDialog] = useState(false);
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);

  const availableTags = [
    { id: "customers", name: t.tags.customers, color: "#10b981" },
    { id: "potential", name: t.tags.potentialCustomers, color: "#3b82f6" },
    { id: "interested", name: t.tags.interested, color: "#8b5cf6" },
    { id: "low-interest", name: t.tags.lowInterest, color: "#6b7280" },
    { id: "high-value", name: t.tags.highValue, color: "#f59e0b" },
    { id: "follow-up", name: t.tags.requiresFollowUp, color: "#ef4444" },
  ];

  const clients: Client[] = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      phone: "+34 612 345 678",
      tags: ["potential", "high-value"],
      score: "high",
      scoreValue: 87,
      lastInteraction: "2h",
      interactions: 24,
      hasDiscount: true,
    },
    {
      id: 2,
      name: "María García",
      email: "maria.garcia@email.com",
      phone: "+34 623 456 789",
      tags: ["customers"],
      score: "high",
      scoreValue: 92,
      lastInteraction: "1d",
      interactions: 45,
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos.rod@email.com",
      phone: "+34 634 567 890",
      tags: ["interested", "follow-up"],
      score: "medium",
      scoreValue: 65,
      lastInteraction: "3d",
      interactions: 12,
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana.martinez@email.com",
      phone: "+34 645 678 901",
      tags: ["potential"],
      score: "medium",
      scoreValue: 58,
      lastInteraction: "5d",
      interactions: 8,
    },
    {
      id: 5,
      name: "David López",
      email: "david.lopez@email.com",
      phone: "+34 656 789 012",
      tags: ["low-interest"],
      score: "low",
      scoreValue: 32,
      lastInteraction: "2w",
      interactions: 3,
    },
  ];

  const metrics = [
    {
      title: t.tags.totalClients,
      value: "156",
      change: `+12 ${t.overview.fromLastWeek}`,
      icon: Users,
      trend: "up" as const,
    },
    {
      title: t.tags.highPotential,
      value: "42",
      change: `+8 ${t.overview.fromLastWeek}`,
      icon: TrendingUp,
      trend: "up" as const,
    },
    {
      title: t.tags.activeDiscounts,
      value: "18",
      change: "6 expiran pronto",
      icon: Gift,
      trend: "neutral" as const,
    },
    {
      title: t.tags.messagesThisMonth,
      value: "234",
      change: `+45 ${t.overview.fromLastMonth}`,
      icon: MessageSquare,
      trend: "up" as const,
    },
  ];

  const getScoreBadgeClass = (score: string) => {
    switch (score) {
      case "high":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "low":
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
      default:
        return "";
    }
  };

  const getScoreLabel = (score: string) => {
    switch (score) {
      case "high":
        return t.tags.scoreHigh;
      case "medium":
        return t.tags.scoreMedium;
      case "low":
        return t.tags.scoreLow;
      default:
        return "";
    }
  };

  const getTagColor = (tagId: string) => {
    const tag = availableTags.find((t) => t.id === tagId);
    return tag?.color || "#6b7280";
  };

  const getTagName = (tagId: string) => {
    const tag = availableTags.find((t) => t.id === tagId);
    return tag?.name || tagId;
  };

  const toggleClientSelection = (clientId: number) => {
    setSelectedClients((prev) =>
      prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId]
    );
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === "all" || client.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl text-foreground">{t.tags.title}</h2>
          <p className="text-muted-foreground mt-1">{t.tags.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showTagDialog} onOpenChange={setShowTagDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Tag className="w-4 h-4" />
                {t.tags.createTag}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.tags.createNewTag}</DialogTitle>
                <DialogDescription>
                  Crea una nueva etiqueta para categorizar tus clientes
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="tag-name">{t.tags.tagName}</Label>
                  <Input id="tag-name" placeholder="Ej: VIP, Nuevo Cliente..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tag-color">{t.tags.tagColor}</Label>
                  <div className="flex gap-2">
                    <Input id="tag-color" type="color" className="w-20 h-10" defaultValue="#8b5cf6" />
                    <Input placeholder="#8b5cf6" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tag-description">{t.tags.tagDescription}</Label>
                  <Textarea id="tag-description" placeholder="Describe esta etiqueta..." rows={3} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowTagDialog(false)}>
                    {t.common.cancel}
                  </Button>
                  <Button onClick={() => setShowTagDialog(false)}>
                    {t.common.save}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            {t.tags.addClient}
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Available Tags */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">{t.tags.assignedTags}</h3>
          <Button variant="ghost" size="sm" className="gap-2">
            <Edit className="w-4 h-4" />
            {t.common.edit}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag.id}
              className="px-3 py-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: `${tag.color}15`,
                color: tag.color,
                border: `1px solid ${tag.color}40`,
              }}
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag.name}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedClients.length > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground">
              <span className="font-medium">{selectedClients.length}</span> {t.tags.recipientsSelected}
            </p>
            <div className="flex gap-2">
              <Dialog open={showDiscountDialog} onOpenChange={setShowDiscountDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Gift className="w-4 h-4" />
                    {t.tags.sendDiscount}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.tags.discountManagement}</DialogTitle>
                    <DialogDescription>
                      Crea y envía un descuento personalizado a los clientes seleccionados
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="discount-code">{t.tags.discountCode}</Label>
                      <Input id="discount-code" placeholder="WELCOME2025" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="discount-percentage">{t.tags.discountPercentage}</Label>
                        <Input id="discount-percentage" type="number" placeholder="15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="discount-valid">{t.tags.discountValidUntil}</Label>
                        <Input id="discount-valid" type="date" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowDiscountDialog(false)}>
                        {t.common.cancel}
                      </Button>
                      <Button onClick={() => setShowDiscountDialog(false)}>
                        {t.tags.applyDiscount}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    {t.tags.sendMessage}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t.tags.sendBulkMessage}</DialogTitle>
                    <DialogDescription>
                      Envía un mensaje personalizado a los {selectedClients.length} clientes seleccionados
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="message-template">{t.tags.messageTemplate}</Label>
                      <Select defaultValue="custom">
                        <SelectTrigger id="message-template">
                          <SelectValue placeholder="Selecciona una plantilla" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom">Mensaje Personalizado</SelectItem>
                          <SelectItem value="welcome">Bienvenida</SelectItem>
                          <SelectItem value="discount">Descuento Especial</SelectItem>
                          <SelectItem value="followup">Seguimiento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message-content">{t.tags.messageContent}</Label>
                      <Textarea
                        id="message-content"
                        placeholder="Escribe tu mensaje aquí..."
                        rows={6}
                        defaultValue="¡Hola! Tenemos una oferta especial para ti..."
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Método de Envío</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" className="gap-2">
                          <Bot className="w-4 h-4" />
                          {t.tags.sendViaAgent}
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Mail className="w-4 h-4" />
                          {t.tags.sendViaEmail}
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Smartphone className="w-4 h-4" />
                          {t.tags.sendViaSMS}
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
                        {t.common.cancel}
                      </Button>
                      <Button onClick={() => setShowMessageDialog(false)}>
                        <Send className="w-4 h-4 mr-2" />
                        {t.tags.sendNow}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={`${t.common.search} ${t.tags.clientManagement.toLowerCase()}...`}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t.tags.filterByTag} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.tags.allClients}</SelectItem>
              {availableTags.map((tag) => (
                <SelectItem key={tag.id} value={tag.id}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="score">
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder={t.tags.sortBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">{t.tags.sortByScore}</SelectItem>
              <SelectItem value="name">{t.tags.sortByName}</SelectItem>
              <SelectItem value="date">{t.tags.sortByDate}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Clients List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <Checkbox
                checked={selectedClients.includes(client.id)}
                onCheckedChange={() => toggleClientSelection(client.id)}
                className="mt-1"
              />
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Client Info */}
                <div className="lg:col-span-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-foreground">{client.name}</h4>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                      <p className="text-sm text-muted-foreground">{client.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="lg:col-span-3">
                  <p className="text-xs text-muted-foreground mb-2">{t.tags.assignedTags}</p>
                  <div className="flex flex-wrap gap-1">
                    {client.tags.map((tagId) => (
                      <Badge
                        key={tagId}
                        className="text-xs px-2 py-0.5"
                        style={{
                          backgroundColor: `${getTagColor(tagId)}15`,
                          color: getTagColor(tagId),
                          border: `1px solid ${getTagColor(tagId)}40`,
                        }}
                      >
                        {getTagName(tagId)}
                      </Badge>
                    ))}
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Score */}
                <div className="lg:col-span-2">
                  <p className="text-xs text-muted-foreground mb-2">{t.tags.purchaseProbability}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getScoreBadgeClass(client.score)}>
                      {getScoreLabel(client.score)}
                    </Badge>
                    <span className="text-sm text-foreground">{client.scoreValue}%</span>
                  </div>
                  {client.hasDiscount && (
                    <div className="flex items-center gap-1 mt-1">
                      <Gift className="w-3 h-3 text-orange-600" />
                      <span className="text-xs text-orange-600">Descuento activo</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="lg:col-span-2">
                  <p className="text-xs text-muted-foreground mb-2">{t.tags.interactions}</p>
                  <div className="space-y-1">
                    <p className="text-sm text-foreground">{client.interactions} contactos</p>
                    <p className="text-xs text-muted-foreground">
                      {t.tags.lastInteraction}: {client.lastInteraction}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:col-span-1 flex lg:flex-col gap-2 justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Scoring Info */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-1">{t.tags.aiScoring}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {t.tags.scoringDescription}
            </p>
            <Button variant="outline">
              {t.tags.recalculateScore}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
