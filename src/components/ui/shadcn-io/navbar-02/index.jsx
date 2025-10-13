"use client";

import * as React from "react";
import {
  Search,
  Mail,
  Star,
  Users,
  Info,
  ArrowRight,
  X,
  Waves,
  Mountain,
  Camera,
  Menu,
  HomeIcon,
  MapPin,
  Calendar,
  ChevronDown,
  Bed,
  Utensils,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import Logo from "@/icons/Logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLink } from "react-router-dom";
import { CONTACT, ROUTES, DESTINATIONS, EXPERIENCES, UI_TEXT} from "@/config/SiteConfig"

// Icon mapping helper
const iconMap = {
  Waves,
  Mountain,
  Camera,
};

// Map destinations with actual icon components
const destinations = DESTINATIONS.map(dest => ({
  ...dest,
  icon: iconMap[dest.iconName],
}));

// Map experiences with actual icon components
const experiences = EXPERIENCES.map(exp => ({
  ...exp,
  icon: iconMap[exp.iconName],
}));

// Memoized drawer content component
const DrawerContentComponent = React.memo(({ isMobile = false, onClose }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [destinationsOpen, setDestinationsOpen] = React.useState(false);
  const [experiencesOpen, setExperiencesOpen] = React.useState(false);

  const handleNavLinkClick = React.useCallback(() => {
    onClose();
    setDestinationsOpen(false);
    setExperiencesOpen(false);
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
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600 transition-all duration-200 shadow-lg shadow-amber-500/25"
                onClick={handleNavLinkClick}
              >
                {UI_TEXT.buttons.bookAdventure}
              </Button>
            </NavLink>
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* Search with optimized transitions */}
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600 dark:text-amber-400" />
            <Input
              placeholder={UI_TEXT.search.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 bg-white/50 dark:bg-black/20 border border-amber-400/40 dark:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-200"
            />
          </div>
        </form>

        {/* Navigation with optimized hover states */}
        <nav className="space-y-2">
          <NavLink to={ROUTES.home} onClick={handleNavLinkClick}>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-base hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
            >
              <HomeIcon className="mr-3 h-5 w-5" />
              {UI_TEXT.navigation.home}
            </Button>
          </NavLink>

          {/* Destinations with smooth collapse */}
          <Collapsible
            open={destinationsOpen}
            onOpenChange={setDestinationsOpen}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between h-12 text-base hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
              >
                <div className="flex items-center">
                  <MapPin className="mr-3 h-5 w-5" />
                  {UI_TEXT.navigation.destinations}
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200 text-amber-600 dark:text-amber-400",
                    destinationsOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 pl-4 border-l border-amber-400/20 dark:border-amber-500/30 space-y-1 mt-1 transition-all duration-200">
              {destinations.map(({ name, description, icon: Icon, href }) => (
                <NavLink key={name} to={href} onClick={handleNavLinkClick}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto py-2 text-sm text-muted-foreground hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
                  >
                    <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium">{name}</div>
                      <div className="text-xs text-muted-foreground/70">
                        {description}
                      </div>
                    </div>
                  </Button>
                </NavLink>
              ))}
              <NavLink to={ROUTES.destinations} onClick={handleNavLinkClick}>
                <Button
                  variant="ghost"
                  className="text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transform hover:scale-105 transition-all duration-200 group w-full justify-start"
                >
                  {UI_TEXT.buttons.viewAll}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </NavLink>
            </CollapsibleContent>
          </Collapsible>

          {/* Experiences with smooth collapse */}
          <Collapsible open={experiencesOpen} onOpenChange={setExperiencesOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between h-12 text-base hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
              >
                <div className="flex items-center">
                  <Camera className="mr-3 h-5 w-5" />
                  {UI_TEXT.navigation.experiences}
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200 text-amber-600 dark:text-amber-400",
                    experiencesOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 pl-4 border-l border-amber-400/20 dark:border-amber-500/30 space-y-1 mt-1 transition-all duration-200">
              {experiences.map(({ name, description, icon: Icon, href }) => (
                <NavLink key={name} to={href} onClick={handleNavLinkClick}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto py-2 text-sm text-muted-foreground hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
                  >
                    <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium">{name}</div>
                      <div className="text-xs text-muted-foreground/70">
                        {description}
                      </div>
                    </div>
                  </Button>
                </NavLink>
              ))}
              <NavLink to={ROUTES.experiences} onClick={handleNavLinkClick}>
                <Button
                  variant="ghost"
                  className="text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transform hover:scale-105 transition-all duration-200 group w-full justify-start"
                >
                  {UI_TEXT.buttons.viewAll}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </NavLink>
            </CollapsibleContent>
          </Collapsible>

          <NavLink to={ROUTES.stay} onClick={handleNavLinkClick}>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-base hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
            >
              <Bed className="mr-3 h-5 w-5" />
              {UI_TEXT.navigation.stay}
            </Button>
          </NavLink>

          <NavLink to={ROUTES.dine} onClick={handleNavLinkClick}>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-base hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
            >
              <Utensils className="mr-3 h-5 w-5" />
              {UI_TEXT.navigation.dine}
            </Button>
          </NavLink>

          <NavLink to={ROUTES.planTrip} onClick={handleNavLinkClick}>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-base hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
            >
              <Calendar className="mr-3 h-5 w-5" />
              {UI_TEXT.navigation.planTrip}
            </Button>
          </NavLink>

          <Separator className="my-4 border-amber-400/20 dark:border-amber-500/30" />

          {/* More Section */}
          <div className="space-y-1">
            <h3 className="font-semibold text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider px-3 mb-2">
              {UI_TEXT.sections.more}
            </h3>

            <NavLink to={ROUTES.about} onClick={handleNavLinkClick}>
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
              >
                <Info className="mr-3 h-4 w-4" />
                {UI_TEXT.menu.aboutDahab}
              </Button>
            </NavLink>

            <NavLink to={ROUTES.reviews} onClick={handleNavLinkClick}>
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
              >
                <Star className="mr-3 h-4 w-4" />
                {UI_TEXT.menu.reviews}
              </Button>
            </NavLink>

            <NavLink to={ROUTES.groups} onClick={handleNavLinkClick}>
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
              >
                <Users className="mr-3 h-4 w-4" />
                {UI_TEXT.menu.groupTours}
              </Button>
            </NavLink>
          </div>

          <Separator className="my-4 border-amber-400/20 dark:border-amber-500/30" />

          {/* Contact Section */}
          <div className="space-y-1">
            <h3 className="font-semibold text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider px-3 mb-2">
              {UI_TEXT.sections.getInTouch}
            </h3>

            <NavLink to={ROUTES.contact} onClick={handleNavLinkClick}>
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
              >
                <Phone className="mr-3 h-4 w-4" />
                {CONTACT.phone}
              </Button>
            </NavLink>

            <a
              href={`mailto:${CONTACT.email}`}
              className="block"
            >
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
              >
                <Mail className="mr-3 h-4 w-4" />
                {CONTACT.email}
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
});

DrawerContentComponent.displayName = "DrawerContentComponent";

export default function DahabTourismNavbar() {
  const [isDesktopDrawerOpen, setIsDesktopDrawerOpen] = React.useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);
  const [desktopSearchQuery, setDesktopSearchQuery] = React.useState("");
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  const handleDesktopSearch = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log("Searching for:", desktopSearchQuery);
    },
    [desktopSearchQuery]
  );

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:block sticky top-0 z-50 w-full border-b border-amber-400/20 dark:border-amber-500/30 bg-white/80 dark:bg-black/40 backdrop-blur-xl shadow-sm">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
          <NavLink to={ROUTES.home} className="flex items-center space-x-2">
            <Logo />
          </NavLink>

          <div className="flex items-center flex-1 max-w-3xl mx-8">
            <nav className="flex items-center space-x-6 text-sm font-medium mr-8">
              <NavLink
                to={ROUTES.home}
                end
                className={({ isActive }) =>
                  cn(
                    "transition-colors duration-200 whitespace-nowrap",
                    isActive
                      ? "text-amber-600 dark:text-amber-400 font-semibold"
                      : "text-foreground/60 hover:text-amber-600 dark:hover:text-amber-400"
                  )
                }
              >
                {UI_TEXT.navigation.home}
              </NavLink>
              <NavLink
                to={ROUTES.stay}
                className={({ isActive }) =>
                  cn(
                    "transition-colors duration-200 whitespace-nowrap",
                    isActive
                      ? "text-amber-600 dark:text-amber-400 font-semibold"
                      : "text-foreground/60 hover:text-amber-600 dark:hover:text-amber-400"
                  )
                }
              >
                {UI_TEXT.navigation.stay}
              </NavLink>
              <NavLink
                to={ROUTES.dine}
                className={({ isActive }) =>
                  cn(
                    "transition-colors duration-200 whitespace-nowrap",
                    isActive
                      ? "text-amber-600 dark:text-amber-400 font-semibold"
                      : "text-foreground/60 hover:text-amber-600 dark:hover:text-amber-400"
                  )
                }
              >
                {UI_TEXT.navigation.dine}
              </NavLink>
              <NavLink
                to={ROUTES.planTrip}
                className={({ isActive }) =>
                  cn(
                    "transition-colors duration-200 whitespace-nowrap",
                    isActive
                      ? "text-amber-600 dark:text-amber-400 font-semibold"
                      : "text-foreground/60 hover:text-amber-600 dark:hover:text-amber-400"
                  )
                }
              >
                {UI_TEXT.navigation.planTrip}
              </NavLink>
              <NavLink
                to={ROUTES.destinations}
                className={({ isActive }) =>
                  cn(
                    "transition-colors duration-200 whitespace-nowrap",
                    isActive
                      ? "text-amber-600 dark:text-amber-400 font-semibold"
                      : "text-foreground/60 hover:text-amber-600 dark:hover:text-amber-400"
                  )
                }
              >
                {UI_TEXT.navigation.destinations}
              </NavLink>
              <NavLink
                to={ROUTES.experiences}
                className={({ isActive }) =>
                  cn(
                    "transition-colors duration-200 whitespace-nowrap",
                    isActive
                      ? "text-amber-600 dark:text-amber-400 font-semibold"
                      : "text-foreground/60 hover:text-amber-600 dark:hover:text-amber-400"
                  )
                }
              >
                {UI_TEXT.navigation.experiences}
              </NavLink>
            </nav>

            {/* Desktop Search */}
            <form
              onSubmit={handleDesktopSearch}
              className="relative flex-1 max-w-sm"
            >
              <div
                className={cn(
                  "relative transition-all duration-200",
                  isSearchFocused && "scale-105"
                )}
              >
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={UI_TEXT.search.desktopPlaceholder}
                  value={desktopSearchQuery}
                  onChange={(e) => setDesktopSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="pl-9 pr-4 h-9 bg-background/60 border-amber-200/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
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
                {UI_TEXT.buttons.bookNow}
              </Button>
            </NavLink>
            {/* Desktop Drawer */}
            <Drawer
              open={isDesktopDrawerOpen}
              onOpenChange={setIsDesktopDrawerOpen}
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
                <DrawerContentComponent
                  isMobile={false}
                  onClose={() => setIsDesktopDrawerOpen(false)}
                />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
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
            <span className="text-xs font-medium">{UI_TEXT.navigation.home}</span>
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
            <span className="text-xs font-medium">{UI_TEXT.navigation.places}</span>
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
            <span className="text-xs font-medium">{UI_TEXT.navigation.activities}</span>
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
            <span className="text-xs font-medium">{UI_TEXT.navigation.plan}</span>
          </NavLink>

          {/* Mobile Drawer */}
          <Drawer
            open={isMobileDrawerOpen}
            onOpenChange={setIsMobileDrawerOpen}
            direction="right"
          >
            <DrawerTrigger asChild>
              <button className="flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors duration-200 text-foreground/60 hover:text-amber-600 dark:hover:text-amber-400">
                <Menu className="h-5 w-5" />
                <span className="text-xs font-medium">{UI_TEXT.navigation.more}</span>
              </button>
            </DrawerTrigger>
            <DrawerContent
              className="fixed right-0 top-0 h-full w-full sm:w-[90%] max-w-[400px] p-0 rounded-none border-l border-amber-400/20 dark:border-amber-500/30"
              style={{ transform: "translateX(0)" }}
            >
              <DrawerContentComponent
                isMobile={true}
                onClose={() => setIsMobileDrawerOpen(false)}
              />
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </>
  );
}