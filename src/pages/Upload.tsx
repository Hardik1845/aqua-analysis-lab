import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload as UploadIcon, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const { toast } = useToast();

  // Sample CSV data for preview
  const sampleData = [
    { species: "Bluefin Tuna", location: "Pacific Ocean", depth: "200m", count: 15 },
    { species: "Great White Shark", location: "Atlantic Ocean", depth: "50m", count: 3 },
    { species: "Clownfish", location: "Coral Reef", depth: "10m", count: 45 },
  ];

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['text/csv', 'application/json', 'text/plain'];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.fasta')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV, JSON, or FASTA file.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    // Simulate file parsing - in real app would parse actual file
    setPreviewData(sampleData.slice(0, 10));
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for processing.`
    });
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a file before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Data submitted",
      description: "Your marine data has been successfully stored in the database."
    });
  };

  const downloadTemplate = () => {
    const csvContent = "species,location,depth,count\nBluefin Tuna,Pacific Ocean,200m,15\nGreat White Shark,Atlantic Ocean,50m,3";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marine_data_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
            Upload Marine Data
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your CSV, JSON, or FASTA files for analysis
          </p>
        </div>

        <div className="grid gap-6">
          {/* File Upload Card */}
          <Card className="border-2 border-dashed hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UploadIcon className="h-5 w-5 mr-2" />
                File Upload
              </CardTitle>
              <CardDescription>
                Drag and drop your files here or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Input
                  type="file"
                  accept=".csv,.json,.fasta"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      {uploadedFile ? uploadedFile.name : "Choose a file or drag it here"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Supports CSV, JSON, and FASTA formats
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Button onClick={downloadTemplate} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
                <Button onClick={handleSubmit} disabled={!uploadedFile} className="bg-gradient-ocean">
                  Submit Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Table */}
          {previewData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Data Preview</CardTitle>
                <CardDescription>
                  Showing first 10 rows of uploaded data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Species</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Depth</TableHead>
                        <TableHead>Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.species}</TableCell>
                          <TableCell>{row.location}</TableCell>
                          <TableCell>{row.depth}</TableCell>
                          <TableCell>{row.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;