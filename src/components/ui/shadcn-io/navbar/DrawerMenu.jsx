import * as React from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import { ROUTES, UI_TEXT } from "@/config/SiteConfig";

const DrawerMenu = React.memo(({ isMobile = false, onClose, user }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleNavLinkClick = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSearch = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log("Searching for:", searchQuery);
      onClose();
    },
    [searchQuery, onClose]
  );

  return (
    <div className="relative flex flex-col h-full">
      {/* Optimized glass background with will-change */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-white/95 dark:bg-black/95 pointer-events-none"
        style={{ willChange: "transform" }}
      />

      <div className="relative flex-1 overflow-y-auto overscroll-contain px-6 py-6 space-y-4">
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-amber-600 dark:text-amber-400">
            {UI_TEXT.navigation.menu}
          </h2>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </div>

        {isMobile && (
          <div className="space-y-3 pb-4 border-b border-amber-400/20 dark:border-amber-500/30">
            {user ? (
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <Avatar className="h-12 w-12 border-2 border-amber-400/40 dark:border-amber-500/50">
                  <AvatarImage
                    src={
                      user.image || `https://avatar.vercel.sh/${user.name}`
                    }
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-white font-semibold">
                    {user.name[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            ) : (
              <NavLink to={ROUTES.login} onClick={handleNavLinkClick}>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600 transition-all duration-200 shadow-lg shadow-amber-500/25"
                >
                  {UI_TEXT.buttons.login}
                </Button>
              </NavLink>
            )}
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* Search with optimized transitions */}
        <SearchBar
          placeholder={UI_TEXT.search.placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSubmit={handleSearch}
        />

        {/* Navigation with optimized hover states */}
        <NavLinks isDrawer onNavLinkClick={handleNavLinkClick} />
      </div>
    </div>
  );
});

DrawerMenu.displayName = "DrawerMenu";

export default DrawerMenu;