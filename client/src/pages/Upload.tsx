import { ShoeboxUploadZone } from "@/components/ShoeboxUploadZone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Lock, FileStack, Sparkles, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Upload() {
  const [uploadMode, setUploadMode] = useState<"shoebox" | "organized">("shoebox");

  return (
    <div className="max-w-6xl mx-auto space-y-6" data-testid="page-upload">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Shoebox to Autopilot™</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Turn your messy pile of bills into a set-and-forget money system. 
              Just dump everything here - we'll sort it out and create your automated payoff plan.
            </p>
          </div>
          <Badge variant="default" className="mt-1">
            10-Day Setup
          </Badge>
        </div>

        {/* 3-Step Process Visual */}
        <Card className="bg-gradient-to-r from-primary/5 via-chart-2/5 to-chart-3/5 border-primary/20">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground mx-auto mb-2 flex items-center justify-center font-bold">
                  1
                </div>
                <p className="text-sm font-semibold">DUMP</p>
                <p className="text-xs text-muted-foreground mt-1">Upload your pile</p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-16 h-0.5 bg-border" />
              </div>
              <div className="flex-1 text-center">
                <div className="w-12 h-12 rounded-full bg-chart-2 text-primary-foreground mx-auto mb-2 flex items-center justify-center font-bold">
                  2
                </div>
                <p className="text-sm font-semibold">DIGITIZE</p>
                <p className="text-xs text-muted-foreground mt-1">AI extracts data</p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-16 h-0.5 bg-border" />
              </div>
              <div className="flex-1 text-center">
                <div className="w-12 h-12 rounded-full bg-chart-3 text-primary-foreground mx-auto mb-2 flex items-center justify-center font-bold">
                  3
                </div>
                <p className="text-sm font-semibold">DEPLOY</p>
                <p className="text-xs text-muted-foreground mt-1">Autopay activated</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Mode Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant={uploadMode === "shoebox" ? "default" : "outline"}
            onClick={() => setUploadMode("shoebox")}
            className="gap-2"
            data-testid="button-shoebox-mode"
          >
            <FileStack className="w-4 h-4" />
            Shoebox Mode (Recommended)
          </Button>
          <Button
            variant={uploadMode === "organized" ? "default" : "outline"}
            onClick={() => setUploadMode("organized")}
            className="gap-2"
            data-testid="button-organized-mode"
          >
            <Sparkles className="w-4 h-4" />
            I'm Already Organized
          </Button>
        </div>
      </div>

      {/* Main Upload Zone */}
      <ShoeboxUploadZone mode={uploadMode} />

      {/* Trust Signals */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-base">Private & Secure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Bank-level encryption. Documents deleted after 30 days unless you opt-in.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-chart-2" />
            </div>
            <CardTitle className="text-base">AI Autopilot</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Finds your safe monthly EXTRA and creates optimal payoff schedule
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-chart-3" />
            </div>
            <CardTitle className="text-base">Set & Forget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Export to your bank's autopay. No daily logins or constant updates.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Outcome Promise */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="py-6">
          <p className="text-center text-lg font-semibold mb-2">
            First 30 Days Wins
          </p>
          <div className="grid gap-2 sm:grid-cols-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-2" />
              <span>Autopay live at all billers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-2" />
              <span>$300-800/month EXTRA found</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-2" />
              <span>Avalanche plan scheduled</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}