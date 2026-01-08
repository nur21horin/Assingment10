import React, { useEffect, useState, useContext } from "react";
import { Users, Leaf, TrendingDown, Award } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Spinner from "../../Page/Spinner";
import { AuthContext } from "../../context/Authcontext";

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user) return;
        const token = await user.getIdToken(true);

        const res = await fetch("http://localhost:3000/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );

  if (!stats)
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-400">
        No dashboard data available
      </p>
    );

  const cardData = [
    {
      icon: Users,
      label: "Community Members",
      value: stats.totalUsers ?? 0,
      color: "from-green-400 to-green-600",
      bg: "bg-gradient-to-r",
    },
    {
      icon: Leaf,
      label: "Meals Shared",
      value: stats.totalMeals ?? 0,
      color: "from-emerald-400 to-emerald-600",
      bg: "bg-gradient-to-r",
    },
    {
      icon: TrendingDown,
      label: "Waste Reduced",
      value: stats.totalWasteReduced ?? 0,
      color: "from-orange-400 to-orange-600",
      bg: "bg-gradient-to-r",
    },
    {
      icon: Award,
      label: "Partners",
      value: stats.partnerOrganizations ?? 0,
      color: "from-indigo-400 to-indigo-600",
      bg: "bg-gradient-to-r",
    },
  ];

  const barChartData = (stats.mealsPerMonth || []).map((item) => ({
    month: item.month,
    meals: item.count,
  }));

  const pieData = [
    { name: "Available", value: stats.availableFoods ?? 0 },
    { name: "Collected", value: stats.collectedFoods ?? 0 },
    { name: "Expired", value: stats.expiredFoods ?? 0 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f97316"];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-gray-100 tracking-wide">
        Dashboard Overview
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {cardData.map((card, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer ${card.bg}`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-4 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center`}
              >
                <card.icon className={`text-gray-800 dark:text-gray-100 w-6 h-6`} />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white dark:text-gray-100">
                  <CountUp end={card.value} duration={1.5} separator="," />
                </p>
                <p className="text-white/80 dark:text-gray-300 mt-1">{card.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Bar Chart */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          initial="hidden"
          animate="visible"
          variants={chartVariants}
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Meals Shared Per Month
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", border: "none" }}
                itemStyle={{ color: "#f9fafb" }}
              />
              <Bar dataKey="meals" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          initial="hidden"
          animate="visible"
          variants={chartVariants}
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Food Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                paddingAngle={5}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" align="center" iconSize={12} wrapperStyle={{ marginTop: 20 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", border: "none" }}
                itemStyle={{ color: "#f9fafb" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardOverview;
