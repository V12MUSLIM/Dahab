import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Pencil,
  CheckCircle2,
  Loader2,
  X,
  Link as LinkIcon,
  PlusCircle,
  AlertCircle,
  Trash2,
  ExternalLink,
  Globe,
  Search,
  Sparkles,
  Copy,
  Check,
  Palette,
  Type,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Common social media presets for better UX
const SOCIAL_PRESETS = [
  {
    name: "Facebook",
    href: "https://facebook.com/",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg",
    label: "bg-blue-600",
    color: "hover:bg-blue-600 hover:text-white",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/twitter.svg",
    label: "bg-sky-500",
    color: "hover:bg-sky-500 hover:text-white",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg",
    label: "bg-gradient-to-r from-purple-500 to-pink-500",
    color:
      "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
    label: "bg-blue-700",
    color: "hover:bg-blue-700 hover:text-white",
  },
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg",
    label: "bg-gray-900",
    color: "hover:bg-gray-900 hover:text-white",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg",
    label: "bg-red-600",
    color: "hover:bg-red-600 hover:text-white",
  },
];

export default function AdminEditSocials() {
  const { socialsQuery, addSocial, updateSocial, deleteSocial } = useSocials();
  const { data: socialMedia, isLoading, isError, error } = socialsQuery;

  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);
  const [newSocial, setNewSocial] = useState({
    name: "",
    href: "",
    icon: "",
    label: "",
    color: "",
    isActive: true,
  });

  const handleAddSocial = async (e) => {
    e?.preventDefault();

    const name = (newSocial.name || "").trim();
    const href = (newSocial.href || "").trim();
    const icon = (newSocial.icon || "").trim();
    const label = (newSocial.label || "").trim();
    const color = (newSocial.color || "").trim();

    if (!name || !href || !icon) {
      toast.warning("Name, URL, and Icon are required");
      return;
    }

    try {
      await addSocial.mutateAsync({
        name,
        href,
        icon,
        label: label || "bg-gray-600",
        color: color || "hover:bg-gray-600 hover:text-white",
        isActive: newSocial.isActive,
      });
      toast.success(`${name} added successfully!`);
      setNewSocial({
        name: "",
        href: "",
        icon: "",
        label: "",
        color: "",
        isActive: true,
      });
      setAdding(false);
    } catch (err) {
      toast.error("Failed to add social media");
      console.error(err);
    }
  };
  const openEdit = (item) => {
    setEditing({
      ...item,
      isActive: item.isActive !== false, // Ensure isActive is true unless explicitly false
    });
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
        isActive: editing.isActive,
      });

      toast.success(`${editing.name} updated successfully!`);
      closeEdit();
    } catch (err) {
      toast.error("Failed to update social media");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      await deleteSocial.mutateAsync({ id });
      toast.success("Social media deleted successfully!");
      setShowDeleteDialog(null);
    } catch (err) {
      toast.error("Failed to delete social media");
    }
  };

  const handleUsePreset = (preset) => {
    setNewSocial({
      ...preset,
      href: preset.href, // Keep the base URL
    });
    toast.info(`Preset "${preset.name}" loaded. Add your username to the URL.`);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(text);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const filteredSocials = Array.isArray(socialMedia)
    ? socialMedia.filter(
        (social) =>
          social.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          social.href.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="animate-spin h-10 w-10 text-primary" />
            <div className="absolute inset-0 animate-ping bg-primary/10 rounded-full" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-lg font-medium">Loading Social Media</p>
            <p className="text-sm text-muted-foreground">
              Fetching your social links...
            </p>
          </div>
        </div>
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
              Unable to Load Social Media
            </CardTitle>
            <CardDescription className="mt-2">
              {error?.message ||
                "There was an error loading your social media links."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-2">
            <Button onClick={() => socialsQuery.refetch()} className="w-full">
              Try Again
            </Button>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-cenetr">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Social Media Links
                </h1>
                <p className="text-muted-foreground">
                  Manage and customize your social media profiles
                </p>
              </div>
            </div>

            <Button onClick={() => setAdding(true)} className="gap-2" size="sm">
              <PlusCircle className="h-4 w-4" />
              Add New
            </Button>
          </div>

          <Separator />
          {/* Stats and Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-background to-secondary/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Links</p>
                    <p className="text-3xl font-bold">
                      {socialMedia?.length || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <LinkIcon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-secondary/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Links
                    </p>
                    <p className="text-3xl font-bold">
                      {socialMedia?.filter((s) => s.isActive !== false)
                        .length || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-green-500/10">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-secondary/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="text-lg font-semibold">Just now</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle>Your Social Links</CardTitle>
                <CardDescription>
                  Click any link to preview and manage settings
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search social links..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredSocials.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <LinkIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    No social links found
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Try a different search term"
                      : "Get started by adding your first social link"}
                  </p>
                </div>
                {!searchQuery && (
                  <Button onClick={() => setAdding(true)} className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Social Link
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSocials.map((social) => (
                  <Card
                    key={social._id}
                    className={`group relative overflow-hidden transition-all hover:shadow-lg ${
                      social.isActive === false ? "opacity-60" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 dark:bg-white rounded-xl transition-transform group-hover:scale-110 ${
                            social.label ||
                            "bg-gradient-to-br from-gray-600 to-gray-700"
                          }`}
                        >
                          {social.icon ? (
                            <img
                              src={social.icon}
                              alt={social.name}
                              className="h-6 w-6 object-contain"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.innerHTML = `<div class="h-6 w-6 flex items-center justify-center text-white font-bold">${social.name.charAt(
                                  0
                                )}</div>`;
                              }}
                            />
                          ) : (
                            <div className="h-6 w-6 flex items-center justify-center text-white font-bold">
                              {social.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">
                              {social.name}
                            </h3>
                            {social.isActive === false && (
                              <Badge variant="outline" className="text-xs">
                                Inactive
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{social.href}</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyToClipboard(social.href)}
                              className="h-8 w-8"
                            >
                              {copySuccess === social.href ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy URL</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(social)}
                          className="h-8"
                        >
                          <Pencil className="h-3.5 w-3.5 mr-1.5" />
                          Edit
                        </Button>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowDeleteDialog(social._id)}
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Dialog */}
        <Dialog open={adding} onOpenChange={setAdding}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                <DialogTitle>Add New Social Link</DialogTitle>
              </div>
              <DialogDescription>
                Add a new social media profile to your website
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="custom" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="quick">Quick Add</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>

              <TabsContent value="quick" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SOCIAL_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleUsePreset(preset)}
                      className="flex flex-col items-center gap-3 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors group"
                    >
                      <div className={`p-3 rounded-lg ${preset.label}`}>
                        <img
                          src={preset.icon}
                          alt={preset.name}
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                      <span className="font-medium">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        Platform Name
                      </Label>
                      <Input
                        id="name"
                        value={newSocial.name}
                        onChange={(e) =>
                          setNewSocial({ ...newSocial, name: e.target.value })
                        }
                        placeholder="e.g., LinkedIn, Twitter, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="href" className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" />
                        Profile URL
                      </Label>
                      <Input
                        id="href"
                        type="url"
                        value={newSocial.href}
                        onChange={(e) =>
                          setNewSocial({ ...newSocial, href: e.target.value })
                        }
                        placeholder="https://example.com/your-profile"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="icon" className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Icon URL
                      </Label>
                      <Input
                        id="icon"
                        value={newSocial.icon}
                        onChange={(e) =>
                          setNewSocial({ ...newSocial, icon: e.target.value })
                        }
                        placeholder="https://cdn.example.com/icon.svg"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use icons from{" "}
                        <a
                          href="https://simpleicons.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          Simple Icons
                        </a>{" "}
                        or upload your own
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="label"
                        className="flex items-center gap-2"
                      >
                        <Palette className="h-4 w-4" />
                        Background Color
                      </Label>
                      <Select
                        value={newSocial.label}
                        onValueChange={(value) =>
                          setNewSocial({ ...newSocial, label: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bg-blue-600">Blue</SelectItem>
                          <SelectItem value="bg-sky-500">Sky Blue</SelectItem>
                          <SelectItem value="bg-gradient-to-r from-purple-500 to-pink-500">
                            Purple Gradient
                          </SelectItem>
                          <SelectItem value="bg-gray-900">Dark Gray</SelectItem>
                          <SelectItem value="bg-green-600">Green</SelectItem>
                          <SelectItem value="bg-red-600">Red</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="color"
                        className="flex items-center gap-2"
                      >
                        <Palette className="h-4 w-4" />
                        Hover Effect
                      </Label>
                      <Input
                        id="color"
                        value={newSocial.color}
                        onChange={(e) =>
                          setNewSocial({ ...newSocial, color: e.target.value })
                        }
                        placeholder="hover:bg-blue-600 hover:text-white"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                      <div className="space-y-0.5">
                        <Label htmlFor="active">Active Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Show this link on your website
                        </p>
                      </div>
                      <Switch
                        id="active"
                        checked={newSocial.isActive}
                        onCheckedChange={(checked) =>
                          setNewSocial({ ...newSocial, isActive: checked })
                        }
                      />
                    </div>

                    {/* Preview */}
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <Label className="mb-3 block">Preview</Label>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
                        {newSocial.icon ? (
                          <div
                            className={`p-2 rounded-lg ${
                              newSocial.label || "bg-gray-600"
                            }`}
                          >
                            <img
                              src={newSocial.icon}
                              alt="Preview"
                              className="h-5 w-5 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="p-2 rounded-lg bg-gray-600">
                            <div className="h-5 w-5 flex items-center justify-center text-white">
                              {newSocial.name?.charAt(0) || "?"}
                            </div>
                          </div>
                        )}
                        <div>
                          <p className="font-medium">
                            {newSocial.name || "Platform Name"}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {newSocial.href || "https://example.com"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleAddSocial}
                disabled={
                  addSocial.isPending || !newSocial.name || !newSocial.href
                }
                className="gap-2"
              >
                {addSocial.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" />
                    Add Social Link
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={!!editing} onOpenChange={closeEdit}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-3">
                {editing?.icon && (
                  <div
                    className={`p-2 rounded-lg dark:bg-white ${
                      editing.label || "bg-gray-600"
                    }`}
                  >
                    <img
                      src={editing.icon}
                      alt={editing.name}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                )}
                <div>
                  <DialogTitle>Edit {editing?.name}</DialogTitle>
                  <DialogDescription>
                    Update your social media settings
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {editing && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Platform Name</Label>
                    <Input
                      id="edit-name"
                      value={editing.name || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-icon">Icon URL</Label>
                    <Input
                      id="edit-icon"
                      value={editing.icon || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, icon: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-href">Profile URL</Label>
                  <Input
                    id="edit-href"
                    value={editing.href || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, href: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-label">Background</Label>
                    <Input
                      id="edit-label"
                      value={editing.label || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, label: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-color">Hover Effect</Label>
                    <Input
                      id="edit-color"
                      value={editing.color || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, color: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                  <div className="space-y-0.5">
                    <Label>Active Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Show this link on website
                    </p>
                  </div>
                  <Switch
                    checked={editing.isActive !== false}
                    onCheckedChange={(checked) =>
                      setEditing({ ...editing, isActive: checked })
                    }
                  />
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleUpdate}
                disabled={updateSocial.isPending}
                className="gap-2"
              >
                {updateSocial.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={!!showDeleteDialog}
          onOpenChange={() => setShowDeleteDialog(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Social Link</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                social media link from your website.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(showDeleteDialog)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
