import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { Order } from '../types';

export const OrdersPage: React.FC = () => {
  const { orders, setActivePage, formatPrice, setCurrentOrder } = useStore();
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'verifying'>('all');

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.paymentStatus === filterStatus);

  const handleTrackOrder = (order: Order) => {
    setCurrentOrder(order);
    setActivePage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1d1d28] gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            MY ORDER HISTORY
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track past and active Roblox transactions, download receipts, and view vouchers.
          </p>
        </div>

        <button
          onClick={() => setActivePage('robux')}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ShoppingBag className="w-4 h-4" /> New Purchase
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'completed', 'verifying'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filterStatus === tab
                ? 'bg-[#222230] text-white border border-[#35354a]'
                : 'bg-[#12121a] text-zinc-400 hover:text-white border border-[#1f1f2a]'
            }`}
          >
            {tab === 'all' ? `All Orders (${orders.length})` : tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-[#0e0e14] border border-[#1f1f2a] rounded-2xl p-8 space-y-3">
          <Package className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="font-display font-bold text-white text-base">No orders found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            You haven't placed any orders under this filter yet. Browse our 50% off Robux packages and game passes.
          </p>
          <button
            onClick={() => setActivePage('robux')}
            className="px-5 py-2.5 bg-red-600 text-white text-xs font-bold rounded-lg uppercase"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-[#0e0e14] border border-[#20202c] hover:border-zinc-700 rounded-2xl p-5 sm:p-6 transition-colors space-y-4"
            >
              {/* Order Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1c1c28] gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center font-mono font-bold text-xs">
                    RBX
                  </div>
                  <div>
                    <span className="font-display font-black text-white text-base">
                      {order.id}
                    </span>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border ${
                    order.paymentStatus === 'completed'
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                  }`}>
                    {order.paymentStatus.toUpperCase()}
                  </span>
                  <span className="font-mono font-black text-base text-white">
                    {order.currencyUsed === 'INR' ? `₹${order.totalInr.toLocaleString('en-IN')}` : `$${order.totalUsd.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Order Details & Items Preview */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 space-y-2">
                  <div className="text-xs text-zinc-400">
                    Target Username: <strong className="text-white font-mono">@{order.robloxUsername}</strong> · Channel: <span className="uppercase font-mono text-zinc-300">{order.paymentMethod}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, i) => (
                      <span key={i} className="text-[11px] bg-[#14141d] border border-[#232332] text-zinc-300 px-2.5 py-1 rounded-md">
                        {item.quantity}x {item.productName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 flex justify-start md:justify-end gap-2">
                  <button
                    onClick={() => handleTrackOrder(order)}
                    className="px-3.5 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Package className="w-3.5 h-3.5" />
                    Track Delivery
                  </button>
                </div>
              </div>

              {/* Delivery Token */}
              {order.deliveryCode && (
                <div className="p-2.5 bg-black/40 rounded-lg border border-[#1f1f2c] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Code: <span className="text-red-400 font-bold">{order.deliveryCode}</span></span>
                  <span className="text-[10px] text-emerald-400">Delivered</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
