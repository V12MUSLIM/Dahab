"use client";

import * as React from "react";
import {
  MapPin,
  Camera,
  Utensils,
  Bed,
  Waves,
  Mountain,
  Calendar,
  Phone,
  Menu,
  ChevronDown,
  Home as HomeIcon,
  Search,
  Mail,
  Star,
  Users,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
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

export default function DahabTourismNavbar() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [desktopSearchQuery, setDesktopSearchQuery] = React.useState("");
  const [destinationsOpen, setDestinationsOpen] = React.useState(false);
  const [experiencesOpen, setExperiencesOpen] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  const destinations = [
    {
      name: "Blue Hole",
      description: "World-famous diving spot with crystal clear waters",
      icon: Waves,
      href: "/destinations/blue-hole",
    },
    {
      name: "Mount Sinai",
      description: "Sacred mountain with breathtaking sunrise views",
      icon: Mountain,
      href: "/destinations/mount-sinai",
    },
    {
      name: "Colored Canyon",
      description: "Spectacular rock formations and hiking trails",
      icon: Mountain,
      href: "/destinations/colored-canyon",
    },
    {
      name: "Dahab Lagoon",
      description: "Perfect for windsurfing and kitesurfing",
      icon: Waves,
      href: "/destinations/lagoon",
    },
  ];

  const experiences = [
    {
      name: "Scuba Diving",
      description: "Explore the Red Sea's underwater paradise",
      icon: Waves,
      href: "/activities/diving",
    },
    {
      name: "Desert Safari",
      description: "Camel rides and Bedouin culture experiences",
      icon: Camera,
      href: "/activities/safari",
    },
    {
      name: "Snorkeling Tours",
      description: "Discover colorful coral reefs and marine life",
      icon: Waves,
      href: "/activities/snorkeling",
    },
  ];

  const handleNavLinkClick = () => {
    setIsSheetOpen(false);
    setDestinationsOpen(false);
    setExperiencesOpen(false);
  };

  const handleSearch = (e, isDesktop = false) => {
    e.preventDefault();
    const query = isDesktop ? desktopSearchQuery : searchQuery;
    // Handle search logic here
    console.log("Searching for:", query);
    if (!isDesktop) {
      setIsSheetOpen(false);
    }
    // You can add navigation to search results page here
    // navigate(`/search?q=${query}`);
  };

  const handleDesktopSearch = (e) => {
    e.preventDefault();
    handleSearch(e, true);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <Logo />
        </NavLink>

        {/* Center Content - Desktop */}
        <div className="hidden lg:flex items-center flex-1 max-w-3xl mx-8">
          <nav className="flex items-center space-x-6 text-sm font-medium mr-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cn(
                  "transition-colors whitespace-nowrap",
                  isActive
                    ? "text-amber-600 font-semibold" // active style
                    : "text-foreground/60 hover:text-amber-600"
                )
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/stay"
              end
              className={({ isActive }) =>
                cn(
                  "transition-colors whitespace-nowrap",
                  isActive
                    ? "text-amber-600 font-semibold" // active style
                    : "text-foreground/60 hover:text-amber-600"
                )
              }
            >
              Stay
            </NavLink>
            <NavLink
              to="/dine"
              className={({ isActive }) =>
                cn(
                  "transition-colors whitespace-nowrap",
                  isActive
                    ? "text-amber-600 font-semibold" // active style
                    : "text-foreground/60 hover:text-amber-600"
                )
              }
            >
              Dine
            </NavLink>
            <NavLink
              to="/plantrip"
              className={({ isActive }) =>
                cn(
                  "transition-colors whitespace-nowrap",
                  isActive
                    ? "text-amber-600 font-semibold" // active style
                    : "text-foreground/60 hover:text-amber-600"
                )
              }
            >
              Plan Trip
            </NavLink>
            <NavLink
              to="/destinations"
              className="text-foreground/60 transition-colors hover:text-amber-600 whitespace-nowrap"
            >
              Destinations
            </NavLink>
            <NavLink
              to="/experiences"
              className="text-foreground/60 transition-colors hover:text-amber-600 whitespace-nowrap"
            >
              Experiences
            </NavLink>
          </nav>

          {/* Desktop Search Bar */}
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
                placeholder="Search destinations..."
                value={desktopSearchQuery}
                onChange={(e) => setDesktopSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-9 pr-4 h-9 bg-background/60 border-amber-200/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
              />
            </div>
          </form>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <Button
            size="sm"
            className="hidden sm:inline-flex bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25"
          >
            Book Now
          </Button>

          {/* Universal Menu Sheet */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-amber-50 hover:text-amber-600 transition-colors"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-[400px] p-0 overflow-y-auto border-l-2 border-amber-100"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <SheetHeader className="px-6 py-5 border-b bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/30">
                  <div className="flex items-center justify-between">
                    <Logo />
                    <SheetClose asChild></SheetClose>
                  </div>
                </SheetHeader>

                {/* Search */}
                <div className="px-6 py-4 border-b bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10">
                  <form
                    onSubmit={(e) => handleSearch(e, false)}
                    className="relative"
                  >
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600/60" />
                    <Input
                      placeholder="Search destinations, activities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 bg-background border-amber-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                  </form>
                </div>

                {/* Navigation Content */}
                <div className="flex-1 px-6 py-6 space-y-3">
                  {/* Quick Actions - Mobile */}
                  <div className="lg:hidden space-y-3 pb-4 border-b">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25"
                      onClick={handleNavLinkClick}
                    >
                      Book Your Adventure
                    </Button>
                    <div className="flex justify-center">
                      <ThemeToggle />
                    </div>
                  </div>

                  {/* Main Navigation */}
                  <div className="space-y-1">
                    <NavLink to="/" onClick={handleNavLinkClick}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-base hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all group"
                      >
                        <HomeIcon className="mr-3 h-5 w-5 group-hover:text-amber-600" />
                        Home
                      </Button>
                    </NavLink>

                    {/* Destinations Collapsible */}
                    <Collapsible
                      open={destinationsOpen}
                      onOpenChange={setDestinationsOpen}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between h-12 text-base hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all group"
                        >
                          <div className="flex items-center">
                            <MapPin className="mr-3 h-5 w-5 group-hover:text-amber-600" />
                            Destinations
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform text-amber-600/60",
                              destinationsOpen && "rotate-180"
                            )}
                          />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 mt-2 ml-4 border-l-2 border-amber-100 pl-4">
                        {destinations.map((destination) => {
                          const Icon = destination.icon;
                          return (
                            <NavLink
                              key={destination.name}
                              to={destination.href}
                              onClick={handleNavLinkClick}
                            >
                              <Button
                                variant="ghost"
                                className="w-full justify-start h-10 text-sm text-muted-foreground hover:bg-amber-50/50 hover:text-amber-600 transition-all"
                              >
                                <Icon className="mr-3 h-4 w-4" />
                                <div className="text-left">
                                  <div className="font-medium">
                                    {destination.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground/70">
                                    {destination.description}
                                  </div>
                                </div>
                              </Button>
                            </NavLink>
                          );
                        })}
                        <NavLink to="/destinations">
                          <Button
                            variant="ghost"
                            onClick={() => setIsSheetOpen(false)}
                            className="pt-auto text-amber-500 hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 group w-full sm:w-auto"
                          >
                            View All
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </NavLink>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Experiences Collapsible */}
                    <Collapsible
                      open={experiencesOpen}
                      onOpenChange={setExperiencesOpen}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between h-12 text-base hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all group"
                        >
                          <div className="flex items-center">
                            <Camera className="mr-3 h-5 w-5 group-hover:text-amber-600" />
                            Experiences
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform text-amber-600/60",
                              experiencesOpen && "rotate-180"
                            )}
                          />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 mt-2 ml-4 border-l-2 border-amber-100 pl-4">
                        {experiences.map((experience) => {
                          const Icon = experience.icon;
                          return (
                            <NavLink
                              key={experience.name}
                              to={experience.href}
                              onClick={handleNavLinkClick}
                            >
                              <Button
                                variant="ghost"
                                className="w-full justify-start h-10 text-sm text-muted-foreground hover:bg-amber-50/50 hover:text-amber-600 transition-all"
                              >
                                <Icon className="mr-3 h-4 w-4" />
                                <div className="text-left">
                                  <div className="font-medium">
                                    {experience.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground/70">
                                    {experience.description}
                                  </div>
                                </div>
                              </Button>
                            </NavLink>
                          );
                        })}

                        <NavLink to="/experiences">
                          <Button
                            variant="ghost"
                            onClick={() => setIsSheetOpen(false)}
                            className="pt-auto text-amber-500 hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 group w-full sm:w-auto"
                          >
                            View All
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </NavLink>
                      </CollapsibleContent>
                    </Collapsible>

                    <NavLink to="/stay" onClick={handleNavLinkClick}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-base hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all group"
                      >
                        <Bed className="mr-3 h-5 w-5 group-hover:text-amber-600" />
                        Stay
                      </Button>
                    </NavLink>

                    <NavLink to="/dine" onClick={handleNavLinkClick}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-base hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all group"
                      >
                        <Utensils className="mr-3 h-5 w-5 group-hover:text-amber-600" />
                        Dine
                      </Button>
                    </NavLink>

                    <NavLink to="/plantrip" onClick={handleNavLinkClick}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-base hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all group"
                      >
                        <Calendar className="mr-3 h-5 w-5 group-hover:text-amber-600" />
                        Plan Trip
                      </Button>
                    </NavLink>
                  </div>

                  <Separator className="my-4 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100" />

                  {/* Additional NavLinks */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-xs text-amber-600/70 uppercase tracking-wider px-3 mb-2">
                      More
                    </h3>

                    <NavLink to="/about" onClick={handleNavLinkClick}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-10 text-sm hover:bg-amber-50/50 hover:text-amber-600 transition-all"
                      >
                        <Info className="mr-3 h-4 w-4" />
                        About Dahab
                      </Button>
                    </NavLink>

                    <NavLink to="/reviews" onClick={handleNavLinkClick}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-10 text-sm hover:bg-amber-50/50 hover:text-amber-600 transition-all"
                      >
                        <Star className="mr-3 h-4 w-4" />
                        Reviews
                      </Button>
                    </NavLink>

                    <NavLink to="/groups" onClick={handleNavLinkClick}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-10 text-sm hover:bg-amber-50/50 hover:text-amber-600 transition-all"
                      >
                        <Users className="mr-3 h-4 w-4" />
                        Group Tours
                      </Button>
                    </NavLink>
                  </div>

                  <Separator className="my-4 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100" />

                  {/* Contact Section */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-xs text-amber-600/70 uppercase tracking-wider px-3 mb-2">
                      Get In Touch
                    </h3>

                    <NavLink to="/contact" onClick={handleNavLinkClick}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-10 text-sm hover:bg-amber-50/50 hover:text-amber-600 transition-all"
                      >
                        <Phone className="mr-3 h-4 w-4" />
                        +20 123 456 789
                      </Button>
                    </NavLink>

                    <Button
                      variant="ghost"
                      className="w-full justify-start h-10 text-sm hover:bg-amber-50/50 hover:text-amber-600 transition-all"
                      onClick={() =>
                        (window.location.href = "mailto:info@dahabtourism.com")
                      }
                    >
                      <Mail className="mr-3 h-4 w-4" />
                      info@dahabtourism.com
                    </Button>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/30 px-6 py-4 mt-auto">
                  <div className="text-center">
                    <p className="font-bold text-sm bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      Experience Dahab
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your gateway to Red Sea adventures
                    </p>
                    <div className="flex justify-center mt-3 space-x-1">
                      <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
                      <div className="w-8 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                      <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
