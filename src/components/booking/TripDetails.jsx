import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar,  CheckCircle2 } from "lucide-react";
import ErrorBanner from "./ErrorBanner";

export default function TripDetails({ bookingData, updateBookingData, validationErrors, nights }) {
    return (
        <div className="space-y-6">
            {/* Dates and travelers */}
            <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                <CardHeader className="border-b border-gray-200 dark:border-zinc-800">
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-amber-50">
                        <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-500" /> Trip Dates
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    {validationErrors.dates && <ErrorBanner text={validationErrors.dates} />}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="checkIn" className="text-gray-700 dark:text-gray-300">Check-in</Label>
                            <Input
                                id="checkIn"
                                type="date"
                                value={bookingData.checkIn}
                                onChange={(e) => updateBookingData("checkIn", e.target.value)}
                                className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="checkOut" className="text-gray-700 dark:text-gray-300">Check-out</Label>
                            <Input
                                id="checkOut"
                                type="date"
                                value={bookingData.checkOut}
                                onChange={(e) => updateBookingData("checkOut", e.target.value)}
                                className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-gray-700 dark:text-gray-300">Adults</Label>
                            <Input
                                type="number"
                                value={bookingData.adults}
                                min="1"
                                onChange={(e) => updateBookingData("adults", e.target.value)}
                                className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 dark:text-gray-300">Children</Label>
                            <Input
                                type="number"
                                value={bookingData.children}
                                min="0"
                                onChange={(e) => updateBookingData("children", e.target.value)}
                                className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                            />
                        </div>
                    </div>
                    {nights > 0 && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-lg flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                            <p className="text-amber-900 dark:text-amber-100">{nights} night{nights > 1 && "s"} total</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            
        </div>
    );
}
