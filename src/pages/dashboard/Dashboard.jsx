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
import { usePackages } from "@/hooks/usePackages";
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
  Bed,
  Phone,
  Construction,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSocials } from "@/hooks/useSocials";
import { useContact } from "@/hooks/useContact";
import { useStay } from "@/hooks/useStay";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const navigate = useNavigate();

  const { socialsQuery } = useSocials();
  const { contactQuery } = useContact();
  const { data: socialMedia, isLoading: isSocialsLoading } = socialsQuery;
  const { packages, isLoading: isPackagesLoading } = usePackages();
  const { data: contactApiResponse, isLoading: isContactsLoading } =
    contactQuery;
  const { data: stay, isLoading: isStayLoading } = useStay();

  const socials = Array.isArray(socialMedia) ? socialMedia : [];
  const rawContactsArray = contactApiResponse?.contacts;
  const contacts = Array.isArray(rawContactsArray) ? rawContactsArray : [];

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
  const completionPercentage =
    (implementedCount / dashboardItems.length) * 100;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage your tourism platform content and settings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900 px-3 py-1"
              >
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                {implementedCount} Active
              </Badge>
              <Badge
                variant="outline"
                className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900 px-3 py-1"
              >
                <Construction className="w-3 h-3 mr-1.5" />
                {underConstructionCount} In Progress
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Info Banner */}
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-background to-secondary/50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Total Modules
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {dashboardItems.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-secondary/50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Active Features
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {implementedCount}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-secondary/50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Completion
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {Math.round(completionPercentage)}%
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-3">
                  <Progress
                    value={completionPercentage}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Content Management</CardTitle>
                <CardDescription className="mt-1">
                  Access and manage different sections of your platform
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dashboardItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.implemented;

                return (
                  <button
                    key={item.title}
                    onClick={() => isActive && navigate(item.path)}
                    disabled={!isActive}
                    className={`group text-left focus:outline-none ${
                      !isActive ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <Card
                      className={`h-full transition-all duration-300 ${
                        isActive
                          ? "hover:shadow-xl hover:scale-105 hover:border-primary/50"
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
                              } shadow-lg ${
                                isActive
                                  ? "group-hover:scale-110 transition-transform"
                                  : ""
                              }`}
                            >
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            {isActive ? (
                              <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900 text-xs"
                              >
                                <Construction className="w-3 h-3 mr-1" />
                                Soon
                              </Badge>
                            )}
                          </div>

                          {/* Content */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <h3
                                className={`font-semibold text-lg ${
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
                                  className="font-semibold"
                                >
                                  {item.count}
                                </Badge>
                              )}
                            </div>
                            <p
                              className={`text-sm ${
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
                                className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900 text-xs w-fit"
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              System Health
            </CardTitle>
            <CardDescription>
              Current platform health and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Database Connection
                </span>
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Healthy
                </Badge>
              </div>
              <Progress value={95} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  API Response Time
                </span>
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Fast (120ms)
                </Badge>
              </div>
              <Progress value={88} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Feature Completion</span>
                <Badge
                  variant="outline"
                  className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900"
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