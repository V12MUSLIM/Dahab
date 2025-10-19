import { Mail, MapPin, Phone } from "lucide-react";
import { Badge } from "../ui/badge";

export default function SocialMediaSection({ badge = '', header, description }) {
  const socialLinks = [
    {
      name: "Facebook",
      icon: `${import.meta.env.BASE_URL}facebook.svg`,
      href: "https://facebook.com/dahabtourism",
      label: "Follow us on Facebook",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Instagram",
      icon: `${import.meta.env.BASE_URL}/instagram.svg`,
      href: "https://instagram.com/dahabtourism",
      label: "Follow us on Instagram",
      color: "from-pink-500 via-purple-500 to-orange-500"
    },
    {
      name: "Twitter",
      icon: `${import.meta.env.BASE_URL}x.svg`,
      href: "https://twitter.com/dahabtourism",
      label: "Follow us on Twitter",
      color: "from-gray-700 to-gray-900"
    },
    {
      name: "YouTube",
      icon: `${import.meta.env.BASE_URL}youtube.svg`,
      href: "https://youtube.com/dahabtourism",
      label: "Subscribe on YouTube",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:info@dahabtourism.com",
      label: "Email us",
      color: "from-amber-500 to-yellow-600"
    },
    {
      name: "Location",
      icon: MapPin,
      href: "https://maps.google.com/?q=Dahab,Egypt",
      label: "Find us on map",
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "Phone",
      icon: Phone,
      href: "tel:+20123456789",
      label: "Call us",
      color: "from-teal-500 to-cyan-600"
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700 px-4 py-1.5 shadow-sm">
            {badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            {header}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;

            return (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-sm hover:border-transparent hover:shadow-xl hover:shadow-amber-500/20 dark:hover:shadow-amber-500/10 hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${social.color} opacity-20 blur-xl group-hover:animate-pulse`} />
                </div>

                {/* Icon Container */}
                <div className="relative h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800/50 dark:to-zinc-900/50 group-hover:scale-110 border border-gray-200 dark:border-transparent group-hover:border-amber-400/30 dark:group-hover:border-amber-500/30 transition-all duration-500 shadow-sm group-hover:shadow-lg">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={social.name}
                      className="h-7 w-7 object-contain brightness-0 dark:invert opacity-70 group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-125 group-hover:saturate-150 group-hover:scale-110 transition-all duration-500"
                    />
                  ) : (
                    <Icon className="h-7 w-7 text-gray-600 dark:text-gray-400 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg" />
                  )}
                </div>

                {/* Label */}
                <span className="relative text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-500 group-hover:font-semibold">
                  {social.name}
                </span>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
