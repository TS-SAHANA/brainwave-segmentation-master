import { useState } from "react";
import { Eye, EyeOff, Download, Share2, AlertTriangle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import brainScanSample from "@/assets/brain-scan-sample.jpg";

interface ResultsDisplayProps {
  originalImage?: string;
}

export const ResultsDisplay = ({ originalImage }: ResultsDisplayProps) => {
  const [showOverlay, setShowOverlay] = useState(true);
  
  // Mock segmentation results
  const analysisResults = {
    tumorDetected: true,
    tumorVolume: "2.3 cm³",
    tumorLocation: "Left frontal lobe",
    confidence: 94.2,
    riskLevel: "Moderate",
    recommendations: [
      "Further investigation with contrast-enhanced MRI recommended",
      "Consult neurosurgery for treatment options",
      "Monitor growth with follow-up scans in 3 months"
    ]
  };

  const metrics = [
    { label: "Tumor Volume", value: analysisResults.tumorVolume, color: "medical-tumor" },
    { label: "Confidence", value: `${analysisResults.confidence}%`, color: "medical-success" },
    { label: "Healthy Tissue", value: "97.7 cm³", color: "medical-healthy" },
    { label: "Processing Time", value: "11.2s", color: "medical-process" }
  ];

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {analysisResults.tumorDetected && (
        <Card className="border-destructive/20 bg-destructive/5">
          <div className="p-4 flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-destructive" />
            <div>
              <h3 className="font-semibold text-destructive">Tumor Detected</h3>
              <p className="text-sm text-muted-foreground">
                Potential tumor found in {analysisResults.tumorLocation}
              </p>
            </div>
            <Badge variant="destructive" className="ml-auto">
              {analysisResults.riskLevel} Risk
            </Badge>
          </div>
        </Card>
      )}

      <Tabs defaultValue="visualization" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization">
          <Card className="medical-result-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Segmentation Results</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowOverlay(!showOverlay)}
                    className="flex items-center space-x-2"
                  >
                    {showOverlay ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{showOverlay ? 'Hide' : 'Show'} Overlay</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="relative medical-scan-viewer p-6 rounded-xl">
                <div className="relative max-w-md mx-auto">
                  <img 
                    src={originalImage || brainScanSample}
                    alt="Brain Scan"
                    className="w-full rounded-lg border border-border"
                  />
                  
                  {showOverlay && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Simulated tumor overlay */}
                      <div 
                        className="absolute top-1/3 left-1/2 w-8 h-6 bg-medical-tumor/70 rounded-full border-2 border-medical-tumor transform -translate-x-1/2"
                        style={{ filter: 'blur(1px)' }}
                      />
                      {/* Healthy tissue highlighting */}
                      <div 
                        className="absolute inset-4 border-2 border-medical-healthy/40 rounded-lg"
                        style={{ borderStyle: 'dashed' }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-medical-tumor rounded-full" />
                    <span className="text-medical-tumor font-medium">Tumor Region</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-medical-healthy rounded-full" />
                    <span className="text-medical-healthy font-medium">Healthy Tissue</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card className="medical-result-card">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                Clinical Analysis
              </h3>

              <div className="grid gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Findings Summary</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Location:</strong> {analysisResults.tumorLocation}</p>
                    <p><strong>Volume:</strong> {analysisResults.tumorVolume}</p>
                    <p><strong>Confidence Level:</strong> {analysisResults.confidence}%</p>
                  </div>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-medium mb-3">Medical Recommendations</h4>
                  <ul className="space-y-2 text-sm">
                    {analysisResults.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Specialist
                </Button>
                <Button className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="medical-result-card text-center">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className={`text-2xl font-bold text-${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};