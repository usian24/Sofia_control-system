import { useState } from "react";
import { LanguageProvider, useLanguage } from "./lib/LanguageContext";
import { DashboardLayout } from "./components/DashboardLayout";
import { OverviewPage } from "./components/OverviewPage";
import { AgentConfigPage } from "./components/AgentConfigPage";
import { ConversationsPage } from "./components/ConversationsPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { ApiKeysPage } from "./components/ApiKeysPage";
import { TagsPage } from "./components/TagsPage";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("overview");
  const { t } = useLanguage();

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <OverviewPage />;
      case "agent":
        return <AgentConfigPage />;
      case "conversations":
        return <ConversationsPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "api":
        return <ApiKeysPage />;
      case "tags":
        return <TagsPage />;
      case "settings":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl text-foreground">{t.settings.title}</h2>
            <p className="text-muted-foreground mt-2">{t.settings.subtitle}</p>
          </div>
        );
      case "docs":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl text-foreground">{t.documentation.title}</h2>
            <p className="text-muted-foreground mt-2">{t.documentation.subtitle}</p>
          </div>
        );
      default:
        return <OverviewPage />;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
