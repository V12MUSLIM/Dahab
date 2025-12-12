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
  PlusCircle,
  AlertCircle,
  Trash2,
  Star,
  Package,
  Search,
  Sparkles,
  DollarSign,
  Calendar,
  Tag,
  ChevronLeft,
  TrendingUp,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { usePackages } from "@/hooks/usePackages";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
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
import { ErrorState } from "@/components/admin/adminUI/ErrorState";
import { LoadingState } from "@/components/admin/adminUI/LoadingState";

// Predefined durations for better UX
const DURATION_OPTIONS = [
  "1 Day",
  "2 Days",
  "3 Days",
  "4 Days",
  "5 Days",
  "1 Week",
  "2 Weeks",
  "3 Weeks",
  "1 Month",
];

// Shared Package Form Component
function PackageForm({
  packageData,
  setPackageData,
  featureInput,
  setFeatureInput,
}) {
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setPackageData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index) => {
    setPackageData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="package-title" className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-blue-500/10">
                <Tag className="h-4 w-4 text-blue-500" />
              </div>
              Package Title
            </Label>
            <Input
              id="package-title"
              value={packageData.title || ""}
              onChange={(e) =>
                setPackageData({ ...packageData, title: e.target.value })
              }
              placeholder="e.g., Adventure Seeker"
              className="font-medium bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="package-price" className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-green-500/10">
                <DollarSign className="h-4 w-4 text-green-500" />
              </div>
              Price
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="package-price"
                type="number"
                value={packageData.price || ""}
                onChange={(e) =>
                  setPackageData({ ...packageData, price: e.target.value })
                }
                placeholder="299"
                className="pl-8 font-medium bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="package-duration"
              className="flex items-center gap-2"
            >
              <div className="p-1.5 rounded-md bg-purple-500/10">
                <Calendar className="h-4 w-4 text-purple-500" />
              </div>
              Duration
            </Label>
            <Select
              value={packageData.duration}
              onValueChange={(value) =>
                setPackageData({ ...packageData, duration: value })
              }
            >
              <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-white/20 dark:border-gray-800/50">
                {DURATION_OPTIONS.map((duration) => (
                  <SelectItem key={duration} value={duration}>
                    {duration}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom...</SelectItem>
              </SelectContent>
            </Select>
            {packageData.duration === "custom" && (
              <Input
                value={packageData.duration || ""}
                onChange={(e) =>
                  setPackageData({ ...packageData, duration: e.target.value })
                }
                placeholder="e.g., 3 Days 2 Nights"
                className="mt-2 bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
              />
            )}
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-white/20 dark:border-gray-800/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
            <div className="space-y-0.5">
              <Label
                htmlFor="package-popular"
                className="flex items-center gap-2 cursor-pointer font-medium"
              >
                <div className="p-1 rounded-md bg-amber-500/10">
                  <Star className="h-4 w-4 text-amber-500" />
                </div>
                Popular Package
              </Label>
              <p className="text-sm text-muted-foreground">
                Highlight this package with a badge
              </p>
            </div>
            <Checkbox
              id="package-popular"
              checked={packageData.popular || false}
              onCheckedChange={(checked) =>
                setPackageData({ ...packageData, popular: checked })
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-md bg-cyan-500/10">
                <Sparkles className="h-4 w-4 text-cyan-500" />
              </div>
              Features
            </Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a feature..."
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                />
                <Button
                  type="button"
                  onClick={handleAddFeature}
                  variant="outline"
                  disabled={!featureInput.trim()}
                  className="border-white/30 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
                >
                  Add
                </Button>
              </div>

              {packageData.features?.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto p-3 rounded-lg border border-white/20 dark:border-gray-800/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                  {packageData.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 p-3 rounded-md bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/50"
                    >
                      <span className="text-sm">{feature}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFeature(i)}
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Press Enter or click Add to add features
              </p>
            </div>
          </div>

          {/* Preview Card */}
          <div className="mt-4 p-4 rounded-lg border border-white/20 dark:border-gray-800/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
            <Label className="mb-3 block font-medium">Preview</Label>
            <div className="p-3 rounded-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/50">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {packageData.title || "Package Title"}
                </h4>
                {packageData.popular && (
                  <Badge className="gap-1 bg-gradient-to-r from-amber-500 to-amber-600 backdrop-blur-sm">
                    <Star className="h-3 w-3" />
                    Popular
                  </Badge>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  ${packageData.price || "0"}
                </span>
                <span className="text-sm text-muted-foreground">
                  / {packageData.duration || "Duration"}
                </span>
              </div>
              <div className="space-y-1">
                {packageData.features.slice(0, 2).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
                {packageData.features.length > 2 && (
                  <p className="text-sm text-muted-foreground italic">
                    +{packageData.features.length - 2} more features
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Validation helper
function validatePackage(packageData) {
  const title = (packageData.title || "").trim();
  const price = Number(packageData.price) || 0;
  const duration = (packageData.duration || "").trim();
  const { features } = packageData;

  if (!title) {
    toast.error("Please enter a package title");
    return null;
  }

  if (price <= 0) {
    toast.error("Please enter a valid price");
    return null;
  }

  if (!duration) {
    toast.error("Please select a duration");
    return null;
  }

  if (features.length === 0) {
    toast.error("Please add at least one feature");
    return null;
  }

  return { title, price, duration, features, popular: !!packageData.popular };
}

export default function AdminEditPackages() {
  const {
    packages = [],
    isLoading,
    isError,
    error,
    addPackage,
    updatePackage,
    deletePackage,
  } = usePackages();

  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(null);
  const [newPackage, setNewPackage] = useState({
    title: "",
    price: "",
    duration: "",
    features: [],
    popular: false,
  });
  const [featureInput, setFeatureInput] = useState("");

  const resetNewPackage = () => {
    setNewPackage({
      title: "",
      price: "",
      duration: "",
      features: [],
      popular: false,
    });
    setFeatureInput("");
  };

  const handleAddPackage = async (e) => {
    e?.preventDefault();

    const validated = validatePackage(newPackage);
    if (!validated) return;

    try {
      await addPackage.mutateAsync(validated);
      toast.success(`${validated.title} package added successfully!`);
      resetNewPackage();
      setAdding(false);
    } catch (err) {
      toast.error("Failed to add package");
      console.error(err);
    }
  };

  const openEdit = (pkg) => {
    setEditing({
      ...pkg,
      duration: pkg.duration || "",
      features: Array.isArray(pkg.features) ? [...pkg.features] : [],
    });
    setFeatureInput("");
  };

  const closeEdit = () => {
    setEditing(null);
    setFeatureInput("");
  };

  const handleUpdate = async (e) => {
    e?.preventDefault();
    if (!editing) return;

    const validated = validatePackage(editing);
    if (!validated) return;

    try {
      await updatePackage.mutateAsync({
        id: editing._id,
        ...validated,
      });
      toast.success(`${validated.title} updated successfully!`);
      closeEdit();
    } catch (err) {
      toast.error("Failed to update package");
      console.error(err);
    }
  };

  const handleDeletePackage = async (id) => {
    if (!id) return;

    try {
      await deletePackage.mutateAsync(id);
      toast.success("Package deleted successfully!");
      setShowDeleteDialog(null);
    } catch (err) {
      toast.error("Failed to delete package");
      console.error(err);
    }
  };

  const filteredPackages = Array.isArray(packages)
    ? packages.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.features?.some((feature) =>
            feature.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : [];

  // Loading state
  if (isLoading) {
    return <LoadingState message="Packages" />;
  }

  // Error state
  if (isError) {
    return <ErrorState message={error.message} error={error} />;
  }

  const popularCount = packages.filter((p) => p.popular).length;
  const avgPrice = packages.length > 0 
    ? Math.round(packages.reduce((sum, p) => sum + (p.price || 0), 0) / packages.length)
    : 0;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Tour Packages
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage and customize your tour packages and pricing
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Total Packages
                    </p>
                    <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {packages.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Popular Packages
                    </p>
                    <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {popularCount}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 backdrop-blur-sm">
                    <Star className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Average Price
                    </p>
                    <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      ${avgPrice}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10 backdrop-blur-sm">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Avg. Duration
                    </p>
                    <p className="text-lg font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      3 Days
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/10 backdrop-blur-sm">
                    <Clock className="h-6 w-6 text-purple-500" />
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
                  Your Tour Packages
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Click any package to preview and manage settings
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {filteredPackages.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">No packages found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Try a different search term"
                      : "Get started by adding your first package"}
                  </p>
                </div>
                {!searchQuery && (
                  <Button 
                    onClick={() => setAdding(true)} 
                    className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Package
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPackages.map((pkg) => (
                  <Card
                    key={pkg._id}
                    className="group relative overflow-hidden transition-all hover:shadow-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border-white/20 dark:border-gray-800/50 hover:border-primary/50"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all">
                            {pkg.title}
                          </h3>
                          {pkg.popular && (
                            <Badge className="mt-1 gap-1 bg-gradient-to-r from-amber-500 to-amber-600 backdrop-blur-sm">
                              <Star className="h-3 w-3" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            ${pkg.price}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {pkg.duration}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-2">
                          {pkg.features.slice(0, 3).map((feature, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span className="text-primary">•</span>
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                          {pkg.features.length > 3 && (
                            <p className="text-sm text-muted-foreground italic">
                              +{pkg.features.length - 3} more features
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm px-6 py-3 flex justify-between border-t border-white/10 dark:border-gray-800/30">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEdit(pkg)}
                              className="h-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                            >
                              <Pencil className="h-3.5 w-3.5 mr-1.5" />
                              Edit
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-white/20 dark:border-gray-800/50">
                            <p>Edit {pkg.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowDeleteDialog(pkg._id)}
                              className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-white/20 dark:border-gray-800/50">
                            <p>Delete {pkg.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Dialog */}
        <Dialog open={adding} onOpenChange={setAdding}>
          <DialogContent className="max-w-4xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-white/20 dark:border-gray-800/50">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  <PlusCircle className="h-5 w-5 text-primary" />
                </div>
                <DialogTitle className="text-xl">Add New Tour Package</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground">
                Create a new tour package for your website
              </DialogDescription>
            </DialogHeader>

            <PackageForm
              packageData={newPackage}
              setPackageData={setNewPackage}
              featureInput={featureInput}
              setFeatureInput={setFeatureInput}
            />

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button 
                  variant="outline" 
                  onClick={resetNewPackage}
                  className="border-white/30 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleAddPackage}
                disabled={addPackage.isPending || !newPackage.title}
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm"
              >
                {addPackage.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" />
                    Add Package
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={!!editing} onOpenChange={closeEdit}>
          <DialogContent className="max-w-4xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-white/20 dark:border-gray-800/50">
            <DialogHeader>
              <div className="flex items-center gap-3">
                {editing && (
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <DialogTitle className="text-xl">Edit {editing?.title}</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Update your tour package details
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {editing && (
              <PackageForm
                packageData={editing}
                setPackageData={setEditing}
                featureInput={featureInput}
                setFeatureInput={setFeatureInput}
              />
            )}

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button 
                  variant="outline"
                  className="border-white/30 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleUpdate}
                disabled={updatePackage.isPending}
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm"
              >
                {updatePackage.isPending ? (
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
              <AlertDialogTitle>Delete Package</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                This action cannot be undone. This will permanently delete the
                tour package from your website.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-white/30 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeletePackage(showDeleteDialog)}
                className="bg-destructive hover:bg-destructive/90 backdrop-blur-sm"
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