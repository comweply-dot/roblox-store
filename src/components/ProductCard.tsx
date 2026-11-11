import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, Zap, ShoppingCart, ArrowRight, ShieldCheck, Check, Eye } from 'lucide-react';
import { RobuxIcon } from './RobuxIcon';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { formatPrice, formatSavings, addToCart, setActivePage, setSelectedProduct } = useStore();
  const [imageLoaded, setImageLoaded] = useState(true);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleInstantBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleClickCard = () => {
    if (onViewDetails) {
      onViewDetails(product);
    } else {
      setSelectedProduct(product);
    }
  };

  const isAvailable = product.inStock && product.stockCount > 0;

  return (
    <div 
      onClick={handleClickCard}
      className={`group relative bg-[#0e071e]/90 hover:bg-[#140b2a] rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xl hover:shadow-purple-950/40 backdrop-blur-sm ${
        isAvailable ? 'border-[#2b184a] hover:border-purple-500/60' : 'border-zinc-800 opacity-90'
      }`}
    >
      {/* 50% OFF Tag and Badges */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
        {product.isDiscounted && (
          <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg border border-red-400/40 flex items-center gap-1">
            <Zap className="w-3 h-3 fill-white" />
            {product.discountPercent}% OFF
          </span>
        )}
        {!isAvailable && (
          <span className="bg-red-950/90 text-red-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-red-500/40">
            Unavailable
          </span>
        )}
        {product.isBestSeller && isAvailable && (
          <span className="bg-[#1c0f38]/90 text-purple-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-purple-500/30">
            Top Seller
          </span>
        )}
      </div>

      {/* Delivery / Stock Badge */}
      <div className="absolute top-3 right-3 z-10 text-[10px] font-mono text-zinc-300 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-red-500'}`}></span>
        {isAvailable ? product.deliveryTimeEstimate : 'Out of Stock'}
      </div>

      {/* Image Area with Resilient Fallback */}
      <div className="relative w-full aspect-[4/3] bg-[#070312] overflow-hidden flex items-center justify-center p-3">
        {imageLoaded ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageLoaded(false)}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#1a0c36] to-[#090317] flex flex-col items-center justify-center text-center p-4">
            <ShieldCheck className="w-10 h-10 text-purple-400 mb-2" />
            <span className="text-xs font-bold text-zinc-300">{product.name}</span>
          </div>
        )}

        {/* Ambient Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e071e] via-transparent to-transparent opacity-85" />
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span className="uppercase text-[11px] font-bold text-purple-400 tracking-wider flex items-center gap-1">
              {product.category === 'robux' && <RobuxIcon size="xs" />}
              {product.category === 'robux' 
                ? 'Robux Package' 
                : product.category === 'skins' 
                ? (product.subcategory || 'Avatar Gear')
                : product.category === 'giftcards'
                ? 'Digital Gift Card'
                : product.category === 'gameitems'
                ? (product.subcategory || 'Gamepass')
                : 'Premium Membership'}
            </span>
            <div className="flex items-center gap-1 font-mono text-zinc-300 text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating.toFixed(1)}</span>
              <span className="text-zinc-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title with Robux Icon if Robux Item */}
          <div className="flex items-center gap-2">
            {product.robuxAmount && (
              <RobuxIcon size="sm" />
            )}
            <h3 className="font-display font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-purple-300 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Short Description */}
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing System (Original with Strikethrough, Discounted prominently, Amount saved) */}
        <div className="pt-3 border-t border-[#22133e]">
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-baseline gap-2">
              {/* Prominent Discounted Price */}
              <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight tabular-nums">
                {formatPrice(product.salePriceUsd)}
              </span>
              {/* Original Price with Strikethrough */}
              {product.isDiscounted && (
                <span className="text-xs font-mono text-zinc-500 line-through tabular-nums">
                  {formatPrice(product.originalPriceUsd)}
                </span>
              )}
            </div>

            {/* Exact Savings Badge */}
            {product.isDiscounted && (
              <span className="text-[11px] font-bold text-emerald-400 font-mono bg-emerald-950/50 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                Save {formatSavings(product.originalPriceUsd, product.salePriceUsd)}
              </span>
            )}
          </div>

          {/* Action Buttons: View Details, Add to Cart & Purchase Button */}
          <div className="space-y-2 mt-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickCard();
                }}
                className="py-2 px-2.5 rounded-xl text-xs font-bold bg-[#1a0f33] hover:bg-[#251547] text-zinc-300 hover:text-white border border-[#371e63] transition-colors flex items-center justify-center gap-1"
                title="View full specifications and delivery steps"
              >
                <Eye className="w-3.5 h-3.5 text-purple-400" /> View Details
              </button>

              {isAvailable ? (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    addedAnimation 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-[#180e2f] hover:bg-[#241544] text-zinc-200 border border-[#351d5c]'
                  }`}
                  title="Add to shopping cart"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5 text-zinc-400" /> Add to Cart
                    </>
                  )}
                </button>
              ) : (
                <span className="py-2 px-2.5 rounded-xl text-xs font-bold bg-[#140b22] text-zinc-500 border border-zinc-800 flex items-center justify-center gap-1 text-center cursor-not-allowed">
                  Out of Stock
                </span>
              )}
            </div>

            {isAvailable ? (
              <button
                type="button"
                onClick={handleInstantBuy}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-950/60 flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider cursor-pointer"
              >
                Purchase Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClickCard}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-[#170e28] hover:bg-[#22143b] text-amber-300/90 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                Package Unavailable · View Alternatives <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
