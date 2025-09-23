import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Globe, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="w-full px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">
                Dahab Adventures
              </h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                Your gateway to the Red Sea's most enchanting destination
              </p>
              <div className="flex gap-4">
                <Button size="icon" variant="ghost">
                  <Globe className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Mail className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Phone className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Explore</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Diving Sites
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Desert Tours
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Accommodation
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Activities
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Contact Us
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  FAQs
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Booking Policy
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Safety Guidelines
                </li>
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Certifications</h4>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs">
                  PADI Certified
                </Badge>
                <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs">
                  ISO 9001
                </Badge>
                <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs">
                  TripAdvisor
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <p>© 2024 Dahab Adventures. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <span className="hover:text-foreground cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="hover:text-foreground cursor-pointer transition-colors">
                Terms of Service
              </span>
              <span className="hover:text-foreground cursor-pointer transition-colors">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}