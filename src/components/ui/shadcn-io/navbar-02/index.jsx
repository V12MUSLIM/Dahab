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
  X,
  ChevronDown,
  HomeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Logo from "@/icons/Logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router-dom";
export default function DahabTourismNavbar() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);

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

  const handleNavItemClick = () => {
    setIsMobileDrawerOpen(false);
  };

  return (
    <div className="w-full border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-border">
      <div className=" flex h-14 items-center justify-between px-4">
        <Link to="/">
          {/* Logo */}
          <Logo />
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-4">
              {/* Destinations */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center h-10 px-4 text-muted-foreground hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 transition-all dark:hover:text-yellow-400 dark:hover:border-yellow-400">
                  <MapPin className="mr-2 h-4 w-4" />
                  Destinations
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[600px] grid-cols-2">
                    {destinations.map((destination) => (
                      <NavigationMenuLink key={destination.name} asChild>
                        <a
                          href={destination.href}
                          className="group block select-none space-y-1 rounded-lg p-3 hover:bg-yellow-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <destination.icon className="h-5 w-5 text-yellow-600" />
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
                              {destination.name}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 leading-tight">
                            {destination.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Experiences */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="flex items-center gap-2 h-10 px-4 text-muted-foreground 
             hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 
             border-b-2 border-transparent transition-colors duration-200 dark:hover:text-yellow-400 dark:hover:border-yellow-400"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Experiences
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px]">
                    {experiences.map((experience) => (
                      <NavigationMenuLink key={experience.name} asChild>
                        <a
                          href={experience.href}
                          className="group block select-none space-y-1 rounded-lg p-3 hover:bg-yellow-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <experience.icon className="h-5 w-5 text-yellow-600" />
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
                              {experience.name}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 leading-tight">
                            {experience.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Stay */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/stay"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex items-center h-10 px-4 text-muted-foreground hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 transition-all dark:hover:text-yellow-400 dark:hover:border-yellow-400"
                  )}
                >
                  <Bed
                    className="mr-2 h-5 w-5 text-yellow-600 shrink-0"
                    strokeWidth={2}
                  />
                  Stay
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Dine */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/dine"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex items-center h-10 px-4 text-muted-foreground hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 transition-all dark:hover:text-yellow-400 dark:hover:border-yellow-400"
                  )}
                >
                  <Utensils
                    className="mr-2 h-5 w-5 text-yellow-600 shrink-0"
                    strokeWidth={2}
                  />
                  Dine
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Plan Trip */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/plantrip"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex items-center h-10 px-4 text-muted-foreground hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 transition-all dark:hover:text-yellow-400 dark:hover:border-yellow-400"
                  )}
                >
                  <Calendar
                    className="mr-2 h-5 w-5 text-yellow-600 shrink-0"
                    strokeWidth={2}
                  />
                  Plan Trip
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-yellow-600 dark:hover:text-yellow-400"
          >
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button
            size="sm"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 dark:bg-yellow-500 dark:hover:bg-yellow-600"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <Drawer
            direction="right"
            open={isMobileDrawerOpen}
            onOpenChange={setIsMobileDrawerOpen}
          >
            <DrawerTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>

            <DrawerContent className="h-full w-80 max-w-[85vw]">
              <div className="flex flex-col h-full">
                <DrawerHeader className="text-left border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Waves className="h-6 w-6 text-yellow-600" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                      </div>
                      <DrawerTitle className="text-lg font-bold text-gray-900 dark:text-white">
                        Dahab
                      </DrawerTitle>
                    </div>
                    <DrawerClose asChild>
                      <Button variant="ghost" size="sm">
                        <X className="h-5 w-5" />
                      </Button>
                    </DrawerClose>
                  </div>
                  <DrawerDescription className="text-yellow-600 font-medium">
                    Red Sea Paradise
                  </DrawerDescription>
                </DrawerHeader>

                {/* Mobile Navigation Items */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-2">
                    {/* Destinations Dropdown */}
                    <Accordion type="single" collapsible className="w-full">
                      {/* Destinations */}
                      <AccordionItem value="destinations">
                        <AccordionTrigger className="flex items-center justify-between text-gray-700 hover:text-yellow-600 [&>svg:last-child]:hidden">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-yellow-600" />
                            <span>Destinations</span>
                          </div>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-6">
                            {destinations.map((destination) => {
                              const Icon = destination.icon;
                              return (
                                <button
                                  key={destination.name}
                                  onClick={handleNavItemClick}
                                  className="flex w-full items-center gap-3 p-2 text-sm rounded-lg hover:bg-yellow-50 text-gray-700 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-yellow-400"
                                >
                                  <Icon className="h-5 w-5 text-yellow-600" />
                                  <span>{destination.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Experiences */}
                      <AccordionItem value="experiences">
                        <AccordionTrigger className="flex items-center justify-between text-gray-700 hover:text-yellow-600 [&>svg:last-child]:hidden">
                          <div className="flex items-center gap-3">
                            <Camera className="h-5 w-5 text-yellow-600" />
                            <span>Experiences</span>
                          </div>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-6">
                            {experiences.map((experience) => {
                              const Icon = experience.icon;
                              return (
                                <button
                                  key={experience.name}
                                  onClick={handleNavItemClick}
                                  className="flex w-full items-center gap-3 p-2 text-sm rounded-lg hover:bg-yellow-50 text-gray-700 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-yellow-400"
                                >
                                  <Icon className="h-5 w-5 text-yellow-600" />
                                  <span>{experience.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Link to="/">
                      {/* Other Navigation Items */}
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                        onClick={handleNavItemClick}
                      >
                        <HomeIcon lassName="mr-3 h-5 w-5" />
                        Home
                      </Button>
                    </Link>
                    <Link to="/stay">
                      {/* Other Navigation Items */}
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                        onClick={handleNavItemClick}
                      >
                        <Bed className="mr-3 h-5 w-5" />
                        Stay
                      </Button>
                    </Link>
                    <Link to="/dine">
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                        onClick={handleNavItemClick}
                      >
                        <Utensils className="mr-3 h-5 w-5" />
                        Dine
                      </Button>
                    </Link>
                    <Link to="/plantrip">
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                        onClick={handleNavItemClick}
                      >
                        <Calendar className="mr-3 h-5 w-5" />
                        Plan Trip
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Mobile Footer Actions */}
                <DrawerFooter className="border-t space-y-2  ">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleNavItemClick}
                  >
                    <Phone className="mr-3 h-5 w-5 self-center " />
                    Contact
                  </Button>
                  <Button
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                    onClick={handleNavItemClick}
                  >
                    Book Now
                  </Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
