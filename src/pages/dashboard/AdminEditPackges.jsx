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
  PlusCircle,
  AlertCircle,
  Trash2,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { usePackages } from "@/hooks/usePackages";

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

  return (
    <div className="space-y-4 mt-4">
      <div>
        <Label htmlFor="package-title" className="text-sm font-medium mb-2">
          Package Title
        </Label>
        <Input
          id="package-title"
          value={packageData.title || ""}
          onChange={(e) =>
            setPackageData({ ...packageData, title: e.target.value })
          }
          className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
          placeholder="e.g., Adventure Seeker"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="package-price" className="text-sm font-medium mb-2">
            Price ($)
          </Label>
          <Input
            id="package-price"
            type="number"
            value={packageData.price || ""}
            onChange={(e) =>
              setPackageData({ ...packageData, price: e.target.value })
            }
            className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
            placeholder="299"
          />
        </div>

        <div>
          <Label htmlFor="package-duration" className="text-sm font-medium mb-2">
            Duration
          </Label>
          <Input
            id="package-duration"
            value={packageData.duration || ""}
            onChange={(e) =>
              setPackageData({ ...packageData, duration: e.target.value })
            }
            className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
            placeholder="e.g., 3 Days"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="package-popular"
          checked={packageData.popular || false}
          onCheckedChange={(checked) =>
            setPackageData({ ...packageData, popular: checked })
          }
          className="border-slate-200 dark:border-gray-700"
        />
        <Label htmlFor="package-popular" className="cursor-pointer">
          Mark as Popular
        </Label>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Features</Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              placeholder="Add a feature..."
              className="bg-white dark:bg-black border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-600"
            />
            <Button
              type="button"
              onClick={handleAddFeature}
              variant="outline"
              className="border-slate-200 dark:border-gray-700"
            >
              Add
            </Button>
          </div>

          {packageData.features?.length > 0 && (
            <div className="space-y-1 max-h-40 overflow-y-auto p-2 bg-slate-50 dark:bg-black rounded border border-slate-200 dark:border-gray-700">
              {packageData.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-zinc-900 rounded border border-slate-200 dark:border-gray-700"
                >
                  <span className="text-sm text-slate-900 dark:text-white">
                    {feature}
                  </span>
                  <button
                    onClick={() => handleRemoveFeature(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
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

  if (!title || price <= 0 || !duration || features.length === 0) {
    toast.warning("Please fill all fields and add at least one feature.");
    return null;
  }

  return { title, price, duration, features, popular: packageData.popular };
}

export default function AdminEditPackages() {
  const navigate = useNavigate();
  
  // Use the enhanced hook with all mutations
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
      toast.success(`${validated.title} package added!`);
      resetNewPackage();
      setAdding(false);
    } catch (err) {
      toast.error("Failed to add package");
      console.error(err);
    }
  };

  const openEdit = (item) => {
    setEditing({ ...item });
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
      toast.success("Package updated successfully!");
      closeEdit();
    } catch (err) {
      toast.error("Failed to update package");
      console.error(err);
    }
  };

  const handleDeletePackage = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePackage.mutateAsync(id);
        toast.success(`${title} deleted successfully!`);
      } catch (err) {
        toast.error("Failed to delete package");
        console.error(err);
      }
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
          <span>Loading packages...</span>
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
            <h2 className="text-lg font-semibold">Error Loading Packages</h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            {error?.message || "Failed to load packages. Please try again."}
          </p>
          <Button onClick={() => refetch()} className="w-full">
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
  

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Tour Packages
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">
              Manage your tour packages and pricing
            </p>
          </div>
        </div>

        {/* Grid layout */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Tour packages"
        >
          {packages.map((pkg) => (
            <Card
              key={pkg._id || pkg.title}
              role="listitem"
              className="dark:bg-zinc-950 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700 transition relative overflow-hidden"
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Popular
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white pr-16">
                  {pkg.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-400">
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${pkg.price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-gray-500">
                      {pkg.duration}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>

              <div className="px-6 pb-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wide">
                    Features
                  </p>
                  <ul className="text-sm text-slate-700 dark:text-gray-300 space-y-1">
                    {pkg.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {pkg.features.length > 3 && (
                      <li className="text-slate-500 dark:text-gray-500 italic">
                        +{pkg.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(pkg)}
                  aria-label={`Edit ${pkg.title} package`}
                  className="border-slate-200 dark:border-gray-700 text-slate-900 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-900 flex-1"
                >
                  <Pencil className="h-4 w-4 mr-2" aria-hidden="true" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePackage(pkg._id, pkg.title)}
                  aria-label={`Delete ${pkg.title} package`}
                  className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* Add New Package Card */}
          <Card
            role="listitem"
            className="dark:bg-zinc-950 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700 transition cursor-pointer min-h-[280px] flex flex-col items-center justify-center gap-3"
            onClick={() => setAdding(true)}
          >
            <PlusCircle className="w-12 h-12 text-slate-400 dark:text-gray-600" />
            <p className="text-lg font-medium text-slate-600 dark:text-gray-400">
              Add New Package
            </p>
          </Card>
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editing} onOpenChange={closeEdit}>
          <DialogContent
            className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white max-w-2xl max-h-[90vh] overflow-y-auto"
            aria-describedby="edit-dialog-description"
          >
            <DialogHeader>
              <DialogTitle className="dark:text-white">
                Edit Package
              </DialogTitle>
              <DialogDescription
                id="edit-dialog-description"
                className="dark:text-gray-400"
              >
                Update your tour package details
              </DialogDescription>
            </DialogHeader>

            {editing && (
              <PackageForm
                packageData={editing}
                setPackageData={setEditing}
                featureInput={featureInput}
                setFeatureInput={setFeatureInput}
              />
            )}

            <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleUpdate}
                disabled={updatePackage.isPending}
                className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-gray-200 w-full sm:w-auto"
              >
                {updatePackage.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : updatePackage.isSuccess ? (
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
            className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white max-w-2xl max-h-[90vh] overflow-y-auto"
            aria-describedby="add-dialog-description"
          >
            <DialogHeader>
              <DialogTitle>Add New Package</DialogTitle>
              <DialogDescription
                id="add-dialog-description"
                className="dark:text-gray-400"
              >
                Create a new tour package for your website
              </DialogDescription>
            </DialogHeader>

            <PackageForm
              packageData={newPackage}
              setPackageData={setNewPackage}
              featureInput={featureInput}
              setFeatureInput={setFeatureInput}
            />

            <DialogFooter className="mt-6 gap-2">
              <Button
                onClick={handleAddPackage}
                disabled={addPackage.isPending}
                className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-gray-200"
              >
                {addPackage.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Package"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setAdding(false);
                  resetNewPackage();
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