import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, Info } from "lucide-react";

export default function PoliciesSection({ checkInTime, checkOutTime, policies }) {
  return (
    <div className="space-y-4">
      {/* Check-in/out times */}
      {(checkInTime || checkOutTime) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-amber-600" />
              Check-in & Check-out
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {checkInTime && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Check-in</span>
                <span className="font-medium">{checkInTime}</span>
              </div>
            )}
            {checkOutTime && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Check-out</span>
                <span className="font-medium">{checkOutTime}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Policies */}
      {policies && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-amber-600" />
              House Rules & Policies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(policies).map(([category, items]) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <ul className="space-y-1 ml-4">
                    {items.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}