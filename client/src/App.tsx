import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Upload from "@/pages/Upload";
import FinancialProfile from "@/pages/FinancialProfile";
import Advisor from "@/pages/Advisor";
import Pricing from "@/pages/Pricing";
import Pitch from "@/pages/Pitch";
import PitchAccessAdmin from "@/pages/PitchAccessAdmin";
import Privacy from "@/pages/Privacy";
import PrivacySettings from "@/pages/PrivacySettings";
import Terms from "@/pages/Terms";
import Security from "@/pages/Security";
import Settings from "@/pages/Settings";
import Checkout from "@/pages/checkout";
import Subscribe from "@/pages/subscribe";
import PaymentSuccess from "@/pages/payment-success";
import SubscriptionSuccess from "@/pages/subscription-success";
import NotFound from "@/pages/not-found";

// Public routes that don't require auth check
const PUBLIC_ROUTES = ["/", "/pricing", "/privacy", "/security", "/terms", "/pitch"];

function Router() {
  const [location] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const isPublicRoute = PUBLIC_ROUTES.includes(location);

  // For public routes, render immediately without waiting for auth
  if (isPublicRoute) {
    return (
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/security" component={Security} />
        <Route path="/terms" component={Terms} />
        <Route path="/pitch" component={Pitch} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  // For authenticated routes, wait for auth check (but with timeout)
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/security" component={Security} />
          <Route path="/terms" component={Terms} />
          {/* Pitch deck is token-protected, not public */}
          <Route path="/pitch" component={Pitch} />
        </>
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/upload" component={Upload} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={FinancialProfile} />
          <Route path="/advisor" component={Advisor} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/pitch" component={Pitch} />
          <Route path="/pitch-access" component={PitchAccessAdmin} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/subscribe" component={Subscribe} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route path="/subscription-success" component={SubscriptionSuccess} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/privacy-settings" component={PrivacySettings} />
          <Route path="/security" component={Security} />
          <Route path="/settings" component={Settings} />
          <Route path="/terms" component={Terms} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthenticatedApp() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b border-border">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppContent() {
  const [location] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const isPublicRoute = PUBLIC_ROUTES.includes(location);

  // For public routes, render immediately without waiting for auth
  if (isPublicRoute) {
    return <Router />;
  }

  // For authenticated routes, show spinner while checking auth (max 3s timeout handled in Router)
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return isAuthenticated ? <AuthenticatedApp /> : <Router />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
