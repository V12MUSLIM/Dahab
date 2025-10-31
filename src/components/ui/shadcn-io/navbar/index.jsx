import * as React from "react";
import { useAuthStore } from "@/store/authStore";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function DahabTourismNavbar() {
  const [isDesktopDrawerOpen, setIsDesktopDrawerOpen] = React.useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);
  const { user } = useAuthStore();

  return (
    <>
      <NavbarDesktop
        user={user}
        isDrawerOpen={isDesktopDrawerOpen}
        setIsDrawerOpen={setIsDesktopDrawerOpen}
      />
      <NavbarMobile
        user={user}
        isDrawerOpen={isMobileDrawerOpen}
        setIsDrawerOpen={setIsMobileDrawerOpen}
      />
    </>
  );
}