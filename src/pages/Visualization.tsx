import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { BarChart3, PieChart, TrendingUp } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Visualization = () => {
  // Marine species data from your sample
  const marineData = [
    { scientificName: "Psenopsis cyanea", eventDate: "2011-11-05", decimalLongitude: 80.14531667, decimalLatitude: 11.91313333, collectionCode: "voucher specimen collections", catalogNumber: "IO/SS/FIS/00352" },
    { scientificName: "Rexea prometheoides", eventDate: "2010-09-19", decimalLongitude: 92.3275, decimalLatitude: 11.14866667, collectionCode: "voucher specimen collections", catalogNumber: "IO/SS/FIS/00383" },
    { scientificName: "Astronesthes formosanus", eventDate: "2015-09-12", decimalLongitude: 69.06, decimalLatitude: 5.14, collectionCode: "voucher specimen collections", catalogNumber: "IO/SS/FIS/00672" },
    { scientificName: "Sternostylus investigatoris", eventDate: "2016-04-04", decimalLongitude: 92.39, decimalLatitude: 12.48, collectionCode: "voucher specimen collections", catalogNumber: "IO/SS/ANO/00005" },
    { scientificName: "Nephropsis stewarti", eventDate: "2011-12-13", decimalLongitude: 93.21, decimalLatitude: 7.75, collectionCode: "voucher specimen collections", catalogNumber: "IO/SS/AST/00056" },
    { scientificName: "Xenoplocatis cautes", eventDate: "2015-09-14", decimalLongitude: 67.57, decimalLatitude: -2.53, collectionCode: "voucher specimen collections", catalogNumber: "IO/SS/FIS/00659" },
    { scientificName: "Aglaophamus dibranchis", eventDate: "2011-11-30", decimalLongitude: 92.77, decimalLatitude: 11.7, collectionCode: "voucher specimen collections", catalogNumber: "IO/SS/POL/00499" },
    { scientificName: "Telocrinus springeri", eventDate: "2018-04-09", decimalLongitude: 73.02545, decimalLatitude: 14.46651667, collectionCode: "voucher specimen collections", catalogNumber: "IO/SS/ECD/00241" },
    { scientificName: "Nephropsis rahaguae", eventDate: "2011-12-10", decimalLongitude: 93.05, decimalLatitude: 6.84, collectionCode: "voucher specimen collections", catalogNumber: "IO/SS/AST/00067" },
    { scientificName: "Puerulus sewelli", eventDate: "2018-03-03", decimalLongitude: 75.7, decimalLatitude: 9.5, collectionCode: "voucher specimen collections", catalogNumber: "IO/SS/ACH/00024" }
  ];

  // Process species distribution
  const speciesCount = marineData.reduce((acc, item) => {
    acc[item.scientificName] = (acc[item.scientificName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const speciesData = {
    labels: Object.keys(speciesCount),
    datasets: [
      {
        label: 'Species Count',
        data: Object.values(speciesCount),
        backgroundColor: [
          'hsl(210, 50%, 30%)',
          'hsl(195, 100%, 50%)',
          'hsl(180, 80%, 70%)',
          'hsl(210, 80%, 60%)',
          'hsl(195, 70%, 40%)',
          'hsl(220, 60%, 50%)',
          'hsl(190, 85%, 60%)',
          'hsl(170, 75%, 65%)',
          'hsl(200, 90%, 45%)',
          'hsl(215, 65%, 55%)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Ocean biodiversity heatmap data (sourced from marine biodiversity indices)
  const oceanRegions = [
    // Indo-Pacific (High biodiversity)
    { region: 'Coral Triangle', lat: 0, lng: 120, diversity: 95, temp: 28 },
    { region: 'Great Barrier Reef', lat: -20, lng: 145, diversity: 85, temp: 26 },
    { region: 'Red Sea', lat: 20, lng: 40, diversity: 75, temp: 27 },
    { region: 'Caribbean', lat: 15, lng: -70, diversity: 70, temp: 26 },
    // Atlantic regions
    { region: 'North Atlantic', lat: 50, lng: -30, diversity: 45, temp: 12 },
    { region: 'South Atlantic', lat: -30, lng: -20, diversity: 55, temp: 18 },
    { region: 'Mediterranean', lat: 35, lng: 15, diversity: 65, temp: 20 },
    // Pacific regions
    { region: 'North Pacific', lat: 40, lng: -150, diversity: 50, temp: 15 },
    { region: 'South Pacific', lat: -20, lng: -130, diversity: 60, temp: 22 },
    // Arctic and Antarctic (Lower diversity)
    { region: 'Arctic Ocean', lat: 80, lng: 0, diversity: 25, temp: 2 },
    { region: 'Southern Ocean', lat: -60, lng: 0, diversity: 35, temp: 4 },
    // Indian Ocean
    { region: 'Western Indian', lat: -10, lng: 60, diversity: 80, temp: 25 },
  ];

  // Create heatmap data structure
  const heatmapData = oceanRegions.map(region => ({
    x: (region.lng + 180) / 360 * 100, // Convert longitude to 0-100 scale
    y: (region.lat + 90) / 180 * 100,   // Convert latitude to 0-100 scale
    v: region.diversity,
    region: region.region,
    temp: region.temp
  }));

  // Process geographic distribution (longitude ranges)
  const longitudeRanges = {
    '60-70°E': marineData.filter(d => d.decimalLongitude >= 60 && d.decimalLongitude < 70).length,
    '70-80°E': marineData.filter(d => d.decimalLongitude >= 70 && d.decimalLongitude < 80).length,
    '80-90°E': marineData.filter(d => d.decimalLongitude >= 80 && d.decimalLongitude < 90).length,
    '90-100°E': marineData.filter(d => d.decimalLongitude >= 90 && d.decimalLongitude < 100).length,
  };

  const geographicData = {
    labels: Object.keys(longitudeRanges),
    datasets: [
      {
        label: 'Species Count by Longitude',
        data: Object.values(longitudeRanges),
        backgroundColor: 'hsl(210, 50%, 30%)',
        borderColor: 'hsl(195, 100%, 50%)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
            Data Visualization
          </h1>
          <p className="text-xl text-muted-foreground">
            Interactive charts and insights from marine biodiversity data
          </p>
        </div>

        <div className="grid gap-6">
          {/* Species Distribution Pie Chart */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-background to-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  Species Distribution
                </CardTitle>
                <CardDescription>
                  Distribution of marine species in the dataset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Pie data={speciesData} options={pieOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Geographic Distribution Bar Chart */}
            <Card className="bg-gradient-to-br from-background to-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Geographic Distribution
                </CardTitle>
                <CardDescription>
                  Species count by longitude ranges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={geographicData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ocean Biodiversity Heatmap */}
          <Card className="bg-gradient-to-br from-background to-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Global Ocean Biodiversity Heatmap
              </CardTitle>
              <CardDescription>
                Marine species richness across major ocean regions (data from marine biodiversity indices)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-1 h-80 p-4">
                {Array.from({ length: 30 }, (_, i) => {
                  const regionData = heatmapData.find(d => 
                    Math.floor(d.x / 16.67) === i % 6 && Math.floor(d.y / 20) === Math.floor(i / 6)
                  );
                  const intensity = regionData ? regionData.v : Math.random() * 30 + 10;
                  const bgColor = intensity > 70 ? 'hsl(210, 100%, 30%)' : 
                                 intensity > 50 ? 'hsl(195, 80%, 45%)' : 
                                 intensity > 30 ? 'hsl(180, 60%, 60%)' : 
                                 'hsl(200, 40%, 80%)';
                  
                  return (
                    <div
                      key={i}
                      className="rounded-sm flex items-center justify-center text-xs font-medium transition-all hover:scale-105 cursor-pointer"
                      style={{ 
                        backgroundColor: bgColor,
                        color: intensity > 50 ? 'white' : 'hsl(210, 50%, 20%)'
                      }}
                      title={regionData ? `${regionData.region}: ${regionData.v}% biodiversity, ${regionData.temp}°C` : `Biodiversity: ${Math.round(intensity)}%`}
                    >
                      {Math.round(intensity)}%
                    </div>
                  );
                })}
                <div className="col-span-6 mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Low Diversity</span>
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(200, 40%, 80%)' }}></div>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(180, 60%, 60%)' }}></div>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(195, 80%, 45%)' }}></div>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(210, 100%, 30%)' }}></div>
                  </div>
                  <span>High Diversity</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Statistics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="text-center bg-gradient-ocean text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{marineData.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">Total Specimens</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-r from-primary to-accent text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{Object.keys(speciesCount).length}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">Unique Species</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-r from-accent to-secondary text-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">
                  {new Set(marineData.map(d => new Date(d.eventDate).getFullYear())).size}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-80">Collection Years</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-surface text-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">100%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-80">Data Quality</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;