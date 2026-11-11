import React from 'react';
import { RobloxCatalogItem } from '../types';
import { useStore } from '../context/StoreContext';
import { RobuxIcon } from './RobuxIcon';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  Heart, 
  BadgeCheck, 
  ShieldCheck, 
  Layers, 
  Tag, 
  ArrowRight,
  Info
} from 'lucide-react';

interface RobloxItemModalProps {
  item: RobloxCatalogItem | null;
  onClose: () => void;
}

export const RobloxItemModal: React.FC<RobloxItemModalProps> = ({ item, onClose }) => {
  const { setActivePage } = useStore();

  if (!item) return null;

  const handleGetRobux = () => {
    onClose();
    setActivePage('robux');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMarketplace = () => {
    window.open(item.robloxUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#0e071e] border-2 border-[#391d6b] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-8 shadow-purple-950/70"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Thumbnail Showcase */}
          <div className="md:col-span-5 bg-[#060211] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#261345]">
            <div>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#351b5e] bg-gradient-to-b from-[#14082c] to-black flex items-center justify-center shadow-xl">
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-2"
                />
                {item.isLimited && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    LIMITED
                  </span>
                )}
              </div>

              {/* Verified Specs Under Image */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-[#14082e] border border-[#2d1653] text-zinc-300">
                  <span className="text-zinc-400">Roblox Item ID:</span>
                  <span className="font-mono font-bold text-white">{item.id}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-[#14082e] border border-[#2d1653] text-zinc-300">
                  <span className="text-zinc-400">Item Type:</span>
                  <span className="font-semibold text-purple-300">{item.itemType}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-[#14082e] border border-[#2d1653] text-zinc-300">
                  <span className="text-zinc-400">Category:</span>
                  <span className="font-semibold text-white capitalize">{item.category}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#261345] flex items-center gap-1.5 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Official Roblox Marketplace Item</span>
            </div>
          </div>

          {/* Right Info and Actions */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Creator & Favorites */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
                  <span>By</span>
                  <span className="font-bold text-white">{item.creatorName}</span>
                  {item.creatorHasVerifiedBadge && (
                    <BadgeCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                  )}
                </div>
                <div className="flex items-center gap-1 font-mono text-zinc-400">
                  <Heart className="w-3.5 h-3.5 fill-red-500/80 text-red-500" />
                  <span>{item.favoriteCount.toLocaleString()}</span>
                </div>
              </div>

              {/* Item Title */}
              <h2 className="font-display font-extrabold text-white text-xl sm:text-2xl leading-snug">
                {item.name}
              </h2>

              {/* Official Roblox Price Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#1a0a36] to-[#120626] border border-purple-500/30">
                <div className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider mb-1">
                  Official Roblox Price
                </div>
                <div className="flex items-center gap-2">
                  <RobuxIcon size="md" />
                  {item.price > 0 ? (
                    <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight tabular-nums">
                      {item.price.toLocaleString()} R$
                    </span>
                  ) : (
                    <span className="font-display font-black text-2xl text-emerald-400 uppercase tracking-wide">
                      Free Item
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Description
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed max-h-32 overflow-y-auto bg-[#0a0417] p-3 rounded-xl border border-[#22103f]">
                  {item.description}
                </p>
              </div>

              {/* Platform Compliance Disclaimer */}
              <div className="p-3 bg-[#110729] rounded-xl border border-purple-500/20 text-[11px] text-zinc-400 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-purple-300">
                  <Info className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Authorized Platform Notice</span>
                </div>
                <p className="leading-relaxed">
                  ROBLOX STORE is an independent store. Avatar cosmetics and bundles must be equipped on the official Roblox platform using your account Robux.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#241344] space-y-2.5">
              <button
                type="button"
                onClick={handleOpenMarketplace}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#1a0c38] hover:bg-[#25124f] text-white border border-[#3b1c6d] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>View on Roblox Marketplace</span>
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
              </button>

              <button
                type="button"
                onClick={handleGetRobux}
                className="w-full py-3 px-4 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 transition-all uppercase tracking-wider cursor-pointer"
              >
                <RobuxIcon size="xs" />
                <span>Get Robux Package to Purchase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
