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
  Sparkles,
  Zap,
  
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Mock data for demonstration
  const packages = [1, 2, 3, 4, 5];
  const stay = [1, 2, 3];
  const contacts = [1, 2];
  const socials = [1, 2, 3, 4];

  const isPackagesLoading = false;
  const isStayLoading = false;
  const isContactsLoading = false;
  const isSocialsLoading = false;
  const navigate = useNavigate();
  const dashboardItems = [
    {
      title: "Hero Sections",
      description: "Edit hero sections title, image etc...",
      path: "/dashboard/herosections",
      icon: Award,
      count: 5,
      status: "under-construction",
      implemented: false,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Destinations",
      description: "Manage all destinations and their details",
      path: "/dashboard/destinations",
      icon: MapPin,
      count: 24,
      status: "under-construction",
      implemented: false,
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
      count: isStayLoading ? "..." : stay?.length ?? 0,
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
      count: isContactsLoading ? "..." : contacts.length ?? 0,
      status: "active",
      implemented: true,
      gradient: "from-sky-500 to-blue-500",
    },
    {
      title: "Social Media",
      description: "Manage social media links",
      path: "/dashboard/socialmedia",
      icon: Link,
      count: isSocialsLoading ? "..." : socials?.length ?? 0,
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
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 md:space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg flex-shrink-0">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight truncate">
                  Admin Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                  Manage your tourism platform content and settings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900 px-2 sm:px-3 py-1 text-xs"
              >
                <CheckCircle2 className="w-3 h-3 mr-1 sm:mr-1.5" />
                <span className="hidden xs:inline">
                  {implementedCount} Active
                </span>
                <span className="xs:hidden">{implementedCount}</span>
              </Badge>
              <Badge
                variant="outline"
                className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900 px-2 sm:px-3 py-1 text-xs"
              >
                <Construction className="w-3 h-3 mr-1 sm:mr-1.5" />
                <span className="hidden xs:inline">
                  {underConstructionCount} In Progress
                </span>
                <span className="xs:hidden">{underConstructionCount}</span>
              </Badge>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Info Banner */}
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50">
            <CardContent className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex-shrink-0">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <h4 className="font-semibold text-sm sm:text-base text-blue-900 dark:text-blue-300">
                  Platform Development Status
                </h4>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-400">
                  Some features are still under development. Fully functional
                  modules are marked with a green badge. Items marked "Under
                  Construction" are coming soon.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Card className="bg-gradient-to-br from-background to-secondary/50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Total Modules
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold mt-1">
                      {dashboardItems.length}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex-shrink-0">
                    <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-secondary/50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Active Features
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold mt-1">
                      {implementedCount}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-secondary/50 hover:shadow-lg transition-shadow xs:col-span-2 lg:col-span-1">
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Completion
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold mt-1">
                      {Math.round(completionPercentage)}%
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 flex-shrink-0">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={completionPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-xl md:text-2xl truncate">
                  Content Management
                </CardTitle>
                <CardDescription className="mt-1 text-xs sm:text-sm line-clamp-2">
                  Access and manage different sections of your platform
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dashboardItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.implemented;

                return (
                  <button
                    key={item.title}
                    onClick={() => isActive && handelNavigation(item.path)}
                    disabled={!isActive}
                    className={`group text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl ${
                      !isActive ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <Card
                      className={`h-full transition-all duration-300 ${
                        isActive
                          ? "hover:shadow-xl hover:scale-[1.02] sm:hover:scale-105 hover:border-primary/50"
                          : "opacity-60"
                      }`}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-3 sm:gap-4">
                          {/* Icon and Badge */}
                          <div className="flex items-start justify-between">
                            <div
                              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${
                                item.gradient || "from-gray-500 to-gray-600"
                              } shadow-lg flex-shrink-0 ${
                                isActive
                                  ? "group-hover:scale-110 transition-transform"
                                  : ""
                              }`}
                            >
                              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            </div>
                            {isActive ? (
                              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900 text-xs px-2 py-0.5"
                              >
                                <Construction className="w-3 h-3 mr-1" />
                                Soon
                              </Badge>
                            )}
                          </div>

                          {/* Content */}
                          <div className="space-y-2 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3
                                className={`font-semibold text-base sm:text-lg truncate ${
                                  isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {item.title}
                              </h3>
                              {item.count !== null && isActive && (
                                <Badge
                                  variant="secondary"
                                  className="font-semibold text-xs flex-shrink-0"
                                >
                                  {item.count}
                                </Badge>
                              )}
                            </div>
                            <p
                              className={`text-xs sm:text-sm line-clamp-2 ${
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
                                className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900 text-xs w-fit px-2 py-0.5"
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
        <Card className="shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <span className="truncate">System Health</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Current platform health and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-medium flex items-center gap-2 truncate">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <span className="truncate">Database Connection</span>
                </span>
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900 text-xs flex-shrink-0"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Healthy
                </Badge>
              </div>
              <Progress value={95} className="h-2" />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-medium flex items-center gap-2 truncate">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <span className="truncate">API Response Time</span>
                </span>
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900 text-xs flex-shrink-0"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  <span className="hidden xs:inline">Fast (120ms)</span>
                  <span className="xs:hidden">120ms</span>
                </Badge>
              </div>
              <Progress value={88} className="h-2" />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-medium truncate">
                  Feature Completion
                </span>
                <Badge
                  variant="outline"
                  className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900 text-xs flex-shrink-0"
                >
                  {implementedCount} / {dashboardItems.length}
                </Badge>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
