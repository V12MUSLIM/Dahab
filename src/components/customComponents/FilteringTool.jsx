// DestinationFilters.jsx
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
    <div className={`space-y-6 ${className}`}>
      {/* Search Bar */}
      {showSearchBar && (
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>
      )}

      {/* Category Filter */}
      {showCategoryFilter && categories && (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Filter className="w-5 h-5 text-muted-foreground" />
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-yellow-500 hover:text-white transition-all"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      )}

      {/* Price Filter */}
      {showPriceFilter && (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-sm text-muted-foreground">Price Range:</span>
          {priceRanges.map((filter) => (
            <Badge
              key={filter.value}
              variant={priceFilter === filter.value ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-yellow-500 hover:text-white transition-all"
              onClick={() => onPriceChange(filter.value)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}