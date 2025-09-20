import { useState } from "react";
import { Brain, Microscope, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUpload } from "@/components/FileUpload";
import { ProcessingStatus } from "@/components/ProcessingStatus";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for processing`,
    });
  };

  const handleStartProcessing = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setShowResults(false);
    
    toast({
      title: "Processing started",
      description: "Analyzing brain scan with AI algorithms...",
    });
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setShowResults(true);
    
    toast({
      title: "Analysis complete",
      description: "Brain tumor segmentation results are ready",
    });
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIsProcessing(false);
    setShowResults(false);
    setImagePreview("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  NeuroSeg AI
                </h1>
                <p className="text-sm text-muted-foreground">
                  Brain Tumor Segmentation Platform
                </p>
              </div>
            </div>
            
            {(selectedFile || showResults) && (
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                New Analysis
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!selectedFile && !isProcessing && !showResults && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">
                Advanced Brain Tumor Detection
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Upload brain scans for automated tumor segmentation using state-of-the-art 
                Watershed algorithms and Convolutional Neural Networks.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="medical-result-card text-center">
                <div className="p-6 space-y-3">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                    <Microscope className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Watershed Algorithm</h3>
                  <p className="text-muted-foreground text-sm">
                    Advanced image segmentation for precise boundary detection
                  </p>
                </div>
              </Card>
              
              <Card className="medical-result-card text-center">
                <div className="p-6 space-y-3">
                  <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto">
                    <Cpu className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg">CNN Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    Deep learning models for accurate tumor classification
                  </p>
                </div>
              </Card>
              
              <Card className="medical-result-card text-center">
                <div className="p-6 space-y-3">
                  <div className="p-3 bg-medical-success/10 rounded-full w-fit mx-auto">
                    <Brain className="w-8 h-8 text-medical-success" />
                  </div>
                  <h3 className="font-semibold text-lg">Clinical Grade</h3>
                  <p className="text-muted-foreground text-sm">
                    Medical-grade accuracy with detailed analysis reports
                  </p>
                </div>
              </Card>
            </div>

            <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </div>
        )}

        {selectedFile && !isProcessing && !showResults && (
          <div className="space-y-6">
            <Card className="medical-result-card">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">File Ready for Processing</h3>
                <div className="max-w-sm mx-auto">
                  <img 
                    src={imagePreview} 
                    alt="Selected brain scan"
                    className="w-full rounded-lg border border-border"
                  />
                </div>
                <p className="text-muted-foreground">
                  <strong>File:</strong> {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
                </p>
                <Button 
                  onClick={handleStartProcessing}
                  className="bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Start Analysis
                </Button>
              </div>
            </Card>
          </div>
        )}

        {isProcessing && (
          <ProcessingStatus 
            isProcessing={isProcessing}
            onComplete={handleProcessingComplete}
          />
        )}

        {showResults && (
          <ResultsDisplay originalImage={imagePreview} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground text-sm">
            NeuroSeg AI • Advanced Medical Image Analysis • Final Year Project 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;