import React from 'react';
import { useStore, PageId } from '../context/StoreContext';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  icon: any;
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, subtitle, icon: Icon, children }) => {
  const { setActivePage } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center gap-3 border-b border-[#1c1c28] pb-4">
        <button
          onClick={() => setActivePage('home')}
          className="p-2 bg-[#12121a] hover:bg-[#1a1a24] text-zinc-400 hover:text-white rounded-lg border border-[#222230]"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase">
            <Icon className="w-3.5 h-3.5" /> LEGAL DOCUMENTATION
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            {title}
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="bg-[#0e0e14] border border-[#20202c] rounded-2xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export const RefundPolicyPage: React.FC = () => {
  return (
    <LegalLayout
      title="REFUND & BUYER GUARANTEE POLICY"
      subtitle="Comprehensive 100% money-back fulfillment protection guidelines"
      icon={ShieldCheck}
    >
      <div className="space-y-4">
        <h3 className="font-display font-bold text-white text-base">1. 100% Money-Back Guarantee</h3>
        <p>
          At ROBLOX STORE, customer trust and transaction safety are our top priorities. If any ordered Robux package, digital gift card key, skin bundle, or in-game item is not delivered to your specified Roblox username or email within 60 minutes of payment verification, you are entitled to a full 100% refund without penalty.
        </p>

        <h3 className="font-display font-bold text-white text-base">2. Ineligible Situations</h3>
        <p>Refunds cannot be issued under the following circumstances:</p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-2">
          <li>Incorrect username provided by the buyer where delivery was successfully completed to that account.</li>
          <li>Digital gift card codes that have already been verified as redeemed in the official Roblox portal.</li>
          <li>Change of mind after the virtual goods have been transferred into the user's inventory.</li>
        </ul>

        <h3 className="font-display font-bold text-white text-base">3. Payment Channel Refund Protocol</h3>
        <p>
          UPI refunds in India are returned directly to the originating VPA within 12 to 24 hours. International crypto transactions are returned in USDT to the sender address (minus standard blockchain network transfer gas fees).
        </p>

        <h3 className="font-display font-bold text-white text-base">4. Dispute Escalation</h3>
        <p>
          If you encounter any discrepancy, please contact our 24/7 Live Support Desk or email <strong className="text-white">support@robloxstore.gg</strong> with your Order ID and payment UTR/TxHash.
        </p>
      </div>
    </LegalLayout>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <LegalLayout
      title="PRIVACY & CREDENTIAL SECURITY POLICY"
      subtitle="Strict zero-password requirement and data confidentiality"
      icon={Lock}
    >
      <div className="space-y-4">
        <h3 className="font-display font-bold text-white text-base">1. Zero-Credential Architecture</h3>
        <p>
          ROBLOX STORE adheres strictly to a zero-password architecture. We will never ask, record, or store your Roblox account password, 2FA credentials, or private authentication cookies. We only collect public usernames for delivery fulfillment.
        </p>

        <h3 className="font-display font-bold text-white text-base">2. Information We Collect</h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-2">
          <li><strong>Roblox Username:</strong> Utilized strictly to route player disbursements and verify in-game trade sessions.</li>
          <li><strong>Email Address:</strong> Utilized to transmit order confirmations, purchase receipts, and digital backup codes.</li>
          <li><strong>Transaction Metadata:</strong> UPI UTR reference or Crypto TxHash used to audit and confirm payments.</li>
        </ul>

        <h3 className="font-display font-bold text-white text-base">3. Data Protection & Encryption</h3>
        <p>
          All communications between your browser and our servers are encrypted via industry-standard SSL/TLS 256-bit protocols. We never sell, lease, or monetize customer identity data to third-party advertisers.
        </p>
      </div>
    </LegalLayout>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <LegalLayout
      title="TERMS & CONDITIONS"
      subtitle="Standard marketplace usage, virtual product agreements, and trademark notices"
      icon={FileText}
    >
      <div className="space-y-4">
        <h3 className="font-display font-bold text-white text-base">1. Acceptance of Terms</h3>
        <p>
          By accessing and placing orders on ROBLOX STORE, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.
        </p>

        <h3 className="font-display font-bold text-white text-base">2. Nature of Virtual Goods</h3>
        <p>
          All items listed on this platform are intangible digital assets, including virtual platform currency (Robux), avatar accessories, digital gift card keys, and in-game privileges. Ownership of virtual items is subject to platform ecosystem terms.
        </p>

        <h3 className="font-display font-bold text-white text-base">3. Trademark & Brand Notice</h3>
        <p className="bg-[#12121c] p-3.5 rounded-xl border border-[#222232] text-zinc-400">
          ROBLOX STORE is an independent commercial platform. Roblox, Robux, and all affiliated characters, trademarks, and registered copyrights belong to Roblox Corporation. ROBLOX STORE is not officially endorsed by, sponsored by, or affiliated with Roblox Corporation.
        </p>

        <h3 className="font-display font-bold text-white text-base">4. User Obligations</h3>
        <p>
          Buyers warrant that all funds utilized for purchases belong to them lawfully and that they are authorized account holders of the Roblox username provided at checkout.
        </p>
      </div>
    </LegalLayout>
  );
};
