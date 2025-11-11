
import { Calendar, Package, User, CheckCircle2, CreditCard } from "lucide-react";

export const TAX_RATE = 0.12;

export const BOOKING_STEPS = [
  { id: 1, title: "Trip Details", icon: Calendar },
  { id: 2, title: "Select Services", icon: Package },
  { id: 3, title: "Personal Info", icon: User },
  { id: 4, title: "Review & Details", icon: CheckCircle2 },
  { id: 5, title: "Payment", icon: CreditCard },
];
