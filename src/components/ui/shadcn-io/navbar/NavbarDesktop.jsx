import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  Languages,
  BadgeDollarSign,
  DollarSign,
  Euro,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* 🌐 Language Dropdown */
const ChangeLanguage = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="hover:text-amber-600 dark:hover:text-amber-400"
      >
        <Languages className="h-5 w-5" />
        <span className="sr-only">Change language</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48">
      <DropdownMenuItem className="flex items-center justify-between">
        <span>Russian</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="14"
          viewBox="0 0 600 400"
          className="rounded-sm"
        >
          <rect width="600" height="133.33" y="0" fill="#ffffff" />
          <rect width="600" height="133.33" y="133.33" fill="#0033a0" />
          <rect width="600" height="133.34" y="266.66" fill="#d52b1e" />
        </svg>
      </DropdownMenuItem>
      <DropdownMenuItem className="flex items-center justify-between">
        <span>English</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="14"
          viewBox="0 0 60 30"
          className="rounded-sm"
        >
          <rect width="60" height="30" fill="#012169" />
          <path
            fill="#FFF"
            d="M0 0l60 30M60 0L0 30"
            stroke="#FFF"
            strokeWidth="6"
          />
          <path
            fill="#C8102E"
            d="M0 0l60 30M60 0L0 30"
            stroke="#C8102E"
            strokeWidth="3"
          />
          <path fill="#FFF" d="M25 0h10v30H25zM0 10h60v10H0z" />
          <path fill="#C8102E" d="M27 0h6v30h-6zM0 12h60v6H0z" />
        </svg>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/* 💵 Currency Dropdown */
const ChangeCurrency = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="hover:text-amber-600 dark:hover:text-amber-400"
      >
        <BadgeDollarSign className="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        USD <DollarSign className="ml-auto h-4 w-4" />
      </DropdownMenuItem>
      <DropdownMenuItem>
        EUR <Euro className="ml-auto h-4 w-4" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/* 🧭 Main Navbar */
const NavbarDesktop = React.memo(({ user, isDrawerOpen, setIsDrawerOpen }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  // 👇 Handle scroll direction visibility
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current + 10 && currentScrollY > 80) {
        setIsVisible(false); // scrolling down
      } else if (currentScrollY < lastScrollY.current - 10) {
        setIsVisible(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log("Searching for:", searchQuery);
    },
    [searchQuery]
  );

  return (
    <header
      className={cn(
        "hidden lg:block fixed top-0 z-50 w-full border-b border-amber-400/20 dark:border-amber-500/30 bg-white/30 dark:bg-black/40 backdrop-blur-xl shadow-sm transition-all duration-500 ease-in-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <NavLink to={ROUTES.home} className="flex items-center space-x-2">
          <Logo />
        </NavLink>

        {/* Nav Links + Search */}
        <div className="flex items-center flex-1 max-w-3xl mx-8">
          <div className="mr-8">
            <NavLinks />
          </div>

          <SearchBar
            isDesktop
            placeholder={UI_TEXT.search.desktopPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleSearch}
          />
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          <ChangeCurrency />
          <ChangeLanguage />
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

          {/* Drawer Menu */}
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
