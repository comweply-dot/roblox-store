import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Plus, 
  Minus 
} from 'lucide-react';
import { RobuxIcon } from './RobuxIcon';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    cartTotalUsd, 
    cartSavingsUsd, 
    formatPrice, 
    formatSavings,
    setActivePage 
  } = useStore();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopMore = () => {
    setIsCartOpen(false);
    setActivePage('robux');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-end">
      <div 
        className="w-full max-w-md bg-[#090514] border-l border-purple-900/40 h-full flex flex-col justify-between shadow-2xl shadow-purple-950/60 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-900/30 bg-[#0d071e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <span className="font-display font-extrabold text-white text-lg tracking-wide">
              Your Gaming Cart
            </span>
            <span className="text-xs font-mono bg-red-950/70 text-red-400 px-2.5 py-0.5 rounded-full border border-red-500/30">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-zinc-400 hover:text-red-400 transition-colors"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg bg-[#140c2b] text-zinc-400 hover:text-white border border-purple-900/50"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Promo Savings Callout */}
        {cartSavingsUsd > 0 && (
          <div className="bg-gradient-to-r from-red-950/60 via-purple-950/40 to-[#090514] px-4 py-2 border-b border-red-900/40 flex items-center gap-2 text-xs text-red-200">
            <Zap className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              50% Discount Applied! Total Savings: <strong>{formatSavings(cartTotalUsd + cartSavingsUsd, cartTotalUsd)}</strong>
            </span>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#090514]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#130b29] border border-purple-900/40 flex items-center justify-center text-zinc-500">
                <ShoppingBag className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-base">Your cart is empty</p>
                <p className="text-xs text-zinc-400 max-w-xs mt-1">
                  Discover 50% discount Robux packages, skins, gift cards, and game passes.
                </p>
              </div>
              <button
                onClick={handleShopMore}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-red-950/50"
              >
                Browse Robux Store
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-3 bg-[#110926] border border-purple-900/30 rounded-xl flex gap-3 relative group hover:border-purple-600/50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-black overflow-hidden shrink-0 border border-purple-900/40">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-bold text-white text-xs leading-snug line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-zinc-500 hover:text-red-400 p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <p className="text-[10px] text-red-400 font-bold uppercase">
                        {product.category}
                      </p>
                      {product.robuxAmount && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300">
                          <RobuxIcon className="w-3 h-3 text-amber-400" />
                          {product.robuxAmount.toLocaleString()} R$
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-purple-950/60">
                    <div className="flex items-center bg-[#170e34] border border-purple-900/50 rounded-md">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="p-1 text-zinc-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        className="p-1 text-zinc-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-extrabold text-white font-mono tabular-nums block">
                        {formatPrice(product.salePriceUsd * quantity)}
                      </span>
                      {product.isDiscounted && (
                        <span className="text-[10px] font-mono text-zinc-400 line-through tabular-nums block">
                          {formatPrice(product.originalPriceUsd * quantity)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Bar */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#0d071e] border-t border-purple-900/30 space-y-3">
            {/* Subtotal */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal (Regular Price)</span>
                <span className="font-mono line-through">{formatPrice(cartTotalUsd + cartSavingsUsd)}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>50% Promotional Savings</span>
                <span className="font-mono">-{formatSavings(cartTotalUsd + cartSavingsUsd, cartTotalUsd)}</span>
              </div>
              <div className="flex justify-between text-white font-extrabold text-base pt-2 border-t border-purple-900/40">
                <span>Total Amount</span>
                <span className="font-display text-lg text-white font-mono tabular-nums">
                  {formatPrice(cartTotalUsd)}
                </span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Username Only, No Password
              </span>
              <span className="text-purple-300">⚡ Instant Delivery</span>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
