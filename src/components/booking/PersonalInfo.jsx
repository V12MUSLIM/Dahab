import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import ErrorBanner from "./ErrorBanner";

export default function PersonalInfo({ bookingData, updateBookingData, validationErrors }) {
  return (
    <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
      <CardHeader className="border-b border-gray-200 dark:border-zinc-800">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-50">
          <User className="w-6 h-6 text-amber-600 dark:text-amber-500" />
          Your Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {validationErrors.name && <ErrorBanner text={validationErrors.name} />}
        {validationErrors.email && <ErrorBanner text={validationErrors.email} />}
        {validationErrors.phone && <ErrorBanner text={validationErrors.phone} />}

        <div>
          <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
          <Input
            id="name"
            value={bookingData.name}
            onChange={(e) => updateBookingData("name", e.target.value)}
            className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
            placeholder="Enter your full name"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={bookingData.email}
              onChange={(e) => updateBookingData("email", e.target.value)}
              className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={bookingData.phone}
              onChange={(e) => updateBookingData("phone", e.target.value)}
              className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
              placeholder="+20 123 456 7890"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="specialRequests" className="text-gray-700 dark:text-gray-300">Special Requests</Label>
          <textarea
            id="specialRequests"
            rows="4"
            className="w-full border-2 rounded-lg p-3 bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors duration-200"
            value={bookingData.specialRequests}
            onChange={(e) => updateBookingData("specialRequests", e.target.value)}
            placeholder="Any special requests or requirements..."
          />
        </div>
      </CardContent>
    </Card>
  );
}
