import React from 'react';
import { useStore, PageId } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { RobuxIcon } from '../components/RobuxIcon';
import { 
  Zap, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  HelpCircle,
  Shirt,
  CreditCard,
  Sword,
  Crown,
  ChevronDown,
  Headphones,
  CheckCircle2,
  Lock,
  Smartphone,
  Wallet
} from 'lucide-react';
import { 
  HERO_IMAGE, 
  ROBUX_CATEGORY_IMAGE, 
  SKINS_CATEGORY_IMAGE, 
  GIFTCARDS_CATEGORY_IMAGE, 
  GAMEITEMS_CATEGORY_IMAGE,
  ROBUX_OFFICIAL_EMBLEM,
  PREMIUM_CARD_IMAGE
} from '../data/mockData';

export const HomePage: React.FC = () => {
  const { 
    products, 
    setActivePage, 
    setSelectedProduct, 
    reviews, 
    formatPrice, 
    currency 
  } = useStore();

  const handleNav = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products for homepage sections
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.salesCount - a.salesCount).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 3);
  const approvedReviews = reviews.filter(r => r.status === 'approved').slice(0, 3);

  // Five Main Categories with user's exact titles & descriptions
  const fiveMainCategories = [
    {
      id: 'robux' as PageId,
      title: 'Buy Robux',
      badgeLabel: '1,700 – 22,500 ROBUX',
      description: 'Explore available large Robux packages and understand the quantity and delivery method before ordering.',
      image: ROBUX_OFFICIAL_EMBLEM,
      hasRobuxIcon: true,
      tag: '50% OFF ALL PACKAGES',
      colorGlow: 'from-amber-600/30 to-purple-900/40',
      borderColor: 'hover:border-amber-500/60',
      bullets: ['1,700 R$', '3,150 R$', '4,500 R$', '10,000 R$', '22,500 R$']
    },
    {
      id: 'skins' as PageId,
      title: 'Skins & Avatars',
      badgeLabel: 'BUNDLES & ACCESSORIES',
      description: 'Explore Roblox avatar outfits, hair, faces, clothing, accessories and character bundles.',
      image: SKINS_CATEGORY_IMAGE,
      hasRobuxIcon: false,
      tag: 'GENUINE CATALOG ASSETS',
      colorGlow: 'from-pink-600/30 to-purple-900/40',
      borderColor: 'hover:border-pink-500/60',
      bullets: ['Bundles', 'Outfits', 'Hair', 'Faces', 'Hats', 'Limiteds']
    },
    {
      id: 'giftcards' as PageId,
      title: 'Roblox Gift Cards',
      badgeLabel: '$10 TO $200 DIGITAL CODES',
      description: 'Explore available digital gift cards, denominations and redemption instructions.',
      image: GIFTCARDS_CATEGORY_IMAGE,
      hasRobuxIcon: false,
      tag: 'INSTANT DIGITAL KEYS',
      colorGlow: 'from-emerald-600/30 to-purple-900/40',
      borderColor: 'hover:border-emerald-500/60',
      bullets: ['$10 USD', '$25 USD', '$50 USD', '$100 USD', '$200 USD']
    },
    {
      id: 'gameitems' as PageId,
      title: 'Game Items',
      badgeLabel: 'BLOX FRUITS, MM2 & PET SIM',
      description: 'Discover available game passes, game-specific products and other eligible digital items.',
      image: GAMEITEMS_CATEGORY_IMAGE,
      hasRobuxIcon: false,
      tag: 'VERIFIED IN-GAME ASSETS',
      colorGlow: 'from-red-600/30 to-blue-900/40',
      borderColor: 'hover:border-red-500/60',
      bullets: ['Blox Fruits', 'Pet Sim 99', 'Murder Mystery 2', 'Blade Ball']
    },
    {
      id: 'membership' as PageId,
      title: 'Membership',
      badgeLabel: 'PREMIUM 450, 1000 & 2200',
      description: 'Explore available membership plans, benefits and subscription information.',
      image: PREMIUM_CARD_IMAGE,
      hasRobuxIcon: false,
      tag: 'OFFICIAL SUBSCRIPTIONS',
      colorGlow: 'from-purple-600/30 to-indigo-900/40',
      borderColor: 'hover:border-purple-500/60',
      bullets: ['Monthly Robux', 'Trading Access', '10% Extra Robux Bonus']
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Large Premium Gaming Hero Banner */}
      <section className="relative overflow-hidden bg-theme-hero border-b border-[#251545]">
        {/* Ambient Neon Lighting & Texture */}
        <div className="absolute inset-0 bg-gaming-grid pointer-events-none opacity-40" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/3 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide shadow-lg shadow-purple-950/40">
                <RobuxIcon size="xs" />
                <span>OFFICIAL ROBLOX CURRENCY & VIRTUAL GOODS STORE</span>
                <span className="hidden sm:inline-block bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded shadow">
                  50% OFF
                </span>
              </div>

              {/* Clear Welcome Heading */}
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.06] text-balance">
                WELCOME TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-300 to-blue-400">ROBLOX STORE</span>
              </h1>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                The premier international destination for large Robux packages, exclusive avatar skins, digital gift cards, and game passes. Guaranteed automated delivery, 100% ban-free, accepting UPI and Crypto.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleNav('robux')}
                  className="px-6 py-4 rounded-2xl font-display font-extrabold text-sm uppercase tracking-wider bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white shadow-2xl shadow-red-950/70 flex items-center gap-2.5 transition-all group border border-red-400/30"
                >
                  <RobuxIcon size="sm" />
                  <span>Shop Robux Packages</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleNav('skins')}
                  className="px-5 py-4 rounded-2xl font-display font-bold text-sm bg-[#160a2c]/80 hover:bg-[#231045] text-purple-200 hover:text-white border border-[#3b1c6d] transition-all backdrop-blur-sm"
                >
                  Explore Skins & Avatars
                </button>
              </div>

              {/* Quick Trust Highlights with Authentic Icons */}
              <div className="pt-4 flex flex-wrap items-center gap-5 sm:gap-7 text-xs text-zinc-300 font-medium border-t border-[#291747]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Username Only (No Password)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Automated 1–3 Min Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                  <span>4.9/5 Rating (12,000+ Orders)</span>
                </div>
              </div>

            </div>

            {/* Hero Visual Card with Authentic Robux Emblem Feature */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/40 bg-[#0e071e] shadow-2xl shadow-purple-950/60 group">
                <img
                  src={ROBUX_OFFICIAL_EMBLEM}
                  alt="Authentic Robux Emblem"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Floating Special Promo Pill */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#090317]/90 backdrop-blur-md border border-purple-500/30 rounded-2xl flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <RobuxIcon size="md" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 font-mono tracking-wider block">
                        AUTHENTIC ROBUX STORE
                      </span>
                      <span className="text-xs font-bold text-white">
                        10,000 Robux Package (50% OFF)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono line-through text-zinc-500 block">
                      {formatPrice(99.99)}
                    </span>
                    <span className="text-sm font-extrabold text-emerald-400 font-mono">
                      {formatPrice(49.99)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FIVE MAIN CATEGORIES — CLEAR, LARGE, ATTRACTIVE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Core Marketplace
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white mt-1">
              EXPLORE OUR FIVE MAIN CATEGORIES
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
            Click any category to browse authorized items, view specifications, and experience automated fulfillment.
          </p>
        </div>

        {/* The 5 Large Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fiveMainCategories.map((cat, index) => {
            return (
              <div
                key={cat.id}
                onClick={() => handleNav(cat.id)}
                className={`group relative bg-[#0e071e]/90 hover:bg-[#150a2e] rounded-3xl border border-[#2d1852] ${cat.borderColor} overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-2xl hover:shadow-purple-950/50 ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1 ring-1 ring-amber-500/30' : ''
                }`}
              >
                {/* Category Visual */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/70">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e071e] via-transparent to-transparent" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-3 left-3 bg-[#0c0419]/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-xl shadow-lg border border-white/10 flex items-center gap-1.5">
                    {cat.hasRobuxIcon && <RobuxIcon size="xs" />}
                    <span>{cat.tag}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-zinc-400 mb-1">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                        {cat.badgeLabel}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                      {cat.hasRobuxIcon && <RobuxIcon size="sm" />}
                      {cat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Quick bullet tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
                      {cat.bullets.map((b, i) => (
                        <span key={i} className="text-[10px] font-mono bg-[#180a33] border border-[#351963] text-purple-200 px-2 py-0.5 rounded-md">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#231240] flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white group-hover:text-purple-300 transition-colors uppercase tracking-wider">
                      Shop Now
                    </span>
                    <button className="w-9 h-9 rounded-xl bg-[#1a0c38] group-hover:bg-red-600 text-purple-200 group-hover:text-white flex items-center justify-center transition-colors shadow-md">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-red-500" /> Handpicked Deals
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
              FEATURED GAMING PACKAGES
            </h2>
          </div>
          <button
            onClick={() => handleNav('robux')}
            className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            View All Store <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>
      </section>

      {/* 4. Best Sellers Based on Actual Sales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
              <TrendingUp className="w-3.5 h-3.5" /> Most Purchased Items
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
              BEST SELLERS (BASED ON SALES)
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Updated live from verified completed orders
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellers.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>
      </section>

      {/* 5. GENUINE DISCOUNT SECTION: CENTRAL 50% PRICING SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950/70 via-[#18092d] to-[#0d041c] border-2 border-purple-500/40 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-md">
                <Zap className="w-3.5 h-3.5 fill-white" />
                CENTRAL 50% DISCOUNT GUARANTEE
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
                GENUINE 50% SAVINGS ACROSS ALL FIVE CATEGORIES
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                We believe in complete pricing transparency. Every product card presents its verified catalog retail price alongside our 50% promotional rate. Save exactly half on Robux, bundles, gift cards, and VIP subscriptions.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-zinc-300 pt-2">
                <span className="bg-black/60 px-3 py-1.5 rounded-xl border border-white/10">
                  Example: Original $100 → Sale $50 (Save $50)
                </span>
                <span className="bg-black/60 px-3 py-1.5 rounded-xl border border-white/10">
                  India: UPI QR Enabled
                </span>
                <span className="bg-black/60 px-3 py-1.5 rounded-xl border border-white/10">
                  International: USDT BEP20 & TRC20
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-[#0a0316]/90 rounded-2xl border border-purple-500/30 text-center shadow-xl">
              <span className="text-xs font-mono text-purple-300">DISCOUNT STATUS</span>
              <span className="font-display font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 mt-1">
                50% OFF
              </span>
              <span className="text-xs font-semibold text-zinc-300 mt-1">
                Worldwide Fulfillment Live
              </span>
              <button
                onClick={() => handleNav('robux')}
                className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-red-950/60"
              >
                Claim Discount Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PAYMENT METHODS INFORMATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0e071e]/90 border border-[#2d1852] rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">
              High-Security Transactions
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              SUPPORTED PAYMENT METHODS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Separate seamless payment experiences tailored for Indian gamers and international crypto enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* India Gateway Card */}
            <div className="p-6 rounded-2xl bg-[#14082b] border border-[#371c66] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">India — UPI & QR Payments</h3>
                  <p className="text-xs text-zinc-400">Google Pay, PhonePe, Paytm, BHIM</p>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Pay in Indian Rupees (INR ₹) directly with zero gateway surcharge. Scan the dynamic UPI QR code or transfer to our verified VPA, enter your 12-digit UTR, and receive instant Robux delivery.
              </p>
              <div className="text-xs font-mono text-emerald-300 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
                Verified VPA: robloxstore.pay@axl
              </div>
            </div>

            {/* International Crypto Card */}
            <div className="p-6 rounded-2xl bg-[#14082b] border border-[#371c66] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center font-bold">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">International — USDT Crypto</h3>
                  <p className="text-xs text-zinc-400">BEP20 (BNB Chain) & TRC20 (Tron)</p>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Send exact USDT amounts with working scannable QR codes for each network. Instant verification with your transaction hash, 100% money-back guarantee, and no private keys required.
              </p>
              <div className="flex gap-2 text-[11px] font-mono">
                <span className="bg-amber-950/40 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  BEP20 Supported
                </span>
                <span className="bg-red-950/40 text-red-300 px-2.5 py-1 rounded-lg border border-red-500/20">
                  TRC20 Supported
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Verified Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> Buyer Testimonials
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
              VERIFIED CUSTOMER REVIEWS
            </h2>
          </div>
          <button
            onClick={() => handleNav('reviews')}
            className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            View All ({reviews.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {approvedReviews.map(rev => (
            <div 
              key={rev.id}
              className="bg-[#0e071e]/90 border border-[#2d1852] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#231240] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">{rev.author}</p>
                  <p className="text-[11px] text-zinc-400 font-mono">@{rev.robloxUsername}</p>
                </div>
                {rev.verifiedPurchase && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Customer Support & Live Assistance Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#170a2f] via-[#100624] to-[#090317] border border-[#351963] rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
              <Headphones className="w-3.5 h-3.5" /> 24/7 LIVE GAMING SUPPORT
            </div>
            <h3 className="font-display font-black text-2xl text-white">
              Need Help With An Order or Payment?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
              Our automated dispatch bots and human support engineers are available 24/7 to verify payments, assist with username routing, and answer any questions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => handleNav('contact')}
              className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-950/50"
            >
              Open Live Support
            </button>
            <button
              onClick={() => handleNav('track')}
              className="px-5 py-3 bg-[#1e0e3d] hover:bg-[#2b1456] text-purple-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-[#402075] transition-colors"
            >
              Track Existing Order
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
