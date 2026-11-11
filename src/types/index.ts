export type CategoryId = 'robux' | 'skins' | 'giftcards' | 'gameitems' | 'membership';

export type Currency = 'USD' | 'INR';

export type FulfillmentType = 
  | 'instant_digital_code' 
  | 'vip_server_trade' 
  | 'direct_account_deposit' 
  | 'game_pass_transfer';

export interface RobloxCatalogItem {
  id: number;
  name: string;
  description: string;
  itemType: 'Asset' | 'Bundle' | 'UserOutfit';
  assetType?: number;
  bundleType?: number;
  creatorName: string;
  creatorHasVerifiedBadge?: boolean;
  price: number; // in Robux
  lowestPrice?: number;
  lowestResalePrice?: number;
  priceStatus?: string; // 'Free' | 'OffSale' | 'Collectible' | etc.
  unitsAvailableForConsumption?: number;
  favoriteCount: number;
  thumbnailUrl: string;
  category: 'bundles' | 'outfits' | 'hair' | 'faces' | 'hats' | 'clothing' | 'accessories' | 'limiteds';
  categoryLabel: string;
  itemRestrictions?: string[];
  isLimited?: boolean;
  robloxUrl: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  subcategory?: string;
  description: string;
  robuxAmount?: number;
  denomination?: number;
  membershipTier?: string;
  originalPriceUsd: number;
  salePriceUsd: number;
  isDiscounted: boolean;
  discountPercent: number;
  image: string;
  badge?: string;
  inStock: boolean;
  stockCount: number;
  salesCount: number;
  rating: number;
  reviewsCount: number;
  fulfillmentType: FulfillmentType;
  deliveryTimeEstimate: string;
  features?: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Language = 'en' | 'hi' | 'tr' | 'es' | 'de' | 'fr';

export type PaymentMethod = 'upi' | 'card' | 'crypto_bep20' | 'crypto_trc20';

export type PaymentStatus = 
  | 'pending' 
  | 'verifying' 
  | 'completed' 
  | 'failed' 
  | 'review_required' 
  | 'refunded';

export type DeliveryStatus = 
  | 'queued' 
  | 'processing' 
  | 'completed' 
  | 'unavailable' 
  | 'refunded' 
  | 'exchanged';

export interface OrderItem {
  productId: string;
  productName: string;
  category: CategoryId;
  quantity: number;
  unitPriceUsd: number;
  unitPriceInr: number;
  robuxAmount?: number;
  image: string;
  inStock?: boolean;
}

export interface RefundDetails {
  method: 'upi' | 'crypto';
  destinationAddress: string;
  requestedAt: string;
}

export interface Order {
  id: string;
  createdAt: string;
  robloxUsername: string;
  customerEmail: string;
  country: 'IN' | 'INTL';
  items: OrderItem[];
  totalUsd: number;
  totalInr: number;
  currencyUsed: Currency;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  transactionRef?: string;
  paymentProofName?: string;
  deliveryCode?: string;
  adminNotes?: string;
  // Package availability & customer resolution flags
  isPackageUnavailable?: boolean;
  unavailableItemName?: string;
  resolutionStatus?: 'pending_choice' | 'refund_requested' | 'package_switched' | 'resolved';
  refundDetails?: RefundDetails;
  switchedPackageName?: string;
  customerLanguage?: Language;
}

export interface AdminAlert {
  id: string;
  createdAt: string;
  orderId: string;
  customerUsername: string;
  customerEmail: string;
  packageName: string;
  amountPaidUsd: number;
  amountPaidInr: number;
  currencyUsed: Currency;
  paymentMethod: PaymentMethod;
  transactionRef: string;
  status: 'action_required' | 'refund_processed' | 'package_swapped';
  notes?: string;
}

export interface Review {
  id: string;
  productId?: string;
  productName: string;
  author: string;
  robloxUsername: string;
  rating: number;
  date: string;
  content: string;
  verifiedPurchase: boolean;
  userCountry: string;
  avatarSeed: string;
  status: 'approved' | 'pending';
}

export interface StoreSettings {
  usdToInrRate: number;
  upiId: string;
  upiMerchantName: string;
  cryptoBep20Address: string;
  cryptoTrc20Address: string;
  storewideDiscountActive: boolean;
  bannerNotice: string;
  enableUpiQr: boolean;
  customUpiQrImage?: string;
  customBep20QrImage?: string;
  customTrc20QrImage?: string;
}
