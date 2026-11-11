import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Review, 
  StoreSettings, 
  Currency, 
  CategoryId, 
  PaymentStatus, 
  DeliveryStatus,
  Language,
  RefundDetails,
  AdminAlert
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_REVIEWS, 
  INITIAL_ORDERS, 
  DEFAULT_STORE_SETTINGS 
} from '../data/mockData';

export type PageId = 
  | 'home' 
  | 'robux' 
  | 'skins' 
  | 'giftcards' 
  | 'gameitems' 
  | 'membership' 
  | 'cart' 
  | 'checkout' 
  | 'order-success'
  | 'orders' 
  | 'track' 
  | 'reviews' 
  | 'contact' 
  | 'faq' 
  | 'refund-policy' 
  | 'privacy' 
  | 'terms' 
  | 'admin';

export const I18N = {
  en: {
    sorryUnavailable: "Sorry! This package is currently unavailable. Please try another package.",
    packageUnavailableStatus: "Package Unavailable",
    paymentReceivedReview: "Payment Received – Refund or Review Required",
    browseOtherPackages: "Browse Other Packages",
    showOtherAvailable: "Show Genuinely Available Packages",
    backToStore: "Back to Store",
    requestRefund: "Request 100% Full Refund",
    switchPackage: "Apply Paid Balance to Available Package",
    resolutionNotice: "Your payment has been successfully recorded in our system. Because this specific item is currently out of stock, we have placed your order under review. You may request an instant refund or choose an available package of equal value.",
    refundSuccessNotice: "Your refund request has been recorded. Our team will transfer your funds to your provided destination within 15–30 minutes.",
    switchSuccessNotice: "Your order has been updated to the chosen available package. Automated bot delivery is now processing.",
  },
  hi: {
    sorryUnavailable: "क्षमा करें! यह पैकेज वर्तमान में अनुपलब्ध है। कृपया कोई अन्य पैकेज आज़माएं।",
    packageUnavailableStatus: "पैकेज अनुपलब्ध है",
    paymentReceivedReview: "भुगतान प्राप्त हुआ – धनवापसी या समीक्षा आवश्यक",
    browseOtherPackages: "अन्य पैकेज ब्राउज़ करें",
    showOtherAvailable: "वास्तव में उपलब्ध पैकेज देखें",
    backToStore: "स्टोर पर वापस जाएं",
    requestRefund: "100% पूर्ण धनवापसी का अनुरोध करें",
    switchPackage: "उपलब्ध पैकेज पर शेष राशि लागू करें",
    resolutionNotice: "आपका भुगतान सफलतापूर्वक दर्ज कर लिया गया है। चूंकि यह पैकेज वर्तमान में स्टॉक में नहीं है, इसलिए आपका ऑर्डर समीक्षा में रखा गया है। आप तुरंत रिफंड प्राप्त कर सकते हैं या कोई अन्य उपलब्ध पैकेज चुन सकते हैं।",
    refundSuccessNotice: "आपकी धनवापसी का अनुरोध दर्ज कर लिया गया है। हमारी टीम 15–30 मिनट के भीतर आपके दिए गए पते पर राशि भेज देगी।",
    switchSuccessNotice: "आपका ऑर्डर चुने गए उपलब्ध पैकेज में अपडेट कर दिया गया है। डिलीवरी अब प्रोसेस हो रही है।",
  },
  tr: {
    sorryUnavailable: "Üzgünüz! Bu paket şu anda mevcut değil. Lütfen başka bir paket deneyin.",
    packageUnavailableStatus: "Paket Mevcut Değil",
    paymentReceivedReview: "Ödeme Alındı – İade veya İnceleme Gerekli",
    browseOtherPackages: "Diğer Paketlere Göz Atın",
    showOtherAvailable: "Gerçekten Mevcut Paketleri Göster",
    backToStore: "Mağazaya Geri Dön",
    requestRefund: "%100 Tam İade Talep Et",
    switchPackage: "Ödenen Bakiyeyi Mevcut Pakete Uygula",
    resolutionNotice: "Ödemeniz sistemimize kaydedildi. Bu ürün şu anda stokta bulunmadığı için siparişiniz incelemeye alınmıştır. Anında para iadesi talep edebilir veya mevcut bir alternatifi seçebilirsiniz.",
    refundSuccessNotice: "Para iadesi talebiniz alındı. Ekibimiz 15-30 dakika içinde tutarı belirttiğiniz adrese gönderecektir.",
    switchSuccessNotice: "Siparişiniz seçilen mevcut paketle güncellendi. Otomatik teslimat hazırlanıyor.",
  },
  es: {
    sorryUnavailable: "¡Lo sentimos! Este paquete no está disponible actualmente. Por favor, prueba otro paquete.",
    packageUnavailableStatus: "Paquete no disponible",
    paymentReceivedReview: "Pago recibido: se requiere reembolso o revisión",
    browseOtherPackages: "Explorar otros paquetes",
    showOtherAvailable: "Ver paquetes disponibles",
    backToStore: "Volver a la tienda",
    requestRefund: "Solicitar reembolso del 100%",
    switchPackage: "Aplicar saldo a un paquete disponible",
    resolutionNotice: "Su pago ha sido registrado. Dado que este paquete está agotado, su pedido está bajo revisión. Puede solicitar un reembolso o transferir su saldo a otro paquete disponible.",
    refundSuccessNotice: "Solicitud de reembolso registrada. Procesaremos su reintegro en 15–30 minutos.",
    switchSuccessNotice: "Su pedido ha sido transferido al nuevo paquete disponible.",
  },
  de: {
    sorryUnavailable: "Entschuldigung! Dieses Paket ist derzeit nicht verfügbar. Bitte versuchen Sie ein anderes Paket.",
    packageUnavailableStatus: "Paket nicht verfügbar",
    paymentReceivedReview: "Zahlung erhalten – Rückerstattung oder Überprüfung erforderlich",
    browseOtherPackages: "Andere Pakete durchsuchen",
    showOtherAvailable: "Tatsächlich verfügbare Pakete anzeigen",
    backToStore: "Zurück zum Shop",
    requestRefund: "100% Rückerstattung anfordern",
    switchPackage: "Guthaben auf verfügbares Paket anwenden",
    resolutionNotice: "Ihre Zahlung wurde erfasst. Da dieses Paket derzeit vergriffen ist, befindet sich Ihre Bestellung in Überprüfung. Sie können eine Rückerstattung anfordern oder ein anderes Paket wählen.",
    refundSuccessNotice: "Ihre Rückerstattungsanfrage wurde gespeichert. Die Auszahlung erfolgt binnen 15–30 Minuten.",
    switchSuccessNotice: "Ihre Bestellung wurde auf das alternative Paket umgestellt.",
  },
  fr: {
    sorryUnavailable: "Désolé ! Ce forfait est actuellement indisponible. Veuillez essayer un autre forfait.",
    packageUnavailableStatus: "Forfait indisponible",
    paymentReceivedReview: "Paiement reçu – Remboursement ou examen requis",
    browseOtherPackages: "Parcourir d'autres forfaits",
    showOtherAvailable: "Voir les forfaits réellement disponibles",
    backToStore: "Retour à la boutique",
    requestRefund: "Demander un remboursement à 100%",
    switchPackage: "Appliquer le solde à un forfait disponible",
    resolutionNotice: "Votre paiement a été enregistré. Ce produit étant actuellement en rupture de stock, votre commande est en cours d'examen. Vous pouvez demander un remboursement complet ou choisir un autre forfait disponible.",
    refundSuccessNotice: "Votre demande de remboursement est enregistrée. Le versement sera effectué sous 15–30 minutes.",
    switchSuccessNotice: "Votre commande a été mise à jour vers le forfait disponible sélectionné.",
  }
};

interface StoreContextType {
  // Navigation & View
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Language & Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof I18N['en']) => string;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convertUsdToInr: (usd: number) => number;
  formatPrice: (usd: number) => string;
  formatSavings: (originalUsd: number, saleUsd: number) => string;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  applyStorewideDiscount: (percent: number) => void;
  checkPackageAvailability: (productId: string) => boolean;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotalUsd: number;
  cartOriginalTotalUsd: number;
  cartSavingsUsd: number;

  // Orders & Resolutions
  orders: Order[];
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, paymentStatus: PaymentStatus, deliveryStatus: DeliveryStatus, adminNotes?: string) => void;
  findOrder: (orderIdOrUsername: string) => Order | undefined;
  requestOrderRefund: (orderId: string, details: RefundDetails) => void;
  switchOrderPackage: (orderId: string, newProduct: Product) => void;

  // Admin Alerts for unavailable orders
  adminAlerts: AdminAlert[];
  dismissAdminAlert: (alertId: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  approveReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;

  // Settings
  storeSettings: StoreSettings;
  updateStoreSettings: (newSettings: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANGUAGE: 'roblox_store_lang_v1',
  CURRENCY: 'roblox_store_currency',
  PRODUCTS: 'roblox_store_products_v3',
  CART: 'roblox_store_cart_v3',
  ORDERS: 'roblox_store_orders_v4',
  REVIEWS: 'roblox_store_reviews_v3',
  SETTINGS: 'roblox_store_settings_v4',
  ADMIN_ALERTS: 'roblox_store_alerts_v1',
};

const VALID_PAGES: PageId[] = [
  'home', 'robux', 'skins', 'giftcards', 'gameitems', 'membership',
  'cart', 'checkout', 'order-success', 'orders', 'track', 'reviews',
  'contact', 'faq', 'refund-policy', 'privacy', 'terms', 'admin'
];

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (VALID_PAGES.includes(hash as PageId)) {
    return hash as PageId;
  }
  const path = window.location.pathname.replace(/^\//, '').split('/')[0].toLowerCase().trim();
  if (VALID_PAGES.includes(path as PageId)) {
    return path as PageId;
  }
  return 'home';
}

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation with direct link and browser history support
  const [activePage, setActivePageState] = useState<PageId>(getInitialPage);

  const setActivePage = (page: PageId) => {
    setActivePageState(page);
    try {
      const newHash = page === 'home' ? '' : `#${page}`;
      if (window.location.hash !== newHash) {
        if (newHash === '') {
          history.pushState(null, '', window.location.pathname + window.location.search);
        } else {
          history.pushState(null, '', newHash);
        }
      }
    } catch {
      window.location.hash = page === 'home' ? '' : `#${page}`;
    }
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setActivePageState(getInitialPage());
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Currency
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      return (saved === 'INR' || saved === 'USD') ? saved : 'USD';
    } catch {
      return 'USD';
    }
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, c);
    } catch (e) {
      console.warn('Storage failed', e);
    }
  };

  // Store Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
    } catch {
      return DEFAULT_STORE_SETTINGS;
    }
  });

  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn(e);
    }
  }, [products]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn(e);
    }
  }, [cart]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn(e);
    }
  }, [orders]);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn(e);
    }
  }, [reviews]);

  // Currency conversion helpers
  const convertUsdToInr = (usd: number): number => {
    return Math.round(usd * storeSettings.usdToInrRate);
  };

  const formatPrice = (usd: number): string => {
    if (currency === 'INR') {
      const inrValue = convertUsdToInr(usd);
      return `₹${inrValue.toLocaleString('en-IN')}`;
    }
    return `$${usd.toFixed(2)}`;
  };

  const formatSavings = (originalUsd: number, saleUsd: number): string => {
    const diffUsd = Math.max(0, originalUsd - saleUsd);
    if (currency === 'INR') {
      const diffInr = convertUsdToInr(diffUsd);
      return `₹${diffInr.toLocaleString('en-IN')}`;
    }
    return `$${diffUsd.toFixed(2)}`;
  };

  // Product actions
  const addProduct = (newProductData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      id,
      ...newProductData,
      salePriceUsd: newProductData.isDiscounted 
        ? Math.round(newProductData.originalPriceUsd * (1 - (newProductData.discountPercent / 100)) * 100) / 100
        : newProductData.originalPriceUsd
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const updated = { ...p, ...updates };
      if (updates.originalPriceUsd !== undefined || updates.discountPercent !== undefined || updates.isDiscounted !== undefined) {
        if (updated.isDiscounted) {
          updated.salePriceUsd = Math.round(updated.originalPriceUsd * (1 - (updated.discountPercent / 100)) * 100) / 100;
        } else {
          updated.salePriceUsd = updated.originalPriceUsd;
        }
      }
      return updated;
    }));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const applyStorewideDiscount = (percent: number) => {
    setProducts(prev => prev.map(p => ({
      ...p,
      isDiscounted: true,
      discountPercent: percent,
      badge: `${percent}% OFF`,
      salePriceUsd: Math.round(p.originalPriceUsd * (1 - (percent / 100)) * 100) / 100
    })));
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return (['en', 'hi', 'tr', 'es', 'de', 'fr'].includes(saved as any)) ? (saved as Language) : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch (e) {
      console.warn(e);
    }
  };

  const t = (key: keyof typeof I18N['en']): string => {
    const langDict = I18N[language] || I18N['en'];
    return langDict[key] || I18N['en'][key] || '';
  };

  // Admin Alerts for unavailable orders
  const [adminAlerts, setAdminAlerts] = useState<AdminAlert[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_ALERTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_ALERTS, JSON.stringify(adminAlerts));
    } catch (e) {
      console.warn(e);
    }
  }, [adminAlerts]);

  const dismissAdminAlert = (alertId: string) => {
    setAdminAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const checkPackageAvailability = (productOrId: Product | string): boolean => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
    const prod = products.find(p => p.id === id);
    if (!prod) return false;
    return prod.inStock && prod.stockCount > 0;
  };

  // Cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotalUsd = cart.reduce(
    (sum, item) => sum + item.product.salePriceUsd * item.quantity,
    0
  );

  const cartOriginalTotalUsd = cart.reduce(
    (sum, item) => sum + item.product.originalPriceUsd * item.quantity,
    0
  );

  const cartSavingsUsd = Math.max(0, cartOriginalTotalUsd - cartTotalUsd);

  // Order actions
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    
    // Check actual package availability for all items in order
    let isUnavailable = false;
    let unavailableName = '';
    
    for (const item of orderData.items) {
      const prod = products.find(p => p.id === item.productId);
      if (!prod || !prod.inStock || prod.stockCount <= 0 || item.inStock === false) {
        isUnavailable = true;
        unavailableName = item.productName;
        break;
      }
    }

    if (orderData.isPackageUnavailable) {
      isUnavailable = true;
      if (!unavailableName && orderData.unavailableItemName) {
        unavailableName = orderData.unavailableItemName;
      }
    }

    const newOrder: Order = {
      id: `RBX-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      ...orderData,
      customerLanguage: language,
      isPackageUnavailable: isUnavailable,
      unavailableItemName: isUnavailable ? (unavailableName || orderData.items[0]?.productName) : undefined,
      paymentStatus: isUnavailable ? 'review_required' : (orderData.paymentStatus || 'verifying'),
      deliveryStatus: isUnavailable ? 'unavailable' : (orderData.deliveryStatus || 'processing'),
      resolutionStatus: isUnavailable ? 'pending_choice' : undefined,
      adminNotes: isUnavailable 
        ? `⚠️ ALERT: Package unavailable upon request! Payment registered via ${orderData.paymentMethod.toUpperCase()} (Ref: ${orderData.transactionRef || 'N/A'}). Action required: Issue full refund or disburse alternative package.`
        : orderData.adminNotes,
    };

    // Rule 7: Notify the admin about every unavailable-package request
    if (isUnavailable) {
      const newAlert: AdminAlert = {
        id: `alert-${Date.now()}`,
        createdAt: new Date().toISOString(),
        orderId: newOrder.id,
        customerUsername: newOrder.robloxUsername,
        customerEmail: newOrder.customerEmail,
        packageName: unavailableName || newOrder.items[0]?.productName || 'Package',
        amountPaidUsd: newOrder.totalUsd,
        amountPaidInr: newOrder.totalInr,
        currencyUsed: newOrder.currencyUsed,
        paymentMethod: newOrder.paymentMethod,
        transactionRef: newOrder.transactionRef || 'N/A',
        status: 'action_required',
        notes: `Customer requested unavailable package. Customer offered instant refund or alternative package.`
      };
      setAdminAlerts(prev => [newAlert, ...prev]);
    }

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string, 
    paymentStatus: PaymentStatus, 
    deliveryStatus: DeliveryStatus, 
    adminNotes?: string
  ) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      return {
        ...order,
        paymentStatus,
        deliveryStatus,
        adminNotes: adminNotes !== undefined ? adminNotes : order.adminNotes,
        deliveryCode: deliveryStatus === 'completed' && !order.deliveryCode
          ? `RBX-CODE-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
          : order.deliveryCode
      };
    }));
  };

  const findOrder = (query: string): Order | undefined => {
    const trimmed = query.trim().toLowerCase();
    return orders.find(o => 
      o.id.toLowerCase() === trimmed || 
      o.robloxUsername.toLowerCase() === trimmed ||
      o.customerEmail.toLowerCase() === trimmed
    );
  };

  const requestOrderRefund = (orderId: string, details: RefundDetails) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      return {
        ...o,
        resolutionStatus: 'refund_requested',
        refundDetails: details,
        adminNotes: `REFUND REQUESTED: ${details.method.toUpperCase()} to ${details.destinationAddress}. Customer confirmed on ${details.requestedAt}.`
      };
    }));

    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder(prev => prev ? {
        ...prev,
        resolutionStatus: 'refund_requested',
        refundDetails: details,
      } : null);
    }

    // Update admin alert
    setAdminAlerts(prev => prev.map(a => {
      if (a.orderId !== orderId) return a;
      return {
        ...a,
        status: 'action_required',
        notes: `Customer requested 100% refund to: ${details.destinationAddress} (${details.method.toUpperCase()}).`
      };
    }));
  };

  const switchOrderPackage = (orderId: string, newProduct: Product) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      return {
        ...o,
        resolutionStatus: 'package_switched',
        switchedPackageName: newProduct.name,
        isPackageUnavailable: false,
        deliveryStatus: 'processing',
        adminNotes: `PACKAGE SWITCHED: Customer chose alternative available package "${newProduct.name}". Ready for disbursement.`
      };
    }));

    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder(prev => prev ? {
        ...prev,
        resolutionStatus: 'package_switched',
        switchedPackageName: newProduct.name,
        isPackageUnavailable: false,
        deliveryStatus: 'processing',
      } : null);
    }

    // Update matching admin alert
    setAdminAlerts(prev => prev.map(a => {
      if (a.orderId !== orderId) return a;
      return {
        ...a,
        status: 'package_swapped',
        notes: `Customer chose alternative package "${newProduct.name}".`
      };
    }));
  };

  // Review actions
  const addReview = (newRev: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'approved',
      ...newRev
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const approveReview = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'approved' } : r));
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setReviews(INITIAL_REVIEWS);
    setOrders(INITIAL_ORDERS);
    setStoreSettings(DEFAULT_STORE_SETTINGS);
    setCart([]);
    setAdminAlerts([]);
    localStorage.clear();
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        language,
        setLanguage,
        t,
        currency,
        setCurrency,
        convertUsdToInr,
        formatPrice,
        formatSavings,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        applyStorewideDiscount,
        checkPackageAvailability,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotalUsd,
        cartOriginalTotalUsd,
        cartSavingsUsd,
        orders,
        currentOrder,
        setCurrentOrder,
        createOrder,
        updateOrderStatus,
        findOrder,
        requestOrderRefund,
        switchOrderPackage,
        adminAlerts,
        dismissAdminAlert,
        reviews,
        addReview,
        approveReview,
        deleteReview,
        storeSettings,
        updateStoreSettings,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
