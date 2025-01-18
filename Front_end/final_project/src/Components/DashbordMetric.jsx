import React, { useEffect, useState } from 'react';
import MetricCard from './metricCard_report';
import { supabase } from './supabaseClient'; // Import the Supabase client

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalAttendance: 0,
    averageAttendance: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch total number of users
        const { data: usersData, error: usersError } = await supabase
          .from('users_main') // Replace with your table name
          .select('*');

        if (usersError) {
          console.error('Error fetching users:', usersError.message);
          return;
        }

        const totalUsers = usersData.length;

        // Count the total number of rows
        const { count: totalAttendance, error: attendanceError } = await supabase
          .from('users_main') // Replace with your table name
          .select('*', { count: 'exact' });

        if (attendanceError) {
          console.error('Error counting rows:', attendanceError.message);
          return;
        }

        const averageAttendance = totalUsers > 0 ? totalAttendance / totalUsers : 0;

        // Update metrics state
        setMetrics({
          totalUsers,
          totalAttendance,
          averageAttendance: averageAttendance.toFixed(2), // Rounded to 2 decimal places
        });
      } catch (err) {
        console.error('Unexpected error fetching metrics:', err);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <MetricCard title="Total Users" value={metrics.totalUsers} icon="👥" />
      <MetricCard title="Total Attendance" value={metrics.totalAttendance} icon="✅" />
      <MetricCard title="Average Attendance" value={metrics.averageAttendance} icon="📊" />
    </div>
  );
};

export default DashboardMetrics;
