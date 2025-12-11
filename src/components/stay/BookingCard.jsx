import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Heart,
  Shield,
  Mail,
  Phone,
  Calendar,
  Users,
  Check,
  Clock,
} from "lucide-react";

export default function BookingCard({
  stayName,
  basePrice,
  rating,
  reviews,
  maxGuests,
  onReserve,
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [liked, setLiked] = useState(false);

  const canBook = checkIn && checkOut;

  // Calculate nights and total
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * basePrice;

  return (
    <Card className="sticky top-24 overflow-hidden border-2  dark:border-amber-900/30 shadow-xl">
      {/* HEADER */}
      <CardHeader className="text-center space-y-2 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 pb-6">
        <CardDescription className="text-xs font-semibold uppercase tracking-wider">Starting from</CardDescription>
        <CardTitle className="text-5xl font-black text-amber-600">
          ${basePrice}
          <span className="text-base font-normal text-muted-foreground">
            /night
          </span>
        </CardTitle>

        <div className="flex justify-center items-center gap-1">
          <div className="flex items-center gap-1 bg-amber-600 text-white px-2.5 py-1 rounded-md">
            <Star className="w-4 h-4 fill-white" />
            <span className="font-bold text-sm">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviews} reviews)
          </span>
        </div>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-4 p-6">
        {/* dates */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex gap-2 mb-2 items-center">
              <Calendar className="w-4 h-4" />
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-900 text-sm font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex gap-2 mb-2 items-center">
              <Calendar className="w-4 h-4" />
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-900 text-sm font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
            />
          </div>

          {/* guests */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex gap-2 mb-2 items-center">
              <Users className="w-4 h-4" />
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-900 text-sm font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
            >
              {Array.from({ length: maxGuests }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price breakdown - only shows when dates selected */}
        {nights > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 space-y-2 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                ${basePrice} × {nights} {nights === 1 ? "night" : "nights"}
              </span>
              <span className="font-semibold">${totalPrice}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-lg text-amber-600">${totalPrice}</span>
            </div>
          </div>
        )}

        {/* actions */}
        <div className="space-y-3 pt-2">
          <Button
            className="w-full h-12 text-base font-semibold bg-amber-600 hover:bg-amber-700 shadow-lg hover:shadow-xl transition-all"
            disabled={!canBook}
            onClick={() => onReserve({ checkIn, checkOut, guests })}
          >
            {canBook ? "Reserve Now" : "Select dates to reserve"}
          </Button>

          <Button
            variant="outline"
            className="w-full flex gap-2 hover:bg-gray-50 dark:hover:bg-gray-900"
            onClick={() => setLiked(!liked)}
          >
            <Heart
              className={`w-5 h-5 ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {liked ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="space-y-2 pt-2 pb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="w-4 h-4 text-green-600" />
            <span>Free cancellation for 48 hours</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-green-600" />
            <span>Instant booking confirmation</span>
          </div>
        </div>

        {/* contact */}
        <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide pt-2">Need help?</p>
          <a
            href="mailto:stay@dahab.com"
            className="flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-amber-500 transition-all"
          >
            <Mail className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-medium">stay@dahab.com</span>
          </a>

          <a
            href="tel:+1234567890"
            className="flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-amber-500 transition-all"
          >
            <Phone className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-medium">+123 456 7890</span>
          </a>
        </div>

        {/* footer */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-amber-600" />
          100% Secure Booking
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Mobile bottom booking bar
 * Fixed at the bottom, only visible on small screens.
 */
export function MobileBookingBar({ stayName, price, onBookClick }) {
  if (!price || !stayName) return null;

  return (
    <div className="lg:hidden fixed bottom-16 inset-x-0 z-30 border-t-2 border-amber-200 dark:border-amber-900 bg-white/98 dark:bg-gray-950/98 backdrop-blur-xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground font-medium">From</p>
          <p className="text-2xl font-bold text-amber-600 leading-tight">
            ${price}
            <span className="text-sm text-muted-foreground font-normal"> /night</span>
          </p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {stayName}
          </p>
        </div>
        <Button size="lg" className="px-8 h-12 font-semibold bg-amber-600 hover:bg-amber-700 shadow-lg" onClick={onBookClick}>
          Book now
        </Button>
      </div>
    </div>
  );
}