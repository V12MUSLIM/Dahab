import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
// Optional: icons for clearer wayfinding (remove if not installed)
import {
  LayoutDashboard,
  MapPin,
  Activity,
  Package,
  CalendarCheck,
  Users,
  BarChart3,
  Menu,
} from "lucide-react";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { title: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { title: "Destinations", path: "/dashboard/destinations", icon: MapPin },
    { title: "Activities", path: "/dashboard/activities", icon: Activity },
    { title: "Packages", path: "/dashboard/packages", icon: Package },
    { title: "Bookings", path: "/dashboard/bookings", icon: CalendarCheck },
    { title: "Users", path: "/dashboard/users", icon: Users },
    { title: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const NavButton = ({ item }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return (
      <Button
        key={item.path}
        variant="ghost"
        className={[
          "w-full justify-start gap-2",
          active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
        ].join(" ")}
        onClick={() => {
          navigate(item.path);
          setMobileOpen(false);
        }}
        aria-current={active ? "page" : undefined}
      >
        {Icon ? <Icon className="h-4 w-4" /> : null}
        <span className="truncate">{item.title}</span>
      </Button>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle sidebar"
            aria-expanded={mobileOpen}
            aria-controls="dashboard-sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold">Dahab Admin</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/analytics")}>
              Analytics
            </Button>
            <Button size="sm" onClick={() => navigate("/dashboard/destinations")}>
              New destination
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar (desktop) */}
      <aside
        id="dashboard-sidebar"
        className="fixed left-0 top-0 hidden h-full w-64 border-r bg-card md:block"
        aria-label="Main"
      >
        <div className="px-4 pb-4 pt-16">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavButton key={item.path} item={item} />
            ))}
          </nav>
        </div>
      </aside>

      {/* Sidebar (mobile, sliding) */}
      <div
        className={[
          "fixed inset-0 z-50 bg-black/40 transition-opacity md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-full w-64 border-r bg-card transition-transform md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-label="Main"
      >
        <div className="px-4 pb-4 pt-16">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavButton key={item.path} item={item} />
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="px-4 py-6 md:ml-64">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
