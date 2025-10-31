import * as React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, MapPin, Camera, Calendar, Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ROUTES, UI_TEXT } from "@/config/SiteConfig";
import DrawerMenu from "./DrawerMenu";

const NavbarMobile = React.memo(({ user, isDrawerOpen, setIsDrawerOpen }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-amber-400/20 dark:border-amber-500/30 bg-white/40 dark:bg-black/40 backdrop-blur-xl pb-safe shadow-lg">
      <div className="flex items-center justify-center h-16 px-2">
        <NavLink
          to={ROUTES.home}
          end
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors duration-200",
              isActive
                ? "text-amber-600 dark:text-amber-400"
                : "text-foreground/60"
            )
          }
        >
          <HomeIcon className="h-5 w-5" />
          <span className="text-xs font-medium">
            {UI_TEXT.navigation.home}
          </span>
        </NavLink>

        <NavLink
          to={ROUTES.destinations}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors duration-200",
              isActive
                ? "text-amber-600 dark:text-amber-400"
                : "text-foreground/60"
            )
          }
        >
          <MapPin className="h-5 w-5" />
          <span className="text-xs font-medium">
            {UI_TEXT.navigation.places}
          </span>
        </NavLink>

        <NavLink
          to={ROUTES.experiences}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors duration-200",
              isActive
                ? "text-amber-600 dark:text-amber-400"
                : "text-foreground/60"
            )
          }
        >
          <Camera className="h-5 w-5" />
          <span className="text-xs font-medium">
            {UI_TEXT.navigation.activities}
          </span>
        </NavLink>

        <NavLink
          to={ROUTES.planTrip}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors duration-200",
              isActive
                ? "text-amber-600 dark:text-amber-400"
                : "text-foreground/60"
            )
          }
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs font-medium">
            {UI_TEXT.navigation.plan}
          </span>
        </NavLink>

        {/* Mobile Drawer */}
        <Drawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          direction="right"
        >
          <DrawerTrigger asChild>
            <button className="flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors duration-200 text-foreground/60 hover:text-amber-600 dark:hover:text-amber-400">
              <Menu className="h-5 w-5" />
              <span className="text-xs font-medium">
                {UI_TEXT.navigation.more}
              </span>
            </button>
          </DrawerTrigger>
          <DrawerContent
            className="fixed right-0 top-0 h-full w-full sm:w-[90%] max-w-[400px] p-0 rounded-none border-l border-amber-400/20 dark:border-amber-500/30"
            style={{ transform: "translateX(0)" }}
          >
            <DrawerMenu
              isMobile={true}
              user={user}
              onClose={() => setIsDrawerOpen(false)}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
});

NavbarMobile.displayName = "NavbarMobile";

export default NavbarMobile;