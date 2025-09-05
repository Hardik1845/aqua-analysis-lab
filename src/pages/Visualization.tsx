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
  // Sample data for species distribution
  const speciesData = {
    labels: ['Bluefin Tuna', 'Great White Shark', 'Clownfish', 'Sea Turtle', 'Dolphin'],
    datasets: [
      {
        label: 'Species Count',
        data: [15, 3, 45, 8, 12],
        backgroundColor: [
          'hsl(210, 50%, 30%)',
          'hsl(195, 100%, 50%)',
          'hsl(180, 80%, 70%)',
          'hsl(210, 80%, 60%)',
          'hsl(195, 70%, 40%)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Sample data for abundance over time
  const abundanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Fish Population',
        data: [120, 135, 158, 142, 178, 195],
        borderColor: 'hsl(210, 50%, 30%)',
        backgroundColor: 'hsl(195, 100%, 85%)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Coral Health Index',
        data: [85, 88, 82, 90, 95, 92],
        borderColor: 'hsl(180, 80%, 70%)',
        backgroundColor: 'hsl(180, 80%, 90%)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Sample depth distribution data
  const depthData = {
    labels: ['0-50m', '50-100m', '100-200m', '200-500m', '500m+'],
    datasets: [
      {
        label: 'Species Count by Depth',
        data: [35, 28, 22, 18, 7],
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

            {/* Depth Distribution Bar Chart */}
            <Card className="bg-gradient-to-br from-background to-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Species by Depth
                </CardTitle>
                <CardDescription>
                  Species count across different depth ranges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={depthData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Abundance Trends Line Chart */}
          <Card className="bg-gradient-to-br from-background to-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Abundance Trends Over Time
              </CardTitle>
              <CardDescription>
                Tracking marine life populations and coral health metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={abundanceData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Summary Statistics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="text-center bg-gradient-ocean text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">83</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">Total Species</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-r from-primary to-accent text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">1,247</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">Data Points</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-r from-accent to-secondary text-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">12</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-80">Locations</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-surface text-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">95%</CardTitle>
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