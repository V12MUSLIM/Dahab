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
  ArrowLeft,
  Camera,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/SiteConfig";

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuthStore();

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
      navigate(ROUTES.login);
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen">
 

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl pb-20 md:pb-8">
        <div className="space-y-0 rounded-2xl border border-yellow-500/20 overflow-hidden shadow-2xl shadow-yellow-500/10">
          {/* Tabs Navigation - Connected at top */}
          <div className="flex bg-black/60 border-b border-yellow-500/20">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="w-full flex gap-0 bg-transparent border-b border-yellow-500/20 justify-start rounded-none">
                <TabsTrigger
                  value="profile"
                  className="flex-1 rounded-none border-r border-yellow-500/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600/40 data-[state=active]:to-amber-600/40 data-[state=active]:text-yellow-300 data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 text-yellow-600/60 hover:text-yellow-500 transition-all duration-200"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="flex-1 rounded-none border-r border-yellow-500/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600/40 data-[state=active]:to-amber-600/40 data-[state=active]:text-yellow-300 data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 text-yellow-600/60 hover:text-yellow-500 transition-all duration-200"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="flex-1 rounded-none data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600/40 data-[state=active]:to-amber-600/40 data-[state=active]:text-yellow-300 data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 text-yellow-600/60 hover:text-yellow-500 transition-all duration-200"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Preferences
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="p-8 space-y-6 m-0">
                {/* Avatar Section */}
                <div className="space-y-6 pb-8 border-b border-yellow-500/20">
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Profile Details
                    </h3>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-yellow-500/5 to-amber-500/5 p-6 rounded-xl border border-yellow-500/10">
                    <Avatar className="w-32 h-32 border-2 border-yellow-500/50 ring-4 ring-yellow-500/20 overflow-hidden">
                      <AvatarImage
                        src={
                          user?.picture
                            ? encodeURI(
                                user.picture.replace("=s96-c", "=s256-c")
                              )
                            : user?.image
                            ? encodeURI(user.image)
                            : `https://avatar.vercel.sh/${encodeURIComponent(
                                user?.name || "U"
                              )}`
                        }
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
                      <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white text-3xl font-bold">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-3xl bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
                        Welcome
                      </h3>
                      <h4 className="text-xl font-semibold text-white">
                        {user.name}
                      </h4>
                      <p className="text-sm text-amber-200/80">
                        Update your personal information and profile settings
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </h3>
                    <p className="text-sm text-yellow-600/60">
                      Update your personal details
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-yellow-300"
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="bg-yellow-500/5 border border-yellow-500/30 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-white placeholder:text-gray-500 transition-all duration-200"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-yellow-300 flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="bg-yellow-500/5 border border-yellow-500/30 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-white placeholder:text-gray-500 transition-all duration-200"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium text-yellow-300 flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="bg-yellow-500/5 border border-yellow-500/30 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-white placeholder:text-gray-500 transition-all duration-200"
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <label
                        htmlFor="location"
                        className="text-sm font-medium text-yellow-300 flex items-center gap-2"
                      >
                        <MapPin className="h-4 w-4" />
                        Location
                      </label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter your location"
                        className="bg-yellow-500/5 border border-yellow-500/30 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-white placeholder:text-gray-500 transition-all duration-200"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold border border-yellow-400/50 transition-all duration-200 shadow-lg shadow-yellow-500/20",
                        profileSaved &&
                          "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                      )}
                    >
                      <Save className="w-4 h-4" />
                      {profileSaved && <Check className="h-4 w-4 mr-2" />}
                      {isLoading
                        ? "Saving..."
                        : profileSaved
                        ? "Saved!"
                        : "Save Changes"}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="p-8 space-y-6 m-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Change Password
                    </h3>
                    <p className="text-sm text-yellow-600/60">
                      Update your password to keep your account secure
                    </p>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    {/* Current Password */}
                    <div className="space-y-2">
                      <label
                        htmlFor="currentPassword"
                        className="text-sm font-medium text-yellow-300"
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
                          className="bg-yellow-500/5 border border-yellow-500/30 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-white placeholder:text-gray-500 pr-10 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              current: !prev.current,
                            }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-600/60 hover:text-yellow-500 transition-colors"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <label
                        htmlFor="newPassword"
                        className="text-sm font-medium text-yellow-300"
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
                          className="bg-yellow-500/5 border border-yellow-500/30 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-white placeholder:text-gray-500 pr-10 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              new: !prev.new,
                            }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-600/60 hover:text-yellow-500 transition-colors"
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-yellow-300"
                      >
                        Confirm Password
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
                          className="bg-yellow-500/5 border border-yellow-500/30 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-white placeholder:text-gray-500 pr-10 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              confirm: !prev.confirm,
                            }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-600/60 hover:text-yellow-500 transition-colors"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold border border-yellow-400/50 transition-all duration-200 shadow-lg shadow-yellow-500/20 disabled:opacity-50"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="p-8 space-y-6 m-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications & Privacy
                    </h3>
                    <p className="text-sm text-yellow-600/60">
                      Manage how we communicate with you
                    </p>
                  </div>

                  {/* Email Notifications */}
                  <div className="flex items-center justify-between p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-200">
                    <div className="space-y-1">
                      <p className="font-medium text-yellow-300">
                        Email Notifications
                      </p>
                      <p className="text-sm text-yellow-600/60">
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
                  <div className="flex items-center justify-between p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-200">
                    <div className="space-y-1">
                      <p className="font-medium text-yellow-300">
                        Marketing & Promotions
                      </p>
                      <p className="text-sm text-yellow-600/60">
                        Get exclusive deals and travel recommendations
                      </p>
                    </div>
                    <Switch
                      checked={marketing}
                      onCheckedChange={setMarketing}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-500 data-[state=checked]:to-amber-600"
                    />
                  </div>

                  <Separator className="bg-yellow-500/20" />

                  {/* Logout Section */}
                  <div className="space-y-3 pt-4">
                    <p className="text-sm font-medium text-yellow-300">
                      Account Access
                    </p>
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-gradient-to-r from-red-600/50 to-red-700/50 hover:from-red-600/70 hover:to-red-700/70 text-red-300 border border-red-500/30 hover:border-red-500/50 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                    <p className="text-xs text-yellow-600/40">
                      You will be logged out from all devices
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
