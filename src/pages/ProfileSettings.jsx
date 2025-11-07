"use client";

import * as React from "react";
import { useAuthStore } from "@/store/authStore";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Save,
  LogOut,
  Check,
  Shield,
  Cog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/SiteConfig";

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuthStore();

  const [activeTab, setActiveTab] = React.useState("profile");

  // Form state
  const [formData, setFormData] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
  });

  const [passwordData, setPasswordData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = React.useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [notification, setNotification] = React.useState(
    user?.notifications !== false
  );
  const [marketing, setMarketing] = React.useState(user?.marketing !== false);
  const [profileSaved, setProfileSaved] = React.useState(false);

  // Handle profile changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setProfileSaved(false);
  };

  // Save profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(formData);
      setProfileSaved(true);
      toast.success("Profile updated successfully");
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to update password");
      console.error("Password update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      setTimeout(() => navigate(ROUTES.login, { replace: true }), 300);
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  const userImageUrl = user?.picture
    ? encodeURI(user.picture.replace("=s96-c", "=s256-c"))
    : user?.image
    ? encodeURI(user.image)
    : `https://avatar.vercel.sh/${encodeURIComponent(user?.name || "U")}`;

  const userInitials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 max-w-7xl pb-20 md:pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - User Profile */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* User Card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="w-32 h-32 border-4 border-yellow-500/30 ring-4 ring-yellow-500/10 shadow-xl">
                    <AvatarImage
                      src={userImageUrl}
                      alt={user?.name || "User avatar"}
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        console.warn(
                          "Failed to load user image, using fallback"
                        );
                        e.currentTarget.src = `https://avatar.vercel.sh/${encodeURIComponent(
                          user?.name || "U"
                        )}`;
                      }}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white text-4xl font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2 w-full">
                    <h2 className="text-2xl font-bold text-foreground">
                      {user?.name || "Guest User"}
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <p className="text-sm break-all">
                        {user?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="w-full space-y-2 text-left">
                    {user?.phone && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 text-yellow-500" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user?.location && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-yellow-500" />
                        <span>{user.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="bg-card rounded-2xl border border-border p-4 shadow-lg">
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                      activeTab === "profile"
                        ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 dark:text-yellow-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Profile Settings</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("security")}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                      activeTab === "security"
                        ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 dark:text-yellow-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Lock className="h-5 w-5" />
                    <span className="font-medium">Security</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("preferences")}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                      activeTab === "preferences"
                        ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 dark:text-yellow-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="font-medium">Preferences</span>
                  </button>
                </div>
              </nav>

              {/* Logout Button with AlertDialog */}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full hidden lg:flex items-center justify-center border-red-500/30 text-red-600 hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/50 dark:text-red-400 dark:hover:text-red-400 transition-all duration-200 rounded-xl py-6"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl border-border shadow-2xl max-w-md">
                  <AlertDialogHeader className="space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <LogOut className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <AlertDialogTitle className="text-center text-2xl font-bold">
                      Logout Confirmation
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-muted-foreground">
                      Are you sure you want to logout? You'll need to sign in
                      again to access your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-6">
                    <AlertDialogCancel className="w-full sm:w-auto rounded-xl border-border hover:bg-muted transition-all duration-200">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200"
                    >
                      Yes, Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-3 pb-6 border-b border-border">
                    <div className="p-3 bg-yellow-500/10 rounded-xl">
                      <Cog className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        Profile Settings
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        Manage your personal information
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-semibold text-foreground flex items-center gap-2"
                      >
                        <User className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="h-12"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-foreground flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="h-12"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-semibold text-foreground flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="h-12"
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <label
                        htmlFor="location"
                        className="text-sm font-semibold text-foreground flex items-center gap-2"
                      >
                        <MapPin className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        Location
                      </label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter your location"
                        className="h-12"
                      />
                    </div>

                    <Button
                      type="button"
                      disabled={isLoading}
                      onClick={handleSaveProfile}
                      className={cn(
                        "w-full h-12 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold transition-all duration-200",
                        profileSaved &&
                          "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                      )}
                    >
                      {profileSaved && <Check className="h-5 w-5 mr-2" />}
                      {!profileSaved && <Save className="h-5 w-5 mr-2" />}
                      {isLoading
                        ? "Saving..."
                        : profileSaved
                        ? "Saved Successfully!"
                        : "Save Changes"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-3 pb-6 border-b border-border">
                    <div className="p-3 bg-yellow-500/10 rounded-xl">
                      <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        Security Settings
                      </h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Update your password and security preferences
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Current Password */}
                    <div className="space-y-3">
                      <label
                        htmlFor="currentPassword"
                        className="text-sm font-semibold text-foreground"
                      >
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter current password"
                          className="h-12 pr-12 mt-2"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              current: !prev.current,
                            }))
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <label
                        htmlFor="newPassword"
                        className="text-sm font-semibold text-foreground"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter new password"
                          className="h-12 pr-12  mt-2"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              new: !prev.new,
                            }))
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm font-semibold text-foreground"
                      >
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          placeholder="Confirm new password"
                          className="h-12 pr-12  mt-2"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              confirm: !prev.confirm,
                            }))
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="button"
                      disabled={isLoading}
                      onClick={handlePasswordChange}
                      className="w-full h-12 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold transition-all duration-200"
                    >
                      <Lock className="h-5 w-5 mr-2" />
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-3 pb-6 border-b border-border">
                    <div className="p-3 bg-yellow-500/10 rounded-xl">
                      <Bell className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        Notification Preferences
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        Manage how we communicate with you
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-6 rounded-xl bg-muted border border-border hover:border-yellow-500/30 transition-all duration-200">
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">
                          Email Notifications
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about bookings, offers, and activities
                        </p>
                      </div>
                      <Switch
                        checked={notification}
                        onCheckedChange={setNotification}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-500 data-[state=checked]:to-amber-600"
                      />
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center justify-between p-6 rounded-xl bg-muted border border-border hover:border-yellow-500/30 transition-all duration-200">
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">
                          Marketing & Promotions
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Get exclusive deals and travel recommendations
                        </p>
                      </div>
                      <Switch
                        checked={marketing}
                        onCheckedChange={setMarketing}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-500 data-[state=checked]:to-amber-600"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Logout Button with Styled AlertDialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full lg:hidden border-red-500/30 text-red-600 hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/50 dark:text-red-400 dark:hover:text-red-400 transition-all duration-200 rounded-xl py-6 mt-4"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl border-border shadow-2xl max-w-md">
                <AlertDialogHeader className="space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <LogOut className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <AlertDialogTitle className="text-center text-2xl font-bold">
                    Logout Confirmation
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-muted-foreground">
                    Are you sure you want to logout? You'll need to sign in
                    again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-6">
                  <AlertDialogCancel className="w-full sm:w-auto rounded-xl border-border hover:bg-muted transition-all duration-200">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLogout}
                    className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200"
                  >
                    Yes, Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </main>
        </div>
      </div>
    </div>
  );
}
