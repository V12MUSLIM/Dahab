import * as React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo from "@/icons/Logo";
import { cn } from "@/lib/utils";
import { ROUTES, UI_TEXT } from "@/config/SiteConfig";
import UserNav from "./UserNav";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import DrawerMenu from "./DrawerMenu";

const NavbarDesktop = React.memo(({ user, isDrawerOpen, setIsDrawerOpen }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log("Searching for:", searchQuery);
    },
    [searchQuery]
  );

  return (
    <header className="hidden lg:block fixed top-0 z-50 w-full border-b border-amber-400/20 dark:border-amber-500/30 bg-white/30 dark:bg-black/40 backdrop-blur-xl shadow-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <NavLink to={ROUTES.home} className="flex items-center space-x-2">
          <Logo />
        </NavLink>

        <div className="flex items-center flex-1 max-w-3xl mx-8">
          <div className="mr-8">
            <NavLinks />
          </div>

          {/* Desktop Search */}
          <SearchBar
            isDesktop
            placeholder={UI_TEXT.search.desktopPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleSearch}
          />
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          {user ? (
            <UserNav
              name={user.name}
              email={user.email}
              userImage={user.picture || user.image}
            />
          ) : (
            <NavLink
              to={ROUTES.login}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors duration-200",
                  isActive
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-foreground/60"
                )
              }
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600 transition-all duration-200 shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                {UI_TEXT.buttons.login}
              </Button>
            </NavLink>
          )}
          {/* Desktop Drawer */}
          <Drawer
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            direction="right"
          >
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-amber-50 dark:hover:bg-amber-950/50 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">{UI_TEXT.aria.openMenu}</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent
              className="fixed right-0 top-0 h-full w-full sm:w-[400px] p-0 rounded-none border-l border-amber-400/20 dark:border-amber-500/30"
              style={{ transform: "translateX(0)" }}
            >
              <DrawerMenu
                isMobile={false}
                user={user}
                onClose={() => setIsDrawerOpen(false)}
              />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
});

NavbarDesktop.displayName = "NavbarDesktop";

export default NavbarDesktop;
