import { Upload, FileText, Image as ImageIcon, X, FileStack, AlertCircle, CheckCircle, Loader2, Sparkles, Camera, Smartphone } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { DocumentTypeSelector } from "./DocumentTypeSelector";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  documentType?: string;
  progress: number;
  status: "pending" | "uploading" | "analyzing" | "completed" | "error";
  analysis?: any;
  error?: string;
}

interface ShoeboxUploadZoneProps {
  mode: "shoebox" | "organized";
}

const documentTypePatterns = [
  { pattern: /bank|checking|savings|chase|wells|citi|bofa/i, type: "bank-statements" },
  { pattern: /credit|visa|mastercard|amex|discover/i, type: "credit-cards" },
  { pattern: /loan|mortgage|auto|student/i, type: "loans" },
  { pattern: /experian|equifax|transunion|credit.*report/i, type: "credit-reports" },
  { pattern: /401k|ira|investment|portfolio|vanguard|fidelity/i, type: "investments" },
  { pattern: /pay|stub|w2|1099|income|salary/i, type: "income" },
];

function detectDocumentType(fileName: string): string {
  const lowerName = fileName.toLowerCase();
  for (const { pattern, type } of documentTypePatterns) {
    if (pattern.test(lowerName)) {
      return type;
    }
  }
  return "unknown";
}

export function ShoeboxUploadZone({ mode }: ShoeboxUploadZoneProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, [mode, selectedDocType]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      documentType: mode === "shoebox" ? detectDocumentType(file.name) : selectedDocType,
      progress: 0,
      status: "pending",
    }));

    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const uploadMutation = useMutation({
    mutationFn: async (file: UploadedFile) => {
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("documentType", file.documentType || "unknown");

      const res = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      return res.json();
    },
    onSuccess: (data, file) => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? { ...f, status: "completed", analysis: data.analysis, progress: 100 }
            : f
        )
      );
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/debts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
    },
    onError: (error: any, file) => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? { ...f, status: "error", error: error.message, progress: 0 }
            : f
        )
      );
    },
  });

  const analyzeAllDocuments = async () => {
    setIsProcessing(true);
    
    try {
      // Process files in batches
      for (const file of files.filter(f => f.status === "pending")) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, status: "uploading", progress: 30 }
              : f
          )
        );

        try {
          await uploadMutation.mutateAsync(file);
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error);
        }
      }

      // Show success message
      const successCount = files.filter(f => f.status === "completed").length;
      if (successCount > 0) {
        toast({
          title: "Documents Analyzed!",
          description: `Successfully processed ${successCount} documents. Your financial dashboard is ready.`,
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getDocumentTypeLabel = (type?: string) => {
    const labels: Record<string, string> = {
      "bank-statements": "Bank Statement",
      "credit-cards": "Credit Card",
      "loans": "Loan Document",
      "credit-reports": "Credit Report",
      "investments": "Investment",
      "income": "Income Document",
      "unknown": "Unknown",
    };
    return labels[type || "unknown"] || "Unknown";
  };

  const renderFileList = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">
          Uploaded Files ({files.length})
        </h4>
        {mode === "shoebox" && files.length > 0 && (
          <Badge variant="secondary">
            AI will auto-categorize
          </Badge>
        )}
      </div>
      
      {files.map((file) => (
        <Card
          key={file.id}
          className={`p-4 ${
            file.status === "error" ? "border-destructive/50" : ""
          }`}
          data-testid={`file-${file.id}`}
        >
          <div className="flex items-start gap-3">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
              ${file.status === "completed" ? "bg-chart-2/10" : "bg-primary/10"}
              ${file.status === "error" ? "bg-destructive/10" : ""}
            `}>
              {file.status === "analyzing" || file.status === "uploading" ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : file.status === "completed" ? (
                <CheckCircle className="w-5 h-5 text-chart-2" />
              ) : file.status === "error" ? (
                <AlertCircle className="w-5 h-5 text-destructive" />
              ) : (
                <FileText className="w-5 h-5 text-primary" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={file.documentType === "unknown" ? "outline" : "secondary"}>
                      {getDocumentTypeLabel(file.documentType)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 flex-shrink-0"
                  onClick={() => removeFile(file.id)}
                  data-testid={`button-remove-${file.id}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {file.status === "uploading" || file.status === "analyzing" ? (
                <Progress value={file.progress} className="mt-2" />
              ) : file.status === "completed" && file.analysis ? (
                <div className="text-xs text-muted-foreground mt-2">
                  {file.analysis.summary}
                </div>
              ) : file.status === "error" ? (
                <p className="text-xs text-destructive mt-2">{file.error}</p>
              ) : null}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  if (mode === "organized") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Select Document Type</h2>
          <DocumentTypeSelector
            onSelect={setSelectedDocType}
            selectedType={selectedDocType}
          />
        </div>

        {selectedDocType && (
          <div className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-lg p-12 text-center transition-all
                ${isDragging ? "border-primary bg-primary/5" : "border-border hover-elevate"}
              `}
              data-testid="upload-zone-organized"
            >
              <input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.csv"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                data-testid="input-file-organized"
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Drop {getDocumentTypeLabel(selectedDocType)} files here
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    or click to browse
                  </p>
                </div>
              </div>
            </div>
            
            {files.length > 0 && renderFileList()}
          </div>
        )}
      </div>
    );
  }

  // Shoebox mode (default)
  return (
    <div className="space-y-6">
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed p-8 md:p-12 text-center transition-all
          ${isDragging ? "border-primary bg-primary/10" : "border-border"}
        `}
        data-testid="upload-zone-shoebox"
      >
        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.csv,.xls,.xlsx,image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          data-testid="input-file-shoebox"
          id="file-input-hidden"
        />
        
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 via-chart-2/20 to-chart-3/20 flex items-center justify-center">
              <FileStack className="w-12 h-12 text-primary" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-chart-2 text-primary-foreground flex items-center justify-center text-sm font-bold animate-pulse">
              AI
            </div>
          </div>
          
          <div className="max-w-md">
            <h3 className="text-xl font-bold mb-2">
              Drop Your Financial "Shoebox" Here
            </h3>
            <p className="text-muted-foreground mb-4">
              Bank statements, credit cards, loans, pay stubs - dump it all! 
              Our AI will automatically sort and categorize everything.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <Badge variant="outline">PDF</Badge>
              <Badge variant="outline">Photos</Badge>
              <Badge variant="outline">Images</Badge>
              <Badge variant="outline">CSV</Badge>
              <Badge variant="outline">Excel</Badge>
              <span className="text-muted-foreground">• Max 50 files at once</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            🔒 Bank-level encryption • Documents deleted after 30 days • Private analysis
          </p>
        </div>
      </Card>

      {/* Mobile-optimized upload buttons */}
      <div className="grid gap-3 md:hidden">
        <label htmlFor="camera-input">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
            id="camera-input"
            multiple
            data-testid="input-camera"
          />
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full h-14" 
            asChild 
            data-testid="button-take-photo"
          >
            <span>
              <Camera className="w-5 h-5 mr-2" />
              Take Photo of Document
            </span>
          </Button>
        </label>
        
        <label htmlFor="photo-library-input">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="photo-library-input"
            multiple
            data-testid="input-photo-library"
          />
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full h-14" 
            asChild 
            data-testid="button-photo-library"
          >
            <span>
              <ImageIcon className="w-5 h-5 mr-2" />
              Choose from Photo Library
            </span>
          </Button>
        </label>
      </div>

      {/* Desktop-optimized upload button */}
      <div className="hidden md:flex justify-center">
        <label htmlFor="desktop-file-input">
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.csv,.xls,.xlsx,image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="desktop-file-input"
            multiple
            data-testid="input-desktop-file"
          />
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2" 
            asChild 
            data-testid="button-browse-files"
          >
            <span>
              <Upload className="w-5 h-5" />
              Browse Files
            </span>
          </Button>
        </label>
      </div>

      {files.length > 0 && (
        <>
          {renderFileList()}
          
          <div className="flex gap-3">
            <Button
              className="flex-1"
              size="lg"
              onClick={analyzeAllDocuments}
              disabled={isProcessing || files.every(f => f.status === "completed" || f.status === "error")}
              data-testid="button-analyze-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing Documents...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze & Create Autopilot Plan
                </>
              )}
            </Button>
            
            {files.filter(f => f.status === "completed").length > 0 && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = "/dashboard"}
                data-testid="button-view-dashboard"
              >
                View Dashboard
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}