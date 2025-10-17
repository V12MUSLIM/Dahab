import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// If lucide-react is available; otherwise remove the icons.
import {
  MapPin,
  Activity,
  Package,
  CalendarCheck,
  Users,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const dashboardItems = [
    {
      title: "Destinations",
      description: "Manage all destinations and their details",
      path: "/dashboard/destinations",
      icon: MapPin,
    },
    {
      title: "Activities",
      description: "Manage tourism activities and experiences",
      path: "/dashboard/activities",
      icon: Activity,
    },
    {
      title: "Packages",
      description: "Manage tour packages and deals",
      path: "/dashboard/packages",
      icon: Package,
    },
    {
      title: "Bookings",
      description: "View and manage all bookings",
      path: "/dashboard/bookings",
      icon: CalendarCheck,
    },
    {
      title: "Users",
      description: "Manage user accounts and permissions",
      path: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Analytics",
      description: "View website statistics and reports",
      path: "/dashboard/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Quick access to the main areas you manage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/analytics")}
          >
            View analytics
          </Button>
          <Button onClick={() => navigate("/dashboard/destinations")}>
            Add destination
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="text-left focus:outline-none"
            >
              <Card className="group h-full p-5 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-primary/10 p-2 text-primary">
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </div>
                    <div>
                      <h2 className="text-base font-medium">{item.title}</h2>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
