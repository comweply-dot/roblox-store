import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Zap, 
  Sword, 
  Gamepad2, 
  ShieldCheck, 
  Sparkles, 
  Search,
  Server
} from 'lucide-react';
import { GAMEITEMS_CATEGORY_IMAGE } from '../data/mockData';

export const GameItemsPage: React.FC = () => {
  const { products, setSelectedProduct } = useStore();
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [itemSearch, setItemSearch] = useState<string>('');

  const games = [
    { id: 'all', label: 'All Games' },
    { id: 'Blox Fruits', label: 'Blox Fruits' },
    { id: 'Pet Simulator 99', label: 'Pet Simulator 99' },
    { id: 'Murder Mystery 2', label: 'Murder Mystery 2' },
    { id: 'Blade Ball', label: 'Blade Ball' },
    { id: 'Adopt Me!', label: 'Adopt Me!' }
  ];

  const gameProducts = products.filter(p => p.category === 'gameitems');

  const filteredItems = gameProducts.filter(p => {
    const matchesGame = selectedGame === 'all' || 
      (p.subcategory && p.subcategory.toLowerCase() === selectedGame.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(itemSearch.toLowerCase());
    return matchesGame && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-theme-gameitems py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner with Magma & Electric Blue Highlights */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950/70 via-[#1a0a2b] to-[#0c041c] border-2 border-red-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
                <Sword className="w-3.5 h-3.5" />
                <span>IN-GAME GAMEPASSES & ELIGIBLE ASSETS</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
                GAME ITEMS
              </h1>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Discover available game passes, game-specific products and other eligible digital items. Sourced via authorized player trades and VIP private servers across Roblox’s most popular experiences.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-300 pt-2 border-t border-[#2d1852]">
                <span className="flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-emerald-400" /> VIP Private Server Transfer
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> 100% Dupe-Free Guaranteed
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-red-400" /> 50% Below Catalog Price
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-52 sm:w-60 aspect-square rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-2xl bg-black">
                <img
                  src={GAMEITEMS_CATEGORY_IMAGE}
                  alt="Legendary Swords and Orbs"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Game Filters and Search */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {games.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedGame(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selectedGame === tab.id
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-950/40'
                      : 'bg-[#150a2e] text-zinc-400 hover:text-white border border-[#2e1752]'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search fruits, pets, swords..."
                value={itemSearch}
                onChange={(e) => setItemSearch(e.target.value)}
                className="w-full bg-[#150a2e] border border-[#2e1752] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="text-xs font-mono text-zinc-400">
            Showing <span className="text-white font-bold">{filteredItems.length}</span> verified game products
          </div>
        </div>

        {/* Products Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#0e071e]/90 border border-[#2d1852] rounded-3xl p-8">
            <p className="text-white font-bold">No game items found for this selection</p>
            <button
              onClick={() => { setSelectedGame('all'); setItemSearch(''); }}
              className="mt-3 px-5 py-2.5 bg-red-600 text-white text-xs font-bold rounded-xl"
            >
              Show All Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={(p) => setSelectedProduct(p)} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
