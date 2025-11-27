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
  LinkIcon,
  PlusCircle,
  AlertCircle,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useSocials } from "@/hooks/useSocials";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AdminEditSocials() {
  const { socialsQuery, addSocial, updateSocial } = useSocials();
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
      toast.warning("All fields are required");
      return;
    }

    try {
      await addSocial.mutateAsync({ name, href, icon, label, color });
      toast.success(`${name} added successfully!`);
      setNewSocial({ name: "", href: "", icon: "", label: "", color: "" });
      setAdding(false);
    } catch (err) {
      toast.error("Failed to add social media");
      console.error(err);
    }
  };

  const openEdit = (item) => {
    setEditing({ ...item });
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="max-w-md w-full bg-zinc-950 border-red-500/20">
          <CardHeader>
            <div className="flex items-center gap-3 text-red-400 mb-2">
              <AlertCircle className="h-6 w-6" />
              <CardTitle className="text-lg">Error Loading Social Media</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              {error?.message || "Failed to load social media links. Please try again."}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              onClick={() => socialsQuery.refetch()}
              className="w-full bg-amber-500 hover:bg-amber-600"
            >
              Retry
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const socials = Array.isArray(socialMedia) ? socialMedia : [];

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-10">
          <header className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Social Media Links
                </h1>
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-2">
                  Manage your social media profile links displayed on the website
                </p>
              </div>
              <Button
                onClick={() => setAdding(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Social Media
              </Button>
            </div>
            <Separator className="bg-zinc-800" />
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {socials.map((s) => (
              <Card
                key={s._id}
                className="bg-zinc-950 border-zinc-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    {s.icon && (
                      <div className="p-2.5 rounded-lg bg-white group-hover:bg-zinc-800 transition-colors border border-zinc-800 shrink-0">
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
                      <CardTitle className="text-base text-white group-hover:text-amber-500 transition-colors mb-1">
                        {s.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-xs flex items-center gap-1">
                        <ExternalLink className="h-3 w-3 shrink-0" />
                        <span className="truncate">{s.href}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardFooter className="pt-3 flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(s)}
                          className="flex-1 border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit {s.name}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log("Delete:", s._id)}
                          className="border-zinc-800 hover:border-red-500/50 hover:bg-zinc-900 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete {s.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            ))}

           
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editing} onOpenChange={closeEdit}>
          <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Social Media</DialogTitle>
              <DialogDescription className="text-gray-400">
                Update your social media information
              </DialogDescription>
            </DialogHeader>

            {editing && (
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  {editing.icon && (
                    <div className="bg-zinc-800 p-2 rounded-lg">
                      <img
                        src={editing.icon}
                        alt=""
                        className="h-7 w-7 object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className="text-base font-medium text-white">
                    {editing.name}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-name" className="text-gray-200">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={editing.name || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    className="bg-zinc-900 border-zinc-800 text-gray-200"
                    placeholder="e.g., Facebook"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-href" className="text-gray-200 flex items-center gap-2">
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
                    className="bg-zinc-900 border-zinc-800 text-gray-200"
                    placeholder="https://..."
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-icon" className="text-gray-200">
                    Icon URL
                  </Label>
                  <Input
                    id="edit-icon"
                    value={editing.icon || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, icon: e.target.value })
                    }
                    className="bg-zinc-900 border-zinc-800 text-gray-200"
                    placeholder="/icons/facebook.svg"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-label" className="text-gray-200">
                    Label
                  </Label>
                  <Input
                    id="edit-label"
                    value={editing.label || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, label: e.target.value })
                    }
                    className="bg-zinc-900 border-zinc-800 text-gray-200"
                    placeholder="bg-blue-600"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-color" className="text-gray-200">
                    Hover Color Classes
                  </Label>
                  <Input
                    id="edit-color"
                    value={editing.color || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, color: e.target.value })
                    }
                    className="bg-zinc-900 border-zinc-800 text-gray-200"
                    placeholder="hover:bg-gradient-to-r hover:from-blue-600"
                  />
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={closeEdit}
                className="border-zinc-800 hover:bg-zinc-900"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={updateSocial.isPending}
                className="bg-amber-500 hover:bg-amber-600"
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
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Dialog */}
        <Dialog open={adding} onOpenChange={setAdding}>
          <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Add Social Media</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new social media to your website.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="add-name" className="text-gray-200">
                  Name
                </Label>
                <Input
                  id="add-name"
                  value={newSocial.name}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, name: e.target.value })
                  }
                  className="bg-zinc-900 border-zinc-800 text-gray-200"
                  placeholder="e.g., Facebook"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="add-href" className="text-gray-200">
                  URL
                </Label>
                <Input
                  id="add-href"
                  type="url"
                  value={newSocial.href}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, href: e.target.value })
                  }
                  className="bg-zinc-900 border-zinc-800 text-gray-200"
                  placeholder="https://example.com/your-page"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="add-icon" className="text-gray-200">
                  Icon URL
                </Label>
                <Input
                  id="add-icon"
                  value={newSocial.icon}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, icon: e.target.value })
                  }
                  className="bg-zinc-900 border-zinc-800 text-gray-200"
                  placeholder="/icons/facebook.svg"
                />
                <p className="text-xs text-gray-400">
                  Pick icons from{" "}
                  <a
                    className="text-amber-500 hover:text-amber-400 underline"
                    href="https://simpleicons.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    simpleicons.org
                  </a>
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="add-label" className="text-gray-200">
                  Label
                </Label>
                <Input
                  id="add-label"
                  value={newSocial.label}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, label: e.target.value })
                  }
                  className="bg-zinc-900 border-zinc-800 text-gray-200"
                  placeholder="bg-blue-600"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="add-color" className="text-gray-200">
                  Hover Color Classes
                </Label>
                <Input
                  id="add-color"
                  value={newSocial.color}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, color: e.target.value })
                  }
                  className="bg-zinc-900 border-zinc-800 text-gray-200"
                  placeholder="hover:bg-gradient-to-r hover:from-blue-600"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setAdding(false);
                  setNewSocial({ name: "", href: "", icon: "", label: "", color: "" });
                }}
                className="border-zinc-800 hover:bg-zinc-900"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddSocial}
                disabled={addSocial.isPending}
                className="bg-amber-500 hover:bg-amber-600"
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
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
