import React, { useEffect, useState } from "react";
import { Users, List, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalFoods: 0,
    availableFoods: 0,
    expiredFoods: 0,
    totalUsers: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
     
      setStats({
        totalFoods: 120,
        availableFoods: 80,
        expiredFoods: 40,
        totalUsers: 50,
      });
     
      setChartData([
        { name: "Mon", foodsAdded: 5 },
        { name: "Tue", foodsAdded: 8 },
        { name: "Wed", foodsAdded: 12 },
        { name: "Thu", foodsAdded: 7 },
        { name: "Fri", foodsAdded: 10 },
        { name: "Sat", foodsAdded: 6 },
        { name: "Sun", foodsAdded: 9 },
      ]);
    };
    fetchData();
  }, []);

  const statCards = [
    { icon: List, label: "Total Foods", value: stats.totalFoods, color: "bg-green-100 text-green-700" },
    { icon: Calendar, label: "Available Foods", value: stats.availableFoods, color: "bg-blue-100 text-blue-700" },
    { icon: Award, label: "Expired Foods", value: stats.expiredFoods, color: "bg-red-100 text-red-700" },
    { icon: Users, label: "Total Users", value: stats.totalUsers, color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`flex items-center gap-4 p-5 rounded-xl shadow-md dark:shadow-gray-700 ${card.color}`}
          >
            <card.icon className="h-8 w-8" />
            <div>
              <p className="text-lg font-bold">{card.value}</p>
              <p className="text-sm">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md dark:shadow-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Foods Added Per Day</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="foodsAdded" fill="#4ade80" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md dark:shadow-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Food Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Available", value: stats.availableFoods },
                  { name: "Expired", value: stats.expiredFoods },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                <Cell key="available" fill="#4ade80" />
                <Cell key="expired" fill="#f87171" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
