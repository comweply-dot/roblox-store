import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Star, 
  Zap, 
  ShieldCheck, 
  ShoppingCart, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { RobuxIcon } from './RobuxIcon';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { formatPrice, formatSavings, addToCart, setActivePage } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'delivery' | 'guarantee'>('details');

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-[#0e071e] border border-[#2e1852] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8 shadow-purple-950/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Showcase Left */}
          <div className="relative bg-[#070312] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#241342]">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#2d184f] bg-black/50 flex items-center justify-center shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.isDiscounted && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1 border border-red-400/30">
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  50% OFF PROMO
                </div>
              )}
            </div>

            {/* Quick Guarantees Under Image */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-zinc-300">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#13092b] border border-[#2d184f]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Ban-Free</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#13092b] border border-[#2d184f]">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{product.deliveryTimeEstimate}</span>
              </div>
            </div>
          </div>

          {/* Details & Purchase Right */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category tag & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="uppercase font-bold tracking-wider text-purple-400 flex items-center gap-1">
                  {product.category === 'robux' && <RobuxIcon size="xs" />}
                  {product.category} {product.subcategory && `• ${product.subcategory}`}
                </span>
                <div className="flex items-center gap-1 text-zinc-300 font-mono">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-zinc-500">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title with Robux Icon */}
              <div className="flex items-start gap-2">
                {product.robuxAmount && <RobuxIcon size="md" className="mt-1" />}
                <h2 className="font-display font-extrabold text-white text-xl sm:text-2xl leading-tight">
                  {product.name}
                </h2>
              </div>

              {/* Price Banner */}
              <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/50 via-[#180a33] to-[#120726] border border-purple-500/30">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display font-black text-2xl sm:text-3xl text-white tabular-nums">
                        {formatPrice(product.salePriceUsd)}
                      </span>
                      {product.isDiscounted && (
                        <span className="text-sm font-mono text-zinc-500 line-through tabular-nums">
                          {formatPrice(product.originalPriceUsd)}
                        </span>
                      )}
                    </div>
                    {product.isDiscounted && (
                      <span className="text-xs font-semibold text-emerald-400">
                        You save {formatSavings(product.originalPriceUsd, product.salePriceUsd)} (50% OFF)
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-purple-300 bg-black/50 px-2.5 py-1 rounded-lg border border-purple-500/20">
                    Stock: {product.stockCount} left
                  </span>
                </div>
              </div>

              {/* Description & Specs Tabs */}
              <div className="mt-4">
                <div className="flex gap-4 border-b border-[#241342] text-xs font-semibold pb-2">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`transition-colors ${activeTab === 'details' ? 'text-purple-400 border-b-2 border-purple-500 pb-1' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Product Info
                  </button>
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={`transition-colors ${activeTab === 'delivery' ? 'text-purple-400 border-b-2 border-purple-500 pb-1' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Fulfillment Guide
                  </button>
                  <button
                    onClick={() => setActiveTab('guarantee')}
                    className={`transition-colors ${activeTab === 'guarantee' ? 'text-purple-400 border-b-2 border-purple-500 pb-1' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Security & Warranty
                  </button>
                </div>

                <div className="mt-3 text-xs text-zinc-300 leading-relaxed min-h-[90px]">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <p>{product.description}</p>
                      {product.features && (
                        <div className="grid grid-cols-1 gap-1.5 pt-1">
                          {product.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'delivery' && (
                    <div className="space-y-2 bg-[#120726] p-3 rounded-xl border border-[#271447]">
                      <p className="font-semibold text-white flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Automated Delivery Protocol:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                        <li>Enter your public Roblox username at checkout (No password ever requested).</li>
                        <li>Submit your payment via Indian UPI QR or USDT (BEP20 / TRC20).</li>
                        <li>Automated fulfillment transfers coins/keys within 1–3 minutes.</li>
                      </ol>
                    </div>
                  )}

                  {activeTab === 'guarantee' && (
                    <div className="space-y-2 bg-[#120726] p-3 rounded-xl border border-[#271447]">
                      <p className="font-semibold text-white flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Ban-Free & Money-Back:
                      </p>
                      <p className="text-zinc-400">
                        All Robux and cosmetics are distributed using certified developer group disbursement mechanics. If uncredited within 60 minutes, receive an immediate 100% refund.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Stepper & Action Controls */}
            <div className="pt-4 border-t border-[#241342]">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs font-semibold text-zinc-400">Quantity</span>
                <div className="flex items-center bg-[#150a2e] border border-[#311956] rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-zinc-400 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-zinc-400 hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {product.inStock && product.stockCount > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold bg-[#1b0d3a] hover:bg-[#25134f] text-zinc-200 border border-[#3c1e6e] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-zinc-400" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="py-2.5 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-xl shadow-red-950/60 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    Proceed to Checkout <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 bg-red-950/50 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Sorry! This package is currently unavailable. Please try another package.</span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      setActivePage('robux');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-extrabold bg-[#1f0f3d] hover:bg-[#2c1557] text-white border border-purple-500/40 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    Browse Other Available Packages <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
