import React from 'react';
import Layout from '@/components/Layout';
import GroundwaterMonitoring from '@/components/groundwater/GroundwaterMonitoring';
import '@/components/groundwater/groundwater.css';

const GroundwaterMonitoringPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Groundwater Quality Monitoring
          </h1>
          <p className="text-gray-600">
            Monitor water quality across India with real-time data visualization and analysis tools.
          </p>
        </div>
        
        <GroundwaterMonitoring />
      </div>
    </Layout>
  );
};

export default GroundwaterMonitoringPage;
