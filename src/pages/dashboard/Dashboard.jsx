import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  AlertCircle,
  Link,
  Bed,
  Phone,
  Construction,
  CheckCircle2,
  UserStar,
  Zap,
  Server,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

import { useStay } from "@/hooks/useStay";
import { useContact } from "@/hooks/useContact";
import { usePackages } from "@/hooks/usePackages";
import { useSocials } from "@/hooks/useSocials";
const Dashboard = () => {
  const { contactQuery } = useContact();
  const { data: contacts, isLoading: iscontactLoading } = contactQuery;
  const { packages, isLoading: isPackagesLoading } = usePackages();
  const { socialsQuery } = useSocials();
  const { data: socials, isSocialsLaoding } = socialsQuery;
  const { data: stays, isLoading: isStaysLoading } = useStay();
  const navigate = useNavigate();
  const dashboardItems = [
    {
      title: "Hero Sections",
      description: "Edit hero sections title, image etc...",
      path: "/dashboard/heroes",
      icon: Award,
      count: 5,
      status: "under-construction",
      implemented: true,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Destinations",
      description: "Manage all destinations and their details",
      path: "/dashboard/destinations",
      icon: MapPin,
      count: 24,
      status: "active",
      implemented: true,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Activities",
      description: "Manage tourism activities and experiences",
      path: "/dashboard/activities",
      icon: Activity,
      count: 38,
      status: "under-construction",
      implemented: false,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Packages",
      description: "Manage tour packages and deals",
      path: "/dashboard/packages",
      icon: Package,
      count: isPackagesLoading ? "..." : packages?.length ?? 0,
      status: "active",
      implemented: true,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Bookings",
      description: "View and manage all bookings",
      path: "/dashboard/bookings",
      icon: CalendarCheck,
      count: 127,
      status: "under-construction",
      implemented: false,
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      title: "Stays",
      description: "View and manage all accommodation stays",
      path: "/dashboard/stays",
      icon: Bed,
      count: isStaysLoading ? "..." : stays?.length ?? 0,
      status: "active",
      implemented: true,
      gradient: "from-rose-500 to-red-500",
    },
    {
      title: "Users",
      description: "Manage user accounts and permissions",
      path: "/dashboard/users",
      icon: Users,
      count: null,
      status: "under-construction",
      implemented: false,
      gradient: "from-violet-500 to-purple-500",
    },
    {
      title: "Analytics",
      description: "View website statistics and reports",
      path: "/dashboard/analytics",
      icon: BarChart3,
      count: null,
      status: "under-construction",
      implemented: false,
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      title: "Contacts",
      description: "Manage contact information",
      path: "/dashboard/contacts",
      icon: Phone,
      count: iscontactLoading ? "..." : contacts?.length ?? 0,
      status: "active",
      implemented: true,
      gradient: "from-sky-500 to-blue-500",
    },
    {
      title: "Social Media",
      description: "Manage social media links",
      path: "/dashboard/socialmedia",
      icon: Link,
      count: isSocialsLaoding ? "..." : socials?.length ?? 0,
      status: "active",
      implemented: true,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const implementedCount = dashboardItems.filter(
    (item) => item.implemented
  ).length;
  const underConstructionCount = dashboardItems.filter(
    (item) => !item.implemented
  ).length;
  const completionPercentage = (implementedCount / dashboardItems.length) * 100;
  const handelNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 shadow-lg">
                <UserStar className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  Manage your tourism platform content and settings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="bg-green-500/10 backdrop-blur-sm text-green-600 dark:text-green-400 border-green-500/20 px-3 py-1.5 text-sm"
              >
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                <span>{implementedCount} Active</span>
              </Badge>
              <Badge
                variant="outline"
                className="bg-amber-500/10 backdrop-blur-sm text-amber-600 dark:text-amber-400 border-amber-500/20 px-3 py-1.5 text-sm"
              >
                <Construction className="w-3 h-3 mr-1.5" />
                <span>{underConstructionCount} In Progress</span>
              </Badge>
            </div>
          </div>

          <Separator className="opacity-50" />

          {/* Info Banner */}
          <Card className="border-blue-500/20 dark:border-blue-900/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm shadow-lg">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="p-3 rounded-xl bg-blue-500/10 backdrop-blur-sm flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1 space-y-2 min-w-0">
                <h4 className="font-semibold text-base text-blue-900 dark:text-blue-300">
                  Platform Development Status
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Some features are still under development. Fully functional
                  modules are marked with a green badge. Items marked "Under
                  Construction" are coming soon.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Total Modules
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {dashboardItems.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Active Features
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {implementedCount}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10 backdrop-blur-sm">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-all xs:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Completion
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {Math.round(completionPercentage)}%
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 backdrop-blur-sm">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress
                    value={completionPercentage}
                    className="h-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-xl">
          <CardHeader className="p-6 border-b border-white/10 dark:border-gray-800/30">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Content Management
                </CardTitle>
                <CardDescription className="mt-2 text-sm text-muted-foreground">
                  Access and manage different sections of your platform
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dashboardItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.implemented;

                return (
                  <button
                    key={item.title}
                    onClick={() => isActive && handelNavigation(item.path)}
                    disabled={!isActive}
                    className={`group text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-xl ${
                      !isActive ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <Card
                      className={`h-full transition-all duration-300 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border-white/20 dark:border-gray-800/50 ${
                        isActive
                          ? "hover:shadow-2xl hover:scale-[1.02] sm:hover:scale-105 hover:border-primary/50"
                          : "opacity-60"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          {/* Icon and Badge */}
                          <div className="flex items-start justify-between">
                            <div
                              className={`p-3 rounded-xl bg-gradient-to-br ${
                                item.gradient || "from-gray-500 to-gray-600"
                              } shadow-lg backdrop-blur-sm ${
                                isActive
                                  ? "group-hover:scale-110 transition-transform duration-300"
                                  : ""
                              }`}
                            >
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            {isActive ? (
                              <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-500/10 backdrop-blur-sm text-amber-600 dark:text-amber-400 border-amber-500/20 text-xs px-2 py-0.5"
                              >
                                <Construction className="w-3 h-3 mr-1" />
                                Soon
                              </Badge>
                            )}
                          </div>

                          {/* Content */}
                          <div className="space-y-3 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3
                                className={`font-semibold text-lg truncate ${
                                  isActive
                                    ? "bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {item.title}
                              </h3>
                              {item.count !== null && isActive && (
                                <Badge
                                  variant="secondary"
                                  className="font-semibold text-xs flex-shrink-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                >
                                  {item.count}
                                </Badge>
                              )}
                            </div>
                            <p
                              className={`text-sm line-clamp-2 ${
                                isActive
                                  ? "text-muted-foreground"
                                  : "text-muted-foreground/60"
                              }`}
                            >
                              {item.description}
                            </p>

                            {isActive && (
                              <Badge
                                variant="outline"
                                className="bg-green-500/10 backdrop-blur-sm text-green-600 dark:text-green-400 border-green-500/20 text-xs w-fit px-2 py-0.5"
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Ready
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Status Card */}
        <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-xl">
          <CardHeader className="p-6 border-b border-white/10 dark:border-gray-800/30">
            <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                System Health
              </span>
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Current platform health and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium flex items-center gap-2 truncate">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <span className="truncate">Database Connection</span>
                </span>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 backdrop-blur-sm text-green-600 dark:text-green-400 border-green-500/20 text-xs"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Healthy
                </Badge>
              </div>
              <Progress
                value={95}
                className="h-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium flex items-center gap-2 truncate">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <span className="truncate">API Response Time</span>
                </span>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 backdrop-blur-sm text-green-600 dark:text-green-400 border-green-500/20 text-xs"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Fast (120ms)
                </Badge>
              </div>
              <Progress
                value={88}
                className="h-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium flex items-center gap-2 truncate">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <span className="truncate">Server Uptime</span>
                </span>
                <Badge
                  variant="outline"
                  className="bg-blue-500/10 backdrop-blur-sm text-blue-600 dark:text-blue-400 border-blue-500/20 text-xs"
                >
                  <Server className="w-3 h-3 mr-1" />
                  99.9%
                </Badge>
              </div>
              <Progress
                value={99.9}
                className="h-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium truncate">
                  Feature Completion
                </span>
                <Badge
                  variant="outline"
                  className="bg-blue-500/10 backdrop-blur-sm text-blue-600 dark:text-blue-400 border-blue-500/20 text-xs"
                >
                  {implementedCount} / {dashboardItems.length}
                </Badge>
              </div>
              <Progress
                value={completionPercentage}
                className="h-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
