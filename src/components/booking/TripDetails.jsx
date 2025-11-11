
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Calendar, Hotel, Star, Award, CheckCircle2 } from "lucide-react";
import {BOOKING_STEPS } from "@/components/booking/Data/constants";
import ErrorBanner from "./ErrorBanner";

export default function TripDetails({ bookingData, updateBookingData, validationErrors, nights }) {
    return (
        <div className="space-y-6">
            {/* Dates and travelers */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-yellow-600" /> Trip Dates
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {validationErrors.dates && <ErrorBanner text={validationErrors.dates} />}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="checkIn">Check-in</Label>
                            <Input
                                id="checkIn"
                                type="date"
                                value={bookingData.checkIn}
                                onChange={(e) => updateBookingData("checkIn", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="checkOut">Check-out</Label>
                            <Input
                                id="checkOut"
                                type="date"
                                value={bookingData.checkOut}
                                onChange={(e) => updateBookingData("checkOut", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>Adults</Label>
                            <Input
                                type="number"
                                value={bookingData.adults}
                                min="1"
                                onChange={(e) => updateBookingData("adults", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Children</Label>
                            <Input
                                type="number"
                                value={bookingData.children}
                                min="0"
                                onChange={(e) => updateBookingData("children", e.target.value)}
                            />
                        </div>
                    </div>
                    {nights > 0 && (
                        <div className="p-3 bg-yellow-50 rounded flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-yellow-600" />
                            <p>{nights} night{nights > 1 && "s"} total</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Stay section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Hotel className="w-6 h-6 text-yellow-600" /> Accommodation
                    </CardTitle>
                    <CardDescription>Choose whether to include a hotel stay</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <p className="font-medium">Include Stay</p>
                        <Switch
                            checked={bookingData.includeStay}
                            onCheckedChange={(v) => updateBookingData("includeStay", v)}
                        />
                    </div>
                    {bookingData.includeStay && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Label>Select Room Type</Label>
                            <div className="grid gap-3 mt-2">
                                {BOOKING_STEPS.map((r) => (
                                    <div
                                        key={r.value}
                                        onClick={() => updateBookingData("roomType", r.value)}
                                        className={`p-3 border-2 rounded cursor-pointer flex justify-between ${bookingData.roomType === r.value
                                                ? "border-yellow-600 bg-yellow-50"
                                                : "border-gray-200"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <r.icon className="w-6 h-6 text-yellow-600" />
                                            <div>
                                                <p className="font-semibold">{r.label}</p>
                                                <p className="text-xs text-gray-500">{r.description}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-yellow-600">${r.price}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
