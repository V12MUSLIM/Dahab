// components/customComponents/FilteringTool.jsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

export default function Filters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  priceFilter,
  onPriceChange,
  showPriceFilter = true,
  showCategoryFilter = true,
  showSearchBar = true,
  className = ""
}) {
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'low', label: 'Under $50' },
    { value: 'medium', label: '$50 - $80' },
    { value: 'high', label: '$80+' }
  ];

  return (
    <div className={`bg-background rounded-lg shadow-lg p-4 sm:p-6 border ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Search Bar - Full width on all screens */}
        {showSearchBar && (
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        )}

        {/* Filters Grid - Stacks on mobile, side-by-side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Category Filter */}
          {showCategoryFilter && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat.value}
                    onClick={() => onCategoryChange(cat.value)}
                    className={`cursor-pointer transition-all text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 ${
                      selectedCategory === cat.value
                        ? 'bg-yellow-600 dark:bg-yellow-700 text-white hover:bg-yellow-700 dark:hover:bg-yellow-800'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Price Filter */}
          {showPriceFilter && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Price Range
              </label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <Badge
                    key={range.value}
                    onClick={() => onPriceChange(range.value)}
                    className={`cursor-pointer transition-all text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 ${
                      priceFilter === range.value
                        ? 'bg-yellow-600 dark:bg-yellow-700 text-white hover:bg-yellow-700 dark:hover:bg-yellow-800'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {range.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
