import React, { useEffect, useState, useContext } from "react";
import { Users, Leaf, TrendingDown, Award } from "lucide-react";
import { AuthContext } from "../../context/Authcontext";
import Spinner from "../../Page/Spinner";
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

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const res = await fetch("http://localhost:3000/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );

  if (!stats) return <p className="text-center py-20">No dashboard data found.</p>;

  const cardData = [
    {
      icon: Users,
      value: stats.totalUsers,
      label: "Community Members",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: Leaf,
      value: stats.totalMeals,
      label: "Meals Shared",
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      icon: TrendingDown,
      value: stats.totalWasteReduced,
      label: "Waste Reduced",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      icon: Award,
      value: stats.partnerOrganizations,
      label: "Partner Organizations",
      color: "text-green-700",
      bg: "bg-green-100",
    },
  ];

  const barChartData = stats.mealsPerMonth.map((item) => ({
    month: item.month,
    meals: item.count,
  }));

  const pieData = [
    { name: "Available", value: stats.availableFoods },
    { name: "Collected", value: stats.collectedFoods },
    { name: "Expired", value: stats.expiredFoods },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f97316"];

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-xl p-6 flex items-center gap-4 hover:shadow-xl transition"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bg}`}
            >
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {card.value}
              </p>
              <p className="text-gray-500 dark:text-gray-300">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Meals Shared Per Month
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="meals" fill="#22c55e" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Food Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
