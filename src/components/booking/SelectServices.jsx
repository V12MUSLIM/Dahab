import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Waves, Coffee, UtensilsCrossed, CheckCircle2, Star, Hotel } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { sanitizeInput, safeArray } from "@/components/booking/servicesBooking/utils/sanitization";
import { BOOKING_STEPS } from "@/components/booking/Data/constants";

export default function SelectServices({
  bookingData,
  destinations = [],
  flatExperiences = [],
  toggleItem,
  updateBookingData,
  restaurants = [],
  cafes = [],
  hotels = [],
}) {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
        <CardHeader className="border-b border-gray-200 dark:border-zinc-800">
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-50">
            <Hotel className="w-6 h-6 text-amber-600 dark:text-amber-500" /> Accommodation
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Choose whether to include a hotel stay
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-zinc-700">
            <p className="font-medium text-gray-900 dark:text-amber-50">Include Stay</p>
            <Switch
              checked={bookingData.includeStay}
              onCheckedChange={(v) => updateBookingData("includeStay", v)}
              className="data-[state=checked]:bg-amber-500"
            />
          </div>
          {bookingData.includeStay && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Select Room Type</Label>
              <div className="grid gap-3">
                {safeArray(hotels).length > 0 ? (
                  safeArray(hotels).map((hotel) => {
                    const selected = bookingData.roomType === hotel.id;
                    return (
                      <motion.div
                        key={hotel.id}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => updateBookingData("roomType", hotel.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer flex justify-between items-start transition-all duration-200 ${
                          selected
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                            : "border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 hover:border-amber-500/50"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Hotel className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-amber-50">
                                {sanitizeInput(hotel.name || hotel.title)}
                              </p>
                              {hotel.location && (
                                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                                  <MapPin className="w-3 h-3" />
                                  {sanitizeInput(hotel.location)}
                                </p>
                              )}
                            </div>
                          </div>
                          {hotel.description && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {sanitizeInput(hotel.description)}
                            </p>
                          )}
                          {hotel.amenities && safeArray(hotel.amenities).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {safeArray(hotel.amenities).slice(0, 3).map((amenity, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded"
                                >
                                  {sanitizeInput(amenity)}
                                </span>
                              ))}
                            </div>
                          )}
                          {hotel.rating && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-600 dark:text-amber-500" />
                              {hotel.rating} • {hotel.reviews || 0} reviews
                            </p>
                          )}
                        </div>
                        <div className="ml-4 text-right">
                          <p className="font-bold text-amber-700 dark:text-amber-500 text-lg">
                            ${hotel.pricePerNight || hotel.price || 0}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">per night</p>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  BOOKING_STEPS.map((r) => {
                    const selected = bookingData.roomType === r.value;
                    return (
                      <div
                        key={r.value}
                        onClick={() => updateBookingData("roomType", r.value)}
                        className={`p-4 border-2 rounded-lg cursor-pointer flex justify-between transition-all duration-200 hover:border-amber-500/50 ${
                          selected
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                            : "border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <r.icon className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-amber-50">{r.label}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{r.description}</p>
                          </div>
                        </div>
                        <p className="font-bold text-amber-600 dark:text-amber-500">${r.price}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {safeArray(destinations).length > 0 && (
        <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
          <CardHeader className="border-b border-gray-200 dark:border-zinc-800">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-50">
              <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Destinations
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Select destinations to visit
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-6">
            {safeArray(destinations).map((d, i) => {
              const id = d.id || i;
              const selected = safeArray(bookingData.selectedDestinations).includes(id);
              const price = d.price || 50;
              return (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => toggleItem("selectedDestinations", id)}
                  className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 min-h-[120px] ${
                    selected
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                      : "border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 hover:border-amber-500/50"
                  }`}
                >
                  {selected && (
                    <CheckCircle2 className="absolute right-2 top-2 w-5 h-5 text-amber-600 dark:text-amber-500" />
                  )}
                  <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-amber-50 line-clamp-2 mb-1">
                    {sanitizeInput(d.name || d.title || `Destination ${id}`)}
                  </p>
                  {d.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {sanitizeInput(d.description)}
                    </p>
                  )}
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-500">${price}</p>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {safeArray(flatExperiences).length > 0 && (
        <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
          <CardHeader className="border-b border-gray-200 dark:border-zinc-800">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-50">
              <Waves className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Experiences
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Choose exciting experiences
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-6">
            {safeArray(flatExperiences).map((exp, i) => {
              const id = exp.id || i;
              const selected = safeArray(bookingData.selectedExperiences).includes(id);
              const price = exp.price || 75;
              return (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => toggleItem("selectedExperiences", id)}
                  className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 min-h-[130px] ${
                    selected
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                      : "border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 hover:border-amber-500/50"
                  }`}
                >
                  {selected && (
                    <CheckCircle2 className="absolute right-2 top-2 w-5 h-5 text-amber-600 dark:text-amber-500" />
                  )}
                  <Waves className="w-5 h-5 text-amber-600 dark:text-amber-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-amber-50 line-clamp-2 mb-1">
                    {sanitizeInput(exp.title || exp.name || `Experience ${id}`)}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {sanitizeInput(exp.description)}
                    </p>
                  )}
                  {exp.duration && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">⏱️ {exp.duration}</p>
                  )}
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-500">${price}</p>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {safeArray(restaurants).length > 0 && (
        <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
          <CardHeader className="border-b border-gray-200 dark:border-zinc-800">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-50">
              <UtensilsCrossed className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Restaurants
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Reserve tables at fine dining
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 pt-6">
            {safeArray(restaurants).map((r) => {
              const selected = safeArray(bookingData.selectedRestaurants).includes(r.id);
              const price = r.price || 40;
              return (
                <motion.div
                  key={r.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => toggleItem("selectedRestaurants", r.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer flex justify-between items-start transition-all duration-200 ${
                    selected
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                      : "border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 hover:border-amber-500/50"
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-amber-50">
                      {sanitizeInput(r.name || `Restaurant ${r.id}`)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                      {r.cuisine || "Cuisine"} •{" "}
                      <Star className="w-3 h-3 inline text-amber-600 dark:text-amber-500" />{" "}
                      {r.rating || "N/A"}
                    </p>
                    {r.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {sanitizeInput(r.description)}
                      </p>
                    )}
                  </div>
                  <p className="font-bold text-amber-700 dark:text-amber-500 ml-4">${price}</p>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {safeArray(cafes).length > 0 && (
        <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
          <CardHeader className="border-b border-gray-200 dark:border-zinc-800">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-50">
              <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Cafes
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Enjoy coffee and refreshments
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 pt-6">
            {safeArray(cafes).map((c) => {
              const selected = safeArray(bookingData.selectedCafes).includes(c.id);
              const price = c.price || 15;
              return (
                <motion.div
                  key={c.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => toggleItem("selectedCafes", c.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer flex justify-between items-start transition-all duration-200 ${
                    selected
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                      : "border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 hover:border-amber-500/50"
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-amber-50">
                      {sanitizeInput(c.name || `Cafe ${c.id}`)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                      {c.specialty || "Specialty"} •{" "}
                      <Star className="w-3 h-3 inline text-amber-600 dark:text-amber-500" />{" "}
                      {c.rating || "N/A"}
                    </p>
                    {c.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {sanitizeInput(c.description)}
                      </p>
                    )}
                  </div>
                  <p className="font-bold text-amber-700 dark:text-amber-500 ml-4">${price}</p>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
