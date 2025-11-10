'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { calculateOverallMetrics, getRunsByDate, getRunsByPerson } from '@/lib/metricsCalculator';
import { Activity, TrendingUp, Users, Calendar } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#f97316'];

export default function OverallView({ data }) {
  const metrics = calculateOverallMetrics(data);
  const runsByDate = getRunsByDate(data);
  const runsByPerson = getRunsByPerson(data);

  const metricCards = [
    {
      title: 'Total Miles',
      value: metrics.totalMiles.toFixed(2),
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Average Miles',
      value: metrics.averageMiles.toFixed(2),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: 'Total Runs',
      value: metrics.totalRuns,
      icon: Calendar,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-950',
    },
    {
      title: 'Unique Runners',
      value: metrics.uniqueRunners,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {metric.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {metric.value}
                    </p>
                  </div>
                  <div className={`${metric.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Min/Max Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Range Statistics</CardTitle>
          <CardDescription>Minimum and maximum miles per run</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-600">Minimum</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {metrics.minMiles.toFixed(2)} mi
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-cyan-50 dark:bg-cyan-950 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-600">Maximum</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {metrics.maxMiles.toFixed(2)} mi
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Miles Over Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Miles Over Time</CardTitle>
          <CardDescription>Total miles run per date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={runsByDate}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  label={{ value: 'Miles', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="miles" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Miles"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Miles by Person Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Miles by Runner</CardTitle>
            <CardDescription>Total miles per person (bar chart)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={runsByPerson}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis 
                    dataKey="person" 
                    className="text-xs"
                    tick={{ fill: 'currentColor' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'currentColor' }}
                    label={{ value: 'Miles', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="miles" fill="#8b5cf6" name="Total Miles" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribution by Runner</CardTitle>
            <CardDescription>Percentage of total miles (pie chart)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={runsByPerson}
                    dataKey="miles"
                    nameKey="person"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ person, percent }) => `${person}: ${(percent * 100).toFixed(1)}%`}
                    labelLine={true}
                  >
                    {runsByPerson.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
