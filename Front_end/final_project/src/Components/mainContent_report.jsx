// MainContent.js
import React from 'react';
import LineChart from './LineChart_reports';
// import BarChart from './charts/BarChart';
// import PieChart from './charts/PieChart';
// import HeatMap from './charts/HeatMap';
import DashboardMetrics from './DashbordMetric';
import TableComponent from './tableComponent';

const MainContent = () => {
  return (
    <div className="col-span-12 bg-white p-4 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardMetrics />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <LineChart />
        {/* <BarChart />
        <PieChart />
        <HeatMap /> */}
      </div>
      <TableComponent />
    </div>
  );
};

export default MainContent;