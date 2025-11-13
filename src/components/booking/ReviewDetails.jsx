import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Hotel, Package, CreditCard, MapPin, Waves, Coffee, UtensilsCrossed, Star } from "lucide-react";
import { BOOKING_STEPS } from "@/components/booking/Data/constants";
import { safeArray, sanitizeInput } from "@/components/booking/servicesBooking/utils/sanitization";

export default function ReviewDetails({ 
  bookingData, 
  nights, 
  subtotal, 
  taxes, 
  total, 
  destinations, 
  flatExperiences,
  restaurants = [],
  cafes = []
}) {
    return (
        <div className="space-y-6">
            {/* Trip Summary */}
            <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                <CardHeader className="border-b border-gray-200 dark:border-zinc-800">
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-50">
                        <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Trip Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4 pt-6">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Check-in</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{bookingData.checkIn}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Check-out</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{bookingData.checkOut}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Nights</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{nights}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Guests</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{+bookingData.adults + +bookingData.children}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Stay */}
            {bookingData.includeStay && (
                <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                    <CardHeader className="border-b border-gray-200 dark:border-zinc-800">
                        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-50">
                            <Hotel className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Accommodation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-between items-start pt-6">
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {BOOKING_STEPS.find((r) => r.value === bookingData.roomType)?.label || "Room Selected"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{nights} nights</p>
                        </div>
                        <p className="font-bold text-amber-700 dark:text-amber-500">
                            ${(BOOKING_STEPS.find((r) => r.value === bookingData.roomType)?.price || 0) * nights}
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Selected services */}
            {(safeArray(bookingData.selectedDestinations).length > 0 ||
              safeArray(bookingData.selectedExperiences).length > 0 ||
              safeArray(bookingData.selectedRestaurants).length > 0 ||
              safeArray(bookingData.selectedCafes).length > 0) && (
                <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                    <CardHeader className="border-b border-gray-200 dark:border-zinc-800">
                        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-50">
                            <Package className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Selected Services
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        {/* Destinations */}
                        {safeArray(bookingData.selectedDestinations).length > 0 && (
                            <div>
                                <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-amber-50">
                                    <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-500" /> Destinations
                                </h4>
                                {safeArray(bookingData.selectedDestinations).map((id) => {
                                    const dest = destinations.find((d) => d.id === id);
                                    return (
                                        <p key={id} className="text-sm flex justify-between border-b border-gray-200 dark:border-zinc-700 py-2 text-gray-700 dark:text-gray-300">
                                            <span>{sanitizeInput(dest?.name || `Destination ${id}`)}</span>
                                            <span className="font-semibold text-amber-700 dark:text-amber-500">$50</span>
                                        </p>
                                    );
                                })}
                            </div>
                        )}

                        {/* Experiences */}
                        {safeArray(bookingData.selectedExperiences).length > 0 && (
                            <div>
                                <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-amber-50">
                                    <Waves className="w-4 h-4 text-amber-600 dark:text-amber-500" /> Experiences
                                </h4>
                                {safeArray(bookingData.selectedExperiences).map((id) => {
                                    const exp = flatExperiences.find((e) => e.id === id);
                                    return (
                                        <p key={id} className="text-sm flex justify-between border-b border-gray-200 dark:border-zinc-700 py-2 text-gray-700 dark:text-gray-300">
                                            <span>{sanitizeInput(exp?.title || `Experience ${id}`)}</span>
                                            <span className="font-semibold text-amber-700 dark:text-amber-500">$75</span>
                                        </p>
                                    );
                                })}
                            </div>
                        )}

                        {/* Restaurants */}
                        {safeArray(bookingData.selectedRestaurants).length > 0 && (
                            <div>
                                <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-amber-50">
                                    <UtensilsCrossed className="w-4 h-4 text-amber-600 dark:text-amber-500" /> Restaurants
                                </h4>
                                {safeArray(bookingData.selectedRestaurants).map((id) => {
                                    const restaurant = restaurants.find((r) => r.id === id);
                                    return (
                                        <p key={id} className="text-sm flex justify-between border-b border-gray-200 dark:border-zinc-700 py-2 text-gray-700 dark:text-gray-300">
                                            <span>{sanitizeInput(restaurant?.name || `Restaurant ${id}`)}</span>
                                            <span className="font-semibold text-amber-700 dark:text-amber-500">${restaurant?.price || 40}</span>
                                        </p>
                                    );
                                })}
                            </div>
                        )}

                        {/* Cafes */}
                        {safeArray(bookingData.selectedCafes).length > 0 && (
                            <div>
                                <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-amber-50">
                                    <Coffee className="w-4 h-4 text-amber-600 dark:text-amber-500" /> Cafes
                                </h4>
                                {safeArray(bookingData.selectedCafes).map((id) => {
                                    const cafe = cafes.find((c) => c.id === id);
                                    return (
                                        <p key={id} className="text-sm flex justify-between border-b border-gray-200 dark:border-zinc-700 py-2 text-gray-700 dark:text-gray-300">
                                            <span>{sanitizeInput(cafe?.name || `Cafe ${id}`)}</span>
                                            <span className="font-semibold text-amber-700 dark:text-amber-500">${cafe?.price || 15}</span>
                                        </p>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Total */}
            <Card className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 border-yellow-600/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader className="border-b border-amber-200 dark:border-amber-700/30">
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-100">
                        <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Total
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex justify-between text-sm text-gray-700 dark:text-amber-100/90 mb-2">
                        <span>Subtotal</span>
                        <span className="font-medium">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 dark:text-amber-100/90 mb-3">
                        <span>Tax ({Math.round(100 * 0.12)}%)</span>
                        <span className="font-medium">${taxes}</span>
                    </div>
                    <div className="flex justify-between border-t border-amber-300 dark:border-amber-700/40 pt-3 text-lg font-bold text-gray-900 dark:text-amber-50">
                        <span>Total</span>
                        <span className="text-amber-700 dark:text-amber-500">${total}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
