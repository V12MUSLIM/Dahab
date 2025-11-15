import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  Pencil,
  CheckCircle2,
  Loader2,
  X,
  ArrowLeft,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useSiteStore } from "@/store/siteStore";
import api from "@/api/axios";
import DahabLoader from "@/components/Loading";
export default function AdminEditContact() {
  const { contact, socialMedia, fetchSiteData, isLoading, error } =
    useSiteStore();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [socials, setSocials] = useState([]);

  const [editingContact, setEditingContact] = useState(false);
  const [updatingContact, setUpdatingContact] = useState(false);
  const [successContact, setSuccessContact] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [updatingIndex, setUpdatingIndex] = useState(null);
  const [successIndex, setSuccessIndex] = useState(null);

  // Fetch once
  useEffect(() => {
    fetchSiteData(true);
  }, []);

  useEffect(() => {
    if (contact) {
      setEmail(contact.email || "");
      setPhone(contact.phone || "");
    }
    if (socialMedia && Array.isArray(socialMedia)) {
      setSocials(socialMedia.map((s) => ({ ...s })));
    }
  }, [contact, socialMedia]);

  // ---- Contact Update ----
  const handleUpdateContact = async () => {
    if (!contact?._id) return console.error("Missing contact ID");

    try {
      setUpdatingContact(true);
      setSuccessContact(false);

      await api.put(`/contact/update/${contact._id}`, {
        email,
        phone,
      });

      setUpdatingContact(false);
      setSuccessContact(true);
      setEditingContact(false);

      setTimeout(() => setSuccessContact(false), 2500);
    } catch (err) {
      console.error("Failed to update contact:", err);
      setUpdatingContact(false);
    }
  };

  // ---- Social Media Logic ----
  const handleSocialChange = (index, field, value) => {
    setSocials((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const handleCancelEdit = (index) => {
    setEditingIndex(null);
    if (socialMedia && Array.isArray(socialMedia)) {
      setSocials(socialMedia.map((s) => ({ ...s })));
    }
  };

  const handleUpdateSocial = async (social, index) => {
    if (!social._id) return console.error("Missing ID for update");

    try {
      setUpdatingIndex(index);
      setSuccessIndex(null);

      await api.put(`/social-media/update/${social._id}`, {
        name: social.name,
        href: social.href,
        icon: social.icon,
      });

      setUpdatingIndex(null);
      setSuccessIndex(index);
      setEditingIndex(null);
      setTimeout(() => setSuccessIndex(null), 2500);
    } catch (err) {
      console.error("Update failed:", err);
      setUpdatingIndex(null);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        <DahabLoader loadingMessage="Loading Contacts&Social-media..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {/* Center: Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contact Settings
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Manage your contact information and social media links
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN - CONTACT */}
          <div>
            <Card className="bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-[#1a1a1a] shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100 dark:border-[#1a1a1a]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20">
                    <Mail className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      Contact Details
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
                      Email and phone information
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              {editingContact ? (
                <>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <Label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 bg-gray-50 dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                        Phone Number
                      </Label>
                      <Input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-10 bg-gray-50 dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-3 px-6 pb-6 pt-4 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#1a1a1a]">
                    <Button
                      onClick={handleUpdateContact}
                      disabled={updatingContact}
                      size="sm"
                      className="h-9 bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
                    >
                      {updatingContact ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingContact(false)}
                      className="h-9 border-gray-300 dark:border-[#2a2a2a]"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <>
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a]">
                      <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <Label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Email
                        </Label>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {email || "Not set"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a]">
                      <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <Label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Phone
                        </Label>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {phone || "Not set"}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 pt-4 flex items-center justify-between bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#1a1a1a]">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingContact(true)}
                      className="h-9 border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-600 dark:text-amber-500 dark:hover:bg-amber-950/20"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Details
                    </Button>

                    {successContact && (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium">Saved</span>
                      </div>
                    )}
                  </CardFooter>
                </>
              )}
            </Card>
          </div>

          {/* RIGHT COLUMN - SOCIAL MEDIA */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Social Media Links
              </h2>
              <span className="px-2 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-500 rounded-full">
                {socials.length} {socials.length === 1 ? "Link" : "Links"}
              </span>
            </div>

            <div className="space-y-4">
              {socials.map((s, index) => (
                <Card
                  key={s._id || index}
                  className="bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-[#1a1a1a] shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3 pt-4 px-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {s.icon && (
                          <div className="p-2 rounded-lg bg-gray-50  shrink-0">
                            <img
                              src={`${s.icon}`}
                              alt={s.name}
                              className="h-8 w-8 object-contain"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base text-gray-900 dark:text-white">
                            {s.name}
                          </CardTitle>
                          <CardDescription className="text-xs truncate text-gray-500 dark:text-gray-400">
                            {s.href || "No URL"}
                          </CardDescription>
                        </div>
                      </div>
                      {successIndex === index && (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0" />
                      )}
                    </div>
                  </CardHeader>

                  {editingIndex === index ? (
                    <>
                      <CardContent className="space-y-4 px-5 pb-4">
                        <div>
                          <Label
                            htmlFor={`name-${index}`}
                            className="text-sm text-gray-700 dark:text-gray-300 mb-2 block"
                          >
                            Platform Name
                          </Label>
                          <Input
                            id={`name-${index}`}
                            value={s.name}
                            onChange={(e) =>
                              handleSocialChange(index, "name", e.target.value)
                            }
                            className="h-10 bg-gray-50 dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`href-${index}`}
                            className="text-sm text-gray-700 dark:text-gray-300 mb-2 block"
                          >
                            Profile URL
                          </Label>
                          <Input
                            id={`href-${index}`}
                            value={s.href}
                            onChange={(e) =>
                              handleSocialChange(index, "href", e.target.value)
                            }
                            className="h-10 bg-gray-50 dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`icon-${index}`}
                            className="text-sm text-gray-700 dark:text-gray-300 mb-2 block"
                          >
                            Icon Path
                          </Label>
                          <Input
                            id={`icon-${index}`}
                            value={s.icon}
                            onChange={(e) =>
                              handleSocialChange(index, "icon", e.target.value)
                            }
                            placeholder="e.g., /icons/facebook.svg"
                            className="h-10 bg-gray-50 dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                          />
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-3 px-5 pb-4 pt-3 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#1a1a1a]">
                        <Button
                          onClick={() => handleUpdateSocial(s, index)}
                          disabled={updatingIndex === index}
                          size="sm"
                          className="h-9 bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
                        >
                          {updatingIndex === index ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelEdit(index)}
                          className="h-9 border-gray-300 dark:border-[#2a2a2a]"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </CardFooter>
                    </>
                  ) : (
                    <CardFooter className="px-5 pb-4 pt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingIndex(index)}
                        className="h-9 border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-600 dark:text-amber-500 dark:hover:bg-amber-950/20"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Link
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
