import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  Package, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { Order } from '../types';

export const OrderTrackPage: React.FC = () => {
  const { orders, findOrder, setActivePage } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(() => orders[0] || null);
  const [searchError, setSearchError] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    if (!searchQuery.trim()) return;

    const found = findOrder(searchQuery.trim());
    if (found) {
      setTrackedOrder(found);
    } else {
      setSearchError(`No order found matching "${searchQuery}". Please verify your Order ID (e.g. RBX-94812) or Roblox Username.`);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
          <Package className="w-3.5 h-3.5" /> LIVE AUTOMATED DISBURSEMENT RADAR
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          TRACK YOUR ROBLOX ORDER
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Enter your Order ID (e.g. RBX-94812) or Roblox Username to monitor live bot status and view digital codes.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Order ID or Roblox Username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12121b] border border-[#272738] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0 shadow-lg shadow-red-950/50"
          >
            Track Order
          </button>
        </div>

        {searchError && (
          <div className="mt-3 p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{searchError}</span>
          </div>
        )}
      </form>

      {/* Tracked Order Details */}
      {trackedOrder && (
        <div className="bg-[#0e0e14] border border-[#20202c] rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1c1c28] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl text-white">
                  Order #{trackedOrder.id}
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  {trackedOrder.paymentStatus.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Placed on {new Date(trackedOrder.createdAt).toLocaleString()} · Recipient: <strong className="text-white">@{trackedOrder.robloxUsername}</strong>
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-[#1c1c28] sm:pl-6">
              <span className="text-xs text-zinc-500 block">Total Amount</span>
              <span className="font-mono font-black text-lg text-white">
                {trackedOrder.currencyUsed === 'INR' ? `₹${trackedOrder.totalInr.toLocaleString('en-IN')}` : `$${trackedOrder.totalUsd.toFixed(2)}`}
              </span>
            </div>
          </div>

          {/* 4-Step Interactive Visual Timeline */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">
              Fulfillment Pipeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {[
                { step: 1, title: 'Payment Submitted', desc: `Via ${trackedOrder.paymentMethod.toUpperCase()}`, done: true },
                { step: 2, title: 'Gateway Verified', desc: 'UTR / Hash confirmed', done: trackedOrder.paymentStatus === 'completed' || trackedOrder.paymentStatus === 'verifying' },
                { step: 3, title: 'Disbursement Bot Active', desc: 'Queue processing', done: trackedOrder.paymentStatus === 'completed' },
                { step: 4, title: 'Delivered & Credited', desc: 'Permanent account credit', done: trackedOrder.deliveryStatus === 'completed' },
              ].map((item) => (
                <div 
                  key={item.step} 
                  className={`p-4 rounded-xl border relative flex flex-col justify-between ${
                    item.done 
                      ? 'bg-[#12121b] border-emerald-500/40 text-white' 
                      : 'bg-[#0a0a0f] border-[#1d1d28] text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-400">Step 0{item.step}</span>
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-zinc-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Code / Voucher Token */}
          {trackedOrder.deliveryCode && (
            <div className="p-4 bg-black/60 rounded-xl border border-red-500/30 space-y-2">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                Your Delivery Voucher / Digital Key:
              </span>
              <div className="flex items-center justify-between gap-3 bg-[#13131c] p-3 rounded-lg border border-[#272738]">
                <code className="font-mono font-black text-sm sm:text-base text-red-400 tracking-wider break-all">
                  {trackedOrder.deliveryCode}
                </code>
                <button
                  onClick={() => handleCopy(trackedOrder.deliveryCode || '')}
                  className="px-3 py-1 text-xs bg-[#1f1f2e] hover:bg-zinc-700 text-white rounded flex items-center gap-1 shrink-0 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCode ? 'Copied' : 'Copy Key'}
                </button>
              </div>
              <p className="text-[10px] text-zinc-500">
                To redeem, navigate to <a href="https://www.roblox.com/redeem" target="_blank" rel="noreferrer" className="text-red-400 underline">roblox.com/redeem</a> or join the private server trade if a gamepass.
              </p>
            </div>
          )}

          {/* Items Summary in Tracked Order */}
          <div className="border-t border-[#1c1c28] pt-6 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-300">
              Ordered Package Items
            </h4>
            <div className="space-y-2">
              {trackedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-[#12121a] border border-[#1e1e2a] text-xs">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={item.image} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded object-cover bg-black shrink-0 border border-zinc-800"
                    />
                    <div>
                      <p className="font-bold text-white">{item.productName}</p>
                      <p className="text-[10px] text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-white">
                    {trackedOrder.currencyUsed === 'INR' ? `₹${item.unitPriceInr * item.quantity}` : `$${(item.unitPriceUsd * item.quantity).toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Need Assistance */}
          <div className="p-4 rounded-xl bg-[#111118] border border-[#1e1e28] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-zinc-400">
              Questions regarding this order? Our live 24/7 gaming support team is active.
            </div>
            <button
              onClick={() => setActivePage('contact')}
              className="px-3.5 py-2 bg-[#1b1b26] hover:bg-[#252536] text-white font-bold rounded-lg border border-[#2e2e42] shrink-0 transition-colors"
            >
              Contact Support
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
