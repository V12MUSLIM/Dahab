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
  ChevronLeft,
  Eye,
  EyeOff,
  RefreshCw,
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
import { LoadingState } from "@/components/admin/adminUI/LoadingState";
import { ErrorState } from "@/components/admin/adminUI/ErrorState";

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
       <LoadingState message=" Social Media"/>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message={error.message}
        onRetry={() => socialsQuery.refetch()}
        error={error}
      />
    );
  }

  const activeCount = socialMedia?.filter((s) => s.isActive !== false).length || 0;

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
                onClick={() => window.history.back()}
                className="h-10 w-10 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20 dark:border-gray-800/50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 shadow-lg">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Social Media Links
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage and customize your social media profiles
                </p>
              </div>
            </div>

            <Button 
              onClick={() => setAdding(true)} 
              className="gap-2 h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm"
            >
              <PlusCircle className="h-4 w-4" />
              Add New
            </Button>
          </div>

          <Separator className="opacity-50" />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Total Links
                    </p>
                    <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {socialMedia?.length || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm">
                    <LinkIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Active Links
                    </p>
                    <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {activeCount}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10 backdrop-blur-sm">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Inactive Links
                    </p>
                    <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {socialMedia?.length - activeCount || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 backdrop-blur-sm">
                    <EyeOff className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-xl">
          <CardHeader className="border-b border-white/10 dark:border-gray-800/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-xl sm:text-2xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Your Social Links
                </CardTitle>
                <CardDescription className="text-muted-foreground">
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
                    className="pl-9 bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {filteredSocials.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm flex items-center justify-center">
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
                  <Button 
                    onClick={() => setAdding(true)} 
                    className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm"
                  >
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
                    className={`group relative overflow-hidden transition-all hover:shadow-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border-white/20 dark:border-gray-800/50 ${
                      social.isActive === false ? "opacity-60" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-xl transition-transform group-hover:scale-110 backdrop-blur-sm ${
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
                            <h3 className="font-semibold truncate bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                              {social.name}
                            </h3>
                            {social.isActive === false ? (
                              <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/20">
                                <EyeOff className="h-3 w-3 mr-1" />
                                Inactive
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                                <Eye className="h-3 w-3 mr-1" />
                                Active
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
                    <CardFooter className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm px-6 py-3 flex justify-between border-t border-white/10 dark:border-gray-800/30">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyToClipboard(social.href)}
                              className="h-8 w-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
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
                          className="h-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
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
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
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
          <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-white/20 dark:border-gray-800/50">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  <PlusCircle className="h-5 w-5 text-primary" />
                </div>
                <DialogTitle className="text-xl">Add New Social Link</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground">
                Add a new social media profile to your website
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="custom" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
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
                      className="flex flex-col items-center gap-3 p-4 rounded-lg border border-white/20 dark:border-gray-800/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className={`p-3 rounded-lg backdrop-blur-sm ${preset.label}`}>
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
                        <div className="p-1.5 rounded-md bg-blue-500/10">
                          <Type className="h-4 w-4 text-blue-500" />
                        </div>
                        Platform Name
                      </Label>
                      <Input
                        id="name"
                        value={newSocial.name}
                        onChange={(e) =>
                          setNewSocial({ ...newSocial, name: e.target.value })
                        }
                        placeholder="e.g., LinkedIn, Twitter, etc."
                        className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="href" className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-green-500/10">
                          <LinkIcon className="h-4 w-4 text-green-500" />
                        </div>
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
                        className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="icon" className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-purple-500/10">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                        </div>
                        Icon URL
                      </Label>
                      <Input
                        id="icon"
                        value={newSocial.icon}
                        onChange={(e) =>
                          setNewSocial({ ...newSocial, icon: e.target.value })
                        }
                        placeholder="https://cdn.example.com/icon.svg"
                        className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
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
                        <div className="p-1.5 rounded-md bg-amber-500/10">
                          <Palette className="h-4 w-4 text-amber-500" />
                        </div>
                        Background Color
                      </Label>
                      <Select
                        value={newSocial.label}
                        onValueChange={(value) =>
                          setNewSocial({ ...newSocial, label: value })
                        }
                      >
                        <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm">
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-white/20 dark:border-gray-800/50">
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

                    <div className="flex items-center justify-between p-4 rounded-lg border border-white/20 dark:border-gray-800/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                      <div className="space-y-0.5">
                        <Label htmlFor="active" className="font-medium">Active Status</Label>
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
                    <div className="p-4 rounded-lg border border-white/20 dark:border-gray-800/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                      <Label className="mb-3 block font-medium">Preview</Label>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/50">
                        {newSocial.icon ? (
                          <div
                            className={`p-2 rounded-lg backdrop-blur-sm ${
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
                          <div className="p-2 rounded-lg bg-gray-600 backdrop-blur-sm">
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
                <Button variant="outline" className="border-white/30 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleAddSocial}
                disabled={
                  addSocial.isPending || !newSocial.name || !newSocial.href
                }
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm"
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
          <DialogContent className="max-w-md bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-white/20 dark:border-gray-800/50">
            <DialogHeader>
              <div className="flex items-center gap-3">
                {editing?.icon && (
                  <div
                    className={`p-2 rounded-lg backdrop-blur-sm ${
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
                  <DialogTitle className="text-xl">Edit {editing?.name}</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
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
                      className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
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
                      className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
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
                    className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-white/20 dark:border-gray-800/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Active Status</Label>
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
                <Button variant="outline" className="border-white/30 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleUpdate}
                disabled={updateSocial.isPending}
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm"
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
          <AlertDialogContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-white/20 dark:border-gray-800/50">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Social Link</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                This action cannot be undone. This will permanently delete the
                social media link from your website.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-white/30 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(showDeleteDialog)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 backdrop-blur-sm"
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