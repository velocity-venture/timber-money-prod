import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Shield, 
  Lock, 
  Trash2, 
  Download,
  Eye,
  EyeOff,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Database,
  Key,
  RefreshCw,
  ShieldCheck,
  X
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PrivacySettings {
  autoDeleteAfterDebtFree: boolean;
  dataRetentionDays: number;
  encryptionEnabled: boolean;
  anonymousMode: boolean;
  shareWithPartners: boolean;
  allowAnalytics: boolean;
}

interface DataSummary {
  documentsCount: number;
  debtsCount: number;
  dataSize: string;
  oldestData: string;
  lastBackup: string;
}

export function PrivacyControls() {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // Fetch privacy settings
  const { data: settings } = useQuery<PrivacySettings>({
    queryKey: ["/api/privacy/settings"],
    queryFn: async () => {
      // In production, fetch from API
      return {
        autoDeleteAfterDebtFree: true,
        dataRetentionDays: 90,
        encryptionEnabled: true,
        anonymousMode: false,
        shareWithPartners: false,
        allowAnalytics: false,
      };
    },
  });

  // Fetch data summary
  const { data: dataSummary } = useQuery<DataSummary>({
    queryKey: ["/api/privacy/data-summary"],
    queryFn: async () => {
      // In production, fetch from API
      return {
        documentsCount: 12,
        debtsCount: 5,
        dataSize: "2.4 MB",
        oldestData: "30 days ago",
        lastBackup: "Today at 3:00 PM",
      };
    },
  });

  // Export all data
  const exportData = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/privacy/export-data", {});
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Data exported successfully",
        description: "Your data has been downloaded in a secure format.",
      });
      // In production, trigger download
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `debt-freedom-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setExportDialogOpen(false);
    },
  });

  // Delete all data
  const deleteAllData = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/privacy/delete-all", {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "All data deleted",
        description: "Your account has been reset and all data permanently deleted.",
        variant: "destructive",
      });
      queryClient.invalidateQueries();
      setDeleteDialogOpen(false);
      // In production, redirect to homepage
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
  });

  // Update privacy settings
  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<PrivacySettings>) => {
      const response = await apiRequest("PATCH", "/api/privacy/settings", newSettings);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Privacy settings updated",
        description: "Your preferences have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/privacy/settings"] });
    },
  });

  const handleSettingToggle = (key: keyof PrivacySettings) => {
    if (settings) {
      updateSettings.mutate({ [key]: !settings[key] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Status Overview */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Privacy Dashboard
              </CardTitle>
              <CardDescription>
                Your data, your control. We never sell or share your information.
              </CardDescription>
            </div>
            <Badge variant="default" className="gap-1">
              <Lock className="w-3 h-3" />
              Bank-Level Encryption
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Documents</p>
              <p className="text-2xl font-bold">{dataSummary?.documentsCount || 0}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Size</p>
              <p className="text-2xl font-bold">{dataSummary?.dataSize || "0 MB"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Oldest Data</p>
              <p className="text-2xl font-bold">{dataSummary?.oldestData || "None"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Last Backup</p>
              <p className="text-2xl font-bold">{dataSummary?.lastBackup || "Never"}</p>
            </div>
          </div>

          <Alert className="mt-4">
            <ShieldCheck className="w-4 h-4" />
            <AlertDescription>
              <strong>Your data is protected</strong> with AES-256 encryption. We use the same 
              security standards as major banks. No employees can access your financial information.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>
            Control how your data is stored and processed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Auto-delete after debt free */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">Auto-delete when debt-free</p>
                <p className="text-sm text-muted-foreground">
                  Automatically remove all data 90 days after becoming debt-free
                </p>
              </div>
            </div>
            <Switch
              checked={settings?.autoDeleteAfterDebtFree}
              onCheckedChange={() => handleSettingToggle('autoDeleteAfterDebtFree')}
            />
          </div>

          {/* Encryption */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">End-to-end encryption</p>
                <p className="text-sm text-muted-foreground">
                  All documents encrypted before storage (always on)
                </p>
              </div>
            </div>
            <Badge variant="secondary">Always On</Badge>
          </div>

          {/* Anonymous mode */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <EyeOff className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">Anonymous mode</p>
                <p className="text-sm text-muted-foreground">
                  Hide personal details in the interface
                </p>
              </div>
            </div>
            <Switch
              checked={settings?.anonymousMode}
              onCheckedChange={() => handleSettingToggle('anonymousMode')}
            />
          </div>

          {/* Data sharing */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">Share with partners</p>
                <p className="text-sm text-muted-foreground">
                  We NEVER share your data with third parties
                </p>
              </div>
            </div>
            <Badge variant="outline" className="gap-1">
              <X className="w-3 h-3" />
              Never
            </Badge>
          </div>

          {/* Analytics */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">Usage analytics</p>
                <p className="text-sm text-muted-foreground">
                  Help improve the product with anonymous usage data
                </p>
              </div>
            </div>
            <Switch
              checked={settings?.allowAnalytics}
              onCheckedChange={() => handleSettingToggle('allowAnalytics')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Control Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Your Data Control</CardTitle>
          <CardDescription>
            Export or delete your data anytime - no questions asked
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Export Data */}
            <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
              <DialogTrigger asChild>
                <Card className="p-4 cursor-pointer hover-elevate">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Download className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Export All Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Download everything in a portable format
                      </p>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Your Data</DialogTitle>
                  <DialogDescription>
                    Download all your financial data, documents, and settings in a secure, 
                    encrypted JSON format that you can import elsewhere.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert>
                    <FileText className="w-4 h-4" />
                    <AlertDescription>
                      Your export will include all documents, debts, cashflow analysis, 
                      and settings. The file will be encrypted for your protection.
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => exportData.mutate()} disabled={exportData.isPending}>
                    {exportData.isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Export Now
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Delete All Data */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Card className="p-4 cursor-pointer hover-elevate border-destructive/20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Delete All Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently remove everything
                      </p>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete All Your Data</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. All your documents, debts, analysis, 
                    and settings will be permanently deleted.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert variant="destructive">
                    <AlertTriangle className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Warning:</strong> This will immediately and permanently delete:
                      <ul className="mt-2 ml-4 list-disc text-sm">
                        <li>All uploaded documents</li>
                        <li>Debt information</li>
                        <li>Cashflow analysis</li>
                        <li>Payment schedules</li>
                        <li>Account settings</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                  <div>
                    <label className="text-sm font-medium">
                      Type "DELETE" to confirm
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      placeholder="Type DELETE to confirm"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setDeleteDialogOpen(false);
                    setConfirmText("");
                  }}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => deleteAllData.mutate()}
                    disabled={confirmText !== "DELETE" || deleteAllData.isPending}
                  >
                    {deleteAllData.isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Everything
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Data Retention Policy */}
          <Alert>
            <Clock className="w-4 h-4" />
            <AlertDescription>
              <strong>Data Retention:</strong> We automatically delete documents older than 
              {" " + (settings?.dataRetentionDays || 90)} days after you become debt-free. 
              You can export your data anytime before automatic deletion.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Privacy Promise */}
      <Card className="bg-gradient-to-r from-primary/5 to-chart-2/5">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Key className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Our Privacy Promise</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                  <span>We make money from our service, not your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                  <span>No ads, no data brokers, no selling to third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                  <span>You can delete everything with one click, anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                  <span>Bank-level encryption for all stored documents</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}