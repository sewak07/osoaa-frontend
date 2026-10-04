import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Layers, 
  Award, 
  MessageSquare, 
  Tag, 
  Image, 
  Settings, 
  ArrowLeft,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Products Catalog', path: '/admin/products', icon: Package },
    { name: 'Blog & Content Hub', path: '/admin/blog', icon: BookOpen },
    { name: 'Orders & Fulfillment', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers & Users', path: '/admin/customers', icon: Users },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Customer Reviews', path: '/admin/reviews', icon: MessageSquare },
    { name: 'Discount Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Hero Banners', path: '/admin/banners', icon: Image },
    { name: 'Business & NABL Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-5 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        
        {/* Admin Brand Pill */}
        <div className="flex items-center gap-2 px-2">
          <div className="p-2 rounded-xl bg-orange-500 text-white font-black font-display text-sm">
            ADM
          </div>
          <div>
            <h2 className="font-bold text-white text-sm">OSOAA Admin</h2>
            <p className="text-[10px] text-orange-400 font-mono font-medium">Production Portal</p>
          </div>
        </div>

        {/* Links Navigation */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Footer Return Link */}
      <div className="pt-6 border-t border-slate-800">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Storefront</span>
        </Link>
      </div>
    </aside>
  );
};
