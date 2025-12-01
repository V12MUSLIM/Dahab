// AdminEditStays.jsx - Updated with Edit and Delete functionality

import { useState } from "react";
import { useStay } from "@/hooks/useStay";
import { useStayMutations } from "@/hooks/useStayMutations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  MapPin,
  Loader2,
  Wifi,
  Waves,
  Utensils,
  Coffee,
  Car,
  Mountain,
  Bed,
  Plus,
  DollarSign,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import EditStayDialog from "./EditStayDialog";

export default function AdminEditStays() {
  const { data: stays, isLoading, error } = useStay();
  const { deleteStay } = useStayMutations();
  const navigate = useNavigate();
  
  const [selectedStay, setSelectedStay] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [stayToDelete, setStayToDelete] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-destructive">Error: {error.message}</h1>;
  }

  const flatStays = Array.isArray(stays) ? stays.flat() : [];
  
  const amenityIcons = {
    Wifi: Wifi,
    Coffee: Coffee,
    Utensils: Utensils,
    Car: Car,
    Waves: Waves,
    Mountain: Mountain,
  };

  const getAmenityNames = (stay) => {
    const amenities = [];
    if (stay.amenities) {
      Object.values(stay.amenities).forEach((categoryAmenities) => {
        if (Array.isArray(categoryAmenities)) {
          categoryAmenities.slice(0, 2).forEach((amenity) => {
            if (amenity.toLowerCase().includes("wifi")) amenities.push("Wifi");
            else if (
              amenity.toLowerCase().includes("coffee") ||
              amenity.toLowerCase().includes("bar")
            )
              amenities.push("Coffee");
            else if (
              amenity.toLowerCase().includes("restaurant") ||
              amenity.toLowerCase().includes("dining")
            )
              amenities.push("Utensils");
            else if (
              amenity.toLowerCase().includes("parking") ||
              amenity.toLowerCase().includes("car")
            )
              amenities.push("Car");
            else if (
              amenity.toLowerCase().includes("beach") ||
              amenity.toLowerCase().includes("sea")
            )
              amenities.push("Waves");
            else if (amenity.toLowerCase().includes("mountain"))
              amenities.push("Mountain");
          });
        }
      });
    }
    return [...new Set(amenities)].slice(0, 5);
  };

  const badgeColors = {
    Popular: "bg-amber-500/80 text-amber-100",
    "Top Rated": "bg-emerald-500/80 text-emerald-100",
    "Great Value": "bg-sky-500/80 text-sky-100",
    "Social Hub": "bg-fuchsia-500/80 text-fuchsia-100",
    "Budget Pick": "bg-violet-500/80 text-violet-100",
    "Unique Stay": "bg-indigo-500/80 text-indigo-100",
    "Boutique Luxury": "bg-rose-500/80 text-rose-100",
  };

  const handleEditClick = (stay) => {
    setSelectedStay(stay);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (stay) => {
    setStayToDelete(stay);
    setDeleteDialogOpen(true);
  };

  const handleCloseEditDialog = (isOpen) => {
    if (!isOpen) {
      setEditDialogOpen(false);
      // Reset selected stay after dialog closes
      setTimeout(() => setSelectedStay(null), 200);
    }
  };

  const confirmDelete = async () => {
    if (stayToDelete) {
      await deleteStay.mutateAsync(stayToDelete._id);
      setDeleteDialogOpen(false);
      setStayToDelete(null);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-10">
          <header className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Manage Stays
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Edit, delete, or add stays to your accommodation listings.
                </p>
              </div>
              <Button
                onClick={() => navigate("addstay")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Stay
              </Button>
            </div>
            <Separator />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {flatStays.map((stay) => {
              const amenities = getAmenityNames(stay);
              return (
                <Card
                  key={stay._id}
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-1 text-card-foreground group-hover:text-primary transition-colors">
                        {stay.name}
                      </CardTitle>
                      {stay.badge && (
                        <Badge
                          className={`${
                            badgeColors[stay.badge]
                          } rounded-lg px-2 py-0.5 text-xs whitespace-nowrap shrink-0`}
                        >
                          {stay.badge}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <span className="text-muted-foreground line-clamp-1">
                        {stay.location}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                      {stay.description}
                    </p>

                    <div className="flex items-baseline gap-1">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-3xl font-bold text-foreground">
                        {stay.pricePerNight}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">
                        /night
                      </span>
                    </div>

                    {amenities.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <TooltipProvider>
                          {amenities.map((amenity, idx) => {
                            const IconComponent = amenityIcons[amenity];
                            return (
                              <Tooltip key={idx}>
                                <TooltipTrigger>
                                  <div className="p-2 bg-muted hover:bg-accent rounded-lg flex items-center justify-center transition-colors border border-border hover:border-primary/30">
                                    {IconComponent && (
                                      <IconComponent className="w-4 h-4 text-foreground" />
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{amenity}</p>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </TooltipProvider>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Features
                      </h4>
                      <ul className="space-y-1 text-sm text-card-foreground">
                        {stay.features.slice(0, 3).map((f, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-primary" />
                            <span className="line-clamp-1">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Quick Actions
                      </h4>

                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditClick(stay)}
                                className="border-border hover:border-primary/50 hover:bg-muted"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Stay</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  navigate(`/dashboard/stays/${stay._id}/rooms`)
                                }
                                className="border-border hover:border-primary/50 hover:bg-muted"
                              >
                                <Bed className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Rooms</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="border-border hover:border-destructive/50 hover:bg-muted hover:text-destructive"
                                onClick={() => handleDeleteClick(stay)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Stay</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {selectedStay && (
        <EditStayDialog
          key={selectedStay._id}
          stay={selectedStay}
          open={editDialogOpen}
          onOpenChange={handleCloseEditDialog}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{stayToDelete?.name}</strong>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteStay.isPending}
            >
              {deleteStay.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}