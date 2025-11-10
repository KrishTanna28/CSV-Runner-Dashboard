'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { parseCSV } from '@/lib/csvParser';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setFileName(file.name);
    setErrors([]);

    try {
      const result = await parseCSV(file);
      
      if (result.isValid) {
        setData(result.data);
        setErrors([]);
      } else {
        setData(null);
        setErrors(result.errors);
      }
    } catch (error) {
      setErrors([{ row: 0, field: 'file', message: 'Failed to process file' }]);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
    setErrors([]);
    setFileName('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            CSV Runner Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Upload your running data CSV to visualize and analyze performance metrics
          </p>
        </div>

        {/* Upload Section */}
        {!data && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border-2 border-dashed border-slate-300 dark:border-slate-600">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Upload CSV File
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  CSV must contain columns: <span className="font-mono font-semibold">date</span>,{' '}
                  <span className="font-mono font-semibold">person</span>,{' '}
                  <span className="font-mono font-semibold">miles</span>
                </p>
                
                <label htmlFor="csv-upload">
                  <Button
                    asChild
                    className="cursor-pointer"
                    disabled={isLoading}
                  >
                    <span>
                      {isLoading ? 'Processing...' : 'Choose File'}
                    </span>
                  </Button>
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isLoading}
                  />
                </label>

                {fileName && (
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                    Selected: <span className="font-semibold">{fileName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Error Display */}
            {errors.length > 0 && (
              <div className="mt-6 space-y-2">
                <Alert variant="destructive">
                  <AlertDescription>
                    <div className="font-semibold mb-2">
                      Found {errors.length} error{errors.length !== 1 ? 's' : ''} in CSV:
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {errors.slice(0, 10).map((error, index) => (
                        <li key={index}>
                          {error.row > 0 ? `Row ${error.row}, ` : ''}
                          {error.field}: {error.message}
                        </li>
                      ))}
                      {errors.length > 10 && (
                        <li className="text-slate-600">
                          ... and {errors.length - 10} more errors
                        </li>
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        )}

        {/* Dashboard */}
        {data && data.length > 0 && (
          <Dashboard data={data} onReset={handleReset} fileName={fileName} />
        )}
      </div>
    </main>
  );
}
