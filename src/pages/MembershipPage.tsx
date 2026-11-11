import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { RobuxIcon } from '../components/RobuxIcon';
import { 
  Crown, 
  Zap, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';
import { PREMIUM_CARD_IMAGE } from '../data/mockData';

export const MembershipPage: React.FC = () => {
  const { products, setSelectedProduct, formatPrice } = useStore();

  const membershipProducts = products.filter(p => p.category === 'membership');

  const plansComparison = [
    {
      feature: 'Monthly Robux Allowance',
      p450: '450 R$ / month',
      p1000: '1,000 R$ / month',
      p2200: '2,200 R$ / month',
    },
    {
      feature: 'Item Trading Permissions',
      p450: 'Yes (Standard)',
      p1000: 'Yes (High Limit)',
      p2200: 'Yes (Maximum Volume)',
    },
    {
      feature: 'Robux Purchase Bonus',
      p450: '+10% extra Robux',
      p1000: '+10% extra Robux',
      p2200: '+10% extra Robux',
    },
    {
      feature: 'Developer Exchange (DevEx)',
      p450: 'Eligible',
      p1000: 'Eligible',
      p2200: 'Priority Eligible',
    },
    {
      feature: 'Premium Chat & Icon Badge',
      p450: 'Included',
      p1000: 'Included',
      p2200: 'Elite Tier',
    },
    {
      feature: 'Subscription Term',
      p450: '1 Month (Redeemable code)',
      p1000: '1 Month (Redeemable code)',
      p2200: '1 Month (Redeemable code)',
    }
  ];

  return (
    <div className="min-h-screen bg-theme-membership py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950/70 via-[#18092d] to-[#0c0419] border-2 border-purple-500/40 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" />
                <span>OFFICIAL ROBLOX PREMIUM SUBSCRIPTIONS</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
                MEMBERSHIP
              </h1>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Explore available membership plans, benefits and subscription information. Receive monthly Robux deposits, trade limited collectibles with other players, earn 10% more Robux on all future purchases, and flaunt the official Premium badge.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-300 pt-2 border-t border-[#2d1852]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Authorized Code Redemption
                </span>
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-purple-400" /> Non-Recurring Voucher Codes
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-red-400" /> 50% Verified Promo
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-52 sm:w-60 aspect-square rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-black">
                <img
                  src={PREMIUM_CARD_IMAGE}
                  alt="Roblox Premium Platinum Card"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Available Plans Cards Grid */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">
              Select Your Tier
            </span>
            <h2 className="font-display font-black text-2xl text-white mt-1">
              AVAILABLE MEMBERSHIP PLANS (50% OFF)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={(p) => setSelectedProduct(p)} 
              />
            ))}
          </div>
        </div>

        {/* Detailed Plan Comparison Table */}
        <div className="bg-[#0e071e]/90 border border-[#2d1852] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">
              Side-By-Side Comparison
            </span>
            <h2 className="font-display font-black text-2xl text-white mt-1">
              PREMIUM PLAN BENEFITS & SPECIFICATIONS
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead>
                <tr className="border-b border-[#2d1852] text-zinc-400 font-display">
                  <th className="py-3 px-4 font-bold text-sm text-white">Membership Benefit</th>
                  <th className="py-3 px-4 font-bold text-sm text-red-400">Premium 450</th>
                  <th className="py-3 px-4 font-bold text-sm text-amber-400">Premium 1000</th>
                  <th className="py-3 px-4 font-bold text-sm text-purple-400">Premium 2200</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22123d]">
                {plansComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#150a2e] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">{row.feature}</td>
                    <td className="py-3.5 px-4 font-mono">{row.p450}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-zinc-100">{row.p1000}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{row.p2200}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
