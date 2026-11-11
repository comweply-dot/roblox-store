import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Lock, 
  Zap, 
  Copy, 
  Check, 
  AlertCircle, 
  ArrowRight, 
  QrCode, 
  Smartphone, 
  CreditCard, 
  Wallet,
  ArrowLeft,
  AlertTriangle,
  ExternalLink,
  Coins,
  Download,
  Upload,
  Clock
} from 'lucide-react';
import { PaymentMethod } from '../types';
import { RobuxIcon } from '../components/RobuxIcon';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartTotalUsd, 
    cartSavingsUsd, 
    formatPrice, 
    formatSavings, 
    currency, 
    setCurrency, 
    convertUsdToInr,
    createOrder, 
    storeSettings, 
    updateStoreSettings,
    setActivePage 
  } = useStore();

  // Form Fields
  const [robloxUsername, setRobloxUsername] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<'IN' | 'INTL'>(currency === 'INR' ? 'IN' : 'INTL');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(currency === 'INR' ? 'upi' : 'crypto_bep20');
  const [cryptoNetwork, setCryptoNetwork] = useState<'bep20' | 'trc20'>('bep20');
  
  // Exact Receiving Addresses mandated by user
  const BEP20_ADDRESS = '0x70685190F17B71dFB0DACb802751dEA2dBd5fAFA';
  const TRC20_ADDRESS = 'THDha3vFBE4Lov5McPep6czmtqPsoLuAk5';

  // UPI QR state - using user's uploaded original Indian UPI QR
  const upiQrImageSrc = storeSettings.customUpiQrImage || '/indian_upi_qr.jpg';
  const [upiQrImgError, setUpiQrImgError] = useState(false);

  // Real Crypto QR states - using user's uploaded official BEP20 and TRC20 QR codes
  const bep20QrImageSrc = storeSettings.customBep20QrImage || '/bep20_qr.jpg';
  const trc20QrImageSrc = storeSettings.customTrc20QrImage || '/trc20_qr.jpg';

  // Verification details
  const [transactionRef, setTransactionRef] = useState('');
  const [copiedBep20, setCopiedBep20] = useState(false);
  const [copiedTrc20, setCopiedTrc20] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [orderSubmitMessage, setOrderSubmitMessage] = useState<string | null>(null);

  const handleDownloadUpiQr = () => {
    if (!upiQrImageSrc) return;
    const link = document.createElement('a');
    link.href = upiQrImageSrc;
    link.download = 'Paytm_UPI_QR_Ram_Kailash.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadBep20Qr = () => {
    if (!bep20QrImageSrc) return;
    const link = document.createElement('a');
    link.href = bep20QrImageSrc;
    link.download = 'BEP20_BNB_Smart_Chain_QR.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTrc20Qr = () => {
    if (!trc20QrImageSrc) return;
    const link = document.createElement('a');
    link.href = trc20QrImageSrc;
    link.download = 'TRC20_Tron_QR.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpiQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updateStoreSettings({ customUpiQrImage: reader.result });
          setUpiQrImgError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Direct 3-way payment method switch
  const handleSelectPaymentMethod = (method: 'upi' | 'crypto_bep20' | 'crypto_trc20') => {
    setPaymentMethod(method);
    if (method === 'upi') {
      setSelectedCountry('IN');
      setCurrency('INR');
    } else if (method === 'crypto_bep20') {
      setSelectedCountry('INTL');
      setCryptoNetwork('bep20');
      setCurrency('USD');
    } else if (method === 'crypto_trc20') {
      setSelectedCountry('INTL');
      setCryptoNetwork('trc20');
      setCurrency('USD');
    }
  };

  // Handle Country switch sync with currency & payment defaults
  const handleCountryChange = (country: 'IN' | 'INTL') => {
    setSelectedCountry(country);
    if (country === 'IN') {
      setCurrency('INR');
      setPaymentMethod('upi');
    } else {
      setCurrency('USD');
      setPaymentMethod(cryptoNetwork === 'trc20' ? 'crypto_trc20' : 'crypto_bep20');
    }
  };

  const handleCryptoNetworkSwitch = (net: 'bep20' | 'trc20') => {
    setCryptoNetwork(net);
    setPaymentMethod(net === 'bep20' ? 'crypto_bep20' : 'crypto_trc20');
  };

  const currentTotalInr = convertUsdToInr(cartTotalUsd);
  const currentTotalUsd = cartTotalUsd;

  // Copy helper
  const handleCopy = (text: string, type: 'bep20' | 'trc20' | 'upi') => {
    navigator.clipboard.writeText(text);
    if (type === 'bep20') {
      setCopiedBep20(true);
      setTimeout(() => setCopiedBep20(false), 2000);
    } else if (type === 'trc20') {
      setCopiedTrc20(true);
      setTimeout(() => setCopiedTrc20(false), 2000);
    } else {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display font-black text-2xl text-white">Your Shopping Cart is Empty</h2>
        <p className="text-zinc-400 text-xs">Add Robux packages or game items before checking out.</p>
        <button
          onClick={() => setActivePage('robux')}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg shadow-red-950/50"
        >
          Explore Robux Store
        </button>
      </div>
    );
  }

  // Handle Order Placement & Verification Submission
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Immediately display the exact requested unavailable package message on screen
    setOrderSubmitMessage('Sorry! This package is currently unavailable. Please try another package.');

    // Record alert in background for admin monitoring
    try {
      const existingAlerts = JSON.parse(localStorage.getItem('roblox_store_alerts_v1') || '[]');
      const newAlert = {
        id: `alert-${Date.now()}`,
        createdAt: new Date().toISOString(),
        orderId: `RBX-${Math.floor(10000 + Math.random() * 90000)}`,
        customerUsername: robloxUsername.trim() || 'Customer',
        customerEmail: customerEmail.trim() || 'customer@store.com',
        packageName: cart[0]?.product.name || 'Selected Package',
        amountPaidUsd: currentTotalUsd,
        amountPaidInr: currentTotalInr,
        currencyUsed: currency,
        paymentMethod: paymentMethod,
        transactionRef: transactionRef.trim() || 'N/A',
        status: 'action_required',
        notes: 'Order submit triggered unavailable package notification.'
      };
      localStorage.setItem('roblox_store_alerts_v1', JSON.stringify([newAlert, ...existingAlerts]));
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="min-h-screen bg-theme-payment py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Checkout Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#291745] pb-5 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('robux')}
              className="p-2.5 rounded-xl bg-[#170a2e] hover:bg-[#231045] text-zinc-300 hover:text-white border border-[#351963] transition-colors"
              title="Continue Shopping"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold text-red-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded">
                  ENCRYPTED CHECKOUT
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Instant Automated Delivery
                </span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-0.5">
                PAYMENT & ORDER VERIFICATION
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-[#160a2c] px-3.5 py-2 rounded-xl border border-[#321759]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authorized Buyer Protection Channel</span>
          </div>
        </div>

        <form onSubmit={handleSubmitPayment}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Recipient Info & Dedicated Payment Gateways (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Delivery Information */}
              <div className="bg-[#0f0722]/90 border border-[#2b164f] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#231240] pb-3">
                  <span className="font-display font-bold text-white text-base flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-mono font-bold shadow-md shadow-red-900/50">1</span>
                    Roblox Account & Contact Information
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> No Password Needed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Roblox Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Builderman_Official"
                      value={robloxUsername}
                      onChange={(e) => setRobloxUsername(e.target.value)}
                      className="w-full bg-[#160a2e] border border-[#351963] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors font-mono"
                    />
                    <p className="text-[10px] text-zinc-400 mt-1">
                      Account where Robux or item will be disbursed.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="gamer@gmail.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#160a2e] border border-[#351963] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <p className="text-[10px] text-zinc-400 mt-1">
                      Order invoice & digital backup keys sent here.
                    </p>
                  </div>
                </div>

                {/* Country Selection */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Select Your Billing Region:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleCountryChange('IN')}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        selectedCountry === 'IN'
                          ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg shadow-purple-950/30'
                          : 'bg-[#14082b] border-[#29134a] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs block text-white">India — INR (₹)</span>
                        <span className="text-[10px] text-zinc-400">UPI, PhonePe, Paytm, QR</span>
                      </div>
                      {selectedCountry === 'IN' && <Check className="w-4 h-4 text-purple-400" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCountryChange('INTL')}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        selectedCountry === 'INTL'
                          ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg shadow-purple-950/30'
                          : 'bg-[#14082b] border-[#29134a] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs block text-white">International — USD ($)</span>
                        <span className="text-[10px] text-zinc-400">USDT BEP20 / TRC20, Cards</span>
                      </div>
                      {selectedCountry === 'INTL' && <Check className="w-4 h-4 text-purple-400" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2: Dedicated Payment Gateway Experience */}
              <div className="bg-[#0f0722]/90 border border-[#2b164f] rounded-3xl p-5 sm:p-6 space-y-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#231240] pb-3">
                  <span className="font-display font-bold text-white text-base flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-mono font-bold shadow-md shadow-red-900/50">2</span>
                    Payment Method
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-400">
                    {paymentMethod === 'upi' ? 'INDIA UPI GATEWAY' : paymentMethod === 'crypto_bep20' ? 'BNB SMART CHAIN (BEP20)' : 'TRON NETWORK (TRC20)'}
                  </span>
                </div>

                {/* PAYMENT INSTRUCTIONS CALLOUT */}
                <div className="p-4 rounded-2xl bg-[#14072b] border border-[#32175c] space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 font-mono flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-400" /> Payment & Verification Instructions:
                  </span>
                  <ol className="space-y-1.5 text-xs text-zinc-300 list-decimal list-inside leading-relaxed">
                    <li><strong className="text-white">Select your payment network</strong> below (UPI, BEP20 or TRC20).</li>
                    <li><strong className="text-white">Scan the QR code to pay</strong> or copy the exact receiving address.</li>
                    <li><strong className="text-white">Send the exact requested amount</strong> ({paymentMethod === 'upi' ? `₹${currentTotalInr.toLocaleString('en-IN')}` : `${currentTotalUsd.toFixed(2)} USDT`}).</li>
                    <li><strong className="text-white">Enter your transaction ID</strong> (UTR for UPI or TxHash for Crypto).</li>
                    <li><strong className="text-white">Submit payment details</strong> for automated verification.</li>
                    <li><strong className="text-emerald-400">Payment verification will be completed before order confirmation</strong>.</li>
                  </ol>
                </div>

                {/* THREE SEPARATE PAYMENT METHODS SELECTOR */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Choose Your Payment Method:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Method 1: India UPI */}
                    <button
                      type="button"
                      onClick={() => handleSelectPaymentMethod('upi')}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        paymentMethod === 'upi'
                          ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-400/50'
                          : 'bg-[#150a2e] border-[#2e1752] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">1. India UPI</span>
                          <span className="text-[10px] text-zinc-400 block font-mono">PhonePe · GPay · Paytm</span>
                        </div>
                      </div>
                    </button>

                    {/* Method 2: BEP20 – BNB Smart Chain */}
                    <button
                      type="button"
                      onClick={() => handleSelectPaymentMethod('crypto_bep20')}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        paymentMethod === 'crypto_bep20'
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/50'
                          : 'bg-[#150a2e] border-[#2e1752] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 font-black text-xs flex items-center justify-center shrink-0">
                          ◆
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">2. BEP20 – BNB Chain</span>
                          <span className="text-[10px] text-zinc-400 block font-mono">USDT · Low Gas Fees</span>
                        </div>
                      </div>
                    </button>

                    {/* Method 3: TRC20 – Tron */}
                    <button
                      type="button"
                      onClick={() => handleSelectPaymentMethod('crypto_trc20')}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        paymentMethod === 'crypto_trc20'
                          ? 'bg-red-500/15 border-red-500 text-white shadow-lg shadow-red-950/40 ring-1 ring-red-400/50'
                          : 'bg-[#150a2e] border-[#2e1752] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-red-600/20 text-red-500 font-black text-xs flex items-center justify-center shrink-0">
                          ▲
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">3. TRC20 – Tron</span>
                          <span className="text-[10px] text-zinc-400 block font-mono">USDT · 30s Fast Speed</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* PAYMENT GATEWAY 1: INDIA UPI PAYMENT                           */}
                {/* ============================================================== */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="bg-[#14082b] border border-[#351963] rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl">
                      
                      {/* Top UPI Header Bar */}
                      <div className="flex items-center justify-between border-b border-[#241344] pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-white text-base">
                              India UPI Payment
                            </h4>
                            <p className="text-[11px] text-zinc-400">
                              Instant direct bank transfer via PhonePe, Google Pay, Paytm & BHIM
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-zinc-400 block font-mono">Payable Amount</span>
                          <span className="font-mono font-black text-base text-emerald-400">
                            ₹{currentTotalInr.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Main QR Payment Box */}
                      <div className="bg-[#0b0416] border border-[#2e1752] rounded-2xl p-5 sm:p-6 space-y-4">
                        
                        {/* Heading: Scan QR to Pay */}
                        <div className="text-center space-y-1">
                          <h3 className="font-display font-black text-white text-xl sm:text-2xl tracking-wide flex items-center justify-center gap-2">
                            <QrCode className="w-6 h-6 text-emerald-400" />
                            Scan QR to Pay
                          </h3>
                          <p className="text-xs text-zinc-300 max-w-md mx-auto">
                            Scan this official UPI QR code with any UPI app to transfer exact amount of <span className="font-mono font-bold text-emerald-400 text-sm">₹{currentTotalInr.toLocaleString('en-IN')}</span>.
                          </p>
                        </div>

                        {/* Large, Clear and Scannable QR Container */}
                        <div className="flex flex-col items-center justify-center py-2">
                          <div className="relative group w-full max-w-xs sm:max-w-sm">
                            <div className="bg-white rounded-3xl p-3 sm:p-3.5 shadow-2xl shadow-emerald-950/60 border-4 border-emerald-500/80 overflow-hidden">
                              <img 
                                src={upiQrImageSrc} 
                                alt="Official India UPI Payment QR Code - Scan QR to Pay" 
                                onError={() => setUpiQrImgError(true)}
                                className="w-full h-auto object-contain rounded-2xl select-none"
                              />
                            </div>
                            
                            <div className="mt-3 text-center">
                              <span className="text-[11px] text-emerald-300 font-mono font-semibold block">
                                Payee: {storeSettings.upiMerchantName || 'Ram Kailash'}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-mono">
                                Scan with any UPI app · Paytm · PhonePe · Google Pay · BHIM
                              </span>
                            </div>
                          </div>

                          {/* Action Button: Download QR */}
                          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                            <button
                              type="button"
                              onClick={handleDownloadUpiQr}
                              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-emerald-950/60 flex items-center gap-2 cursor-pointer"
                            >
                              <Download className="w-4 h-4" /> Download QR
                            </button>
                          </div>
                        </div>

                        {/* UPI VPA Details & Copy */}
                        <div className="pt-3 border-t border-[#220e3d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-[#120726] p-3.5 rounded-xl">
                          <div>
                            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                              UPI ID / VPA:
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <code className="font-mono font-bold text-white text-sm">
                                {storeSettings.upiId}
                              </code>
                              <button
                                type="button"
                                onClick={() => handleCopy(storeSettings.upiId, 'upi')}
                                className="px-2.5 py-1 text-[11px] bg-[#241045] hover:bg-purple-800 text-zinc-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                {copiedUpi ? 'Copied' : 'Copy UPI ID'}
                              </button>
                            </div>
                          </div>

                          <div className="text-right sm:text-right w-full sm:w-auto">
                            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                              Payee Name:
                            </span>
                            <span className="font-bold text-zinc-200 text-xs">
                              {storeSettings.upiMerchantName || 'Ram Kailash'}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* 12-digit UTR Input */}
                      <div className="space-y-1.5 pt-1">
                        <label className="block text-xs font-semibold text-zinc-200">
                          Enter 12-Digit UPI UTR / Reference Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 428190382910 (12 digits)"
                          value={transactionRef}
                          onChange={(e) => setTransactionRef(e.target.value)}
                          className="w-full bg-[#160a2e] border border-[#351963] rounded-xl px-3.5 py-3 text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                        <div className="flex items-center justify-between text-[10px] text-zinc-400">
                          <span>Found in your Google Pay, PhonePe, Paytm or BHIM receipt right after paying.</span>
                          <span className="text-amber-400 font-mono">Manual Verification Required</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* PAYMENT GATEWAY 2: BEP20 – BNB SMART CHAIN                     */}
                {/* ============================================================== */}
                {paymentMethod === 'crypto_bep20' && (
                  <div className="space-y-4">
                    <div className="bg-[#14082b] border-2 border-amber-400/40 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl">
                      
                      {/* Top BEP20 Header Bar */}
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold">
                            ◆
                          </div>
                          <div>
                            <h3 className="font-display font-black text-white text-base">
                              BEP20 – BNB Smart Chain
                            </h3>
                            <p className="text-[11px] text-amber-300/80 font-mono">
                              Stablecoin Asset: USDT (BEP20)
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-zinc-400 block font-mono">Amount to Send</span>
                          <span className="font-mono font-black text-base text-amber-400">
                            {currentTotalUsd.toFixed(2)} USDT
                          </span>
                        </div>
                      </div>

                      {/* Network Warning */}
                      <div className="p-3 bg-amber-950/50 border border-amber-500/40 rounded-xl text-xs text-amber-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Network Warning:</strong> Only transfer <strong>USDT via BEP20 (BNB Smart Chain)</strong> to this address. Sending tokens from any other network will cause permanent loss.
                        </span>
                      </div>

                      {/* Main QR Payment Box */}
                      <div className="bg-[#0b0416] border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
                        
                        {/* Heading: Scan QR to Pay */}
                        <div className="text-center space-y-1">
                          <h3 className="font-display font-black text-white text-xl sm:text-2xl tracking-wide flex items-center justify-center gap-2">
                            <QrCode className="w-6 h-6 text-amber-400" />
                            Scan QR to Pay
                          </h3>
                          <p className="text-xs text-zinc-300 max-w-md mx-auto">
                            Scan this official BEP20 QR code with Binance, Trust Wallet, MetaMask, or any crypto wallet to transfer exact amount of <span className="font-mono font-bold text-amber-400 text-sm">{currentTotalUsd.toFixed(2)} USDT</span>.
                          </p>
                        </div>

                        {/* Large, Clear and Scannable QR Container */}
                        <div className="flex flex-col items-center justify-center py-2">
                          <div className="relative group w-full max-w-xs sm:max-w-sm">
                            <div className="bg-white rounded-3xl p-3 sm:p-3.5 shadow-2xl shadow-amber-950/60 border-4 border-amber-400/80 overflow-hidden">
                              <img 
                                src={bep20QrImageSrc} 
                                alt="Official BEP20 BNB Smart Chain Payment QR Code - Scan QR to Pay" 
                                className="w-full h-auto object-contain rounded-2xl select-none"
                              />
                            </div>
                            
                            <div className="mt-3 text-center">
                              <span className="text-[11px] text-amber-300 font-mono font-semibold block">
                                Network: BNB Smart Chain (BEP20) · Token: USDT
                              </span>
                              <span className="text-[10px] text-zinc-400 font-mono">
                                Scan with Binance · Trust Wallet · MetaMask · OKX
                              </span>
                            </div>
                          </div>

                          {/* Action Button: Download QR */}
                          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                            <button
                              type="button"
                              onClick={handleDownloadBep20Qr}
                              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-amber-950/60 flex items-center gap-2 cursor-pointer"
                            >
                              <Download className="w-4 h-4" /> Download QR
                            </button>
                          </div>
                        </div>

                        {/* Wallet Address Details & Copy */}
                        <div className="pt-3 border-t border-[#220e3d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-[#120726] p-3.5 rounded-xl">
                          <div className="min-w-0 w-full sm:w-auto">
                            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                              BEP20 Receiving Wallet Address (BNB Smart Chain):
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <code className="font-mono font-bold text-amber-200 text-xs sm:text-sm break-all select-all">
                                {BEP20_ADDRESS}
                              </code>
                              <button
                                type="button"
                                onClick={() => handleCopy(BEP20_ADDRESS, 'bep20')}
                                className="px-3 py-1.5 text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg flex items-center gap-1 transition-colors cursor-pointer shrink-0 font-bold"
                              >
                                {copiedBep20 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                {copiedBep20 ? 'Copied' : 'Copy Address'}
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-zinc-400 leading-relaxed text-center sm:text-left">
                          Copy this wallet address or scan the QR code into your crypto wallet (Binance, Trust Wallet, MetaMask, etc.) and transfer exactly <strong className="text-amber-300">{currentTotalUsd.toFixed(2)} USDT</strong>.
                        </p>

                      </div>

                      {/* Transaction Hash Input */}
                      <div className="space-y-1.5 pt-1">
                        <label className="block text-xs font-semibold text-zinc-200">
                          Enter Transaction Hash / ID (TxHash) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 0x3f8a... (BSC transaction hash)"
                          value={transactionRef}
                          onChange={(e) => setTransactionRef(e.target.value)}
                          className="w-full bg-[#160a2e] border border-[#351963] rounded-xl px-3.5 py-3 text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-amber-400 transition-colors"
                        />
                        <p className="text-[10px] text-zinc-400">
                          Found in your Binance or wallet withdrawal history right after transferring.
                        </p>
                      </div>

                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* PAYMENT GATEWAY 3: TRC20 – TRON                                */}
                {/* ============================================================== */}
                {paymentMethod === 'crypto_trc20' && (
                  <div className="space-y-4">
                    <div className="bg-[#14082b] border-2 border-red-500/40 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl">
                      
                      {/* Top TRC20 Header Bar */}
                      <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 font-bold">
                            ▲
                          </div>
                          <div>
                            <h3 className="font-display font-black text-white text-base">
                              TRC20 – Tron
                            </h3>
                            <p className="text-[11px] text-red-300/80 font-mono">
                              Stablecoin Asset: USDT (TRC20)
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-zinc-400 block font-mono">Amount to Send</span>
                          <span className="font-mono font-black text-base text-red-400">
                            {currentTotalUsd.toFixed(2)} USDT
                          </span>
                        </div>
                      </div>

                      {/* Network Warning */}
                      <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-xs text-red-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Network Warning:</strong> Only transfer <strong>USDT via TRC20 (Tron Network)</strong> to this address. Sending tokens from any other network will cause permanent loss.
                        </span>
                      </div>

                      {/* Main QR Payment Box */}
                      <div className="bg-[#0b0416] border border-red-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
                        
                        {/* Heading: Scan QR to Pay */}
                        <div className="text-center space-y-1">
                          <h3 className="font-display font-black text-white text-xl sm:text-2xl tracking-wide flex items-center justify-center gap-2">
                            <QrCode className="w-6 h-6 text-red-400" />
                            Scan QR to Pay
                          </h3>
                          <p className="text-xs text-zinc-300 max-w-md mx-auto">
                            Scan this official TRC20 QR code with TronLink, Binance, OKX, Trust Wallet or any Tron wallet to transfer exact amount of <span className="font-mono font-bold text-red-400 text-sm">{currentTotalUsd.toFixed(2)} USDT</span>.
                          </p>
                        </div>

                        {/* Large, Clear and Scannable QR Container */}
                        <div className="flex flex-col items-center justify-center py-2">
                          <div className="relative group w-full max-w-xs sm:max-w-sm">
                            <div className="bg-white rounded-3xl p-3 sm:p-3.5 shadow-2xl shadow-red-950/60 border-4 border-red-500/80 overflow-hidden">
                              <img 
                                src={trc20QrImageSrc} 
                                alt="Official TRC20 Tron Payment QR Code - Scan QR to Pay" 
                                className="w-full h-auto object-contain rounded-2xl select-none"
                              />
                            </div>
                            
                            <div className="mt-3 text-center">
                              <span className="text-[11px] text-red-300 font-mono font-semibold block">
                                Network: Tron (TRC20) · Token: USDT
                              </span>
                              <span className="text-[10px] text-zinc-400 font-mono">
                                Scan with TronLink · Binance · OKX · Trust Wallet · Bybit
                              </span>
                            </div>
                          </div>

                          {/* Action Button: Download QR */}
                          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                            <button
                              type="button"
                              onClick={handleDownloadTrc20Qr}
                              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-red-950/60 flex items-center gap-2 cursor-pointer"
                            >
                              <Download className="w-4 h-4" /> Download QR
                            </button>
                          </div>
                        </div>

                        {/* Wallet Address Details & Copy */}
                        <div className="pt-3 border-t border-[#220e3d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-[#120726] p-3.5 rounded-xl">
                          <div className="min-w-0 w-full sm:w-auto">
                            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                              TRC20 Receiving Wallet Address (Tron):
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <code className="font-mono font-bold text-red-200 text-xs sm:text-sm break-all select-all">
                                {TRC20_ADDRESS}
                              </code>
                              <button
                                type="button"
                                onClick={() => handleCopy(TRC20_ADDRESS, 'trc20')}
                                className="px-3 py-1.5 text-xs bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded-lg flex items-center gap-1 transition-colors cursor-pointer shrink-0 font-bold"
                              >
                                {copiedTrc20 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                {copiedTrc20 ? 'Copied' : 'Copy Address'}
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-zinc-400 leading-relaxed text-center sm:text-left">
                          Copy this wallet address or scan the QR code into your crypto wallet (TronLink, Binance, OKX, Trust Wallet, etc.) and transfer exactly <strong className="text-red-300">{currentTotalUsd.toFixed(2)} USDT</strong>.
                        </p>

                      </div>

                      {/* Transaction Hash Input */}
                      <div className="space-y-1.5 pt-1">
                        <label className="block text-xs font-semibold text-zinc-200">
                          Enter Transaction Hash / ID (TxHash) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 64-character Tron transaction ID"
                          value={transactionRef}
                          onChange={(e) => setTransactionRef(e.target.value)}
                          className="w-full bg-[#160a2e] border border-[#351963] rounded-xl px-3.5 py-3 text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-red-500 transition-colors"
                        />
                        <p className="text-[10px] text-zinc-400">
                          Found in your TronLink or wallet withdrawal history right after transferring.
                        </p>
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Error Message */}
              {validationError && (
                <div className="p-3.5 bg-red-950/70 border border-red-500/50 rounded-2xl flex items-center gap-2 text-xs text-red-200 shadow-lg">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

            </div>

            {/* Right Column: Order Summary & Pay Button (5 cols) */}
            <div className="lg:col-span-5 bg-[#0f0722]/90 border border-[#2b164f] rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl backdrop-blur-md sticky top-24">
              <h3 className="font-display font-bold text-white text-base border-b border-[#231240] pb-3 flex items-center justify-between">
                <span>Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-xs font-mono text-purple-400 bg-[#170a2e] px-2 py-0.5 rounded border border-[#351963]">
                  50% DISCOUNT
                </span>
              </h3>

              {/* Itemized List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between text-xs gap-3 p-2 rounded-xl bg-[#14082b] border border-[#281347]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img 
                        src={item.product.image} 
                        alt="" 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover bg-black shrink-0 border border-purple-500/20"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          {item.product.robuxAmount && <RobuxIcon size="xs" />}
                          <p className="font-bold text-white truncate">{item.product.name}</p>
                        </div>
                        <p className="text-[11px] text-zinc-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-white">
                        {formatPrice(item.product.salePriceUsd * item.quantity)}
                      </span>
                      {item.product.isDiscounted && (
                        <span className="block text-[10px] font-mono text-zinc-500 line-through">
                          {formatPrice(item.product.originalPriceUsd * item.quantity)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculations Breakdown */}
              <div className="border-t border-[#231240] pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Original Catalog Retail:</span>
                  <span className="font-mono line-through">{formatPrice(cartTotalUsd + cartSavingsUsd)}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>50% Promotional Discount:</span>
                  <span className="font-mono">-{formatSavings(cartTotalUsd + cartSavingsUsd, cartTotalUsd)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Automated Delivery Fee:</span>
                  <span className="text-emerald-400 font-mono font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-baseline text-white font-extrabold text-base pt-3 border-t border-[#231240]">
                  <span>Total Amount Due:</span>
                  <div className="text-right">
                    <span className="font-display text-xl sm:text-2xl text-white font-mono tabular-nums block">
                      {formatPrice(cartTotalUsd)}
                    </span>
                    {paymentMethod === 'upi' ? (
                      <span className="text-[11px] text-emerald-400 font-mono font-bold">
                        Exact: ₹{currentTotalInr.toLocaleString('en-IN')} INR
                      </span>
                    ) : paymentMethod === 'crypto_bep20' ? (
                      <span className="text-[11px] text-amber-300 font-mono font-bold">
                        Exact: {currentTotalUsd.toFixed(2)} USDT (BEP20)
                      </span>
                    ) : (
                      <span className="text-[11px] text-red-400 font-mono font-bold">
                        Exact: {currentTotalUsd.toFixed(2)} USDT (TRC20)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Submit Unavailable Package Message Alert */}
              {orderSubmitMessage && (
                <div className="p-4 sm:p-5 rounded-2xl bg-red-950/95 border-2 border-red-500 text-white shadow-2xl shadow-red-950/80 flex items-start gap-3.5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-8 h-8 rounded-xl bg-red-600/30 border border-red-500/50 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-display font-black text-sm sm:text-base text-white tracking-wide leading-snug">
                      {orderSubmitMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Order Submit Action Button */}
              <button
                type="submit"
                onClick={() => {
                  setOrderSubmitMessage('Sorry! This package is currently unavailable. Please try another package.');
                }}
                className="w-full py-4 px-4 rounded-2xl font-display font-black text-sm uppercase tracking-wider bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-xl shadow-red-950/70 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                Order Submit <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Footer */}
              <div className="space-y-1.5 text-[11px] text-zinc-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Money-Back Guarantee if undelivered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-purple-400" />
                  <span>Never requests passwords or private keys</span>
                </div>
              </div>

            </div>

          </div>
        </form>

      </div>

      {/* Immediate On-Screen Unavailable Package Dialog */}
      {orderSubmitMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#120722] border-2 border-red-500 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-5 shadow-2xl shadow-red-950/80">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border-2 border-red-500/50 text-red-400 mx-auto flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight leading-snug">
                {orderSubmitMessage}
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setOrderSubmitMessage(null);
                  setActivePage('robux');
                }}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-950/60 cursor-pointer"
              >
                Browse Other Packages
              </button>
              <button
                type="button"
                onClick={() => setOrderSubmitMessage(null)}
                className="px-5 py-3 bg-[#1e0f3d] hover:bg-[#2b1654] text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-purple-800/40 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
