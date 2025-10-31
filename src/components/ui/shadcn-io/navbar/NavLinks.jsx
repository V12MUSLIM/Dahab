import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  MapPin,
  Camera,
  ChevronDown,
  Bed,
  Utensils,
  Calendar,
  ArrowRight,
  Info,
  Star,
  Users,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ROUTES,
  DESTINATIONS,
  EXPERIENCES,
  UI_TEXT,
  CONTACT,
} from "@/config/SiteConfig";
import { Waves, Mountain } from "lucide-react";

// Icon mapping helper
const iconMap = {
  Waves,
  Mountain,
  Camera,
};

// Map destinations with actual icon components
const destinations = DESTINATIONS.map((dest) => ({
  ...dest,
  icon: iconMap[dest.iconName],
}));

// Map experiences with actual icon components
const experiences = EXPERIENCES.map((exp) => ({
  ...exp,
  icon: iconMap[exp.iconName],
}));

const NavLinks = React.memo(({ onNavLinkClick, isDrawer = false }) => {
  const [destinationsOpen, setDestinationsOpen] = React.useState(false);
  const [experiencesOpen, setExperiencesOpen] = React.useState(false);

  const handleLinkClick = () => {
    setDestinationsOpen(false);
    setExperiencesOpen(false);
    onNavLinkClick?.();
  };

  if (isDrawer) {
    return (
      <nav className="space-y-2">
        <NavLink to={ROUTES.home} onClick={handleLinkClick}>
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
              <NavLink key={name} to={href} onClick={handleLinkClick}>
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
            <NavLink to={ROUTES.destinations} onClick={handleLinkClick}>
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
        <Collapsible
          open={experiencesOpen}
          onOpenChange={setExperiencesOpen}
        >
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
              <NavLink key={name} to={href} onClick={handleLinkClick}>
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
            <NavLink to={ROUTES.experiences} onClick={handleLinkClick}>
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

        <NavLink to={ROUTES.stay} onClick={handleLinkClick}>
          <Button
            variant="ghost"
            className="w-full justify-start h-12 text-base hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
          >
            <Bed className="mr-3 h-5 w-5" />
            {UI_TEXT.navigation.stay}
          </Button>
        </NavLink>

        <NavLink to={ROUTES.dine} onClick={handleLinkClick}>
          <Button
            variant="ghost"
            className="w-full justify-start h-12 text-base hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
          >
            <Utensils className="mr-3 h-5 w-5" />
            {UI_TEXT.navigation.dine}
          </Button>
        </NavLink>

        <NavLink to={ROUTES.planTrip} onClick={handleLinkClick}>
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

          <NavLink to={ROUTES.about} onClick={handleLinkClick}>
            <Button
              variant="ghost"
              className="w-full justify-start h-10 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
            >
              <Info className="mr-3 h-4 w-4" />
              {UI_TEXT.menu.aboutDahab}
            </Button>
          </NavLink>

          <NavLink to={ROUTES.reviews} onClick={handleLinkClick}>
            <Button
              variant="ghost"
              className="w-full justify-start h-10 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
            >
              <Star className="mr-3 h-4 w-4" />
              {UI_TEXT.menu.reviews}
            </Button>
          </NavLink>

          <NavLink to={ROUTES.groups} onClick={handleLinkClick}>
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

          <NavLink to={ROUTES.contact} onClick={handleLinkClick}>
            <Button
              variant="ghost"
              className="w-full justify-start h-10 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
            >
              <Phone className="mr-3 h-4 w-4" />
              {CONTACT.phone}
            </Button>
          </NavLink>

          <a href={`mailto:${CONTACT.email}`} className="block">
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
    );
  }

  // Desktop nav links (horizontal)
  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
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
  );
});

NavLinks.displayName = "NavLinks";

export default NavLinks;