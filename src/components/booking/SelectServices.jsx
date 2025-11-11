
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Waves, Coffee, UtensilsCrossed, CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";
import { sanitizeInput, safeArray } from "@/components/booking/servicesBooking/utils/sanitization";

export default function SelectServices({
  bookingData,
  destinations,
  flatExperiences,
  toggleItem,
  MOCK_RESTAURANTS,
  MOCK_CAFES,
}) {
  return (
    <div className="space-y-6">
      {/* Destinations */}
      {destinations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-600" /> Destinations
            </CardTitle>
            <CardDescription>$50 each</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {destinations.map((d, i) => {
              const id = d.id || i;
              const selected = safeArray(bookingData.selectedDestinations).includes(id);
              return (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => toggleItem("selectedDestinations", id)}
                  className={`p-3 border-2 rounded cursor-pointer ${
                    selected ? "border-yellow-600 bg-yellow-50" : "border-gray-200"
                  }`}
                >
                  {selected && <CheckCircle2 className="absolute right-1 top-1 w-5 h-5 text-yellow-600" />}
                  <MapPin className="w-5 h-5 text-yellow-600" />
                  <p className="text-sm font-semibold">{sanitizeInput(d.name)}</p>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Experiences */}
      {flatExperiences.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-yellow-600" /> Experiences
            </CardTitle>
            <CardDescription>$75 each</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {flatExperiences.map((exp, i) => {
              const id = exp.id || i;
              const selected = safeArray(bookingData.selectedExperiences).includes(id);
              return (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => toggleItem("selectedExperiences", id)}
                  className={`p-3 border-2 rounded cursor-pointer ${
                    selected ? "border-yellow-600 bg-yellow-50" : "border-gray-200"
                  }`}
                >
                  {selected && <CheckCircle2 className="absolute right-1 top-1 w-5 h-5 text-yellow-600" />}
                  <Waves className="w-5 h-5 text-yellow-600" />
                  <p className="text-sm font-semibold">{sanitizeInput(exp.title)}</p>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Restaurants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-yellow-600" /> Restaurants
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {MOCK_RESTAURANTS.map((r) => {
            const selected = safeArray(bookingData.selectedRestaurants).includes(r.id);
            return (
              <motion.div
                key={r.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleItem("selectedRestaurants", r.id)}
                className={`p-3 border-2 rounded flex justify-between ${
                  selected ? "border-yellow-600 bg-yellow-50" : "border-gray-200"
                }`}
              >
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-gray-500">
                    {r.cuisine} • <Star className="w-3 h-3 inline text-yellow-600" /> {r.rating}
                  </p>
                </div>
                <p className="font-bold text-yellow-600">${r.price}</p>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>

      {/* Cafes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-yellow-600" /> Cafes
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {MOCK_CAFES.map((c) => {
            const selected = safeArray(bookingData.selectedCafes).includes(c.id);
            return (
              <motion.div
                key={c.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleItem("selectedCafes", c.id)}
                className={`p-3 border-2 rounded flex justify-between ${
                  selected ? "border-yellow-600 bg-yellow-50" : "border-gray-200"
                }`}
              >
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-gray-500">
                    {c.specialty} • <Star className="w-3 h-3 inline text-yellow-600" /> {c.rating}
                  </p>
                </div>
                <p className="font-bold text-yellow-600">${c.price}</p>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
