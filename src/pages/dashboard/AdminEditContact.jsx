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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useContact } from "@/hooks/useContact";
import { LoadingState } from "@/components/admin/adminUI/LoadingState";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
      <div className="min-h-screen justify-center items-center">
       <LoadingState message="Contacts" submessage="Contacts"/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="max-w-md w-full border-destructive/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-xl">
              Unable to Load Contact Information
            </CardTitle>
            <CardDescription className="mt-2">
              {error?.message ||
                "There was an error loading your contact information."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-2">
            <Button onClick={() => contactQuery.refetch()} className="w-full">
              Try Again
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/dashboard")}
            >
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
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
                className="animate-pulse border-amber-500 text-amber-600"
              >
                Unsaved Changes
              </Badge>
            )}
          </div>

          <Separator />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-background to-secondary/50 border-primary/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Email Address
                    </p>
                    <p className="text-lg font-bold truncate mt-1">
                      {formData.email || "Not set"}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 shrink-0 ml-2">
                    <Mail className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-secondary/50 border-primary/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Phone Number
                    </p>
                    <p className="text-lg font-bold mt-1">
                      {formData.phone || "Not set"}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10 shrink-0 mb-8">
                    <Phone className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-primary/10">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  Edit Contact Details
                </CardTitle>
                <CardDescription>
                  Update your email and phone number for customer inquiries
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email-input"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email-input"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="contact@example.com"
                      className="font-medium"
                    />
                    <p className="text-xs text-muted-foreground">
                      This email will be used for contact form submissions
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone-input"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone-input"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+20 123 456 7890"
                      className="font-medium"
                    />
                    <p className="text-xs text-muted-foreground">
                      Include country code for international calls
                    </p>
                  </div>

                  {updateContact.isError && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <p className="text-sm font-medium">
                          Failed to update contact information
                        </p>
                      </div>
                      <p className="text-sm text-destructive/80 mt-1">
                        {updateContact.error?.message || "Please try again"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-3 bg-muted/30 border-t">
                <Button
                  onClick={handleSave}
                  disabled={updateContact.isPending || !isDirty}
                  className="gap-2 flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md"
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
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
                <div className="text-xs text-muted-foreground text-center sm:text-left flex-1">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs border">
                    Ctrl
                  </kbd>{" "}
                  +{" "}
                  <kbd className="px-2 py-1 bg-muted rounded text-xs border">
                    S
                  </kbd>{" "}
                  to save
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Current Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                  <p className="text-sm font-medium break-all">
                    {contact?.email || "Not set"}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>Phone</span>
                  </div>
                  <p className="text-sm font-medium">
                    {contact?.phone || "Not set"}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2"></div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-primary/10 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border-blue-200 dark:border-blue-900/50">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  💡 Tips & Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email Address</p>
                  <p className="text-xs text-muted-foreground">
                    Use a professional email that you check regularly for
                    business inquiries.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Phone Number</p>
                  <p className="text-xs text-muted-foreground">
                    Include country code for international accessibility.
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
