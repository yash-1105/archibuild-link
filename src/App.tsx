import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import SiteUpdatesPage from "./pages/SiteUpdatesPage";
import DocumentsPage from "./pages/DocumentsPage";
import BudgetPage from "./pages/BudgetPage";
import TeamPage from "./pages/TeamPage";
import ChatPage from "./pages/ChatPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import CareersPage from "./pages/CareersPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import SecurityPage from "./pages/SecurityPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import ContactPage from "./pages/ContactPage";
import ChangelogPage from "./pages/ChangelogPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:id" element={<ProjectWorkspace />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/updates" element={<SiteUpdatesPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/ai" element={<AIAssistantPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
