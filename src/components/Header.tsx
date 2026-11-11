import React, { useState } from 'react';
import { useStore, PageId } from '../context/StoreContext';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Globe, 
  Package, 
  SlidersHorizontal,
  Zap,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    cartCount, 
    setIsCartOpen, 
    currency, 
    setCurrency, 
    searchQuery, 
    setSearchQuery,
    storeSettings,
    language,
    setLanguage
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'robux', label: 'Robux Store' },
    { id: 'skins', label: 'Skins & Avatars' },
    { id: 'giftcards', label: 'Gift Cards' },
    { id: 'gameitems', label: 'Game Items' },
    { id: 'membership', label: 'Membership' },
  ];

  const handleNavClick = (page: PageId) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Promotional Announcement Bar */}
      {storeSettings.bannerNotice && (
        <aside aria-label="Store announcement" className="bg-gradient-to-r from-purple-950 via-red-950 to-[#070312] text-purple-200 text-xs py-1.5 px-4 text-center border-b border-purple-800/40 font-medium tracking-wide flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
          <span className="truncate">{storeSettings.bannerNotice}</span>
          <span className="hidden md:inline-block bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider shadow">
            50% OFF PROMO
          </span>
        </aside>
      )}

      {/* Main Top Bar */}
      <header className="sticky top-0 z-40 bg-[#090317]/95 backdrop-blur-md border-b border-[#251545]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Zone 1: Single Brand Wordmark with Authentic Robux Emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none"
              aria-label="Roblox Store Homepage"
            >
              {/* Geometric Red/Black Gaming Emblem */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-950/60 border border-purple-500/40 group-hover:scale-105 transition-transform">
                <span className="font-display font-black text-white text-lg tracking-tighter">R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  ROBLOX<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-400">STORE</span>
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Primary Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
            {navLinks.map(link => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`whitespace-nowrap transition-colors py-1 relative flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-white font-bold' 
                      : 'hover:text-purple-300 text-zinc-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-400 rounded-full" />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('track')}
              className={`whitespace-nowrap transition-colors py-1 text-xs uppercase tracking-wider flex items-center gap-1 font-mono ${
                activePage === 'track' ? 'text-purple-300 font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Track Order
            </button>
          </nav>

          {/* Zone 3: Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Search Button */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 rounded-xl bg-[#14082b] hover:bg-[#200d45] border border-[#2e1752] text-zinc-300 hover:text-white transition-colors"
              title="Search marketplace"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Selector (Worldwide Support: India, USA, UK, Europe, Turkey) */}
            <div className="flex items-center gap-1.5 bg-[#14082b] px-2.5 py-1 rounded-xl border border-[#2e1752]">
              <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-white font-mono text-xs focus:outline-none cursor-pointer border-none"
                title="Select Website Language"
                aria-label="Language selection"
              >
                <option value="en" className="bg-[#100722] text-white">EN (English)</option>
                <option value="hi" className="bg-[#100722] text-white">HI (हिंदी)</option>
                <option value="tr" className="bg-[#100722] text-white">TR (Türkçe)</option>
                <option value="es" className="bg-[#100722] text-white">ES (Español)</option>
                <option value="de" className="bg-[#100722] text-white">DE (Deutsch)</option>
                <option value="fr" className="bg-[#100722] text-white">FR (Français)</option>
              </select>
            </div>

            {/* Currency Selector (India INR ₹ vs International USD $) */}
            <div className="flex items-center bg-[#14082b] p-0.5 rounded-xl border border-[#2e1752]">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="International USD ($)"
              >
                USD $
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  currency === 'INR'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="India INR (₹)"
              >
                INR ₹
              </button>
            </div>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-white transition-colors flex items-center gap-2"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline text-xs font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="min-w-5 h-5 px-1 bg-red-600 text-white font-mono text-[11px] font-bold rounded-full flex items-center justify-center leading-none shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Entry */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-lg border transition-colors ${
                activePage === 'admin'
                  ? 'bg-zinc-800 text-white border-zinc-600'
                  : 'bg-[#14141a] text-zinc-400 hover:text-zinc-200 border-[#252530]'
              }`}
              title="Admin Dashboard"
              aria-label="Admin Dashboard"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#14141a] text-zinc-300 hover:text-white border border-[#252530]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0d12] border-b border-[#22222a] px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#1f1f28]">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activePage === link.id
                      ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                      : 'bg-[#14141a] text-zinc-300 hover:bg-[#1a1a24]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleNavClick('track')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#14141a] text-zinc-300 hover:text-white"
              >
                <Package className="w-4 h-4 text-red-400" />
                Track Order
              </button>
              <button
                onClick={() => handleNavClick('orders')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#14141a] text-zinc-300 hover:text-white"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                My Orders
              </button>
              <button
                onClick={() => handleNavClick('reviews')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#14141a] text-zinc-300 hover:text-white"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                Customer Reviews
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#14141a] text-zinc-300 hover:text-white"
              >
                <Globe className="w-4 h-4 text-blue-400" />
                Live Support
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-[#121218] border border-[#262633] rounded-xl w-full max-w-lg p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#22222e]">
              <span className="font-display font-bold text-white text-base flex items-center gap-2">
                <Search className="w-4 h-4 text-red-500" /> Search Marketplace
              </span>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4">
              <input
                type="text"
                autoFocus
                placeholder="Search Robux, Bundles, Gift Cards, Gamepasses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowSearchModal(false);
                    if (activePage === 'home') {
                      setActivePage('robux');
                    }
                  }
                }}
                className="w-full bg-[#181822] border border-[#2d2d3d] rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="text-zinc-400 py-1">Popular:</span>
              {['10,000 Robux', 'Korblox', 'Blox Fruits', '$50 Gift Card', 'Premium 1000'].map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    setShowSearchModal(false);
                  }}
                  className="px-2.5 py-1 bg-[#1a1a24] text-zinc-300 hover:text-white hover:bg-red-600/20 border border-[#282836] rounded-md transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchModal(false);
                }}
                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
              <button
                onClick={() => setShowSearchModal(false)}
                className="px-4 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                View Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
