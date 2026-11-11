import React, { useState, useEffect, useTransition } from 'react';
import { useStore } from '../context/StoreContext';
import { RobloxCatalogItem } from '../types';
import { searchRobloxCatalog } from '../services/robloxCatalogService';
import { RobloxItemCard } from '../components/RobloxItemCard';
import { RobloxItemModal } from '../components/RobloxItemModal';
import { RobuxIcon } from '../components/RobuxIcon';
import { 
  Zap, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Shirt, 
  Crown,
  Eye,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Globe2,
  RefreshCw,
  Info
} from 'lucide-react';
import { KORBLOX_IMAGE } from '../data/mockData';

export const SkinsPage: React.FC = () => {
  const { setActivePage } = useStore();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [skinSearch, setSkinSearch] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<'popular' | 'price-asc' | 'price-desc' | 'newest'>('popular');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const [catalogItems, setCatalogItems] = useState<RobloxCatalogItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);
  const [selectedCatalogItem, setSelectedCatalogItem] = useState<RobloxCatalogItem | null>(null);

  const [, startTransition] = useTransition();

  // All 24 avatar & skin marketplace categories
  const subcategories = [
    { id: 'all', label: 'All Items' },
    { id: 'outfits', label: 'Avatar Skins' },
    { id: 'clothing', label: 'Classic Clothing' },
    { id: 'clothing', label: 'Shirts and Pants' },
    { id: 'clothing', label: 'Layered Clothing' },
    { id: 'clothing', label: 'Hoodies and Jackets' },
    { id: 'clothing', label: 'Dresses and Skirts' },
    { id: 'accessories', label: 'Shoes' },
    { id: 'hair', label: 'Hair' },
    { id: 'faces', label: 'Faces and Dynamic Heads' },
    { id: 'hats', label: 'Hats and Crowns' },
    { id: 'accessories', label: 'Glasses and Masks' },
    { id: 'hats', label: 'Head Accessories' },
    { id: 'accessories', label: 'Neck Accessories' },
    { id: 'accessories', label: 'Shoulder Accessories' },
    { id: 'accessories', label: 'Front and Back Accessories' },
    { id: 'accessories', label: 'Waist Accessories' },
    { id: 'accessories', label: 'Wings and Pets' },
    { id: 'accessories', label: 'Headphones' },
    { id: 'bundles', label: 'Animations' },
    { id: 'bundles', label: 'Emotes' },
    { id: 'bundles', label: 'Character Bundles' },
    { id: 'limiteds', label: 'Rare and Limited Items' },
    { id: 'all', label: 'Trending Items' },
    { id: 'all', label: 'New Arrivals' }
  ];

  // Fetch catalog items whenever category, search, sort, or page changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    searchRobloxCatalog({
      category: selectedSubcategory,
      keyword: skinSearch,
      sort: selectedSort,
      page: currentPage,
      limit: itemsPerPage
    }).then(result => {
      if (isMounted) {
        startTransition(() => {
          setCatalogItems(result.items);
          setTotalCount(result.totalCount);
          setTotalPages(result.totalPages);
          setIsLiveApi(result.isLiveApi);
          setIsLoading(false);
        });
      }
    }).catch(err => {
      console.error('Catalog search error:', err);
      if (isMounted) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedSubcategory, skinSearch, selectedSort, currentPage]);

  // Handle category switch
  const handleCategoryChange = (catId: string) => {
    setSelectedSubcategory(catId);
    setCurrentPage(1);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkinSearch(e.target.value);
    setCurrentPage(1);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedSubcategory('all');
    setSkinSearch('');
    setSelectedSort('popular');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-theme-skins py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner with Genuine Korblox Asset and Official Marketplace Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950/70 via-[#18082e] to-[#0c0419] border-2 border-pink-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
                <Shirt className="w-3.5 h-3.5" />
                <span>OFFICIAL ROBLOX MARKETPLACE CATALOG</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
                SKINS & AVATARS
              </h1>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Browse genuine avatar cosmetics, character bundles, hair, faces, clothing, hats, and limited collectibles powered by the official Roblox Marketplace Catalog API.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-300 pt-2 border-t border-[#2d1852]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Genuine Roblox Catalog Data
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pink-400" /> Original Roblox CDN Thumbnails
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-sky-400" /> Official Roblox Prices
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-52 sm:w-60 aspect-square rounded-3xl overflow-hidden border-2 border-pink-500/40 shadow-2xl bg-black">
                <img
                  src={KORBLOX_IMAGE}
                  alt="Korblox Deathspeaker Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter, Search, and Sort Bar */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* The 9 Subcategories Tabs */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
              {subcategories.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedSubcategory === tab.id
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-950/40 border border-pink-400'
                      : 'bg-[#150a2e] text-zinc-300 hover:text-white border border-[#2e1752] hover:border-pink-500/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search and Sort Dropdown */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              {/* Search inside catalog */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search catalog items..."
                  value={skinSearch}
                  onChange={handleSearchChange}
                  className="w-full bg-[#150a2e] border border-[#2e1752] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>

              {/* Sort selector */}
              <div className="relative w-full sm:w-44">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedSort}
                  onChange={(e) => {
                    setSelectedSort(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-[#150a2e] border border-[#2e1752] rounded-xl pl-8 pr-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-pink-500 appearance-none cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newly Added</option>
                </select>
              </div>
            </div>
          </div>

          {/* Catalog Status Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-zinc-400 bg-[#0e071e]/70 px-4 py-2.5 rounded-xl border border-[#2b1752]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Showing <strong className="text-white">{catalogItems.length}</strong> of <strong className="text-white">{totalCount}</strong> catalog items</span>
              {selectedSubcategory !== 'all' && (
                <span className="text-pink-400 font-sans font-semibold">in {subcategories.find(s => s.id === selectedSubcategory)?.label}</span>
              )}
            </div>

            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Roblox Catalog API Endpoint</span>
              </span>
              <span>•</span>
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <RefreshCw className="w-8 h-8 text-pink-500 animate-spin" />
            <p className="text-xs font-mono text-zinc-400">Loading official Roblox Marketplace catalog items...</p>
          </div>
        ) : catalogItems.length === 0 ? (
          /* Empty State when official API / filters genuinely return no results */
          <div className="text-center py-20 bg-[#0e071e]/90 border border-[#2d1852] rounded-3xl p-8 space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#1b0a33] border border-pink-500/30 flex items-center justify-center mx-auto text-pink-400">
              <Search className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-white font-bold text-base">No avatar cosmetics found</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                No items matched your query <strong className="text-white">"{skinSearch}"</strong> in category <strong className="text-white">"{subcategories.find(s => s.id === selectedSubcategory)?.label}"</strong>.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl cursor-pointer shadow-lg transition-all"
            >
              Reset Filters & View All
            </button>
          </div>
        ) : (
          /* Catalog Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catalogItems.map(item => (
              <RobloxItemCard
                key={item.id}
                item={item}
                onViewDetails={(it) => setSelectedCatalogItem(it)}
              />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6 pb-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                currentPage <= 1 
                  ? 'bg-[#120726] text-zinc-600 border border-[#241344] cursor-not-allowed' 
                  : 'bg-[#1b0a38] text-zinc-200 hover:text-white border border-[#3b1c6d] cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-950/50 border border-pink-400'
                      : 'bg-[#14082e] text-zinc-400 hover:text-white border border-[#2c1553]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                currentPage >= totalPages 
                  ? 'bg-[#120726] text-zinc-600 border border-[#241344] cursor-not-allowed' 
                  : 'bg-[#1b0a38] text-zinc-200 hover:text-white border border-[#3b1c6d] cursor-pointer'
              }`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Legal Platform Disclosure */}
        <div className="p-4 rounded-2xl bg-[#0b0416] border border-[#241240] text-xs text-zinc-400 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-zinc-300">
            <Info className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Independent Marketplace & Platform Information</span>
          </div>
          <p className="leading-relaxed text-[11px] text-zinc-400">
            ROBLOX STORE displays genuine item information and thumbnail assets directly from the official Roblox Marketplace Catalog API (<code className="text-purple-300">https://catalog.roblox.com/v1/search/items/details</code>). ROBLOX STORE is an independent service and is not affiliated with, endorsed by, or sponsored by Roblox Corporation. In accordance with platform terms, avatar cosmetics and bundles must be equipped through the official Roblox platform using in-game Robux currency. Customers can acquire authorized Robux packages through our store to equip these items.
          </p>
        </div>

      </div>

      {/* Item Detail Modal */}
      <RobloxItemModal
        item={selectedCatalogItem}
        onClose={() => setSelectedCatalogItem(null)}
      />
    </div>
  );
};
