import { Badge } from "../ui/badge";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "../ui/shadcn-io/marquee/index";
import { motion } from "framer-motion";

export default function GallerySection() {
  const galleryImages = [
    {
      src: `${import.meta.env.BASE_URL}image1.jpeg`,
      alt: "Blue Lagoon in Dahab",
      title: "Blue Lagoon Paradise",
      description: "Crystal clear waters perfect for swimming"
    },
    {
      src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg",
      alt: "Blue Hole diving spot",
      title: "Famous Blue Hole",
      description: "World's most iconic diving destination"
    },
    {
      src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg",
      alt: "Dahab coastline",
      title: "Stunning Coastline",
      description: "Miles of pristine beaches await"
    },
    {
      src: "https://assets.annahar.com/ContentFilesArchive/422721Image1-1180x677_d.jpg",
      alt: "Desert meets sea",
      title: "Desert Meets Sea",
      description: "Unique landscape of mountains and ocean"
    },
    {
      src: `${import.meta.env.BASE_URL}image2.jpeg`,
      alt: "Sinai mountains sunset",
      title: "Sinai Mountain Sunset",
      description: "Breathtaking views from sacred peaks"
    },
    {
      src: `${import.meta.env.BASE_URL}image3.jpeg`,
      alt: "Blue Hole diving",
      title: "World-Class Diving",
      description: "Explore vibrant coral reefs"
    },
    {
      src: `${import.meta.env.BASE_URL}image4.jpeg`,
      alt: "Bedouin beach camp",
      title: "Bedouin Beach Culture",
      description: "Experience authentic local traditions"
    }
  ];

  return (
    <motion.div
      className="relative w-full py-16 bg-gradient-to-b from-background to-muted/50 dark:from-background dark:to-muted/30 z-30"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Section header with badge */}
      <motion.div
        className="text-center mb-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
          Gallery
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          Discover Dahab's Beauty
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          From pristine beaches to vibrant coral reefs, experience the magic
          of Egypt's coastal gem
        </p>
      </motion.div>

      <div className="overflow-hidden">
        <Marquee className="py-4">
          <MarqueeContent>
            {galleryImages.map((image, index) => (
              <MarqueeItem key={index}>
                <motion.div className="relative group overflow-hidden rounded-xl mx-2">
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="h-72 w-auto rounded-xl object-cover shadow-xl dark:shadow-2xl"
                    whileHover={{ scale: 1.08, rotateY: 5 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-end">
                    <div className="p-6 w-full">
                      <p className="text-white font-bold text-lg mb-1">
                        {image.title}
                      </p>
                      <p className="text-white/80 text-sm">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </motion.div>
  );
}