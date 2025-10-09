// src/components/common/DynamicIcon.jsx
import * as LucideIcons from "lucide-react";

export default function DynamicIcon({ name, className = "" }) {
  if (!name) return null;

  // Normalize the name, e.g., "waves" -> "Waves"
  const normalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const Icon = LucideIcons[normalized];

  if (!Icon) return <LucideIcons.HelpCircle className={className} />; // fallback

  return <Icon className={className} />;
}
