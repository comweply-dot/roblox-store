import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  Coins, 
  CreditCard, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { setActivePage } = useStore();
  const [activeCategory, setActiveCategory] = useState<'all' | 'robux' | 'payment' | 'delivery' | 'security'>('all');

  const faqData = [
    {
      cat: 'security',
      q: 'Will ROBLOX STORE ever ask for my password?',
      a: 'Never. We operate strictly on zero-credential disclosure. We only require your public Roblox username so our automated bot network can locate your account. Never disclose your password or 2FA codes to anyone.'
    },
    {
      cat: 'robux',
      q: 'How are large Robux packages delivered without account access?',
      a: 'We utilize authorized Roblox Developer VIP group disbursement mechanics. Upon payment verification, our disbursement bot initiates an official group payout directly into your player balance. Group payout tax is 100% absorbed by our store, meaning you receive the exact nominal Robux amount purchased.'
    },
    {
      cat: 'payment',
      q: 'How does Indian UPI payment verification work?',
      a: 'When you select India, our dynamic UPI QR code and merchant VPA are displayed with exact INR pricing. Open Google Pay, PhonePe, Paytm, or BHIM to complete the transfer, then copy the 12-digit UTR/Reference number from your app and paste it into the checkout verification field. Verification takes under 60 seconds.'
    },
    {
      cat: 'payment',
      q: 'Which crypto networks are supported for USDT payments?',
      a: 'We support USDT on BNB Smart Chain (BEP20) for minimal gas fees (~$0.08) and Tron (TRC20) for high-speed confirmations. Our system displays distinct receiving addresses for each network. Always verify your network before sending.'
    },
    {
      cat: 'delivery',
      q: 'What is the average fulfillment speed?',
      a: 'Digital Gift Cards and Robux packages are processed in approximately 1 to 3 minutes. In-game item trades (Blox Fruits, MM2, Pet Sim 99) occur via VIP servers within 3 to 5 minutes of payment verification.'
    },
    {
      cat: 'robux',
      q: 'Can my Roblox account get banned or flagged?',
      a: 'No. All Robux and game assets are sourced through legitimate developer programs and certified voucher batches. Over 12,000+ gamers have fulfilled orders with zero bans recorded.'
    },
    {
      cat: 'delivery',
      q: 'How do I redeem my digital gift card code?',
      a: 'Go to roblox.com/redeem, log into your Roblox account, and paste the 16-character alphanumeric key found on your order confirmation page. The balance is credited instantly, along with the monthly free virtual catalog accessory.'
    },
    {
      cat: 'security',
      q: 'What is your refund policy if delivery fails?',
      a: 'We provide an unconditional 100% Money-Back Guarantee. If an item or Robux payout fails to reach your account within 60 minutes of payment confirmation, our support system automatically triggers a full refund or instant replacement.'
    }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqData
    : faqData.filter(f => f.cat === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
          <HelpCircle className="w-3.5 h-3.5" /> KNOWLEDGE BASE & HELP CENTER
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Find answers about our 50% discount pricing, automated payout protocols, payment methods, and account security.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'robux', label: 'Robux Packages' },
          { id: 'payment', label: 'UPI & Crypto Payments' },
          { id: 'delivery', label: 'Delivery & Redemption' },
          { id: 'security', label: 'Safety & Ban Protection' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeCategory === tab.id
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-[#12121a] text-zinc-400 hover:text-white border border-[#222230]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-[#0e0e14] border border-[#20202c] rounded-2xl p-5 text-xs open:border-red-500/40 transition-colors"
          >
            <summary className="font-display font-bold text-white text-sm sm:text-base cursor-pointer list-none flex items-center justify-between">
              <span>{faq.q}</span>
              <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-zinc-300 leading-relaxed border-t border-[#1c1c28] pt-3 text-xs sm:text-sm">
              {faq.a}
            </p>
          </details>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#0e0e14] border border-[#20202c] rounded-2xl p-6 text-center space-y-3">
        <h3 className="font-display font-bold text-white text-base">Still have questions?</h3>
        <p className="text-xs text-zinc-400">Our support engineers are available round the clock.</p>
        <button
          onClick={() => setActivePage('contact')}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-1.5"
        >
          Contact Support Desk <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
