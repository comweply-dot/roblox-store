import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Clock, 
  Mail, 
  Headphones, 
  Check, 
  HelpCircle,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export const ContactPage: React.FC = () => {
  const { setActivePage } = useStore();

  // Contact Form State
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketOrderId, setTicketOrderId] = useState('');
  const [ticketSubject, setTicketSubject] = useState('Order Delivery Assistance');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Live Chat Simulator State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Hello! I am Agent Jax from ROBLOX STORE 24/7 Support. How can I assist you with your Robux order, UPI payment, or game pass delivery today?',
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const query = chatInput.toLowerCase();
    setChatInput('');

    // Dynamic intelligent reply simulation
    setTimeout(() => {
      let reply = 'Thank you for reaching out! Our dispatch system is operating at full capacity. For instant tracking, check the Track Order page with your Order ID or username.';
      if (query.includes('upi') || query.includes('utr')) {
        reply = 'For UPI payments: Once you transfer the amount to our verified VPA, enter your 12-digit UTR on checkout. Verification completes automatically in 1–2 minutes.';
      } else if (query.includes('robux') || query.includes('delivery') || query.includes('how long')) {
        reply = 'Robux packages are disbursed via automated VIP group payout directly to your Roblox username. Delivery takes 1–3 minutes after payment confirmation.';
      } else if (query.includes('crypto') || query.includes('usdt')) {
        reply = 'We support USDT on both BEP20 (BNB Smart Chain) and TRC20 (Tron). Enter your transaction hash (TxHash) after sending to complete instant verification.';
      } else if (query.includes('password')) {
        reply = 'ROBLOX STORE will NEVER ask for your password or email verification pin. We only need your public username.';
      }

      const agentMsg: ChatMessage = {
        id: `agt-${Date.now()}`,
        sender: 'agent',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, agentMsg]);
    }, 1000);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => setTicketSubmitted(false), 5000);
    setTicketName('');
    setTicketEmail('');
    setTicketOrderId('');
    setTicketMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
          <Headphones className="w-3.5 h-3.5" /> 24/7 GAMER SUPPORT DESK
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          CONTACT US & LIVE SUPPORT
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
          Need help with an order, payment verification, or gift card redemption? Chat directly with an agent or submit an inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Interactive Live Support Chat Simulator (7 cols) */}
        <div className="lg:col-span-7 bg-[#0e0e14] border border-[#20202c] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
          {/* Chat Header */}
          <div className="p-4 bg-[#12121c] border-b border-[#20202e] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-rose-400 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-sm block">
                  Agent Jax (Live Support)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Online · Avg. response: under 1 min
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 bg-black/40 px-2.5 py-1 rounded border border-white/5">
              24/7 Live Agent
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0a0f]">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-red-600 text-white rounded-br-none shadow-md'
                      : 'bg-[#151520] text-zinc-200 border border-[#262638] rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-zinc-500 font-mono mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2 bg-[#0e0e14] border-t border-[#181822] flex gap-2 overflow-x-auto text-[11px]">
            {['How does Robux delivery work?', 'UPI payment verification', 'USDT crypto networks', 'Where is my gift card code?'].map(prompt => (
              <button
                key={prompt}
                type="button"
                onClick={() => setChatInput(prompt)}
                className="px-2.5 py-1 rounded bg-[#161622] text-zinc-400 hover:text-white hover:bg-[#202030] whitespace-nowrap shrink-0 border border-[#262638] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#111118] border-t border-[#1e1e2a] flex gap-2">
            <input
              type="text"
              placeholder="Type your question or order number..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-[#171724] border border-[#2a2a3e] rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Contact Inquiry Ticket Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#0e0e14] border border-[#20202c] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="border-b border-[#1c1c28] pb-3">
            <h3 className="font-display font-bold text-white text-base">
              Submit an Official Support Ticket
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Direct escalation for payment issues, bulk purchases, or partnership inquiries.
            </p>
          </div>

          {ticketSubmitted && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Ticket #{Math.floor(10000 + Math.random() * 90000)} created! An agent will respond via email within 15 minutes.</span>
            </div>
          )}

          <form onSubmit={handleSubmitTicket} className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Singh"
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
                className="w-full bg-[#14141c] border border-[#262638] rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="yourname@gmail.com"
                value={ticketEmail}
                onChange={(e) => setTicketEmail(e.target.value)}
                className="w-full bg-[#14141c] border border-[#262638] rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Order ID (Optional)</label>
              <input
                type="text"
                placeholder="e.g. RBX-94812"
                value={ticketOrderId}
                onChange={(e) => setTicketOrderId(e.target.value)}
                className="w-full bg-[#14141c] border border-[#262638] rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Inquiry Topic</label>
              <select
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full bg-[#14141c] border border-[#262638] rounded-xl px-3 py-2 text-white"
              >
                <option value="Order Delivery Assistance">Order Delivery Assistance</option>
                <option value="Payment / UPI Verification">Payment / UPI Verification</option>
                <option value="Gift Card Redemption">Gift Card Redemption</option>
                <option value="Refund Request">Refund Request</option>
                <option value="Wholesale & Bulk Inquiries">Wholesale & Bulk Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Message *</label>
              <textarea
                required
                rows={3}
                placeholder="Provide as much detail as possible..."
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                className="w-full bg-[#14141c] border border-[#262638] rounded-xl px-3 py-2 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg"
            >
              Submit Ticket
            </button>
          </form>

          <div className="pt-2 text-[11px] text-zinc-500 space-y-1">
            <p><strong>Support Email:</strong> support@robloxstore.gg</p>
            <p><strong>Operating Hours:</strong> 24 Hours / 7 Days a Week</p>
          </div>
        </div>

      </div>

    </div>
  );
};
