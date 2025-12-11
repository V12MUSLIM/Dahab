import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Users, Home, Image, Check } from "lucide-react";

export default function RoomTypesSection({
  rooms,
  selectedIndex,
  onSelect,
  onBookClick,
}) {
  if (!rooms?.length) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bed className="w-6 h-6 text-amber-600" />
            Available Room Types
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose the room that fits your style and group size
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {rooms.map((room, index) => {
          const isSelected = index === selectedIndex;
          return (
            <Card
              key={index}
              className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                isSelected
                  ? "border-2 border-amber-500 shadow-xl ring-4 ring-amber-500/20"
                  : "border-2 border-transparent hover:border-amber-300"
              }`}
              onClick={() => onSelect(index)}
            >
              <div className="grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)]">
                {/* Image / visual */}
                <div className="relative h-56 md:h-full bg-gradient-to-br from-amber-500/20 to-amber-900/40 overflow-hidden group">
                  {room.image ? (
                    <>
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-amber-100">
                      <Image className="w-12 h-12" />
                      <span className="text-xs uppercase tracking-widest font-semibold">
                        Room preview
                      </span>
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-amber-600 text-white shadow-lg px-3 py-1 text-xs font-bold">
                        ✓ Selected
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Details */}
                <CardContent className="p-6 flex flex-col justify-between bg-white dark:bg-gray-950">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-2">{room.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Home className="w-4 h-4 text-amber-600" />
                            <span className="font-medium">{room.size}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Bed className="w-4 h-4 text-amber-600" />
                            <span className="font-medium">{room.beds}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-amber-600" />
                            <span className="font-medium">Max {room.maxOccupancy}</span>
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          From
                        </p>
                        <p className="text-3xl font-bold text-amber-600">
                          ${room.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          per night
                        </p>
                      </div>
                    </div>

                    {room.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {room.description}
                      </p>
                    )}

                    {room.amenities && room.amenities.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Room Amenities
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.slice(0, 6).map((amenity, i) => (
                            <Badge key={i} variant="outline" className="text-xs font-medium bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
                              <Check className="w-3 h-3 mr-1 text-amber-600" />
                              {amenity}
                            </Badge>
                          ))}
                          {room.amenities.length > 6 && (
                            <Badge variant="outline" className="text-xs font-medium">
                              +{room.amenities.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3">
                    <Button
                      size="lg"
                      variant={isSelected ? "default" : "outline"}
                      className={isSelected ? "bg-amber-600 hover:bg-amber-700 shadow-lg px-8" : "hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-500 px-8"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(index);
                        onBookClick();
                      }}
                    >
                      {isSelected ? "Book this room" : "Select & Book"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      <Check className="w-3 h-3 inline mr-1 text-green-600" />
                      Free cancellation available
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}