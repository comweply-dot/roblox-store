/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';

// Pages
import { HomePage } from './pages/HomePage';
import { RobuxPage } from './pages/RobuxPage';
import { SkinsPage } from './pages/SkinsPage';
import { GiftCardsPage } from './pages/GiftCardsPage';
import { GameItemsPage } from './pages/GameItemsPage';
import { MembershipPage } from './pages/MembershipPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderTrackPage } from './pages/OrderTrackPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AdminPage } from './pages/AdminPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { RefundPolicyPage, PrivacyPolicyPage, TermsPage } from './pages/LegalPages';

const MainLayout: React.FC = () => {
  const { activePage, selectedProduct, setSelectedProduct } = useStore();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'robux':
        return <RobuxPage />;
      case 'skins':
        return <SkinsPage />;
      case 'giftcards':
        return <GiftCardsPage />;
      case 'gameitems':
        return <GameItemsPage />;
      case 'membership':
        return <MembershipPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'orders':
        return <OrdersPage />;
      case 'track':
        return <OrderTrackPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'admin':
        return <AdminPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'refund-policy':
        return <RefundPolicyPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Global Shopping Cart Slide-over Drawer */}
      <CartDrawer />

      {/* Global Product Details & Specs Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
