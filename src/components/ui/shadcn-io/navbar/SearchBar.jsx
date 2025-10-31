import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SearchBar = React.memo(({
  placeholder,
  value,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  className,
  isDesktop = false,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  if (isDesktop) {
    return (
      <form onSubmit={onSubmit} className={cn("relative flex-1 max-w-sm", className)}>
        <div
          className={cn(
            "relative transition-all duration-200",
            isFocused && "scale-105"
          )}
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="pl-9 pr-4 h-9 bg-background/60 border-amber-200/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
          />
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600 dark:text-amber-400" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10 pr-4 bg-white/50 dark:bg-black/20 border border-amber-400/40 dark:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-200"
        />
      </div>
    </form>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;