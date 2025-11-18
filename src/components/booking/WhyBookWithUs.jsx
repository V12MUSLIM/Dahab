
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield ,Check} from "lucide-react";

export default function WhyBookWithUs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-yellow-600" /> Why Book With Us?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-1 text-gray-600 dark:text-yellow-50">
          <li><Check className="w-4 h-4 text-yellow-600" /> Free cancellation up to 24h</li>
          <li><Check className="w-4 h-4 text-yellow-600" /> Best price guarantee</li>
          <li><Check className="w-4 h-4 text-yellow-600" /> 24/7 customer support</li>
          <li><Check className="w-4 h-4 text-yellow-600" /> Secure Stripe payments</li>
          <li><Check className="w-4 h-4 text-yellow-600" /> Instant confirmation</li>
        </ul>
      </CardContent>
    </Card>
  );
}
