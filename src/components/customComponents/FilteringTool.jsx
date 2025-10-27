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
    <div className={`bg-background rounded-lg shadow-lg p-6 border ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Bar */}
        {showSearchBar && (
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Category Filter */}
        {showCategoryFilter && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`cursor-pointer transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-yellow-600 dark:bg-yellow-700 text-white hover:bg-yellow-700 dark:hover:bg-yellow-800'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat.label}  {/* FIXED: Render cat.label instead of cat */}
              </Badge>
            ))}
          </div>
        )}

        {/* Price Filter */}
        {showPriceFilter && (
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <Badge
                key={range.value}
                onClick={() => onPriceChange(range.value)}
                className={`cursor-pointer transition-all ${
                  priceFilter === range.value
                    ? 'bg-yellow-600 dark:bg-yellow-700 text-white hover:bg-yellow-700 dark:hover:bg-yellow-800'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {range.label}  {/* FIXED: Render range.label instead of range */}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
