
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorBanner from "./ErrorBanner";

export default function PersonalInfo({ bookingData, updateBookingData, validationErrors }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {validationErrors.name && <ErrorBanner text={validationErrors.name} />}
        {validationErrors.email && <ErrorBanner text={validationErrors.email} />}
        {validationErrors.phone && <ErrorBanner text={validationErrors.phone} />}

        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={bookingData.name}
            onChange={(e) => updateBookingData("name", e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={bookingData.email}
              onChange={(e) => updateBookingData("email", e.target.value)}
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              type="tel"
              value={bookingData.phone}
              onChange={(e) => updateBookingData("phone", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Special Requests</Label>
          <textarea
            className="w-full border rounded p-2"
            value={bookingData.specialRequests}
            onChange={(e) => updateBookingData("specialRequests", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
