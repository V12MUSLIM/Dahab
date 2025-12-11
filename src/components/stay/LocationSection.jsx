import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, ExternalLink } from "lucide-react";

export default function LocationSection({ locationDetails, googleMapsLink }) {
  if (!locationDetails) return null;

  const { coordinates, address, city, region, nearbyAttractions } =
    locationDetails;

  const embedSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1234567890`;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-600" />
          Location & Nearby Attractions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            src={embedSrc}
            loading="lazy"
            allowFullScreen
            title="Stay location map"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-foreground mb-1">Address</p>
          <p className="text-sm text-muted-foreground">{address}</p>
          <p className="text-sm text-muted-foreground">
            {city}, {region}
          </p>
        </div>

        {nearbyAttractions?.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Nearby attractions
            </p>
            <div className="space-y-1">
              {nearbyAttractions.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium text-amber-600">
                    {item.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {googleMapsLink && (
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Open in Google Maps
          </a>
        )}
      </CardContent>
    </Card>
  );
}
