
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Hotel, Package, CreditCard, MapPin, Waves, Coffee, UtensilsCrossed, Star } from "lucide-react";
import { BOOKING_STEPS } from "@/components/booking/Data/constants";
import { safeArray, sanitizeInput } from "@/components/booking/servicesBooking/utils/sanitization";

export default function ReviewDetails({ bookingData, nights, subtotal, taxes, total, destinations, flatExperiences }) {
    return (
        <div className="space-y-6">
            {/* Trip Summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-yellow-600" /> Trip Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                    <div><p className="text-xs text-gray-500">Check-in</p><p className="font-semibold">{bookingData.checkIn}</p></div>
                    <div><p className="text-xs text-gray-500">Check-out</p><p className="font-semibold">{bookingData.checkOut}</p></div>
                    <div><p className="text-xs text-gray-500">Nights</p><p className="font-semibold">{nights}</p></div>
                    <div><p className="text-xs text-gray-500">Guests</p><p className="font-semibold">{+bookingData.adults + +bookingData.children}</p></div>
                </CardContent>
            </Card>

            {/* Stay */}
            {bookingData.includeStay && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Hotel className="w-5 h-5 text-yellow-600" /> Accommodation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-between">
                        <div>
                            <p className="font-semibold">
                                {BOOKING_STEPS.find((r) => r.value === bookingData.roomType)?.label}
                            </p>
                            <p className="text-xs text-gray-500">{nights} nights</p>
                        </div>
                        <p className="font-bold text-yellow-600">
                            ${(BOOKING_STEPS.find((r) => r.value === bookingData.roomType)?.price || 0) * nights}
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Selected services */}
            {(bookingData.selectedDestinations.length ||
                bookingData.selectedExperiences.length ||
                bookingData.selectedRestaurants.length ||
                bookingData.selectedCafes.length) > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-yellow-600" /> Selected Services
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {safeArray(bookingData.selectedDestinations).length > 0 && (
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2 mb-1">
                                        <MapPin className="w-4 h-4 text-yellow-600" /> Destinations
                                    </h4>
                                    {safeArray(bookingData.selectedDestinations).map((id) => {
                                        const dest = destinations.find((d) => d.id === id);
                                        return (
                                            <p key={id} className="text-sm flex justify-between border-b py-1">
                                                <span>{sanitizeInput(dest?.name)}</span> <span>$50</span>
                                            </p>
                                        );
                                    })}
                                </div>
                            )}

                            {safeArray(bookingData.selectedExperiences).length > 0 && (
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2 mb-1">
                                        <Waves className="w-4 h-4 text-yellow-600" /> Experiences
                                    </h4>
                                    {safeArray(bookingData.selectedExperiences).map((id) => {
                                        const exp = flatExperiences.find((e) => e.id === id);
                                        return (
                                            <p key={id} className="text-sm flex justify-between border-b py-1">
                                                <span>{sanitizeInput(exp?.title)}</span> <span>$75</span>
                                            </p>
                                        );
                                    })}
                                </div>
                            )}

                            {safeArray(bookingData.selectedRestaurants).length > 0 && (
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2 mb-1">
                                        <UtensilsCrossed className="w-4 h-4 text-yellow-600" /> Restaurants
                                    </h4>
                                    {safeArray(bookingData.selectedRestaurants).map((id) => (
                                        <p key={id} className="text-sm flex justify-between border-b py-1">
                                            <span>{id}</span> <span>$40</span>
                                        </p>
                                    ))}
                                </div>
                            )}

                            {safeArray(bookingData.selectedCafes).length > 0 && (
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2 mb-1">
                                        <Coffee className="w-4 h-4 text-yellow-600" /> Cafes
                                    </h4>
                                    {safeArray(bookingData.selectedCafes).map((id) => (
                                        <p key={id} className="text-sm flex justify-between border-b py-1">
                                            <span>{id}</span> <span>$15</span>
                                        </p>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

            {/* Total */}
            <Card className="bg-yellow-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-yellow-600" /> Total
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span> <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Tax ({Math.round(100 * 0.12)}%)</span> <span>${taxes}</span>
                    </div>
                    <div className="flex justify-between border-t mt-2 pt-2 text-lg font-bold">
                        <span>Total</span> <span>${total}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
