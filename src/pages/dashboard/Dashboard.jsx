import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Activity,
  Package,
  CalendarCheck,
  Users,
  BarChart3,
  ArrowRight,
  Award,
  TrendingUp,
  DollarSign,
  Eye,
  AlertCircle,
  Link,
  ChevronLeft,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // TODO: Replace with actual API call
  // Example: const { data: stats } = useQuery('dashboardStats', fetchDashboardStats);
  const [stats] = useState({
    totalBookings: 1247,
    bookingsChange: 12.5,
    totalRevenue: 45890,
    revenueChange: 8.3,
    activeUsers: 3421,
    usersChange: -2.1,
    pageViews: 89234,
    viewsChange: 15.7,
  });

  // TODO: Replace with actual API call
  // Example: const { data: recentActivity } = useQuery('recentActivity', fetchRecentActivity);
  const [recentActivity] = useState([
    {
      id: 1,
      type: "booking",
      user: "John Doe",
      item: "Cairo Tour Package",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "user",
      user: "Jane Smith",
      item: "New registration",
      time: "12 min ago",
    },
    {
      id: 3,
      type: "booking",
      user: "Mike Johnson",
      item: "Luxor Temple Visit",
      time: "1 hour ago",
    },
  ]);

  // TODO: Replace with actual navigation logic
  const navigate = useNavigate();

  // TODO: Add authentication check
  // React.useEffect(() => {
  //   const isAdmin = localStorage.getItem("isAdmin") === "true";
  //   if (!isAdmin) {
  //     navigate("/login");
  //     return;
  //   }
  // }, [navigate]);

  const dashboardItems = [
    {
      title: "Hero Sections",
      description: "Edit hero sections title, image etc...",
      path: "/dashboard/herosections",
      icon: Award,
      count: 5,
      status: "active",
    },
    {
      title: "Destinations",
      description: "Manage all destinations and their details",
      path: "/dashboard/destinations",
      icon: MapPin,
      count: 24,
      status: "active",
    },
    {
      title: "Activities",
      description: "Manage tourism activities and experiences",
      path: "/dashboard/activities",
      icon: Activity,
      count: 38,
      status: "active",
    },
    {
      title: "Packages",
      description: "Manage tour packages and deals",
      path: "/dashboard/packages",
      icon: Package,
      count: 15,
      status: "active",
    },
    {
      title: "Bookings",
      description: "View and manage all bookings",
      path: "/dashboard/bookings",
      icon: CalendarCheck,
      count: 127,
      status: "pending",
    },
    {
      title: "Users",
      description: "Manage user accounts and permissions",
      path: "/dashboard/users",
      icon: Users,
      count: 3421,
      status: "active",
    },
    {
      title: "Analytics",
      description: "View website statistics and reports",
      path: "/dashboard/analytics",
      icon: BarChart3,
      count: null,
      status: "active",
    },
    {
      title: "Contacts",
      description: "Manage contatcts",
      path: "/dashboard/contacts",
      icon: Phone,
      count: null,
      status: "active",
    },
    {
      title: "Socialmedia",
      description: "Manage Socialmedia",
      path: "/dashboard/socialmedia",
      icon: Link,
      count: null,
      status: "active",
    },

  ];

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings.toLocaleString(),
      change: stats.bookingsChange,
      icon: CalendarCheck,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: stats.revenueChange,
      icon: DollarSign,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: stats.usersChange,
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Page Views",
      value: stats.pageViews.toLocaleString(),
      change: stats.viewsChange,
      icon: Eye,
      color: "text-orange-600 dark:text-cyan-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-6">
                <Button
        variant="ghost"
        className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-900"
        onClick={() => {
          navigate("/");
        }}
      >
        <ChevronLeft className="h-4 w-4" /> Exit
      </Button>

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">
              Welcome back! Here's what's happening with your tourism platform.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/analytics")}
              className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button
              onClick={() => navigate("/dashboard/destinations")}
              className="dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Add Destination
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change > 0;
            return (
              <Card
                key={stat.title}
                className="dark:bg-zinc-950 dark:border-gray-800"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-300">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">
                    {stat.value}
                  </div>
                  <div className="flex items-center text-xs text-slate-600 dark:text-gray-400">
                    <TrendingUp
                      className={`mr-1 h-3 w-3 ${
                        isPositive
                          ? "text-green-600 dark:text-green-400"
                          : "rotate-180 text-red-600 dark:text-red-400"
                      }`}
                    />
                    <span
                      className={
                        isPositive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {Math.abs(stat.change)}%
                    </span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Navigation Cards */}
          <div className="lg:col-span-2">
            <Card className="dark:bg-zinc-950 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Quick Access</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Navigate to the main areas of your dashboard
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {dashboardItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.title}
                        onClick={() => navigate(item.path)}
                        className="group text-left focus:outline-none"
                      >
                        <div className="flex items-start gap-3 rounded-lg border border-slate-200 dark:border-gray-800 bg-white dark:bg-black p-4 transition hover:border-slate-300 dark:hover:border-gray-700 hover:bg-slate-50 dark:hover:bg-zinc-950 focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-gray-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black">
                          <div className="rounded-md bg-slate-100 dark:bg-gray-900 p-2 transition group-hover:bg-slate-200 dark:group-hover:bg-gray-800">
                            <Icon className="h-5 w-5 text-slate-700 dark:text-gray-300" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-slate-900 dark:text-white">
                                {item.title}
                              </h3>
                              {item.count !== null && (
                                <Badge
                                  variant={
                                    item.status === "pending"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="ml-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                                >
                                  {item.count}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-400 dark:text-gray-600 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="space-y-6">
            <Card className="dark:bg-zinc-950 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Recent Activity
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Latest updates from your platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-3 last:pb-0 border-b dark:border-gray-800 last:border-0"
                    >
                      <div
                        className={`rounded-full p-2 ${
                          activity.type === "booking"
                            ? "bg-blue-100 dark:bg-blue-950"
                            : "bg-purple-100 dark:bg-purple-950"
                        }`}
                      >
                        {activity.type === "booking" ? (
                          <CalendarCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Users className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium dark:text-white">
                          {activity.user}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-gray-400">
                          {activity.item}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-zinc-950 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-gray-400">
                      Database
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 dark:border-green-900"
                    >
                      Healthy
                    </Badge>
                  </div>
                  <Progress value={95} className="h-2 dark:bg-gray-900" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-gray-400">
                      API Response
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 dark:border-green-900"
                    >
                      Fast
                    </Badge>
                  </div>
                  <Progress value={88} className="h-2 dark:bg-gray-900" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-gray-400">
                      Storage
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 dark:border-yellow-900"
                    >
                      72%
                    </Badge>
                  </div>
                  <Progress value={72} className="h-2 dark:bg-gray-900" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alert Banner */}
        <Card className="border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-orange-900 dark:text-orange-300">
                Action Required
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                You have 12 pending bookings awaiting confirmation. Review them
                to ensure smooth operations.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-orange-300 dark:border-orange-800 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950"
              onClick={() => navigate("/dashboard/bookings")}
            >
              Review
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
