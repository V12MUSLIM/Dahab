import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStay } from "@/hooks/useStay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Edit, ArrowLeft } from "lucide-react";

export default function EditRooms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useStay();
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    beds: "",
    price: "",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  const flatStays = Array.isArray(data) ? data.flat() : [];
  const stay = flatStays.find((s) => s._id === id);

  if (!stay) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Stay not found</h1>
      </div>
    );
  }

  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setFormData({
      name: room.name,
      size: room.size,
      beds: room.beds,
      price: room.price,
    });
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Add your API call here to update the room
    console.log("Saving room:", selectedRoom._id, formData);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-10">
          <header className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/dashboard/stays")}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Edit Rooms — {stay.name}
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Manage room types for this stay. Edit room details, pricing, and availability.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stay.roomTypes.map((room) => (
              <Card className="bg-zinc-950" key={room._id}>
                <CardHeader>
                  <CardTitle>{room.name}</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-gray-400">Size</span>
                      <span className="text-gray-200">{room.size}</span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-gray-400">Beds</span>
                      <span className="text-gray-200">{room.beds}</span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-gray-400">Price</span>
                      <span className="text-2xl text-gray-200 font-semibold">
                        ${room.price}
                      </span>
                    </div>

                    <div className="mt-4">
                      <Button
                        className="w-full"
                        onClick={() => handleEditClick(room)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Room
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Room</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the room details below. Click save when finished.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-200">
                Room Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size" className="text-gray-200">
                Size
              </Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => handleInputChange("size", e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="beds" className="text-gray-200">
                Beds
              </Label>
              <Input
                id="beds"
                type="number"
                value={formData.beds}
                onChange={(e) => handleInputChange("beds", e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price" className="text-gray-200">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-gray-200"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-zinc-800"
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
