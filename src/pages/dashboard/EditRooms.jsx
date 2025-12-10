// EditRooms.jsx - Component for managing room types

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
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  // Find the specific stay
  const flatStays = Array.isArray(stays) ? stays.flat() : [];
  const stay = flatStays.find((s) => s._id === id);

  if (!stay) {
    return (
      <div className="min-h-screen p-6">
        <h1 className="text-2xl font-bold text-destructive">Stay not found</h1>
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

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard/stays")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Room Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Managing rooms for <strong>{stay.name}</strong>
            </p>
          </div>
          <Button onClick={handleAddRoom}>
            <Plus className="w-4 h-4 mr-2" />
            Add Room Type
          </Button>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stay.roomTypes?.map((room, index) => (
            <Card key={room._id || index} className="hover:border-primary/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{room.name}</CardTitle>
                  <Badge variant="secondary">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {room.price}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Maximize className="w-4 h-4 text-muted-foreground" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-muted-foreground" />
                    <span>{room.beds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
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
                        <Badge key={i} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {room.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
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
                    className="flex-1"
                    onClick={() => handleEditRoom(room, index)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteRoom(index)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit/Add Room Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedRoom ? "Edit Room Type" : "Add Room Type"}
              </DialogTitle>
              <DialogDescription>
                {selectedRoom
                  ? "Update the details for this room type"
                  : "Add a new room type to this stay"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomName">Room Name *</Label>
                  <Input
                    id="roomName"
                    value={roomForm.name}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, name: e.target.value })
                    }
                    placeholder="Deluxe Sea View"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roomSize">Size *</Label>
                  <Input
                    id="roomSize"
                    value={roomForm.size}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, size: e.target.value })
                    }
                    placeholder="32 m²"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beds">Bed Configuration *</Label>
                <Input
                  id="beds"
                  value={roomForm.beds}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, beds: e.target.value })
                  }
                  placeholder="1 King or 2 Twin"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxOccupancy">Max Occupancy *</Label>
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price per Night (USD) *</Label>
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
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md">
                  {commonAmenities.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={roomForm.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="rounded"
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
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