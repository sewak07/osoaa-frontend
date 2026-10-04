import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  RefreshCw,
  Lock,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

export const Footer = () => {
  const { settings } = useSettingsStore();

  const brandName = settings?.businessName || 'OSOAA';
  const tagline = settings?.tagline || 'A Journey of Wellness';
  const phone = settings?.contact?.phone || '';
  const email = settings?.contact?.email || '';
  const address = settings?.contact?.address || '';

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-navy-700/80">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 text-orange-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">NABL Tested</h4>
              <p className="text-xs text-navy-200">Verified lab testing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 text-orange-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Nationwide Delivery</h4>
              <p className="text-xs text-navy-200">Across Nepal in 2-4 days</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 text-orange-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Secure eSewa & COD</h4>
              <p className="text-xs text-navy-200">100% safe transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 text-orange-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Authentic</h4>
              <p className="text-xs text-navy-200">Genuine sealed batches</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-3xl tracking-wider text-white">
                {brandName}
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
            </div>
            <p className="text-xs text-orange-400 font-bold tracking-widest uppercase">
              {tagline}
            </p>
            <p className="text-xs text-navy-100 leading-relaxed max-w-sm">
              Nepal's trusted wellness & sports nutrition brand. Delivering ultra-pure whey protein, micronized creatine, pre-workout, and fitness gear formulated for peak health and athletic excellence.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href={settings?.socialLinks?.facebook || 'https://facebook.com'} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-navy-800 hover:bg-orange-500 text-white transition" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={settings?.socialLinks?.instagram || 'https://instagram.com'} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-navy-800 hover:bg-orange-500 text-white transition" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={settings?.socialLinks?.youtube || 'https://youtube.com'} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-navy-800 hover:bg-orange-500 text-white transition" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/shop?category=protein" className="text-navy-100 hover:text-orange-400 transition">Whey Protein</Link></li>
              <li><Link to="/shop?category=creatine" className="text-navy-100 hover:text-orange-400 transition">Creatine Monohydrate</Link></li>
              <li><Link to="/shop?category=pre-workout" className="text-navy-100 hover:text-orange-400 transition">Pre-Workout</Link></li>
              <li><Link to="/shop?category=mass-gainer" className="text-navy-100 hover:text-orange-400 transition">Mass Gainer</Link></li>
              <li><Link to="/shop?category=amino-acids-bcaa" className="text-navy-100 hover:text-orange-400 transition">Amino Acids & BCAA</Link></li>
              <li><Link to="/shop?category=gym-accessories-shakers" className="text-navy-100 hover:text-orange-400 transition">Gym Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">Customer Service</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/blog" className="text-orange-400 hover:text-white font-semibold transition">Blog & Wellness Hub</Link></li>
              <li><Link to="/blog?category=nepali-blog" className="text-navy-100 hover:text-orange-400 transition">नेपाली स्वास्थ्य ब्लग (Nepali)</Link></li>
              <li><Link to="/blog?category=recipes" className="text-navy-100 hover:text-orange-400 transition">Healthy Protein Recipes</Link></li>
              <li><Link to="/order-tracking" className="text-navy-100 hover:text-orange-400 transition">Track Your Order</Link></li>
              <li><Link to="/about" className="text-navy-100 hover:text-orange-400 transition">About OSOAA</Link></li>
              <li><Link to="/contact" className="text-navy-100 hover:text-orange-400 transition">Contact Us</Link></li>
              <li><Link to="/faq" className="text-navy-100 hover:text-orange-400 transition">Frequently Asked Questions</Link></li>
              <li><Link to="/shipping-policy" className="text-navy-100 hover:text-orange-400 transition">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="text-navy-100 hover:text-orange-400 transition">Return & Refund Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-navy-100 hover:text-orange-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="text-navy-100 hover:text-orange-400 transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">Contact Us</h4>
            <ul className="space-y-3 text-xs text-navy-100">
              {address && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>{address}</span>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{phone}</span>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-orange-400 transition">{email}</a>
                </li>
              )}
            </ul>

            <div className="pt-3 border-t border-navy-700">
              <p className="text-[11px] text-navy-200 mb-1.5">Official Payment Methods:</p>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-white/10 text-emerald-300 rounded-lg text-[11px] font-bold">
                  eSewa
                </span>
                <span className="px-2.5 py-1 bg-white/10 text-white rounded-lg text-[11px] font-medium">
                  Cash on Delivery (COD)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-navy-700/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-navy-300">
          <p>© {new Date().getFullYear()} {brandName} Nepal. All rights reserved.</p>
          <p className="text-center md:text-right">
            Pricing displayed in Nepalese Rupees (NPR). All supplements laboratory batch-tested.
          </p>
        </div>

      </div>
    </footer>
  );
};
