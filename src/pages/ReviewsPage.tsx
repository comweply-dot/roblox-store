import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  Plus, 
  Sparkles, 
  ThumbsUp, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { reviews, addReview, products } = useStore();
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [robloxUsername, setRobloxUsername] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name || '4,500 Robux Package');
  const [country, setCountry] = useState('India');
  const [reviewText, setReviewText] = useState('');
  const [submittedNotification, setSubmittedNotification] = useState(false);

  const approvedReviews = reviews.filter(r => r.status === 'approved');

  const filteredReviews = filterRating === 'all'
    ? approvedReviews
    : approvedReviews.filter(r => r.rating === filterRating);

  const averageRating = (
    approvedReviews.reduce((sum, r) => sum + r.rating, 0) / (approvedReviews.length || 1)
  ).toFixed(1);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim() || !robloxUsername.trim()) return;

    addReview({
      author: name.trim(),
      robloxUsername: robloxUsername.trim(),
      productName: selectedProduct,
      rating,
      content: reviewText.trim(),
      verifiedPurchase: true,
      userCountry: country,
      avatarSeed: name.trim(),
    });

    setShowSubmitModal(false);
    setName('');
    setRobloxUsername('');
    setReviewText('');
    setSubmittedNotification(true);
    setTimeout(() => setSubmittedNotification(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Title & Stats Header */}
      <div className="bg-[#0e0e14] border border-[#20202c] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> BUYER SATISFACTION INDEX
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white mt-2">
              CUSTOMER REVIEWS & FEEDBACK
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg">
              Authentic customer testimonials from gamers in India and worldwide who purchased Robux packages, skins, and game items.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-[#13131c] border border-[#222230] p-4 rounded-xl shrink-0">
            <div className="text-center">
              <span className="font-display font-black text-4xl text-white block">
                {averageRating}
              </span>
              <div className="flex items-center justify-center gap-1 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {approvedReviews.length} total reviews
              </span>
            </div>

            <div className="border-l border-[#222230] pl-6">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg shadow-red-950/50 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Success toast */}
        {submittedNotification && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Your review has been successfully submitted and verified! Thank you for sharing your experience.</span>
          </div>
        )}
      </div>

      {/* Filter by star rating */}
      <div className="flex items-center justify-between border-b border-[#1c1c28] pb-3 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-400 mr-2">Filter Rating:</span>
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterRating === 'all'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-[#14141c] text-zinc-400 hover:text-white border border-[#242432]'
            }`}
          >
            All Ratings
          </button>
          {[5, 4, 3].map(stars => (
            <button
              key={stars}
              onClick={() => setFilterRating(stars)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                filterRating === stars
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-[#14141c] text-zinc-400 hover:text-white border border-[#242432]'
              }`}
            >
              <span>{stars}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-zinc-500">
          Showing {filteredReviews.length} reviews
        </span>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map(rev => (
          <div
            key={rev.id}
            className="bg-[#0e0e14] border border-[#20202c] rounded-2xl p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-zinc-500">{rev.date}</span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider block font-semibold mb-1">
                  Purchased: {rev.productName}
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1c1c28] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white font-bold text-xs flex items-center justify-center">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-white block">{rev.author}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    @{rev.robloxUsername} · {rev.userCountry}
                  </span>
                </div>
              </div>

              {rev.verifiedPurchase && (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Purchase
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#101017] border border-[#28283a] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#20202e] pb-3">
              <h3 className="font-display font-bold text-white text-lg">
                Submit Your Verified Review
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-zinc-400 hover:text-white text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Malhotra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Roblox Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AryanRoblox99"
                    value={robloxUsername}
                    onChange={(e) => setRobloxUsername(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Product Purchased</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Rating</label>
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map(starNum => (
                    <button
                      key={starNum}
                      type="button"
                      onClick={() => setRating(starNum)}
                      className={`px-3 py-1.5 rounded-lg border flex items-center gap-1 font-bold ${
                        rating === starNum ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-[#161622] border-[#29293a] text-zinc-400'
                      }`}
                    >
                      <span>{starNum}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Your Review *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details on your delivery experience, speed, and packaging..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white placeholder-zinc-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 bg-[#1b1b26] text-zinc-300 rounded-lg hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-lg shadow-md"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
