import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  BellOff,
  Bell,
  ShieldCheck,
  Calendar,
  Clock,
  TrendingUp,
  RefreshCw,
  XCircle,
  Settings,
  Shield
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface SystemStatus {
  autopilotActive: boolean;
  lastSync: string;
  nextPayment: string;
  criticalAlerts: number;
  monthlyProgress: number;
  quietMode: boolean;
  alertPreferences: {
    onlyMissedPayments: boolean;
    onlyEmergencies: boolean;
    monthlyReportOnly: boolean;
  };
}

export function SetAndForgetStatus() {
  const { toast } = useToast();
  const [quietMode, setQuietMode] = useState(true);
  const [alertSettings, setAlertSettings] = useState({
    onlyMissedPayments: true,
    onlyEmergencies: true,
    monthlyReportOnly: true,
  });

  // Fetch system status
  const { data: status } = useQuery<SystemStatus>({
    queryKey: ["/api/system-status"],
    queryFn: async () => {
      // In production, this would fetch from API
      return {
        autopilotActive: true,
        lastSync: new Date().toISOString(),
        nextPayment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        criticalAlerts: 0,
        monthlyProgress: 73,
        quietMode: quietMode,
        alertPreferences: alertSettings,
      };
    },
  });

  const updateAlertSettings = useMutation({
    mutationFn: async (settings: typeof alertSettings) => {
      // In production, save to backend
      const response = await apiRequest("POST", "/api/alert-preferences", settings);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Alert preferences updated",
        description: "Your notification settings have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/system-status"] });
    },
  });

  const handleAlertToggle = (key: keyof typeof alertSettings) => {
    const newSettings = { ...alertSettings, [key]: !alertSettings[key] };
    setAlertSettings(newSettings);
    updateAlertSettings.mutate(newSettings);
  };

  const criticalAlerts: Array<{ id: number; message: string; severity: string }> = [
    // Only show if there are actual critical issues
    // { id: 1, message: "Missed payment to Chase Card", severity: "critical" },
  ];

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Autopilot Status
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Your debt payoff system is running automatically
              </p>
            </div>
            <Badge variant="default" className="gap-1">
              <CheckCircle className="w-3 h-3" />
              All Systems Go
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-chart-2 animate-pulse" />
                <span className="font-semibold">Running</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Last Check</p>
              <p className="font-semibold">2 hours ago</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Next Payment</p>
              <p className="font-semibold">In 7 days</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">This Month</p>
              <p className="font-semibold text-chart-2">On Track</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Monthly Progress</span>
              <span className="font-semibold">{status?.monthlyProgress || 0}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-chart-2 transition-all"
                style={{ width: `${status?.monthlyProgress || 0}%` }}
              />
            </div>
          </div>

          {/* Key Message */}
          <Alert className="mt-4 border-primary/20">
            <ShieldCheck className="w-4 h-4" />
            <AlertDescription>
              <strong>No action needed.</strong> Your payments are scheduled, your plan is optimized, 
              and everything is running smoothly. We'll only notify you if something requires your attention.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Alert Preferences - Anti-Needy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Control when we interrupt your life (hint: rarely)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quiet Mode Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <BellOff className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Quiet Mode</p>
                <p className="text-sm text-muted-foreground">
                  Only critical alerts - no daily check-ins or nudges
                </p>
              </div>
            </div>
            <Switch
              checked={quietMode}
              onCheckedChange={setQuietMode}
            />
          </div>

          {/* Alert Types */}
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm">Only alert for missed payments</span>
              </div>
              <Switch
                checked={alertSettings.onlyMissedPayments}
                onCheckedChange={() => handleAlertToggle('onlyMissedPayments')}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm">Only emergencies (bank errors, etc)</span>
              </div>
              <Switch
                checked={alertSettings.onlyEmergencies}
                onCheckedChange={() => handleAlertToggle('onlyEmergencies')}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm">Monthly summary email only</span>
              </div>
              <Switch
                checked={alertSettings.monthlyReportOnly}
                onCheckedChange={() => handleAlertToggle('monthlyReportOnly')}
              />
            </div>
          </div>

          <Alert>
            <Bell className="w-4 h-4" />
            <AlertDescription>
              Unlike apps that constantly seek your attention, we respect your time. 
              Your money works for you, not the other way around.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Critical Alerts Only (if any) */}
      {criticalAlerts.length > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Critical Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            {criticalAlerts.map((alert) => (
              <Alert key={alert.id} variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* System Health Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2" />
                Bank Connections
              </span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2" />
                Autopay Schedules
              </span>
              <Badge variant="secondary">Set</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2" />
                Document Analysis
              </span>
              <Badge variant="secondary">Current</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2" />
                Avalanche Optimization
              </span>
              <Badge variant="secondary">Optimal</Badge>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Last full system check: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="mt-2">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => window.location.href = "/privacy-settings"}
              >
                <Shield className="w-4 h-4 mr-2" />
                Privacy Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Philosophy Card */}
      <Card className="bg-muted/30">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">The Anti-Needy Approach</h3>
              <p className="text-sm text-muted-foreground">
                Your financial apps shouldn't act like needy relationships. We built this system 
                to work quietly in the background - like a good investment account. Set it once, 
                check it quarterly, and live your life while your debts automatically disappear.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                No daily login streaks. No constant notifications. No guilt trips. 
                Just steady, automatic progress toward your debt freedom date.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}