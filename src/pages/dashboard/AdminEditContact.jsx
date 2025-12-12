import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Loader2,
  CheckCircle2,
  Phone,
  Mail,
  AlertCircle,
  Save,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useContact } from "@/hooks/useContact";
import { LoadingState } from "@/components/admin/adminUI/LoadingState";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ErrorState } from "@/components/admin/adminUI/ErrorState";

export default function AdminEditContact() {
  const navigate = useNavigate();
  const { contactQuery, updateContact } = useContact();
  const { data: contact, isLoading, isError, error } = contactQuery;

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    isActive: true,
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        email: contact.email || "",
        phone: contact.phone || "",
        isActive: contact.isActive !== false,
      });
      setIsDirty(false);
    }
  }, [contact]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!isDirty) {
      toast.info("No changes to save");
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]{6,}$/.test(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      await updateContact.mutateAsync({
        id: contact?._id,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        isActive: formData.isActive,
      });

      toast.success("Contact information updated successfully!");
      setIsDirty(false);

      setTimeout(() => {
        updateContact.reset();
      }, 2000);
    } catch (err) {
      toast.error("Failed to update contact information");
      console.error(err);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to cancel?"
        )
      ) {
        if (contact) {
          setFormData({
            email: contact.email || "",
            phone: contact.phone || "",
            isActive: contact.isActive !== false,
          });
        }
        setIsDirty(false);
      }
    } else {
      navigate("/dashboard");
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [formData, isDirty]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingState message="Contacts" submessage="Contacts" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message={error.message}
        onRetry={() => contactQuery.refetch()}
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                className="h-10 w-10 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20 dark:border-gray-800/50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 shadow-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Contact Information
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your business contact details
                </p>
              </div>
            </div>

            {isDirty && (
              <Badge
                variant="outline"
                className="animate-pulse border-amber-500 text-amber-600 bg-amber-500/10 backdrop-blur-sm"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Unsaved Changes
              </Badge>
            )}
          </div>

          <Separator className="opacity-50" />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Email Address
                    </p>
                    <p className="text-lg font-bold truncate mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {formData.email || "Not set"}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 backdrop-blur-sm ml-2">
                    <Mail className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Phone Number
                    </p>
                    <p className="text-lg font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {formData.phone || "Not set"}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10 backdrop-blur-sm">
                    <Phone className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Status
                    </p>
                    <div className="mt-2">
                      <Badge 
                        variant="outline" 
                        className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-xl">
              <CardHeader className="border-b border-white/10 dark:border-gray-800/30">
                <CardTitle className="text-xl sm:text-2xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Edit Contact Details
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your email and phone number for customer inquiries
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-500/10 backdrop-blur-sm">
                        <Mail className="h-4 w-4 text-blue-500" />
                      </div>
                      <Label
                        htmlFor="email-input"
                        className="text-sm font-medium"
                      >
                        Email Address
                      </Label>
                    </div>
                    <Input
                      id="email-input"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="contact@example.com"
                      className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm h-12"
                    />
                    <p className="text-xs text-muted-foreground px-1">
                      This email will be used for contact form submissions
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-green-500/10 backdrop-blur-sm">
                        <Phone className="h-4 w-4 text-green-500" />
                      </div>
                      <Label
                        htmlFor="phone-input"
                        className="text-sm font-medium"
                      >
                        Phone Number
                      </Label>
                    </div>
                    <Input
                      id="phone-input"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+20 123 456 7890"
                      className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm h-12"
                    />
                    <p className="text-xs text-muted-foreground px-1">
                      Include country code for international calls
                    </p>
                  </div>

                  {updateContact.isError && (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/10 backdrop-blur-sm p-4">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <div>
                          <p className="text-sm font-medium text-destructive">
                            Failed to update contact information
                          </p>
                          <p className="text-sm text-destructive/80 mt-1">
                            {updateContact.error?.message || "Please try again"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-3 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm border-t border-white/10 dark:border-gray-800/30 p-6">
                <Button
                  onClick={handleSave}
                  disabled={updateContact.isPending || !isDirty}
                  className="gap-2 flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm h-12"
                >
                  {updateContact.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : updateContact.isSuccess ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none h-12 border-white/30 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-800/50"
                >
                  Cancel
                </Button>
                <div className="text-xs text-muted-foreground text-center sm:text-left flex-1 flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded text-xs border border-white/30 dark:border-gray-700/50 backdrop-blur-sm">
                    Ctrl
                  </kbd>
                  <span>+</span>
                  <kbd className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded text-xs border border-white/30 dark:border-gray-700/50 backdrop-blur-sm">
                    S
                  </kbd>
                  <span className="ml-1">to save</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  Current Contact Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="p-1.5 rounded-md bg-blue-500/10">
                      <Mail className="h-3 w-3 text-blue-500" />
                    </div>
                    <span>Email Address</span>
                  </div>
                  <p className="text-sm font-medium bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent break-all">
                    {contact?.email || "Not set"}
                  </p>
                </div>
                <Separator className="opacity-30" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="p-1.5 rounded-md bg-green-500/10">
                      <Phone className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Phone Number</span>
                  </div>
                  <p className="text-sm font-medium bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {contact?.phone || "Not set"}
                  </p>
                </div>
                <Separator className="opacity-30" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="p-1.5 rounded-md bg-amber-500/10">
                      <AlertCircle className="h-3 w-3 text-amber-500" />
                    </div>
                    <span>Last Updated</span>
                  </div>
                  <p className="text-sm font-medium">
                    {contact?.updatedAt
                      ? new Date(contact.updatedAt).toLocaleDateString()
                      : "Never"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-blue-500/20 dark:border-blue-900/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-blue-500/20">
                    💡
                  </div>
                  Tips & Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Professional Email</p>
                  <p className="text-xs text-muted-foreground">
                    Use a professional email that you check regularly for business inquiries.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Phone Formatting</p>
                  <p className="text-xs text-muted-foreground">
                    Include country code for international accessibility and better user experience.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Regular Updates</p>
                  <p className="text-xs text-muted-foreground">
                    Keep contact information up-to-date to ensure customers can reach you easily.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}