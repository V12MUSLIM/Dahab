import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Hotel, MapPin, Waves, UtensilsCrossed, Coffee } from "lucide-react";
import { TAX_RATE, BOOKING_STEPS } from "@/components/booking/Data/constants";
import { safeArray } from "@/components/booking/servicesBooking/utils/sanitization";

export default function BookingSummary({ 
  bookingData, 
  nights, 
  subtotal, 
  taxes, 
  total,
  destinations = [],
  flatExperiences = [],
  restaurants = [],
  cafes = [],
  hotels = []
}) {
  const calculateStayPrice = () => {
    if (!bookingData.includeStay || !bookingData.roomType) return 0;
    const selectedHotel = hotels.find(h => h.id === bookingData.roomType);
    if (selectedHotel) {
      return (selectedHotel.pricePerNight || selectedHotel.price || 0) * nights;
    }
    const selectedRoom = BOOKING_STEPS.find(r => r.value === bookingData.roomType);
    return (selectedRoom?.price || 0) * nights;
  };

  const calculateDestinationsPrice = () => {
    const selectedIds = safeArray(bookingData.selectedDestinations);
    return selectedIds.reduce((total, id) => {
      const dest = destinations.find(d => d.id === id);
      return total + (dest?.price || 50);
    }, 0);
  };

  const calculateExperiencesPrice = () => {
    const selectedIds = safeArray(bookingData.selectedExperiences);
    return selectedIds.reduce((total, id) => {
      const exp = flatExperiences.find(e => e.id === id);
      return total + (exp?.price || 75);
    }, 0);
  };

  const calculateRestaurantsPrice = () => {
    const selectedIds = safeArray(bookingData.selectedRestaurants);
    return selectedIds.reduce((total, id) => {
      const restaurant = restaurants.find(r => r.id === id);
      return total + (restaurant?.price || 40);
    }, 0);
  };

  const calculateCafesPrice = () => {
    const selectedIds = safeArray(bookingData.selectedCafes);
    return selectedIds.reduce((total, id) => {
      const cafe = cafes.find(c => c.id === id);
      return total + (cafe?.price || 15);
    }, 0);
  };

  const summaryItems = [
    {
      condition: !!bookingData.includeStay && !!bookingData.roomType,
      icon: Hotel,
      label: `Stay (${nights} night${nights !== 1 ? 's' : ''})`,
      price: calculateStayPrice()
    },
    {
      condition: safeArray(bookingData.selectedDestinations).length > 0,
      icon: MapPin,
      label: `Destinations (${safeArray(bookingData.selectedDestinations).length})`,
      price: calculateDestinationsPrice()
    },
    {
      condition: safeArray(bookingData.selectedExperiences).length > 0,
      icon: Waves,
      label: `Experiences (${safeArray(bookingData.selectedExperiences).length})`,
      price: calculateExperiencesPrice()
    },
    {
      condition: safeArray(bookingData.selectedRestaurants).length > 0,
      icon: UtensilsCrossed,
      label: `Restaurants (${safeArray(bookingData.selectedRestaurants).length})`,
      price: calculateRestaurantsPrice()
    },
    {
      condition: safeArray(bookingData.selectedCafes).length > 0,
      icon: Coffee,
      label: `Cafes (${safeArray(bookingData.selectedCafes).length})`,
      price: calculateCafesPrice()
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/40 dark:to-amber-950/60 border-amber-200 dark:border-amber-700/40 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="border-b border-amber-200 dark:border-amber-700/30 pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-amber-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Booking Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 text-sm pt-5">
        {summaryItems.map((item, index) => 
          item.condition && (
            <div key={index} className="flex items-center justify-between text-gray-700 dark:text-amber-100/90 hover:text-gray-900 dark:hover:text-amber-50 transition-colors duration-200">
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                <span className="font-medium">{item.label}</span>
              </div>
              <span className="font-semibold text-amber-700 dark:text-amber-400">${item.price}</span>
            </div>
          )
        )}

        <div className="border-t border-amber-200 dark:border-amber-700/30 pt-3 flex justify-between text-gray-600 dark:text-amber-200/80">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal}</span>
        </div>

        <div className="flex justify-between text-gray-600 dark:text-amber-200/80">
          <span>Tax ({Math.round(TAX_RATE * 100)}%)</span>
          <span className="font-medium">${taxes}</span>
        </div>

        <div className="border-t border-amber-300 dark:border-amber-700/40 pt-4 flex justify-between items-center">
          <span className="text-base font-bold text-gray-900 dark:text-amber-50">Total</span>
          <span className="text-2xl font-bold text-amber-700 dark:text-amber-500">${total}</span>
        </div>
      </CardContent>
    </Card>
  );
}
