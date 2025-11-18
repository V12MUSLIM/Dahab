import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Pencil,
  CheckCircle2,
  Loader2,
  X,
  ChevronLeft,
  Link as LinkIcon,
  PlusCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useSocials } from "@/hooks/useSocials"; // Adjust path as needed

export default function AdminEditSocials() {
  const navigate = useNavigate();

  // Use the hook
  const { socialsQuery, addSocial, updateSocial } = useSocials();

  // Handle loading and error states
  const { data: socialMedia, isLoading, isError, error } = socialsQuery;

  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newSocial, setNewSocial] = useState({
    name: "",
    href: "",
    icon: "",
    label: "",
    color: "",
  });

  const handleAddSocial = async (e) => {
    e?.preventDefault();

    const name = (newSocial.name || "").trim();
    const href = (newSocial.href || "").trim();
    const icon = (newSocial.icon || "").trim();
    const label = (newSocial.label || "").trim();
    const color = (newSocial.color || "").trim();
    if (!name || !href || !icon || !label || !color) {
      toast.warning("Fields cannot be empty.");
      return;
    }

    try {
      await addSocial.mutateAsync({
        name,
        href,
        icon,
        label,
        color,
      });

      toast.success(`${name} added to social media!`);
      setNewSocial({ name: "", href: "", icon: "", label: "", color: "" });
      setAdding(false);
    } catch (err) {
      toast.error("Failed to add social media");
      console.error(err);
    }
  };

  const openEdit = (item) => {
    setEditing({ ...item }); // Create a copy to avoid mutating original
  };

  const closeEdit = () => {
    setEditing(null);
  };

  const handleUpdate = async (e) => {
    e?.preventDefault();

    if (!editing?._id) return;

    try {
      await updateSocial.mutateAsync({
        id: editing._id,
        name: editing.name,
        href: editing.href,
        icon: editing.icon,
        label: editing.label,
        color: editing.color,
      });

      toast.success("Social media updated successfully!");
      closeEdit();
    } catch (err) {
      toast.error("Failed to update social media");
      console.error(err);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Loading social media links...</span>
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
            <h2 className="text-lg font-semibold">
              Error Loading Social Media
            </h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            {error?.message ||
              "Failed to load social media links. Please try again."}
          </p>
          <Button onClick={() => socialsQuery.refetch()} className="w-full">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Ensure socialMedia is an array
  const socials = Array.isArray(socialMedia) ? socialMedia : [];

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
              Social Media Links
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">
              Manage your social media profile links displayed on the website
            </p>
          </div>
        </div>

        {/* Grid layout */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Social media links"
        >
          {socials.map((s) => (
            <Card
              key={s._id}
              role="listitem"
              className="dark:bg-zinc-950 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700 transition"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  {s.icon && (
                    <div
                      className="p-2.5 rounded-lg bg-slate-100 dark:bg-white"
                      aria-hidden="true"
                    >
                      <img
                        src={s.icon}
                        alt=""
                        className="h-6 w-6 object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base text-slate-900 dark:text-white">
                      {s.name}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-gray-400 truncate text-xs mt-0.5">
                      {s.href}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(s)}
                  aria-label={`Edit ${s.name} link`}
                  className="border-slate-200 dark:border-gray-700 text-slate-900 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-900 w-full"
                >
                  <Pencil className="h-4 w-4 mr-2" aria-hidden="true" />
                  Edit Link
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* Add New Social Media Card */}
          <Card
            role="listitem"
            className="dark:bg-zinc-950 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700 transition cursor-pointer min-h-[180px] flex flex-col items-center justify-center gap-3"
            onClick={() => setAdding(true)}
          >
            <PlusCircle className="w-12 h-12 text-slate-400 dark:text-gray-600" />
            <p className="text-lg font-medium text-slate-600 dark:text-gray-400">
              Add New Social Media
            </p>
          </Card>
        </div>

        {/* Edit Dialog */}
        {/* Edit Dialog */}
        <Dialog open={!!editing} onOpenChange={closeEdit}>
          <DialogContent
            className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white max-w-md"
            aria-describedby="dialog-description"
          >
            <DialogHeader>
              <DialogTitle className="dark:text-white">
                Edit Social Media
              </DialogTitle>
              <DialogDescription
                id="dialog-description"
                className="dark:text-gray-400"
              >
                Update your social media information
              </DialogDescription>
            </DialogHeader>

            {editing && (
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-gray-800">
                  {editing.icon && (
                    <div className="bg-white dark:bg-white p-2 rounded-lg">
                      <img
                        src={editing.icon}
                        alt=""
                        className="h-7 w-7 object-contain"
                        aria-hidden="true"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className="text-base font-medium text-slate-900 dark:text-white">
                    {editing.name}
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-name" className="text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={editing.name || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
                    placeholder="e.g., Facebook"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="edit-href"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Profile URL
                  </Label>
                  <Input
                    id="edit-href"
                    type="url"
                    value={editing.href || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, href: e.target.value })
                    }
                    className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <Label htmlFor="edit-icon" className="text-sm font-medium">
                    Icon URL
                  </Label>
                  <Input
                    id="edit-icon"
                    value={editing.icon || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, icon: e.target.value })
                    }
                    className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
                    placeholder="/icons/facebook.svg"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-label" className="text-sm font-medium">
                    Label
                  </Label>
                  <Input
                    id="edit-label"
                    value={editing.label || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, label: e.target.value })
                    }
                    className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
                    placeholder="bg-blue-600"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-color" className="text-sm font-medium">
                    Hover Color Classes
                  </Label>
                  <Input
                    id="edit-color"
                    value={editing.color || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, color: e.target.value })
                    }
                    className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
                    placeholder="hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500"
                  />
                </div>
              </div>
            )}

            <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleUpdate}
                disabled={updateSocial.isPending}
                className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-gray-200 w-full sm:w-auto"
              >
                {updateSocial.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : updateSocial.isSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Saved
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>

              <Button
                variant="outline"
                onClick={closeEdit}
                className="border-slate-200 dark:border-gray-700 text-slate-900 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-900 w-full sm:w-auto"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Dialog */}
        <Dialog open={adding} onOpenChange={setAdding}>
          <DialogContent
            className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white max-w-md"
            aria-describedby="add-dialog-description"
          >
            <DialogHeader>
              <DialogTitle>Add Social Media</DialogTitle>
              <DialogDescription
                id="add-dialog-description"
                className="dark:text-gray-400"
              >
                Add a new social media to your website.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="add-name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="add-name"
                  value={newSocial.name}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, name: e.target.value })
                  }
                  placeholder="e.g., Facebook"
                />
              </div>

              <div>
                <Label htmlFor="add-href" className="text-sm font-medium">
                  URL
                </Label>
                <Input
                  id="add-href"
                  type="url"
                  value={newSocial.href}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, href: e.target.value })
                  }
                  placeholder="https://example.com/your-page"
                />
              </div>

              <div>
                <Label htmlFor="add-icon" className="text-sm font-medium">
                  Icon URL
                </Label>
                <Input
                  id="add-icon"
                  value={newSocial.icon}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, icon: e.target.value })
                  }
                  placeholder="/icons/facebook.svg"
                />
                <p className="text-sm text-slate-400 mt-1">
                  *You can pick icons from{" "}
                  <a
                    className="underline hover:text-slate-600"
                    href="https://simpleicons.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    simpleicons.org
                  </a>
                </p>
              </div>
              <div>
                <Label htmlFor="add-label" className="text-sm font-medium">
                  Label
                </Label>
                <Input
                  id="add-label"
                  value={newSocial.label}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, label: e.target.value })
                  }
                  placeholder="bg-blue-600"
                />
              </div>
              <div>
                <Label htmlFor="add-color" className="text-sm font-medium">
                  Hover Color Classes
                </Label>
                <Input
                  id="add-color"
                  value={newSocial.color}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, color: e.target.value })
                  }
                  placeholder="hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500"
                />
              </div>
            </div>

            <DialogFooter className="mt-6 gap-2">
              <Button
                onClick={handleAddSocial}
                disabled={addSocial.isPending}
                className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-gray-200"
              >
                {addSocial.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Social"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setAdding(false);
                  setNewSocial({ name: "", href: "", icon: "" });
                }}
                className="border-slate-200 dark:border-gray-700"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
