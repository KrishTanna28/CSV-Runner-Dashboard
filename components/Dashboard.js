'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverallView from './OverallView';
import PersonView from './PersonView';

export default function Dashboard({ data, onReset, fileName }) {
  const [activeTab, setActiveTab] = useState('overall');

  const uniqueRunners = [...new Set(data.map(record => record.person))].sort();

  return (
    <div className="space-y-6">
      {/* Header with Reset Button */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg shadow p-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Analysis Results
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            File: {fileName} • {data.length} records • {uniqueRunners.length} runner{uniqueRunners.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={onReset} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-2" />
          Upload New File
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overall">Overall Statistics</TabsTrigger>
          <TabsTrigger value="person">Per-Person Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="mt-6">
          <OverallView data={data} />
        </TabsContent>

        <TabsContent value="person" className="mt-6">
          <PersonView data={data} runners={uniqueRunners} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
