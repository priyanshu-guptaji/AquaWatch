import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Calendar,
  MapPin,
  Droplets
} from 'lucide-react';
import Papa from 'papaparse';

interface DWLRData {
  timestamp: string;
  waterLevel: number;
  rainfall?: number;
  temperature?: number;
  stationId: string;
  latitude?: number;
  longitude?: number;
}

interface CSVUploadProps {
  onDataUploaded: (data: DWLRData[]) => void;
  className?: string;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onDataUploaded, className = "" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
    rows: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadStatus('error');
      setErrorMessage('Please upload a CSV file');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = parseDWLRData(results.data);
          setFileInfo({
            name: file.name,
            size: file.size,
            rows: data.length
          });
          onDataUploaded(data);
          setUploadStatus('success');
        } catch (error) {
          setUploadStatus('error');
          setErrorMessage(error instanceof Error ? error.message : 'Failed to parse CSV');
        } finally {
          setIsUploading(false);
        }
      },
      error: (error) => {
        setUploadStatus('error');
        setErrorMessage(`CSV parsing error: ${error.message}`);
        setIsUploading(false);
      }
    });
  };

  const parseDWLRData = (rawData: any[]): DWLRData[] => {
    const data: DWLRData[] = [];
    
    for (const row of rawData) {
      try {
        // Handle different possible column names
        const timestamp = row.timestamp || row.date || row.time || row.Timestamp || row.Date;
        const waterLevel = parseFloat(row.waterLevel || row.water_level || row.level || row.WaterLevel || row.Level);
        const rainfall = row.rainfall || row.rain || row.Rainfall ? parseFloat(row.rainfall || row.rain || row.Rainfall) : undefined;
        const temperature = row.temperature || row.temp || row.Temperature ? parseFloat(row.temperature || row.temp || row.Temperature) : undefined;
        const stationId = row.stationId || row.station_id || row.station || row.StationId || row.Station || 'DWLR001';
        const latitude = row.latitude || row.lat || row.Latitude ? parseFloat(row.latitude || row.lat || row.Latitude) : undefined;
        const longitude = row.longitude || row.lng || row.lon || row.Longitude ? parseFloat(row.longitude || row.lng || row.lon || row.Longitude) : undefined;

        if (!timestamp || isNaN(waterLevel)) {
          continue; // Skip invalid rows
        }

        data.push({
          timestamp: new Date(timestamp).toISOString().split('T')[0],
          waterLevel,
          rainfall,
          temperature,
          stationId,
          latitude,
          longitude
        });
      } catch (error) {
        console.warn('Skipping invalid row:', row);
      }
    }

    if (data.length === 0) {
      throw new Error('No valid data found in CSV file');
    }

    return data;
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      fileInputRef.current.files = event.dataTransfer.files;
      handleFileUpload({ target: { files: [file] } } as any);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload DWLR Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            uploadStatus === 'success' 
              ? 'border-green-300 bg-green-50' 
              : uploadStatus === 'error'
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-blue-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {uploadStatus === 'success' ? 'File Uploaded Successfully!' : 'Upload DWLR CSV File'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {uploadStatus === 'success' 
                  ? 'Your data has been processed and is ready for analysis'
                  : 'Drag and drop your CSV file here, or click to browse'
                }
              </p>
            </div>

            <Input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />

            {uploadStatus !== 'success' && (
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {isUploading ? 'Processing...' : 'Choose File'}
              </Button>
            )}

            {uploadStatus === 'success' && (
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Another File
              </Button>
            )}
          </div>
        </div>

        {/* File Info */}
        {fileInfo && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-700">File Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <FileText className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium">{fileInfo.name}</div>
                  <div className="text-xs text-gray-500">{formatFileSize(fileInfo.size)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">{fileInfo.rows} records</div>
                  <div className="text-xs text-gray-500">Data points</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-sm font-medium">Ready</div>
                  <div className="text-xs text-gray-500">For analysis</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {uploadStatus === 'error' && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Expected Format */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700">Expected CSV Format</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p>Required columns: <code className="bg-gray-100 px-1 rounded">timestamp</code>, <code className="bg-gray-100 px-1 rounded">waterLevel</code></p>
            <p>Optional columns: <code className="bg-gray-100 px-1 rounded">rainfall</code>, <code className="bg-gray-100 px-1 rounded">temperature</code>, <code className="bg-gray-100 px-1 rounded">stationId</code></p>
            <p>Date format: YYYY-MM-DD or any standard date format</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CSVUpload;
