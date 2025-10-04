import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50 h-14 w-14 flex items-center justify-center rounded-xl border border-amber-500 dark:border-amber-500 bg-white/80  dark:bg-zinc-900/80 backdrop-blur-sm hover:border-amber-500/50 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all duration-300 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6 text-gray-400 group-hover:text-amber-500 transition-colors duration-300" />
    </button>
  );
}