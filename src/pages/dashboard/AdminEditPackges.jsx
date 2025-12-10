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
function PackageForm({ packageData, setPackageData, featureInput, setFeatureInput }) {
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
              <Tag className="h-4 w-4" />
              Package Title
            </Label>
            <Input
              id="package-title"
              value={packageData.title || ""}
              onChange={(e) =>
                setPackageData({ ...packageData, title: e.target.value })
              }
              placeholder="e.g., Adventure Seeker"
              className="font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="package-price" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
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
                className="pl-8 font-medium"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="package-duration" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Duration
            </Label>
            <Select
              value={packageData.duration}
              onValueChange={(value) =>
                setPackageData({ ...packageData, duration: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
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
                className="mt-2"
              />
            )}
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
            <div className="space-y-0.5">
              <Label htmlFor="package-popular" className="flex items-center gap-2 cursor-pointer">
                <Star className="h-4 w-4" />
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
              <Sparkles className="h-4 w-4" />
              Features
            </Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a feature..."
                />
                <Button
                  type="button"
                  onClick={handleAddFeature}
                  variant="outline"
                  disabled={!featureInput.trim()}
                >
                  Add
                </Button>
              </div>

              {packageData.features?.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto p-3 rounded-lg border bg-muted/30">
                  {packageData.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 p-3 rounded-md bg-background border"
                    >
                      <span className="text-sm">{feature}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFeature(i)}
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
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
          <div className="mt-4 p-4 rounded-lg border bg-muted/30">
            <Label className="mb-3 block">Preview</Label>
            <div className="p-3 rounded-md bg-card border">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">{packageData.title || "Package Title"}</h4>
                {packageData.popular && (
                  <Badge className="gap-1">
                    <Star className="h-3 w-3" />
                    Popular
                  </Badge>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-xl font-bold">${packageData.price || "0"}</span>
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
    refetch,
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
      features: Array.isArray(pkg.features) ? [...pkg.features] : []
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
    ? packages.filter(pkg => 
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.features?.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="animate-spin h-10 w-10 text-primary" />
            <div className="absolute inset-0 animate-ping bg-primary/10 rounded-full" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-lg font-medium">Loading Tour Packages</p>
            <p className="text-sm text-muted-foreground">Fetching your packages...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="max-w-md w-full border-destructive/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-xl">Unable to Load Packages</CardTitle>
            <CardDescription className="mt-2">
              {error?.message || "There was an error loading your tour packages."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-2">
            <Button onClick={() => refetch()} className="w-full">
              Try Again
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Tour Packages</h1>
                <p className="text-muted-foreground">
                  Manage and customize your tour packages and pricing
                </p>
              </div>
            </div>
            <Separator />
          </div>

          {/* Stats and Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-background to-secondary/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Packages</p>
                    <p className="text-3xl font-bold">{packages?.length || 0}</p>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-secondary/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Popular Packages</p>
                    <p className="text-3xl font-bold">
                      {packages?.filter(p => p.popular).length || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-amber-500/10">
                    <Star className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-secondary/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Price</p>
                    <p className="text-2xl font-bold">
                      ${packages?.length > 0 
                        ? Math.round(packages.reduce((sum, p) => sum + (p.price || 0), 0) / packages.length)
                        : 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-green-500/10">
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-secondary/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="text-lg font-semibold">Just now</p>
                  </div>
                  <Button
                    onClick={() => setAdding(true)}
                    className="gap-2"
                    size="sm"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add New
                  </Button>
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
                <CardTitle>Your Tour Packages</CardTitle>
                <CardDescription>
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
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredPackages.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">No packages found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? "Try a different search term" : "Get started by adding your first package"}
                  </p>
                </div>
                {!searchQuery && (
                  <Button onClick={() => setAdding(true)} className="gap-2">
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
                    className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/50"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {pkg.title}
                          </h3>
                          {pkg.popular && (
                            <Badge className="mt-1 gap-1">
                              <Star className="h-3 w-3" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">${pkg.price}</div>
                          <div className="text-sm text-muted-foreground">{pkg.duration}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-2">
                          {pkg.features.slice(0, 3).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
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
                    <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEdit(pkg)}
                              className="h-8"
                            >
                              <Pencil className="h-3.5 w-3.5 mr-1.5" />
                              Edit
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
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
                              className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
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
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                <DialogTitle>Add New Tour Package</DialogTitle>
              </div>
              <DialogDescription>
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
                <Button variant="outline" onClick={resetNewPackage}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleAddPackage}
                disabled={addPackage.isPending || !newPackage.title}
                className="gap-2"
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
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <div className="flex items-center gap-3">
                {editing && (
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <DialogTitle>Edit {editing?.title}</DialogTitle>
                  <DialogDescription>Update your tour package details</DialogDescription>
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
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleUpdate}
                disabled={updatePackage.isPending}
                className="gap-2"
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
        <AlertDialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Package</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the tour package from your website.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeletePackage(showDeleteDialog)}
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