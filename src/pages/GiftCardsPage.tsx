import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Zap, 
  CreditCard, 
  Gift, 
  ShieldCheck, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { GIFTCARDS_CATEGORY_IMAGE } from '../data/mockData';

export const GiftCardsPage: React.FC = () => {
  const { products, setSelectedProduct, formatPrice } = useStore();
  const [selectedDenom, setSelectedDenom] = useState<number | 'all'>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const giftCardProducts = products.filter(p => p.category === 'giftcards')
    .sort((a, b) => (a.denomination || 0) - (b.denomination || 0));

  const filteredCards = selectedDenom === 'all'
    ? giftCardProducts
    : giftCardProducts.filter(p => p.denomination === selectedDenom);

  const handleCopyRedeemUrl = () => {
    navigator.clipboard.writeText('https://www.roblox.com/redeem');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-theme-giftcards py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Category Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950/70 via-[#18092d] to-[#0c0419] border-2 border-emerald-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5" />
                <span>OFFICIAL DIGITAL REDEMPTION KEYS</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
                ROBLOX GIFT CARDS
              </h1>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Explore available digital gift cards, denominations and redemption instructions. All digital codes are delivered immediately with step-by-step redemption instructions and exclusive bonus avatar items.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-300 pt-2 border-t border-[#2d1852]">
                <span className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-emerald-400" /> Free Bonus Virtual Accessory
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> Never Expires
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-red-400" /> Flat 50% Discount
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-52 sm:w-60 aspect-square rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-black">
                <img
                  src={GIFTCARDS_CATEGORY_IMAGE}
                  alt="Digital Gift Cards"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Denomination Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#2d1852]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 mr-2 uppercase tracking-wider">
              Denomination:
            </span>
            <button
              onClick={() => setSelectedDenom('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDenom === 'all'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40'
                  : 'bg-[#150a2e] text-zinc-400 hover:text-white border border-[#2e1752]'
              }`}
            >
              All Cards
            </button>
            {[10, 25, 50, 100, 200].map(val => (
              <button
                key={val}
                onClick={() => setSelectedDenom(val)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedDenom === val
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40'
                    : 'bg-[#150a2e] text-zinc-400 hover:text-white border border-[#2e1752]'
                }`}
              >
                ${val} USD Card
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-zinc-400">
            Showing <span className="text-white font-bold">{filteredCards.length}</span> verified gift cards
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>

        {/* Official Redemption Instructions Guide */}
        <div className="bg-[#0e071e]/90 border border-[#2d1852] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#241342] pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                Official Redemption Guide
              </span>
              <h2 className="font-display font-black text-2xl text-white mt-1">
                HOW TO REDEEM YOUR DIGITAL GIFT CARD
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyRedeemUrl}
                className="px-3.5 py-2 bg-[#1b0d38] hover:bg-[#271352] text-zinc-300 text-xs font-medium rounded-xl border border-[#3b1d6e] flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied URL!' : 'Copy Redeem Link'}
              </button>
              <a
                href="https://www.roblox.com/redeem"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-bold rounded-xl border border-emerald-500/40 flex items-center gap-1.5 transition-colors"
              >
                Open roblox.com/redeem <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#14082b] border border-[#2d1852] space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400">Step 1</span>
              <h3 className="font-display font-bold text-white text-base">Instant Key Code</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Immediately after completing payment, your 16-character alphanumeric redemption voucher appears on screen and is dispatched to your email.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#14082b] border border-[#2d1852] space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400">Step 2</span>
              <h3 className="font-display font-bold text-white text-base">Paste at roblox.com/redeem</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Log into your account, visit <code className="text-emerald-400 font-mono">roblox.com/redeem</code>, enter your 16-character code, and click the Redeem button.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#14082b] border border-[#2d1852] space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400">Step 3</span>
              <h3 className="font-display font-bold text-white text-base">Balance & Virtual Item</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Convert credit to Robux or Premium. The unique monthly exclusive avatar cosmetic is also automatically deposited into your inventory.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
