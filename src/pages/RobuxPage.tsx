import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { RobuxIcon } from '../components/RobuxIcon';
import { 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ROBUX_OFFICIAL_EMBLEM } from '../data/mockData';

export const RobuxPage: React.FC = () => {
  const { products, setSelectedProduct, formatPrice, formatSavings, currency } = useStore();
  const [selectedPackageSize, setSelectedPackageSize] = useState<number | 'all'>('all');

  // Filter only large Robux packages as required: 1700, 3150, 4500, 10000, 22500
  const robuxProducts = products.filter(
    p => p.category === 'robux' && p.robuxAmount && [1700, 3150, 4500, 10000, 22500].includes(p.robuxAmount)
  ).sort((a, b) => (a.robuxAmount || 0) - (b.robuxAmount || 0));

  const filteredRobux = selectedPackageSize === 'all' 
    ? robuxProducts 
    : robuxProducts.filter(p => p.robuxAmount === selectedPackageSize);

  return (
    <div className="min-h-screen bg-theme-robux py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Category Header Banner with Authentic Robux Icon & Dark Purple Gaming Glow */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950/70 via-[#190930] to-[#0d041c] border-2 border-purple-500/40 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-md">
                <RobuxIcon size="sm" />
                <span>AUTHORIZED HIGH-VOLUME ROBUX DISTRIBUTION</span>
              </div>

              {/* Main Heading with Authentic Robux Icon */}
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white flex items-center gap-3 flex-wrap">
                <RobuxIcon size="xl" />
                <span>BUY ROBUX — LARGE PACKAGES ONLY</span>
              </h1>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Explore available large Robux packages and understand the quantity and delivery method before ordering. All small packages have been removed to ensure maximum bulk savings and direct player group payouts.
              </p>

              {/* Quick Guarantees Strip */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium text-zinc-300 pt-2 border-t border-[#2d1852]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Username Only (No Password)
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" /> Instant Group Payout (1–3 min)
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-purple-400" /> 100% Ban-Free Guarantee
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-52 sm:w-60 aspect-square rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-2xl shadow-purple-950/70 bg-black">
                <img
                  src={ROBUX_OFFICIAL_EMBLEM}
                  alt="Authentic Robux Emblem"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                  <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-300 uppercase tracking-widest">
                    <RobuxIcon size="xs" />
                    <span>AUTHENTIC CURRENCY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Package Filter Pills with Genuine Robux Icons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#2d1852]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 mr-2 uppercase tracking-wider">
              Select Package:
            </span>
            <button
              onClick={() => setSelectedPackageSize('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedPackageSize === 'all'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg'
                  : 'bg-[#150a2e] text-zinc-400 hover:text-white border border-[#2e1752]'
              }`}
            >
              All 5 Packages
            </button>
            {[1700, 3150, 4500, 10000, 22500].map(amount => (
              <button
                key={amount}
                onClick={() => setSelectedPackageSize(amount)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  selectedPackageSize === amount
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                    : 'bg-[#150a2e] text-zinc-300 hover:text-white border border-[#2e1752]'
                }`}
              >
                <RobuxIcon size="xs" />
                <span>{amount.toLocaleString()} Robux</span>
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-zinc-400">
            Showing <span className="text-white font-bold">{filteredRobux.length}</span> authorized packages (50% OFF)
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRobux.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>

        {/* How Robux Delivery Works Step-by-Step */}
        <div className="bg-[#0e071e]/90 border border-[#2d1852] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">
              Transparency & Security
            </span>
            <h2 className="font-display font-black text-2xl text-white mt-1">
              AUTHORIZED ROBUX FULFILLMENT PROTOCOL
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#14082b] border border-[#2d1852] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 font-mono font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h3 className="font-display font-bold text-white text-base">Username Only</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We will never request your account password, email PIN, or 2FA codes. Simply supply your public Roblox username at checkout.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#14082b] border border-[#2d1852] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 font-mono font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h3 className="font-display font-bold text-white text-base">Authorized Group Payout</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our automated distribution bot uses official Roblox developer group payout protocols. Payout tax is 100% absorbed by our store.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#14082b] border border-[#2d1852] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 font-mono font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h3 className="font-display font-bold text-white text-base">Instant Balance Credit</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Once payment is confirmed via UPI or Crypto USDT, Robux are credited directly to your player account within 1 to 3 minutes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
