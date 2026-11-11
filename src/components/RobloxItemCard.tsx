import React, { useState } from 'react';
import { RobloxCatalogItem } from '../types';
import { RobuxIcon } from './RobuxIcon';
import { 
  Eye, 
  ExternalLink, 
  Heart, 
  BadgeCheck, 
  Layers, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface RobloxItemCardProps {
  item: RobloxCatalogItem;
  onViewDetails: (item: RobloxCatalogItem) => void;
}

export const RobloxItemCard: React.FC<RobloxItemCardProps> = ({ item, onViewDetails }) => {
  const { setActivePage } = useStore();
  const [imgError, setImgError] = useState(false);

  const handleGetRobux = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePage('robux');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMarketplace = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(item.robloxUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onViewDetails(item)}
      className="group relative bg-[#0e071e]/90 hover:bg-[#140b2a] rounded-2xl border border-[#2b184a] hover:border-pink-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xl hover:shadow-pink-950/30 backdrop-blur-sm"
    >
      {/* Category / Limited Tag Badges */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
        {item.isLimited ? (
          <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-lg border border-amber-300/40">
            LIMITED
          </span>
        ) : (
          <span className="bg-[#180833]/90 text-pink-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-pink-500/30">
            {item.categoryLabel}
          </span>
        )}
      </div>

      {/* Item Type & ID Badge */}
      <div className="absolute top-3 right-3 z-10 text-[10px] font-mono text-zinc-300 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
        <span>{item.itemType}</span>
      </div>

      {/* Image Showcase */}
      <div className="relative w-full aspect-[4/3] bg-[#070312] overflow-hidden flex items-center justify-center p-3">
        {!imgError ? (
          <img
            src={item.thumbnailUrl}
            alt={item.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#1a0c36] to-[#090317] flex flex-col items-center justify-center text-center p-4">
            <ShieldCheck className="w-10 h-10 text-pink-400 mb-2" />
            <span className="text-xs font-bold text-zinc-300">{item.name}</span>
          </div>
        )}

        {/* Ambient Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e071e] via-transparent to-transparent opacity-85" />
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Creator & Favorites */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <div className="flex items-center gap-1 text-[11px] text-zinc-300">
              <span className="text-zinc-500">By</span>
              <span className="font-semibold text-white">{item.creatorName}</span>
              {item.creatorHasVerifiedBadge && (
                <BadgeCheck className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
              )}
            </div>
            <div className="flex items-center gap-1 font-mono text-zinc-400 text-[11px]">
              <Heart className="w-3 h-3 text-red-500/80 fill-red-500/80" />
              <span>{item.favoriteCount.toLocaleString()}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-pink-300 transition-colors">
            {item.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Official Roblox Pricing */}
        <div className="pt-3 border-t border-[#22133e]">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <RobuxIcon size="sm" />
              {item.price > 0 ? (
                <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight tabular-nums">
                  {item.price.toLocaleString()} R$
                </span>
              ) : (
                <span className="font-display font-extrabold text-base text-emerald-400 uppercase tracking-wide">
                  Free Item
                </span>
              )}
            </div>
            <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono bg-black/40 px-2 py-0.5 rounded border border-white/5">
              Official Catalog
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 mt-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(item);
                }}
                className="py-2 px-2.5 rounded-xl text-xs font-bold bg-[#1a0f33] hover:bg-[#251547] text-zinc-300 hover:text-white border border-[#371e63] transition-colors flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5 text-pink-400" /> Details
              </button>

              <button
                type="button"
                onClick={handleOpenMarketplace}
                className="py-2 px-2.5 rounded-xl text-xs font-bold bg-[#160a2b] hover:bg-[#220f44] text-zinc-300 hover:text-white border border-[#32175a] transition-colors flex items-center justify-center gap-1"
                title="View on Roblox Marketplace"
              >
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" /> Roblox
              </button>
            </div>

            <button
              type="button"
              onClick={handleGetRobux}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-purple-950/60 flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider cursor-pointer"
            >
              <RobuxIcon size="xs" />
              <span>Get Robux to Purchase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
