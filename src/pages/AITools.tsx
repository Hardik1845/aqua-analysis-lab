import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Search, Upload, Fish, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AITools = () => {
  const [speciesName, setSpeciesName] = useState("");
  const [classification, setClassification] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock classification data
  const classificationTypes = {
    "bluefin tuna": "Pelagic Fish - Open ocean swimmer, highly migratory",
    "great white shark": "Pelagic Predator - Top-level marine predator",
    "clownfish": "Reef Fish - Coral reef dwelling species",
    "flounder": "Demersal Fish - Bottom-dwelling flatfish",
    "cod": "Demersal Fish - Bottom-feeding commercial fish",
    "salmon": "Anadromous Fish - Migrates between fresh and salt water",
  };

  // Mock search database
  const speciesDatabase = [
    { name: "Bluefin Tuna", category: "Pelagic Fish", habitat: "Open Ocean", status: "Endangered" },
    { name: "Great White Shark", category: "Pelagic Predator", habitat: "Coastal Waters", status: "Vulnerable" },
    { name: "Clownfish", category: "Reef Fish", habitat: "Coral Reefs", status: "Stable" },
    { name: "Atlantic Cod", category: "Demersal Fish", habitat: "North Atlantic", status: "Overfished" },
    { name: "Pacific Salmon", category: "Anadromous Fish", habitat: "Pacific Northwest", status: "Declining" },
  ];

  const handleClassification = async () => {
    if (!speciesName.trim()) {
      toast({
        title: "Missing input",
        description: "Please enter a species name for classification.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const result = classificationTypes[speciesName.toLowerCase()] || 
        "Unknown Species - Please verify the species name or add it to the database";
      setClassification(result);
      setIsLoading(false);
      
      toast({
        title: "Classification complete",
        description: "AI analysis has been generated for your species."
      });
    }, 1500);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Missing search query",
        description: "Please enter a search term.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate search
    setTimeout(() => {
      const results = speciesDatabase.filter(species =>
        species.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        species.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        species.habitat.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setIsLoading(false);
      
      toast({
        title: "Search complete",
        description: `Found ${results.length} matching species.`
      });
    }, 1000);
  };

  const handleOtolithUpload = () => {
    toast({
      title: "Feature coming soon",
      description: "Otolith image classification will be available in the next update."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
            AI-Powered Marine Tools
          </h1>
          <p className="text-xl text-muted-foreground">
            Advanced species classification and intelligent search capabilities
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Species Classification Tool */}
          <Card className="bg-gradient-to-br from-background to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                Species Classification
              </CardTitle>
              <CardDescription>
                Enter a species name to get AI-powered classification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="species">Species Name</Label>
                <Input
                  id="species"
                  placeholder="e.g., Bluefin Tuna, Great White Shark"
                  value={speciesName}
                  onChange={(e) => setSpeciesName(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleClassification}
                className="w-full bg-gradient-ocean"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Fish className="h-4 w-4 mr-2" />
                    Classify Species
                  </>
                )}
              </Button>

              {classification && (
                <div className="mt-4 p-4 bg-secondary/50 rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold mb-2">Classification Result:</h4>
                  <p className="text-sm">{classification}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Species Search Tool */}
          <Card className="bg-gradient-to-br from-background to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-primary" />
                Intelligent Species Search
              </CardTitle>
              <CardDescription>
                Search the marine species database by name, category, or habitat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Query</Label>
                <Input
                  id="search"
                  placeholder="e.g., tuna, reef fish, pacific"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-primary to-accent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search Database
                  </>
                )}
              </Button>

              {searchResults.length > 0 && (
                <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.map((species, index) => (
                    <div key={index} className="p-3 bg-card rounded-lg border">
                      <h4 className="font-semibold">{species.name}</h4>
                      <p className="text-sm text-muted-foreground">{species.category}</p>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Habitat: {species.habitat}</span>
                        <span className={species.status === 'Stable' ? 'text-green-600' : 'text-red-600'}>
                          {species.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Otolith Analysis Tool (Coming Soon) */}
        <Card className="mt-6 bg-gradient-to-br from-background to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2 text-primary" />
              Otolith Image Analysis
              <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </CardTitle>
            <CardDescription>
              Upload otolith images for AI-powered species identification and age estimation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium mb-2">Otolith Image Upload</p>
              <p className="text-sm text-muted-foreground mb-4">
                This feature will support JPG, PNG, and TIFF formats
              </p>
              <Button onClick={handleOtolithUpload} variant="outline" disabled>
                Upload Otolith Image
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AITools;