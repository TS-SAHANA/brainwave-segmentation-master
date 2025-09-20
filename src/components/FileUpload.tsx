import { useState } from "react";
import { Upload, Brain, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export const FileUpload = ({ onFileSelect, isProcessing }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <Card className={`medical-result-card transition-all duration-300 ${
      dragActive ? 'border-primary bg-primary/5' : ''
    } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
      <div
        className="text-center p-12 cursor-pointer"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 rounded-full bg-primary/10">
            {isProcessing ? (
              <Brain className="w-12 h-12 text-primary medical-processing" />
            ) : (
              <Upload className="w-12 h-12 text-primary" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Upload Brain Scan
            </h3>
            <p className="text-muted-foreground max-w-md">
              Drag and drop your brain MRI/CT scan or click to browse. 
              Supports DICOM, JPEG, PNG formats.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <FileImage className="w-4 h-4" />
            <span>Max file size: 50MB</span>
          </div>

          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => document.getElementById('file-input')?.click()}
            disabled={isProcessing}
          >
            Select File
          </Button>

          <input
            id="file-input"
            type="file"
            className="hidden"
            accept=".dcm,.jpg,.jpeg,.png,.tiff"
            onChange={handleFileInput}
          />
        </div>
      </div>
    </Card>
  );
};