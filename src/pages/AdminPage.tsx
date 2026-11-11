import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  SlidersHorizontal, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Settings, 
  Star, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  RefreshCw, 
  Save, 
  AlertCircle,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Download,
  FileArchive
} from 'lucide-react';
import { Product, CategoryId, PaymentStatus, DeliveryStatus } from '../types';
import { ExportModal } from '../components/ExportModal';

export const AdminPage: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    applyStorewideDiscount,
    orders, 
    updateOrderStatus, 
    adminAlerts,
    dismissAdminAlert,
    reviews, 
    approveReview, 
    deleteReview, 
    storeSettings, 
    updateStoreSettings, 
    resetToDefaults,
    formatPrice,
    setActivePage
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'pricing' | 'orders' | 'alerts' | 'reviews' | 'gateways'>('products');
  const [notification, setNotification] = useState('');

  // New Product Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Product Add/Edit
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryId>('robux');
  const [formSubcategory, setFormSubcategory] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formOrigPrice, setFormOrigPrice] = useState('19.99');
  const [formRobuxAmount, setFormRobuxAmount] = useState('1700');
  const [formStock, setFormStock] = useState('100');
  const [formImage, setFormImage] = useState('/src/assets/images/category_robux_gold_1793469309743.jpg');

  // Settings State
  const [usdRate, setUsdRate] = useState(storeSettings.usdToInrRate.toString());
  const [upiId, setUpiId] = useState(storeSettings.upiId);
  const [merchantName, setMerchantName] = useState(storeSettings.upiMerchantName);
  const [bep20Addr, setBep20Addr] = useState(storeSettings.cryptoBep20Address);
  const [trc20Addr, setTrc20Addr] = useState(storeSettings.cryptoTrc20Address);
  const [bannerNotice, setBannerNotice] = useState(storeSettings.bannerNotice);
  const [upiQrImage, setUpiQrImage] = useState(storeSettings.customUpiQrImage || '/indian_upi_qr.jpg');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('robux');
    setFormSubcategory('');
    setFormDesc('');
    setFormOrigPrice('19.99');
    setFormRobuxAmount('1700');
    setFormStock('100');
    setFormImage('/src/assets/images/category_robux_gold_1793469309743.jpg');
    setShowAddModal(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormSubcategory(p.subcategory || '');
    setFormDesc(p.description);
    setFormOrigPrice(p.originalPriceUsd.toString());
    setFormRobuxAmount(p.robuxAmount ? p.robuxAmount.toString() : '');
    setFormStock(p.stockCount.toString());
    setFormImage(p.image);
    setShowAddModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const origUsd = parseFloat(formOrigPrice) || 10;
    const stock = parseInt(formStock, 10) || 50;
    const robux = formRobuxAmount ? parseInt(formRobuxAmount, 10) : undefined;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        category: formCategory,
        subcategory: formSubcategory || undefined,
        description: formDesc,
        originalPriceUsd: origUsd,
        stockCount: stock,
        robuxAmount: robux,
        image: formImage
      });
      showToast(`Updated product "${formName}" successfully!`);
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        subcategory: formSubcategory || undefined,
        description: formDesc,
        originalPriceUsd: origUsd,
        salePriceUsd: Math.round(origUsd * 0.5 * 100) / 100,
        isDiscounted: true,
        discountPercent: 50,
        image: formImage,
        badge: '50% OFF',
        inStock: true,
        stockCount: stock,
        salesCount: 0,
        rating: 5.0,
        reviewsCount: 1,
        fulfillmentType: 'direct_account_deposit',
        deliveryTimeEstimate: 'Instant (1–3 mins)',
        robuxAmount: robux,
      });
      showToast(`Added new product "${formName}" with 50% discount!`);
    }

    setShowAddModal(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const rate = parseFloat(usdRate) || 86.5;
    updateStoreSettings({
      usdToInrRate: rate,
      upiId,
      upiMerchantName: merchantName,
      cryptoBep20Address: bep20Addr,
      cryptoTrc20Address: trc20Addr,
      bannerNotice,
      customUpiQrImage: upiQrImage,
    });
    showToast('Store currency & payment gateway settings saved!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Header */}
      <div className="bg-[#0e0e14] border border-[#20202c] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
            <SlidersHorizontal className="w-3.5 h-3.5" /> SECURE MERCHANT DASHBOARD
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-2">
            ROBLOX STORE MANAGEMENT CONSOLE
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage catalog products, central 50% discount pricing, customer orders, payment verification, and currency exchange.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowExportModal(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-bold rounded-lg border border-purple-500/40 transition-colors flex items-center gap-1.5 shadow-md shadow-purple-950/50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Website ZIP</span>
          </button>
          <button
            onClick={() => setActivePage('home')}
            className="px-3.5 py-2 bg-[#181822] hover:bg-[#20202e] text-zinc-300 text-xs font-bold rounded-lg border border-[#29293a] transition-colors"
          >
            Preview Live Store
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset catalog products and settings to default factory state?')) {
                resetToDefaults();
                showToast('Catalog restored to default authorized state.');
              }
            }}
            className="px-3.5 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-bold rounded-lg border border-red-500/30 transition-colors"
          >
            Reset Catalog
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Tab Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-[#1f1f2c] pb-3 text-xs font-bold">
        {[
          { id: 'products', label: `Catalog Products (${products.length})`, icon: Package },
          { id: 'pricing', label: '50% Central Pricing System', icon: DollarSign },
          { 
            id: 'alerts', 
            label: `Unavailable Alerts (${adminAlerts.length})`, 
            icon: ShieldAlert,
            badge: adminAlerts.length > 0 ? adminAlerts.length : undefined 
          },
          { id: 'orders', label: `Orders & Verification (${orders.length})`, icon: ShoppingBag },
          { id: 'reviews', label: `Customer Reviews (${reviews.length})`, icon: Star },
          { id: 'gateways', label: 'Currency & Payment Providers', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-[#12121a] text-zinc-400 hover:text-white border border-[#20202c]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 text-[10px] bg-amber-400 text-black font-black rounded-full animate-pulse">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-black text-xl text-white">Marketplace Products</h2>
              <p className="text-xs text-zinc-400">Add, edit stock availability, toggle in-stock/out-of-stock, configure prices, or remove items across all 5 categories.</p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          <div className="bg-[#0e0e14] border border-[#20202c] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-[#12121c] border-b border-[#20202e] text-zinc-400 font-display uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Product</th>
                    <th className="py-3.5 px-4 font-bold">Category</th>
                    <th className="py-3.5 px-4 font-bold">Original USD</th>
                    <th className="py-3.5 px-4 font-bold">Sale USD (50%)</th>
                    <th className="py-3.5 px-4 font-bold">Stock & Availability (Click to Toggle)</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#181822]">
                  {products.map(p => {
                    const isAvailable = p.inStock && p.stockCount > 0;
                    return (
                      <tr key={p.id} className="hover:bg-[#12121a] transition-colors">
                        <td className="py-3 px-4 font-medium text-white flex items-center gap-2.5">
                          <img 
                            src={p.image} 
                            alt="" 
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-lg object-cover bg-black shrink-0 border border-zinc-800"
                          />
                          <div>
                            <p className="font-bold line-clamp-1">{p.name}</p>
                            {p.robuxAmount && (
                              <span className="text-[10px] text-amber-400 font-mono">
                                {p.robuxAmount.toLocaleString()} Robux
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 uppercase font-bold text-[10px] text-red-400">
                          {p.category}
                        </td>
                        <td className="py-3 px-4 font-mono line-through text-zinc-500">
                          ${p.originalPriceUsd.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                          ${p.salePriceUsd.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => {
                              const newStock = isAvailable ? 0 : 50;
                              const newInStock = !isAvailable;
                              updateProduct(p.id, { inStock: newInStock, stockCount: newStock });
                              showToast(`Updated "${p.name}" to ${newInStock ? 'IN STOCK (50 units)' : 'OUT OF STOCK (0 units)'}`);
                            }}
                            className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                              isAvailable
                                ? 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border-emerald-500/40'
                                : 'bg-red-950/60 hover:bg-red-900/80 text-red-300 border-red-500/40 shadow-sm'
                            }`}
                            title="Click to toggle in-stock / out-of-stock"
                          >
                            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-red-400'}`} />
                            {isAvailable ? `In Stock (${p.stockCount})` : 'Out of Stock (0)'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 rounded-lg bg-[#181824] hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                              title="Edit Product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                  showToast(`Deleted "${p.name}".`);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CENTRAL PRICING & 50% CAMPAIGN */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e14] border border-red-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-red-400 uppercase">
                  Central Price Management
                </span>
                <h2 className="font-display font-black text-2xl text-white mt-1">
                  50% OFF Storewide Campaign Engine
                </h2>
              </div>
              <button
                onClick={() => {
                  applyStorewideDiscount(50);
                  showToast('Re-applied verified 50% discount formula across all 5 categories!');
                }}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-lg"
              >
                <Zap className="w-4 h-4 fill-white" /> Apply 50% Across All Products
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
              Formula: <code className="bg-black/60 px-2 py-0.5 rounded font-mono text-red-400">Discounted Price = Original Verified Price × 0.50</code>. All products automatically show strikethrough original prices, red badges, and customer savings calculations in USD and INR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.slice(0, 6).map(p => (
              <div key={p.id} className="p-4 bg-[#0e0e14] border border-[#20202c] rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">{p.name}</h4>
                  <span className="text-[10px] text-zinc-500 uppercase">{p.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <span className="line-through text-zinc-500 block font-mono">${p.originalPriceUsd.toFixed(2)}</span>
                    <span className="font-mono font-bold text-emerald-400">${p.salePriceUsd.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-1.5 bg-[#181822] hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs"
                  >
                    Adjust
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: UNAVAILABLE PACKAGE ALERTS & REFUNDS */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> ADMIN NOTIFICATION QUEUE
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Worldwide Out-of-Stock Monitoring
                </span>
              </div>
              <h2 className="font-display font-black text-xl text-white mt-1">
                Unavailable Package Order Requests
              </h2>
              <p className="text-xs text-zinc-400">
                Rule 7 Compliance: Real-time notifications for orders placed on currently out-of-stock packages. Review customer payments, process 100% full refunds, or disburse alternative packages.
              </p>
            </div>
          </div>

          {adminAlerts.length === 0 ? (
            <div className="bg-[#0e0e14] border border-[#20202c] rounded-2xl p-10 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-display font-bold text-white text-base">No Pending Unavailable Package Alerts</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                All customer orders are currently matched with genuinely in-stock items. When a customer submits an order for an item marked out-of-stock, instant alerts appear here with one-click refund and substitution actions.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {adminAlerts.map(alert => {
                const linkedOrder = orders.find(o => o.id === alert.orderId);
                return (
                  <div 
                    key={alert.id}
                    className="bg-[#120924] border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl shadow-amber-950/20"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-purple-900/40 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-amber-300 text-sm sm:text-base">
                          {alert.orderId}
                        </span>
                        <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-500/50">
                          Payment Received – Refund or Review Required
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          {new Date(alert.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-black text-white text-base">
                          {alert.currencyUsed === 'INR' ? `₹${alert.amountPaidInr.toLocaleString('en-IN')}` : `$${alert.amountPaidUsd.toFixed(2)}`}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-bold">Customer Profile</span>
                        <p className="font-bold text-white">@{alert.customerUsername}</p>
                        <p className="text-zinc-400 text-[11px] truncate">{alert.customerEmail}</p>
                      </div>

                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-bold">Requested Package</span>
                        <p className="font-bold text-red-400">{alert.packageName}</p>
                        <span className="text-[10px] text-amber-400/90 font-mono">Currently Out of Stock</span>
                      </div>

                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-bold">Payment Channel</span>
                        <p className="font-mono text-zinc-200 uppercase">{alert.paymentMethod}</p>
                        <p className="text-zinc-400 font-mono text-[11px] truncate">Ref: {alert.transactionRef}</p>
                      </div>

                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-bold">Customer Resolution</span>
                        {linkedOrder?.resolutionStatus === 'refund_requested' ? (
                          <div>
                            <span className="font-bold text-emerald-400 block text-xs">Refund Requested</span>
                            <span className="text-[10px] font-mono text-zinc-300 truncate block">
                              To: {linkedOrder.refundDetails?.destinationAddress}
                            </span>
                          </div>
                        ) : linkedOrder?.resolutionStatus === 'package_switched' ? (
                          <div>
                            <span className="font-bold text-purple-400 block text-xs">Swapped Package</span>
                            <span className="text-[10px] text-zinc-300 truncate block">
                              To: {linkedOrder.switchedPackageName}
                            </span>
                          </div>
                        ) : (
                          <span className="text-amber-300 font-mono text-xs">Reviewing Options in UI</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-purple-900/30 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[11px] text-zinc-300 italic">
                        {alert.notes}
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (linkedOrder) {
                              updateOrderStatus(linkedOrder.id, 'refunded', 'refunded', '100% full refund disbursed by merchant');
                            }
                            dismissAdminAlert(alert.id);
                            showToast(`Processed 100% full refund for ${alert.customerUsername} (${alert.orderId})`);
                          }}
                          className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Issue 100% Full Refund
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (linkedOrder) {
                              updateOrderStatus(linkedOrder.id, 'completed', 'completed', 'Alternative package disbursed with automated key');
                            }
                            dismissAdminAlert(alert.id);
                            showToast(`Disbursed replacement package for order ${alert.orderId}`);
                          }}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Zap className="w-3.5 h-3.5" /> Fulfill Alternative Package
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            dismissAdminAlert(alert.id);
                            showToast(`Alert for order ${alert.orderId} dismissed.`);
                          }}
                          className="px-3 py-1.5 bg-[#181824] hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ORDERS & VERIFICATION */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-black text-xl text-white">Order Processing & Payment Verification</h2>
            <p className="text-xs text-zinc-400">Review incoming customer payments, approve UTRs or TxHashes, and manage automated bot delivery statuses.</p>
          </div>

          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                className={`bg-[#0e0e14] rounded-2xl p-5 sm:p-6 space-y-4 border ${
                  order.isPackageUnavailable
                    ? 'border-amber-500/50 bg-[#110722]'
                    : 'border-[#20202c]'
                }`}
              >
                {/* Top Banner for unavailable orders */}
                {order.isPackageUnavailable && (
                  <div className="p-3 bg-amber-950/60 border border-amber-500/40 rounded-xl text-xs flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-amber-300 font-bold">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>UNAVAILABLE PACKAGE ORDER REQUEST</span>
                    </div>
                    <span className="font-mono text-[11px] text-amber-200">
                      Mandated Message Shown: "Sorry! This package is currently unavailable. Please try another package."
                    </span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1c1c28] gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-white text-base">{order.id}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      order.paymentStatus === 'completed' 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                        : order.paymentStatus === 'review_required'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        : order.paymentStatus === 'refunded'
                        ? 'bg-red-950 text-red-400 border border-red-500/40'
                        : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                    }`}>
                      {order.paymentStatus === 'review_required'
                        ? 'Payment Received – Refund or Review Required'
                        : order.paymentStatus.toUpperCase()}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-white text-base">
                      {order.currencyUsed === 'INR' ? `₹${order.totalInr.toLocaleString('en-IN')}` : `$${order.totalUsd.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Customer</span>
                    <p className="font-bold text-white">@{order.robloxUsername}</p>
                    <p className="text-zinc-400 text-[11px]">{order.customerEmail}</p>
                    {order.customerLanguage && (
                      <span className="text-[10px] font-mono text-purple-400">
                        Language: {order.customerLanguage.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Item Ordered</span>
                    <p className="font-bold text-zinc-200">{order.items[0]?.productName || 'Package'}</p>
                    {order.isPackageUnavailable && (
                      <span className="text-[10px] font-mono text-red-400 block">
                        Status: Out of Stock
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Payment Channel</span>
                    <p className="font-mono text-zinc-200 uppercase">{order.paymentMethod}</p>
                    <p className="text-zinc-400 font-mono text-[11px] truncate">Ref: {order.transactionRef || 'N/A'}</p>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Resolution & Delivery</span>
                    {order.resolutionStatus === 'refund_requested' ? (
                      <span className="text-emerald-400 font-bold block text-xs">
                        Refund to: {order.refundDetails?.destinationAddress}
                      </span>
                    ) : order.resolutionStatus === 'package_switched' ? (
                      <span className="text-purple-300 font-bold block text-xs">
                        Switched: {order.switchedPackageName}
                      </span>
                    ) : (
                      <p className="font-mono text-red-400 font-bold truncate">{order.deliveryCode || 'Pending generation'}</p>
                    )}
                  </div>
                </div>

                {/* Order Action Controls */}
                <div className="pt-3 border-t border-[#1c1c28] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-zinc-400 italic">
                    Notes: {order.adminNotes || 'Standard order processing'}
                  </span>

                  <div className="flex items-center gap-2">
                    {order.isPackageUnavailable ? (
                      <>
                        <button
                          onClick={() => {
                            updateOrderStatus(order.id, 'refunded', 'refunded', '100% full refund disbursed to customer');
                            showToast(`Order ${order.id} marked as 100% Refunded.`);
                          }}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Mark Full Refund Issued
                        </button>
                        <button
                          onClick={() => {
                            updateOrderStatus(order.id, 'completed', 'completed', 'Disbursed replacement in-stock package');
                            showToast(`Order ${order.id} resolved with alternative package!`);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5" /> Fulfill Alternative
                        </button>
                      </>
                    ) : (
                      <>
                        {order.paymentStatus !== 'completed' && (
                          <button
                            onClick={() => {
                              updateOrderStatus(order.id, 'completed', 'completed', 'Payment verified manually by admin');
                              showToast(`Order ${order.id} verified and delivery bot marked completed!`);
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Fulfill
                          </button>
                        )}
                        {order.paymentStatus === 'completed' && (
                          <button
                            onClick={() => {
                              updateOrderStatus(order.id, 'verifying', 'processing', 'Reopened for inspection');
                              showToast(`Order ${order.id} moved to Verifying status.`);
                            }}
                            className="px-3 py-1.5 bg-[#1a1a26] hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            Re-open
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOMER REVIEWS MODERATION */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-black text-xl text-white">Review Moderation Queue</h2>
            <p className="text-xs text-zinc-400">Review feedback submissions and filter sample vs verified testimonials.</p>
          </div>

          <div className="space-y-3">
            {reviews.map(r => (
              <div key={r.id} className="p-4 bg-[#0e0e14] border border-[#20202c] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{r.author}</span>
                    <span className="text-[11px] text-zinc-500 font-mono">(@{r.robloxUsername})</span>
                    <span className="text-amber-400 font-bold text-xs">★ {r.rating}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      r.status === 'approved' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                    }`}>
                      {r.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 italic">"{r.content}"</p>
                  <p className="text-[10px] text-zinc-500 font-mono">Product: {r.productName} · Date: {r.date}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {r.status !== 'approved' && (
                    <button
                      onClick={() => {
                        approveReview(r.id);
                        showToast(`Approved review by ${r.author}.`);
                      }}
                      className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => {
                      deleteReview(r.id);
                      showToast(`Deleted review.`);
                    }}
                    className="p-1.5 bg-red-950/40 text-red-400 rounded-lg hover:bg-red-900/60"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: GATEWAYS & CURRENCY SETTINGS */}
      {activeTab === 'gateways' && (
        <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
          <div>
            <h2 className="font-display font-black text-xl text-white">Payment Gateways & Currency Engine</h2>
            <p className="text-xs text-zinc-400">Configure Indian UPI merchant VPA, international USDT addresses, and real exchange rates.</p>
          </div>

          <div className="bg-[#0e0e14] border border-[#20202c] rounded-2xl p-6 space-y-4 text-xs">
            
            {/* Currency conversion rate */}
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">
                USD to INR Conversion Rate (₹ per $1.00 USD)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={usdRate}
                onChange={(e) => setUsdRate(e.target.value)}
                className="w-full bg-[#14141c] border border-[#28283a] rounded-xl px-3.5 py-2.5 text-white font-mono"
              />
              <p className="text-[10px] text-zinc-500 mt-1">
                Prices in India switch automatically to INR using this configured multiplier.
              </p>
            </div>

            {/* UPI Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">UPI VPA Address / ID</label>
                <input
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-[#14141c] border border-[#28283a] rounded-xl px-3.5 py-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">UPI Payee / Merchant Name</label>
                <input
                  type="text"
                  required
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="w-full bg-[#14141c] border border-[#28283a] rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>
            </div>

            {/* India UPI QR Image Settings */}
            <div className="pt-2 p-4 bg-[#14141e] border border-emerald-500/20 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-emerald-400 block text-xs">
                    Original India UPI QR Image
                  </span>
                  <p className="text-[10px] text-zinc-400">
                    This official QR code is displayed on the checkout page under "Scan QR to Pay" with a Download button.
                  </p>
                </div>
                <img 
                  src={upiQrImage} 
                  alt="UPI QR Preview" 
                  className="w-12 h-14 object-contain bg-white rounded-lg p-0.5 border border-emerald-400/40"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">QR Image Asset Path / URL</label>
                <input
                  type="text"
                  value={upiQrImage}
                  onChange={(e) => setUpiQrImage(e.target.value)}
                  className="w-full bg-[#0d0d14] border border-[#28283a] rounded-lg px-3 py-2 text-white font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Crypto Addresses (Plain Text Only - No QR Codes) */}
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-[11px] text-zinc-300">
                <span className="font-bold text-white block">Cryptocurrency Policy:</span>
                TRC20 and BEP20 are configured as <strong className="text-amber-300">plain text addresses only</strong> with one-click copy buttons. No crypto QR codes or upload fields are used.
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  USDT BEP20 (BNB Smart Chain) Receiving Address (Text Only)
                </label>
                <input
                  type="text"
                  required
                  value={bep20Addr}
                  onChange={(e) => setBep20Addr(e.target.value)}
                  className="w-full bg-[#14141c] border border-[#28283a] rounded-xl px-3.5 py-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  USDT TRC20 (Tron Network) Receiving Address (Text Only)
                </label>
                <input
                  type="text"
                  required
                  value={trc20Addr}
                  onChange={(e) => setTrc20Addr(e.target.value)}
                  className="w-full bg-[#14141c] border border-[#28283a] rounded-xl px-3.5 py-2.5 text-white font-mono"
                />
              </div>
            </div>

            {/* Global Notice */}
            <div className="pt-2">
              <label className="block font-semibold text-zinc-300 mb-1">Top Announcement Notice</label>
              <input
                type="text"
                value={bannerNotice}
                onChange={(e) => setBannerNotice(e.target.value)}
                className="w-full bg-[#14141c] border border-[#28283a] rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Gateway Settings
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Add / Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101018] border border-[#28283a] rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#20202e] pb-3">
              <h3 className="font-display font-bold text-white text-lg">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Roblox Item'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10,000 Robux Package"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryId)}
                    className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white capitalize"
                  >
                    <option value="robux">Robux</option>
                    <option value="skins">Skins & Avatars</option>
                    <option value="giftcards">Gift Cards</option>
                    <option value="gameitems">Game Items</option>
                    <option value="membership">Membership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Subcategory / Game</label>
                  <input
                    type="text"
                    placeholder="e.g. Blox Fruits, Hats, Bundles"
                    value={formSubcategory}
                    onChange={(e) => setFormSubcategory(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formOrigPrice}
                    onChange={(e) => setFormOrigPrice(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Robux Amount</label>
                  <input
                    type="number"
                    placeholder="e.g. 4500"
                    value={formRobuxAmount}
                    onChange={(e) => setFormRobuxAmount(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Product Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details on product rarity, delivery process, and perks..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Image Asset URL / Path</label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-[#161622] border border-[#2b2b3d] rounded-lg px-3 py-2 text-white font-mono text-[11px]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#1b1b26] text-zinc-300 rounded-lg hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-lg shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product (50% OFF)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export & GitHub Deployment Modal */}
      <ExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />

    </div>
  );
};
