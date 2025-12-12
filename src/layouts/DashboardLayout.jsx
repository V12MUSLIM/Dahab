import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Activity,
  Package,
  CalendarCheck,
  Users,
  BarChart3,
  Menu,
  LogOut,
  Settings,
  Phone,
  Bed,
  Link as LinkIcon,
  Award,
  Sparkles,
  Home
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShootingStars } from "@/components/ui/shadcn-io/shooting-stars";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems = [
    { title: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { title: "Hero Sections", path: "/dashboard/heroes", icon: Award },
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

  const NavButton = ({ item, onClose }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return (
      <Button
        key={item.path}
        variant="ghost"
        className={[
          "w-full justify-start gap-3 h-11 px-4 transition-all duration-200 rounded-lg",
          active
            ? "bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 text-primary border-l-4 border-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
        ].join(" ")}
        onClick={() => {
          navigate(item.path);
          onClose?.();
        }}
        aria-current={active ? "page" : undefined}
      >
        {Icon ? <Icon className="h-4 w-4 flex-shrink-0" /> : null}
        <span className="truncate text-sm font-medium">{item.title}</span>
      </Button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-950 dark:to-black relative overflow-hidden">
      {/* Shooting Stars Background - Only in dark mode */}
      <div className="hidden dark:block">
        {/* Static starfield background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_70%)]" />
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes dashboard-stars-twinkle {
              0% { opacity: 0.3; }
              50% { opacity: 0.6; }
              100% { opacity: 0.3; }
            }
          `}} />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 50px 160px, #ddd, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 160px 120px, #ddd, rgba(0,0,0,0))
              `,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
              animation: 'dashboard-stars-twinkle 5s ease-in-out infinite',
              opacity: 0.3
            }}
          />
        </div>
        
        {/* Shooting stars effect - subtle colors */}
        <ShootingStars
          starColor="#6366f1"
          trailColor="#8b5cf6"
          minSpeed={15}
          maxSpeed={35}
          minDelay={2000}
          maxDelay={5000}
        />
      </div>

      {/* Top bar */}
      <header className="fixed top-0 w-full z-40 border-b border-border/50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-secondary"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Dahab Admin
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar Drawer for all screens */}
      <Drawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen}
        direction="left"
      >
        <DrawerContent className="top-0 left-0 right-auto mt-0 w-72 h-full rounded-none border-r border-border/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-950/80">
          <div className="h-full flex flex-col">
            <DrawerHeader className="flex flex-row items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-lg">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <DrawerTitle className="text-lg font-bold text-foreground">
                  Dahab Admin
                </DrawerTitle>
              </div>
              <DrawerClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </DrawerClose>
            </DrawerHeader>
            
            <div className="flex-1 overflow-y-auto p-4">
              {/* User info */}
              <div className="mb-6 px-3 py-3 rounded-xl bg-gradient-to-br from-secondary/50 to-background border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-semibold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || "A"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {user?.name || "Admin"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email || "admin@dahab.com"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavButton 
                    key={item.path} 
                    item={item} 
                    onClose={() => setDrawerOpen(false)}
                  />
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="mt-6 pt-6 border-t border-border/50 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-11 px-4 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/5"
                  onClick={() => {
                    navigate("/");
                    setDrawerOpen(false);
                  }}
                >
                  <Home className="h-4 w-4" />
                  <span className="text-sm font-medium">View Site</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-11 px-4 rounded-lg border-destructive/50 text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive"
                  onClick={() => {
                    handleLogout();
                    setDrawerOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Main content */}
      <main className="min-h-screen relative z-10 pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;