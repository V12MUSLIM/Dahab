import * as React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { ROUTES } from "@/config/SiteConfig";
const UserNav = React.memo(({ email, name, userImage }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { logout } = useAuthStore.getState();
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200"
        >
          <Avatar className="h-10 w-10 border-2 border-amber-400/40 dark:border-amber-500/50 overflow-hidden">
            <AvatarImage
              src={
                userImage
                  ? encodeURI(userImage.replace("=s96-c", "=s256-c"))
                  : `https://avatar.vercel.sh/${encodeURIComponent(name)}`
              }
              alt={name}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={(e) => {
                console.warn("Failed to load user image, using fallback");
                e.currentTarget.src = `https://avatar.vercel.sh/${encodeURIComponent(
                  name
                )}`;
              }}
            />
            <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-white font-semibold">
              {name[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-white/95 dark:bg-black/95 backdrop-blur-md border-amber-400/20 dark:border-amber-500/30"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              {name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-amber-400/20 dark:bg-amber-500/30" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-amber-50 dark:hover:bg-amber-900/20 cursor-pointer">
            <User className="mr-2 h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <NavLink
              to={ROUTES.settings}
              className="flex items-center hover:bg-amber-50 dark:hover:bg-amber-900/20"
            >
              <Settings className="mr-2 h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Settings</span>
            </NavLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-amber-400/20 dark:bg-amber-500/30" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="hover:bg-amber-50 dark:hover:bg-amber-900/20 text-red-600 dark:text-red-400 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

UserNav.displayName = "UserNav";

export default UserNav;
