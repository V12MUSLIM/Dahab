import { Mail, MapPin, Phone } from "lucide-react";
import { Badge } from "../ui/badge";
export default function SocialMediaSection({badge='',header,description}) {
  const socialLinks = [
    {
      name: "Facebook",
      icon: `${import.meta.env.BASE_URL}facebook.svg`,
      href: "https://facebook.com/dahabtourism",
      label: "Follow us on Facebook",
    },
    {
      name: "Instagram",
      icon: `${import.meta.env.BASE_URL}/instagram.svg`,
      href: "https://instagram.com/dahabtourism",
      label: "Follow us on Instagram",
    },
    {
      name: "Twitter",
      icon: `${import.meta.env.BASE_URL}x.svg`,
      href: "https://twitter.com/dahabtourism",
      label: "Follow us on Twitter",
    },
    {
      name: "YouTube",
      icon: `${import.meta.env.BASE_URL}youtube.svg`,
      href: "https://youtube.com/dahabtourism",
      label: "Subscribe on YouTube",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:info@dahabtourism.com",
      label: "Email us",
    },
    {
      name: "Location",
      icon: MapPin,
      href: "https://maps.google.com/?q=Dahab,Egypt",
      label: "Find us on map",
    },
    {
      name: "Phone",
      icon: Phone,
      href: "tel:+20123456789",
      label: "Call us",
    },
  ];

  return (
    <section className="py-20 bg-white/50 dark:bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
         { badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            {header}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
           {description}
          </p>
        </div>

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
                className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-zinc-800/50 dark:border-zinc-900/50 bg-gray-500/30 dark:bg-zinc-950/50 hover:border-amber-500/50 hover:bg-zinc-900/50 dark:hover:bg-zinc-900/30 transition-all duration-300 group"
              >
                <div className="h-14 w-14 flex items-center justify-center rounded-xl  bg-zinc-800/50 dark:bg-zinc-900/50 group-hover:bg-amber-500/10 border border-transparent group-hover:border-amber-500/30 transition-all duration-300">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={social.name}
                      className="h-7 w-7 object-contain brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-150 group-hover:saturate-150 transition-all duration-300"
                      style={{
                        filter:
                          "invert(1) sepia(1) saturate(5) hue-rotate(0deg)",
                      }}
                    />
                  ) : (
                    <Icon className="h-7 w-7 text-gray-400 group-hover:text-amber-500 transition-colors duration-300" />
                  )}
                </div>
                <span className="text-sm font-medium text-black dark:text-gray-300 group-hover:text-white transition-colors duration-300">
                  {social.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
