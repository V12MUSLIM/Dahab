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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { ROUTES } from "@/config/SiteConfig";

const UserNav = React.memo(({ email, name, userImage }) => {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full hover:bg-yellow-500/10 dark:hover:bg-yellow-500/20 transition-all duration-200"
          >
            <Avatar className="h-10 w-10 border-2 border-yellow-500/30 ring-2 ring-yellow-500/10 overflow-hidden">
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
              <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white font-bold">
                {name[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 bg-card backdrop-blur-md border-border rounded-2xl shadow-lg p-2"
          forceMount
        >
          <DropdownMenuLabel className="font-normal px-3 py-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold text-foreground">
                {name}
              </p>
              <p className="text-xs leading-none text-muted-foreground break-all">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border my-2" />
          <DropdownMenuGroup className="space-y-1">
        
            <DropdownMenuItem asChild className="cursor-pointer">
              <NavLink
                to={ROUTES.settings}
                className="flex items-center hover:bg-yellow-500/10 dark:hover:bg-yellow-500/20 rounded-xl transition-all duration-200 px-3 py-2"
              >
                <Settings className="mr-2 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span>Settings</span>
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-border my-2" />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setShowLogoutDialog(true);
            }}
            className="hover:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer rounded-xl transition-all duration-200 px-3 py-2"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="rounded-2xl border-border shadow-2xl max-w-md">
          <AlertDialogHeader className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-yellow-500/50 flex items-center justify-center">
              <LogOut className="h-6 w-6 " />
            </div>
            <AlertDialogTitle className="text-center text-2xl font-bold">
              Logout Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-muted-foreground">
              Are you sure you want to logout? You'll need to sign in again to
              access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-6">
            <AlertDialogCancel className="w-full sm:w-auto rounded-xl border-border hover:bg-muted transition-all duration-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="w-full sm:w-auto   font-semibold rounded-xl transition-all duration-200"
            >
              Yes, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

UserNav.displayName = "UserNav";

export default UserNav;
