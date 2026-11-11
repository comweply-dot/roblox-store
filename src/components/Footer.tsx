import React, { useState } from 'react';
import { useStore, PageId } from '../context/StoreContext';
import { ShieldCheck, Zap, Lock, RefreshCw, MessageSquare, Download, FileArchive } from 'lucide-react';
import { RobuxIcon } from './RobuxIcon';
import { ExportModal } from './ExportModal';

export const Footer: React.FC = () => {
  const { setActivePage, currency } = useStore();
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleNav = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060210] border-t border-[#231240] text-zinc-400 text-sm">
      {/* Trust Badges Strip */}
      <div className="border-b border-[#1b0c33] bg-[#090317]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Instant Delivery</p>
                <p className="text-xs text-zinc-500">Automated 1–3 min fulfillment</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Ban-Free Guarantee</p>
                <p className="text-xs text-zinc-500">100% Authorized & Safe</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Secure Checkout</p>
                <p className="text-xs text-zinc-500">UPI, BEP20 & TRC20 Crypto</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Refund Assurance</p>
                <p className="text-xs text-zinc-500">100% Money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-purple-800 flex items-center justify-center text-white font-display font-black text-base shadow-lg shadow-purple-950/60 border border-purple-500/40">
                R
              </div>
              <span className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1.5">
                ROBLOX<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-400">STORE</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              The premier international gaming marketplace. We deliver large Robux packages, exclusive avatar cosmetics, digital gift cards, and VIP subscriptions with verified 50% discount savings and automated delivery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="text-xs font-mono bg-[#14082b] border border-[#2e1752] px-3 py-1 rounded-lg text-purple-200">
                Active Region: {currency === 'INR' ? 'India (INR ₹)' : 'International (USD $)'}
              </div>
              <div className="text-xs font-mono bg-red-950/60 border border-red-500/40 px-2.5 py-1 rounded-lg text-red-300 font-bold">
                50% OFF PROMO ACTIVE
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Five Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('robux')} className="hover:text-purple-300 transition-colors flex items-center gap-1.5">
                  <RobuxIcon size="xs" />
                  <span>Buy Robux (1.7k – 22.5k)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('skins')} className="hover:text-purple-300 transition-colors">
                  Skins & Avatars
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('giftcards')} className="hover:text-purple-300 transition-colors">
                  Roblox Gift Cards
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gameitems')} className="hover:text-purple-300 transition-colors">
                  Game Items & Passes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('membership')} className="hover:text-purple-300 transition-colors">
                  Membership (Premium)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Support & Orders</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('track')} className="hover:text-purple-300 transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('orders')} className="hover:text-purple-300 transition-colors">
                  My Orders History
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('reviews')} className="hover:text-purple-300 transition-colors">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-purple-300 transition-colors flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  Live Support Chat
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-purple-300 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Policies</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('refund-policy')} className="hover:text-purple-300 transition-colors">
                  Refund & Guarantee Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-purple-300 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-purple-300 transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-zinc-200 text-zinc-500 transition-colors">
                  Merchant Console
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsExportOpen(true)} 
                  className="hover:text-amber-300 text-amber-400 font-medium transition-colors flex items-center gap-1.5 pt-1"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Website ZIP</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#1e0e38] space-y-4">
          <div className="p-4 rounded-xl bg-[#0d051f] border border-[#2b164f] text-[11px] text-zinc-400 leading-relaxed">
            <strong className="text-zinc-300">Disclaimer & Trademark Notice:</strong> ROBLOX STORE is an independent gaming marketplace platform providing authorized digital redemption codes, game passes, and automated player payouts. Roblox, the Roblox logo, Robux, and related names and characters are registered trademarks of Roblox Corporation. ROBLOX STORE is not affiliated with, endorsed by, or partnered with Roblox Corporation. All purchases are processed securely under our buyer-protection policy.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
            <div className="flex items-center gap-3">
              <p>© {new Date().getFullYear()} ROBLOX STORE. All rights reserved.</p>
              <button 
                onClick={() => setIsExportOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-purple-400 hover:text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-md hover:bg-purple-950/40 transition-colors"
              >
                <FileArchive className="w-3 h-3" />
                <span>Export ZIP (GitHub Ready)</span>
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-emerald-400">UPI QR (India)</span>
              <span>·</span>
              <span className="text-amber-400">USDT BEP20</span>
              <span>·</span>
              <span className="text-red-400">USDT TRC20</span>
              <span>·</span>
              <span>CARD CHANNELS</span>
            </div>
          </div>
        </div>
      </div>

      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </footer>
  );
};
