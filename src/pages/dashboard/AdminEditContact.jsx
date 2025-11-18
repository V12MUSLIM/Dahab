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
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useContact } from "@/hooks/useContact"; // Adjust path as needed

export default function AdminEditContact() {
  const navigate = useNavigate();
  const { contactQuery, updateContact } = useContact();
  const { data: contact, isLoading, isError, error } = contactQuery;

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Sync form with fetched data
  useEffect(() => {
    if (contact) {
      setEmail(contact.email || "");
      setPhone(contact.phone || "");
    }
  }, [contact]);

  const handleSave = async () => {
    try {
      await updateContact.mutateAsync({
        id: contact?._id,
        email,
        phone,
      });

      toast.success("Contact information updated successfully!");

      setTimeout(() => {
        updateContact.reset();
      }, 2000);
    } catch (err) {
      toast.error("Failed to update contact information");
      console.error(err);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading contact information...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-zinc-950 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
            <AlertCircle className="h-6 w-6" />
            <h2 className="text-lg font-semibold">Error Loading Contact</h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            {error?.message ||
              "Failed to load contact information. Please try again."}
          </p>
          <Button onClick={() => contactQuery.refetch()} className="w-full">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-900 w-fit"
            onClick={() => navigate("/dashboard")}
          >
            <ChevronLeft className="h-4 w-4" /> Back to Dashboard
          </Button>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Contact Information
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">
              Manage your business contact details displayed on the website
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="dark:bg-zinc-950 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Edit Contact Details
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Update your email and phone number for customer inquiries
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email-input"
                    className="text-sm font-medium text-slate-900 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email Address
                  </label>
                  <Input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@example.com"
                    className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone-input"
                    className="text-sm font-medium text-slate-900 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <Input
                    id="phone-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+20 1385922880"
                    className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
                  />
                </div>

                {updateContact.isError && (
                  <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-3">
                    <p className="text-sm text-red-700 dark:text-red-400">
                      {updateContact.error?.message ||
                        "Failed to update contact information"}
                    </p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex gap-3">
                <Button
                  onClick={handleSave}
                  disabled={updateContact.isPending}
                  className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-gray-200 flex-1 sm:flex-none"
                >
                  {updateContact.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : updateContact.isSuccess ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Saved!
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card className="dark:bg-zinc-950 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Current Contact Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white break-all">
                    {contact?.email || "Not set"}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                    <Phone className="h-4 w-4" />
                    <span>Phone</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {contact?.phone || "Not set"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-zinc-950 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-sm dark:text-white">
                  💡 Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  These contact details will be displayed on your website's
                  contact page and footer.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
