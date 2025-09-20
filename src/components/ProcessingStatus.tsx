import { useState, useEffect } from "react";
import { Brain, Zap, Target, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProcessingStatusProps {
  isProcessing: boolean;
  onComplete: () => void;
}

export const ProcessingStatus = ({ isProcessing, onComplete }: ProcessingStatusProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { 
      icon: Brain, 
      title: "Image Preprocessing", 
      description: "Normalizing and enhancing scan quality",
      duration: 2000 
    },
    { 
      icon: Zap, 
      title: "Watershed Segmentation", 
      description: "Applying watershed algorithm for initial segmentation",
      duration: 3000 
    },
    { 
      icon: Target, 
      title: "CNN Analysis", 
      description: "Deep learning tumor detection and classification",
      duration: 4000 
    },
    { 
      icon: CheckCircle, 
      title: "Results Generation", 
      description: "Generating segmentation maps and analysis",
      duration: 2000 
    }
  ];

  useEffect(() => {
    if (!isProcessing) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let stepIndex = 0;
    let progressValue = 0;
    
    const processStep = () => {
      if (stepIndex >= steps.length) {
        setProgress(100);
        setTimeout(() => onComplete(), 500);
        return;
      }

      setCurrentStep(stepIndex);
      
      const stepDuration = steps[stepIndex].duration;
      const progressIncrement = (100 / steps.length) / (stepDuration / 50);
      
      const interval = setInterval(() => {
        progressValue += progressIncrement;
        setProgress(Math.min(progressValue, (stepIndex + 1) * (100 / steps.length)));
        
        if (progressValue >= (stepIndex + 1) * (100 / steps.length)) {
          clearInterval(interval);
          stepIndex++;
          setTimeout(processStep, 200);
        }
      }, 50);
    };

    processStep();
  }, [isProcessing, onComplete]);

  if (!isProcessing) return null;

  return (
    <Card className="medical-result-card">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Processing Brain Scan
          </h3>
          <p className="text-muted-foreground">
            Analyzing your medical image using advanced algorithms
          </p>
        </div>

        <Progress value={progress} className="w-full" />

        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div 
                key={index}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-primary/10 border border-primary/20' : 
                  isCompleted ? 'bg-accent/10' : 'opacity-50'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  isActive ? 'bg-primary text-primary-foreground' :
                  isCompleted ? 'bg-accent text-accent-foreground' :
                  'bg-muted'
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {isCompleted && (
                  <CheckCircle className="w-5 h-5 text-accent" />
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length} • {Math.round(progress)}% Complete
        </div>
      </div>
    </Card>
  );
};