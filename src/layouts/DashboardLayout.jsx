import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Activity,
  Package,
  CalendarCheck,
  Users,
  BarChart3,
  Menu,
  X,
  LogOut,
  Settings,
  Phone,
  Bed,
  Link as LinkIcon,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { ThemeToggle } from "@/components/theme-toggle";
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { title: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { title: "Destinations", path: "/dashboard/destinations", icon: MapPin },
    { title: "Activities", path: "/dashboard/activities", icon: Activity },
    { title: "Packages", path: "/dashboard/packages", icon: Package },
    { title: "Bookings", path: "/dashboard/bookings", icon: CalendarCheck },
    { title: "Stays", path: "/dashboard/stays", icon: Bed },
    { title: "Users", path: "/dashboard/users", icon: Users },
    { title: "Contacts", path: "/dashboard/contacts", icon: Phone },
    { title: "Social Media", path: "/dashboard/socialmedia", icon: LinkIcon },
    { title: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const NavButton = ({ item }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return (
      <Button
        key={item.path}
        variant="ghost"
        className={[
          "w-full justify-start gap-3 h-11 px-4",
          active
            ? "bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-white font-medium"
            : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900",
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
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-zinc-950">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-900"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle sidebar"
            aria-expanded={mobileOpen}
            aria-controls="dashboard-sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Dahab Admin
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle/>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-900"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-slate-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar (desktop) */}
      <aside
        id="dashboard-sidebar"
        className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-200 dark:border-gray-800 bg-white dark:bg-zinc-950 md:block"
        aria-label="Main"
      >
        <div className="px-3 pb-4 pt-20">
          {/* User info */}
          <div className="mb-6 px-3 py-2 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-slate-500 dark:text-gray-500 truncate">
                  {user?.email || "admin@dahab.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavButton key={item.path} item={item} />
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-800 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-11 px-4 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900"
              onClick={() => navigate("/")}
            >
              <MapPin className="h-4 w-4" />
              <span>View Site</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      <div
        className={[
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Sidebar (mobile, sliding) */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-full w-72 border-r border-slate-200 dark:border-gray-800 bg-white dark:bg-zinc-950 transition-transform md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-label="Main"
      >
        <div className="px-3 pb-4 pt-4">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-6 px-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Dahab Admin
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="text-slate-600 dark:text-gray-400"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User info */}
          <div className="mb-6 px-3 py-2 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-slate-500 dark:text-gray-500 truncate">
                  {user?.email || "admin@dahab.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavButton key={item.path} item={item} />
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-800 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-11 px-4 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900"
              onClick={() => {
                navigate("/");
                setMobileOpen(false);
              }}
            >
              <MapPin className="h-4 w-4" />
              <span>View Site</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-11 px-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-64 min-h-screen">{children}</main>
    </div>
  );
};

export default DashboardLayout;
