'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculatePersonMetrics, getPersonRunsByDate } from '@/lib/metricsCalculator';
import { User, TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function PersonView({ data, runners }) {
  const [selectedPerson, setSelectedPerson] = useState(runners[0] || '');
  const personMetrics = calculatePersonMetrics(data);
  const selectedPersonData = selectedPerson ? getPersonRunsByDate(data, selectedPerson) : [];
  const selectedMetrics = personMetrics.find(m => m.person === selectedPerson);

  return (
    <div className="space-y-6">
      {/* Person Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Runner</CardTitle>
          <CardDescription>Choose a runner to view detailed statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {runners.map((person) => (
              <button
                key={person}
                onClick={() => setSelectedPerson(person)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPerson === person
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <User className={`h-4 w-4 ${selectedPerson === person ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className={`text-sm font-medium ${selectedPerson === person ? 'text-blue-900 dark:text-blue-100' : 'text-slate-700 dark:text-slate-300'}`}>
                    {person}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Person Metrics */}
      {selectedMetrics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Total Miles
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {selectedMetrics.totalMiles.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Average Miles
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {selectedMetrics.averageMiles.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Min Miles
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {selectedMetrics.minMiles.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                    <TrendingDown className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Max Miles
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {selectedMetrics.maxMiles.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Person's Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{selectedPerson}'s Running Progress</CardTitle>
              <CardDescription>Miles run over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedPersonData}>
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
                    <Line 
                      type="monotone" 
                      dataKey="miles" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Miles"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* All Runners Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Runners Comparison</CardTitle>
          <CardDescription>Complete statistics for all runners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Runner</TableHead>
                  <TableHead className="text-right">Total Miles</TableHead>
                  <TableHead className="text-right">Average Miles</TableHead>
                  <TableHead className="text-right">Min Miles</TableHead>
                  <TableHead className="text-right">Max Miles</TableHead>
                  <TableHead className="text-right">Run Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personMetrics.map((metric) => (
                  <TableRow 
                    key={metric.person}
                    className={metric.person === selectedPerson ? 'bg-blue-50 dark:bg-blue-950' : ''}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span>{metric.person}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {metric.totalMiles.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {metric.averageMiles.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {metric.minMiles.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {metric.maxMiles.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {metric.runCount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
