// EditRooms.jsx - Component for managing room types
import { AmenityManager } from "@/components/stay/AmenityManger";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStay } from "@/hooks/useStay";
import { useStayMutations } from "@/hooks/useStayMutations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Bed,
  DollarSign,
  Users,
  Maximize,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Loader2,
  ChevronLeft,
  Building,
  Hotel,
  Sparkles,
  Eye,
} from "lucide-react";

export default function EditRooms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: stays, isLoading } = useStay();
  const { updateStay } = useStayMutations();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);

  // Room form state
  const [roomForm, setRoomForm] = useState({
    name: "",
    size: "",
    beds: "",
    maxOccupancy: 1,
    price: 0,
    amenities: [],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="p-4 rounded-xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
          <Loader2 className="animate-spin text-primary h-8 w-8" />
        </div>
      </div>
    );
  }

  // Find the specific stay
  const flatStays = Array.isArray(stays) ? stays.flat() : [];
  const stay = flatStays.find((s) => s._id === id);

  if (!stay) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <div className="p-6 rounded-xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 text-center">
          <h1 className="text-2xl font-bold text-destructive bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">
            Stay not found
          </h1>
          <p className="text-muted-foreground mt-2">The requested stay could not be found.</p>
          <Button 
            onClick={() => navigate("/dashboard/stays")} 
            className="mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stays
          </Button>
        </div>
      </div>
    );
  }

  const handleEditRoom = (room, index) => {
    setSelectedRoom(room);
    setSelectedRoomIndex(index);
    setRoomForm({
      name: room.name,
      size: room.size,
      beds: room.beds,
      maxOccupancy: room.maxOccupancy,
      price: room.price,
      amenities: room.amenities || [],
    });
    setEditDialogOpen(true);
  };

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setSelectedRoomIndex(null);
    setRoomForm({
      name: "",
      size: "",
      beds: "",
      maxOccupancy: 1,
      price: 0,
      amenities: [],
    });
    setEditDialogOpen(true);
  };

  const handleSaveRoom = async () => {
    const updatedRooms = [...(stay.roomTypes || [])];

    if (selectedRoomIndex !== null) {
      // Update existing room
      updatedRooms[selectedRoomIndex] = {
        ...updatedRooms[selectedRoomIndex],
        ...roomForm,
      };
    } else {
      // Add new room
      updatedRooms.push({
        _id: `room_${Date.now()}`,
        ...roomForm,
      });
    }

    await updateStay.mutateAsync({
      id: stay._id,
      data: { roomTypes: updatedRooms },
    });

    setEditDialogOpen(false);
  };

  const handleDeleteRoom = async (index) => {
    const updatedRooms = stay.roomTypes.filter((_, i) => i !== index);
    await updateStay.mutateAsync({
      id: stay._id,
      data: { roomTypes: updatedRooms },
    });
  };

  const handleAmenityChange = (amenity) => {
    setRoomForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const commonAmenities = [
    "Sea View",
    "Mountain View",
    "Garden View",
    "Balcony",
    "Private Terrace",
    "Air Conditioning",
    "Mini Bar",
    "Coffee Maker",
    "Safe",
    "Bathtub",
    "Jacuzzi",
    "Living Area",
    "Kitchenette",
    "Direct Beach Access",
  ];

  const totalRooms = stay.roomTypes?.length || 0;
  const avgPrice = totalRooms > 0 
    ? Math.round(stay.roomTypes.reduce((acc, room) => acc + (room.price || 0), 0) / totalRooms)
    : 0;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-950 dark:to-black">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard/stays")}
                className="h-10 w-10 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20 dark:border-gray-800/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 shadow-lg">
                <Hotel className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Room Management
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Managing rooms for <strong className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{stay.name}</strong>
                </p>
              </div>
            </div>
            <Button 
              onClick={handleAddRoom}
              className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm h-11"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Room Type
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
                      Total Rooms
                    </p>
                    <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {totalRooms}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 backdrop-blur-sm">
                    <Bed className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Avg. Price
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
                      Stay Status
                    </p>
                    <p className="text-lg font-bold mt-2">
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 backdrop-blur-sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 backdrop-blur-sm">
                    <Sparkles className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stay.roomTypes?.map((room, index) => (
            <Card 
              key={room._id || index} 
              className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-white/20 dark:border-gray-800/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {room.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-green-500/10 to-green-600/10 backdrop-blur-sm text-green-600 dark:text-green-400 border-green-500/20 font-semibold"
                  >
                    <DollarSign className="w-3 h-3 mr-1" />
                    {room.price}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-blue-500/10">
                      <Maximize className="w-4 h-4 text-blue-500" />
                    </div>
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-purple-500/10">
                      <Bed className="w-4 h-4 text-purple-500" />
                    </div>
                    <span>{room.beds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-amber-500/10">
                      <Users className="w-4 h-4 text-amber-500" />
                    </div>
                    <span>Max {room.maxOccupancy} guests</span>
                  </div>
                </div>

                {room.amenities && room.amenities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Amenities
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="text-xs bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                        >
                          {amenity}
                        </Badge>
                      ))}
                      {room.amenities.length > 3 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                        >
                          +{room.amenities.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-white/30 dark:border-gray-700/50 hover:border-primary/50 hover:bg-primary/10"
                    onClick={() => handleEditRoom(room, index)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteRoom(index)}
                    className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-white/30 dark:border-gray-700/50 text-destructive hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {(!stay.roomTypes || stay.roomTypes.length === 0) && (
          <div className="text-center py-12 space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm flex items-center justify-center">
              <Hotel className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">No rooms added yet</h3>
              <p className="text-muted-foreground">
                Get started by adding your first room type for this stay
              </p>
            </div>
            <Button 
              onClick={handleAddRoom} 
              className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Room Type
            </Button>
          </div>
        )}

        {/* Edit/Add Room Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-white/20 dark:border-gray-800/50">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  {selectedRoom ? (
                    <Edit className="h-5 w-5 text-primary" />
                  ) : (
                    <Plus className="h-5 w-5 text-primary" />
                  )}
                </div>
                <DialogTitle className="text-xl">
                  {selectedRoom ? "Edit Room Type" : "Add Room Type"}
                </DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground">
                {selectedRoom
                  ? "Update the details for this room type"
                  : "Add a new room type to this stay"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomName" className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-blue-500/10">
                      <Building className="h-4 w-4 text-blue-500" />
                    </div>
                    Room Name *
                  </Label>
                  <Input
                    id="roomName"
                    value={roomForm.name}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, name: e.target.value })
                    }
                    placeholder="Deluxe Sea View"
                    className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roomSize" className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-green-500/10">
                      <Maximize className="h-4 w-4 text-green-500" />
                    </div>
                    Size *
                  </Label>
                  <Input
                    id="roomSize"
                    value={roomForm.size}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, size: e.target.value })
                    }
                    placeholder="32 m²"
                    className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beds" className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-purple-500/10">
                    <Bed className="h-4 w-4 text-purple-500" />
                  </div>
                  Bed Configuration *
                </Label>
                <Input
                  id="beds"
                  value={roomForm.beds}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, beds: e.target.value })
                  }
                  placeholder="1 King or 2 Twin"
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxOccupancy" className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-amber-500/10">
                      <Users className="h-4 w-4 text-amber-500" />
                    </div>
                    Max Occupancy *
                  </Label>
                  <Input
                    id="maxOccupancy"
                    type="number"
                    min="1"
                    value={roomForm.maxOccupancy}
                    onChange={(e) =>
                      setRoomForm({
                        ...roomForm,
                        maxOccupancy: parseInt(e.target.value),
                      })
                    }
                    className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-green-500/10">
                      <DollarSign className="h-4 w-4 text-green-500" />
                    </div>
                    Price per Night (USD) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={roomForm.price}
                    onChange={(e) =>
                      setRoomForm({
                        ...roomForm,
                        price: parseFloat(e.target.value),
                      })
                    }
                    className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              <AmenityManager
                label="Room Amenities"
                selectedAmenities={roomForm.amenities}
                onChange={(amenities) =>
                  setRoomForm({ ...roomForm, amenities })
                }
                defaultAmenities={commonAmenities}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10 dark:border-gray-800/30">
                <Button
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                  className="border-white/30 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveRoom}
                  disabled={
                    !roomForm.name ||
                    !roomForm.size ||
                    !roomForm.beds ||
                    updateStay.isPending
                  }
                  className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg backdrop-blur-sm"
                >
                  {updateStay.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Room"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}