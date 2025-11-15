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
  Waves,
  Mountain,
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
} from "@/config/SiteConfig";
import { useSiteStore } from "@/store/siteStore";

// Map icon names from config to components
const iconMap = { Waves, Mountain, Camera };

const NavItem = ({ to, icon: Icon, label, onClick, className }) => (
  <NavLink to={to} onClick={onClick}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start h-12 text-base hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200",
        className
      )}
    >
      {Icon && <Icon className="mr-3 h-5 w-5 flex-shrink-0" />}
      {label}
    </Button>
  </NavLink>
);

const CollapsibleSection = ({
  title,
  icon: MainIcon,
  items,
  route,
  open,
  setOpen,
  onLinkClick,
}) => (
  <Collapsible open={open} onOpenChange={setOpen}>
    <CollapsibleTrigger asChild>
      <Button
        variant="ghost"
        className="w-full justify-between h-12 text-base hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
      >
        <div className="flex items-center">
          <MainIcon className="mr-3 h-5 w-5" />
          {title}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200 text-amber-600 dark:text-amber-400",
            open && "rotate-180"
          )}
        />
      </Button>
    </CollapsibleTrigger>

    <CollapsibleContent className="ml-4 pl-4 border-l border-amber-400/20 dark:border-amber-500/30 space-y-1 mt-1 transition-all duration-200">
      {items.map(({ name, description, iconName, href }) => {
        const Icon = iconMap[iconName];
        return (
          <NavItem
            key={name}
            to={href}
            icon={Icon}
            onClick={onLinkClick}
            label={
              <div className="text-left">
                <div className="font-medium">{name}</div>
                <div className="text-xs text-muted-foreground/70">
                  {description}
                </div>
              </div>
            }
          />
        );
      })}
      <NavItem
        to={route}
        onClick={onLinkClick}
        label={
          <div className="flex items-center text-amber-600 dark:text-amber-400 group">
            {UI_TEXT.buttons.viewAll}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        }
        className="transform hover:scale-105"
      />
    </CollapsibleContent>
  </Collapsible>
);

const NavLinks = React.memo(({ onNavLinkClick, isDrawer = false }) => {
  const [destinationsOpen, setDestinationsOpen] = React.useState(false);
  const [experiencesOpen, setExperiencesOpen] = React.useState(false);
  const { contact, fetchSiteData } = useSiteStore();

  React.useEffect(() => {
    fetchSiteData(true);
  }, [fetchSiteData]);

  const handleLinkClick = () => {
    setDestinationsOpen(false);
    setExperiencesOpen(false);
    onNavLinkClick?.();
  };

  const { phone, email } = contact || {};

  // Drawer layout (mobile)
  if (isDrawer) {
    return (
      <nav className="space-y-2">
        <NavItem
          to={ROUTES.home}
          icon={HomeIcon}
          label={UI_TEXT.navigation.home}
          onClick={handleLinkClick}
        />

        <CollapsibleSection
          title={UI_TEXT.navigation.destinations}
          icon={MapPin}
          items={DESTINATIONS}
          route={ROUTES.destinations}
          open={destinationsOpen}
          setOpen={setDestinationsOpen}
          onLinkClick={handleLinkClick}
        />

        <CollapsibleSection
          title={UI_TEXT.navigation.experiences}
          icon={Camera}
          items={EXPERIENCES}
          route={ROUTES.experiences}
          open={experiencesOpen}
          setOpen={setExperiencesOpen}
          onLinkClick={handleLinkClick}
        />

        <NavItem
          to={ROUTES.stay}
          icon={Bed}
          label={UI_TEXT.navigation.stay}
          onClick={handleLinkClick}
        />
        <NavItem
          to={ROUTES.dine}
          icon={Utensils}
          label={UI_TEXT.navigation.dine}
          onClick={handleLinkClick}
        />
        <NavItem
          to={ROUTES.planTrip}
          icon={Calendar}
          label={UI_TEXT.navigation.planTrip}
          onClick={handleLinkClick}
        />

        <Separator className="my-4 border-amber-400/20 dark:border-amber-500/30" />

        {/* More Section */}
        <div className="space-y-1">
          <h3 className="font-semibold text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider px-3 mb-2">
            {UI_TEXT.sections.more}
          </h3>
          <NavItem
            to={ROUTES.about}
            icon={Info}
            label={UI_TEXT.menu.aboutDahab}
            onClick={handleLinkClick}
            className="h-10 text-sm"
          />
          <NavItem
            to={ROUTES.reviews}
            icon={Star}
            label={UI_TEXT.menu.reviews}
            onClick={handleLinkClick}
            className="h-10 text-sm"
          />
          <NavItem
            to={ROUTES.groups}
            icon={Users}
            label={UI_TEXT.menu.groupTours}
            onClick={handleLinkClick}
            className="h-10 text-sm"
          />
        </div>

        <Separator className="my-4 border-amber-400/20 dark:border-amber-500/30" />

        {/* Contact Section */}
        <div className="space-y-1">
          <h3 className="font-semibold text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider px-3 mb-2">
            {UI_TEXT.sections.getInTouch}
          </h3>
          {phone && (
            <NavItem
              to={ROUTES.contact}
              icon={Phone}
              label={phone}
              onClick={handleLinkClick}
              className="h-10 text-sm"
            />
          )}
          {email && (
            <a href={`mailto:${email}`} className="block">
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200"
              >
                <Mail className="mr-3 h-4 w-4" />
                {email}
              </Button>
            </a>
          )}
        </div>
      </nav>
    );
  }

  // Desktop layout
  const desktopLinks = [
    { to: ROUTES.home, label: UI_TEXT.navigation.home },
    { to: ROUTES.stay, label: UI_TEXT.navigation.stay },
    { to: ROUTES.dine, label: UI_TEXT.navigation.dine },
    { to: ROUTES.planTrip, label: UI_TEXT.navigation.planTrip },
    { to: ROUTES.destinations, label: UI_TEXT.navigation.destinations },
    { to: ROUTES.experiences, label: UI_TEXT.navigation.experiences },
  ];

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {desktopLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
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
          {label}
        </NavLink>
      ))}
    </nav>
  );
});

NavLinks.displayName = "NavLinks";
export default NavLinks;
