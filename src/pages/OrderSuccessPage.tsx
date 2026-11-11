import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Package, 
  ArrowRight, 
  ShieldCheck, 
  Printer, 
  AlertTriangle,
  RefreshCw,
  CreditCard,
  Send,
  HelpCircle,
  Home,
  CheckCircle,
  Clock
} from 'lucide-react';
import { RobuxIcon } from '../components/RobuxIcon';
import { Product } from '../types';

export const OrderSuccessPage: React.FC = () => {
  const { 
    currentOrder, 
    setActivePage, 
    formatPrice, 
    products, 
    t, 
    language,
    requestOrderRefund,
    switchOrderPackage
  } = useStore();

  const [copiedCode, setCopiedCode] = useState(false);
  const [activeResolutionTab, setActiveResolutionTab] = useState<'refund' | 'switch'>('refund');
  
  // Refund form state
  const [refundMethod, setRefundMethod] = useState<'upi' | 'crypto'>(currentOrder?.country === 'IN' ? 'upi' : 'crypto');
  const [refundAddress, setRefundAddress] = useState('');
  const [refundSubmitted, setRefundSubmitted] = useState(currentOrder?.resolutionStatus === 'refund_requested');

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display font-black text-2xl text-white">No Active Order Found</h2>
        <button
          onClick={() => setActivePage('robux')}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase rounded-xl transition-colors cursor-pointer"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundAddress.trim()) return;

    requestOrderRefund(currentOrder.id, {
      method: refundMethod,
      destinationAddress: refundAddress.trim(),
      requestedAt: new Date().toISOString()
    });
    setRefundSubmitted(true);
  };

  const handleSelectAlternativePackage = (pkg: Product) => {
    switchOrderPackage(currentOrder.id, pkg);
  };

  // Filter genuinely available packages
  const availablePackages = products
    .filter(p => p.inStock && p.stockCount > 0 && p.id !== currentOrder.items[0]?.productId)
    .slice(0, 4);

  // ==============================================================
  // 1. ORDER NOTIFICATION: PACKAGE UNAVAILABLE SCREEN
  // ==============================================================
  if (currentOrder.isPackageUnavailable) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
        
        {/* Package Unavailable Hero Notification Callout */}
        <div className="bg-[#100722] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 text-center space-y-4 relative overflow-hidden shadow-2xl shadow-amber-950/40">
          
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400/50 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-amber-950/50">
            <AlertTriangle className="w-8 h-8" />
          </div>
          
          {/* Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-mono font-black uppercase tracking-wider">
              {t('packageUnavailableStatus')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {t('paymentReceivedReview')}
            </span>
          </div>

          {/* EXACT MANDATED MESSAGE */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug">
              {t('sorryUnavailable')}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {t('resolutionNotice')}
            </p>
          </div>

          {/* Order Snapshot Info */}
          <div className="max-w-xl mx-auto bg-[#090317] p-3.5 rounded-2xl border border-purple-900/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-left">
            <div>
              <span className="text-[10px] text-zinc-500 font-mono uppercase block">Order ID</span>
              <span className="font-mono font-bold text-white text-xs">{currentOrder.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 font-mono uppercase block">Username</span>
              <span className="font-mono font-bold text-red-400 text-xs truncate block">@{currentOrder.robloxUsername}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 font-mono uppercase block">Amount Paid</span>
              <span className="font-mono font-bold text-emerald-400 text-xs">
                {currentOrder.currencyUsed === 'INR' ? `₹${currentOrder.totalInr.toLocaleString('en-IN')}` : `$${currentOrder.totalUsd.toFixed(2)}`}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 font-mono uppercase block">Tx / UTR</span>
              <span className="font-mono text-zinc-300 text-xs truncate block">{currentOrder.transactionRef || 'Recorded'}</span>
            </div>
          </div>

          {/* Primary Action Buttons: Browse Other Packages & Back to Store */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActivePage('robux')}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-950/60 flex items-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4" /> {t('browseOtherPackages')}
            </button>
            <button
              onClick={() => setActivePage('home')}
              className="px-5 py-3 bg-[#180e2f] hover:bg-[#251547] text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-purple-800/40 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" /> {t('backToStore')}
            </button>
          </div>

        </div>

        {/* Customer Resolution Center: Refund or Switch Package */}
        <div className="bg-[#0f0722]/90 border border-purple-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-purple-900/30 gap-3">
            <div>
              <h2 className="font-display font-black text-xl text-white">
                Customer Resolution Options
              </h2>
              <p className="text-xs text-zinc-400">
                Choose whether you would like an instant full refund or wish to swap this balance to an available alternative package.
              </p>
            </div>

            {/* Resolution Mode Switcher */}
            <div className="flex items-center bg-[#150a2e] p-1 rounded-xl border border-purple-900/40 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveResolutionTab('refund')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeResolutionTab === 'refund'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                100% Full Refund
              </button>
              <button
                type="button"
                onClick={() => setActiveResolutionTab('switch')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeResolutionTab === 'switch'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Switch Package
              </button>
            </div>
          </div>

          {/* TAB 1: REFUND FORM */}
          {activeResolutionTab === 'refund' && (
            <div className="space-y-4 max-w-xl">
              {refundSubmitted || currentOrder.resolutionStatus === 'refund_requested' ? (
                <div className="p-5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    Refund Request Confirmed & Dispatched to Merchant
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    {t('refundSuccessNotice')}
                  </p>
                  <div className="pt-2 font-mono text-[11px] text-emerald-200">
                    Payout Destination: <strong>{currentOrder.refundDetails?.destinationAddress || refundAddress}</strong> ({currentOrder.refundDetails?.method?.toUpperCase() || refundMethod.toUpperCase()})
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRefundSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1.5">
                      Select Payout Method:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRefundMethod('upi')}
                        className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                          refundMethod === 'upi'
                            ? 'bg-purple-950/60 border-purple-500 text-white'
                            : 'bg-[#150a2e] border-[#29134a] text-zinc-400'
                        }`}
                      >
                        Indian UPI (VPA / PhonePe / GPay)
                      </button>
                      <button
                        type="button"
                        onClick={() => setRefundMethod('crypto')}
                        className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                          refundMethod === 'crypto'
                            ? 'bg-purple-950/60 border-purple-500 text-white'
                            : 'bg-[#150a2e] border-[#29134a] text-zinc-400'
                        }`}
                      >
                        USDT Crypto (BEP20 / TRC20)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1.5">
                      {refundMethod === 'upi' ? 'Your UPI ID / VPA' : 'Your USDT Receiving Wallet Address'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={refundMethod === 'upi' ? 'e.g. yourname@okhdfcbank or 9876543210@paytm' : 'e.g. 0x... or T... (USDT address)'}
                      value={refundAddress}
                      onChange={(e) => setRefundAddress(e.target.value)}
                      className="w-full bg-[#150a2e] border border-purple-900/50 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
                    />
                    <p className="text-[10px] text-zinc-400 mt-1">
                      Full paid amount ({currentOrder.currencyUsed === 'INR' ? `₹${currentOrder.totalInr.toLocaleString('en-IN')}` : `$${currentOrder.totalUsd.toFixed(2)} USD`}) will be returned with zero deductions.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-950/50 flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Full Refund Request
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: SWITCH PACKAGE */}
          {activeResolutionTab === 'switch' && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-300">
                You can apply your paid balance of <strong>{currentOrder.currencyUsed === 'INR' ? `₹${currentOrder.totalInr.toLocaleString('en-IN')}` : `$${currentOrder.totalUsd.toFixed(2)}`}</strong> directly toward any in-stock package below:
              </p>

              {currentOrder.resolutionStatus === 'package_switched' ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-xs text-emerald-200">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Package Successfully Switched to: {currentOrder.switchedPackageName}
                  </div>
                  <p className="mt-1 text-zinc-300">
                    {t('switchSuccessNotice')}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {availablePackages.map(pkg => (
                    <div 
                      key={pkg.id} 
                      className="p-4 bg-[#14082b] border border-purple-900/40 rounded-2xl flex items-center justify-between gap-3 hover:border-purple-500/60 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img 
                          src={pkg.image} 
                          alt="" 
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover bg-black shrink-0 border border-purple-900/40"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-xs truncate">{pkg.name}</h4>
                          <span className="font-mono text-emerald-400 text-xs font-extrabold">
                            {formatPrice(pkg.salePriceUsd)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectAlternativePackage(pkg)}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-[11px] font-bold rounded-lg shrink-0 transition-colors cursor-pointer"
                      >
                        Switch to This
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section: Show other genuinely available packages */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-black text-xl text-white">
                {t('showOtherAvailable')}
              </h3>
              <p className="text-xs text-zinc-400">
                These packages are in-stock with instant delivery capability.
              </p>
            </div>
            <button
              onClick={() => setActivePage('robux')}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
            >
              Browse All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {availablePackages.map(pkg => (
              <div
                key={pkg.id}
                onClick={() => setActivePage('robux')}
                className="bg-[#0e071e]/90 hover:bg-[#140b2a] rounded-2xl border border-purple-900/40 p-4 space-y-3 cursor-pointer group transition-all"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-purple-900/40">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono font-bold">
                    {pkg.robuxAmount && <RobuxIcon size="xs" />}
                    <span>{pkg.robuxAmount ? `${pkg.robuxAmount.toLocaleString()} R$` : pkg.category.toUpperCase()}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs mt-0.5 line-clamp-1">{pkg.name}</h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-purple-900/30">
                    <span className="font-mono font-bold text-white text-xs">{formatPrice(pkg.salePriceUsd)}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // ==============================================================
  // 2. STANDARD ORDER SUCCESS (FOR GENUINELY AVAILABLE PACKAGES)
  // ==============================================================
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Success Hero Callout */}
      <div className="bg-[#0e071e] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          {currentOrder.paymentStatus === 'completed'
            ? 'PAYMENT VERIFIED & ORDER CONFIRMED'
            : 'PAYMENT DETAILS SUBMITTED FOR VERIFICATION'}
        </div>

        <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
          {currentOrder.paymentStatus === 'completed'
            ? 'Thank You! Your Order is Being Fulfilled'
            : 'Order Request Registered! Verification in Progress'}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
          We have registered your payment of <strong>{currentOrder.currencyUsed === 'INR' ? `₹${currentOrder.totalInr.toLocaleString('en-IN')}` : `$${currentOrder.totalUsd.toFixed(2)}`}</strong>.
          {currentOrder.paymentStatus === 'completed' 
            ? ' Coins or keys are now dispatched to your Roblox account.'
            : ' Our verification bot is cross-referencing your transaction ID.'}
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActivePage('track')}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Package className="w-4 h-4" /> Live Tracking
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#181824] hover:bg-[#222234] text-zinc-300 font-bold text-xs rounded-xl border border-[#2b2b3d] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
        </div>
      </div>

      {/* Order Summary & Digital Fulfillment Code Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Fulfillment Voucher / Code / Bot Status (7 cols) */}
        <div className="md:col-span-7 bg-[#0e071e] border border-purple-900/30 rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-purple-900/20 pb-3">
            <span className="font-display font-bold text-white text-base">
              Digital Fulfillment & Key
            </span>
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
              currentOrder.paymentStatus === 'completed'
                ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/20'
                : 'text-amber-400 bg-amber-950/60 border-amber-500/20'
            }`}>
              STATUS: {currentOrder.paymentStatus === 'completed' ? 'COMPLETED' : 'VERIFYING'}
            </span>
          </div>

          {/* Delivery Code Display */}
          {currentOrder.deliveryCode && (
            <div className="p-4 bg-black/60 rounded-xl border border-red-500/30 space-y-2">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                Official Redemption Voucher / Delivery Token:
              </span>
              <div className="flex items-center justify-between gap-2 bg-[#12121a] p-2.5 rounded-lg border border-[#28283a]">
                <code className="font-mono font-black text-sm sm:text-base text-red-400 tracking-wider break-all">
                  {currentOrder.deliveryCode}
                </code>
                <button
                  onClick={() => handleCopyCode(currentOrder.deliveryCode || '')}
                  className="px-2.5 py-1 text-xs bg-[#1f1f2e] hover:bg-zinc-700 text-white rounded flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCode ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-[10px] text-zinc-500">
                Redeem at <strong>roblox.com/redeem</strong> or wait for automated player group payout.
              </p>
            </div>
          )}

          {/* Recipient Details Breakdown */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-purple-900/20">
              <span className="text-zinc-400">Order Reference ID:</span>
              <span className="font-mono font-bold text-white">{currentOrder.id}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-purple-900/20">
              <span className="text-zinc-400">Target Roblox Username:</span>
              <span className="font-mono font-bold text-red-400">@{currentOrder.robloxUsername}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-purple-900/20">
              <span className="text-zinc-400">Confirmation Sent To:</span>
              <span className="font-mono text-zinc-200">{currentOrder.customerEmail}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-purple-900/20">
              <span className="text-zinc-400">Payment Channel:</span>
              <span className="font-mono uppercase text-zinc-300">{currentOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-400">Transaction UTR / TxHash:</span>
              <span className="font-mono text-zinc-300 truncate max-w-[200px]">{currentOrder.transactionRef || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Purchased Items (5 cols) */}
        <div className="md:col-span-5 bg-[#0e071e] border border-purple-900/30 rounded-3xl p-6 space-y-4">
          <h3 className="font-display font-bold text-white text-base border-b border-purple-900/20 pb-3">
            Purchased Products
          </h3>

          <div className="space-y-3">
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs gap-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover bg-black border border-purple-900/40 shrink-0"
                  />
                  <div>
                    <p className="font-bold text-white line-clamp-1">{item.productName}</p>
                    <p className="text-[11px] text-zinc-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-white shrink-0">
                  {currentOrder.currencyUsed === 'INR' ? `₹${item.unitPriceInr * item.quantity}` : `$${(item.unitPriceUsd * item.quantity).toFixed(2)}`}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-purple-900/20 pt-3 text-xs space-y-1">
            <div className="flex justify-between text-zinc-400">
              <span>Paid Total:</span>
              <span className="font-mono font-bold text-white text-sm">
                {currentOrder.currencyUsed === 'INR' ? `₹${currentOrder.totalInr.toLocaleString('en-IN')}` : `$${currentOrder.totalUsd.toFixed(2)}`}
              </span>
            </div>
            <p className="text-[10px] text-emerald-400 font-semibold pt-1">
              ✓ Verified 50% discount savings applied
            </p>
          </div>

          <button
            onClick={() => setActivePage('robux')}
            className="w-full mt-4 py-2.5 px-3 bg-[#180e2f] hover:bg-[#251547] text-zinc-200 text-xs font-bold rounded-xl border border-purple-900/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
