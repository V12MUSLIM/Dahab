
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Hotel, MapPin, Waves, UtensilsCrossed, Coffee } from "lucide-react";
import { TAX_RATE,BOOKING_STEPS} from "@/components/booking/Data/constants";
import { safeArray } from "@/components/booking/servicesBooking/utils/sanitization";

export default function BookingSummary({ bookingData, nights, subtotal, taxes, total }) {
    return (
        <Card className="bg-yellow-50 border-yellow-100">
            <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                {!!bookingData.includeStay && (
                    <div className="flex justify-between">
                        <span>Stay ({nights} nights)</span>
                        <span className="font-semibold">
                            ${(BOOKING_STEPS.find((r) => r.value === bookingData.roomType)?.price || 0) * nights}
                        </span>
                    </div>
                )}
                {safeArray(bookingData.selectedDestinations).length > 0 && (
                    <div className="flex justify-between">
                        <span>Destinations</span>
                        <span>${safeArray(bookingData.selectedDestinations).length * 50}</span>
                    </div>
                )}
                {safeArray(bookingData.selectedExperiences).length > 0 && (
                    <div className="flex justify-between">
                        <span>Experiences</span>
                        <span>${safeArray(bookingData.selectedExperiences).length * 75}</span>
                    </div>
                )}
                {safeArray(bookingData.selectedRestaurants).length > 0 && (
                    <div className="flex justify-between">
                        <span>Restaurants</span>
                        <span>${safeArray(bookingData.selectedRestaurants).length * 40}</span>
                    </div>
                )}
                {safeArray(bookingData.selectedCafes).length > 0 && (
                    <div className="flex justify-between">
                        <span>Cafes</span>
                        <span>${safeArray(bookingData.selectedCafes).length * 15}</span>
                    </div>
                )}
                <div className="border-t pt-2 flex justify-between">
                    <span>Tax ({Math.round(TAX_RATE * 100)}%)</span>
                    <span>${taxes}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-yellow-700">${total}</span>
                </div>
            </CardContent>
        </Card>
    );
}
