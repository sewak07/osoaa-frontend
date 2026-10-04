import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Package,
  LogOut,
  LayoutDashboard,
  ChevronDown
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useSettingsStore } from '../../store/settingsStore';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, logout } = useAuthStore();
  const { openDrawer, getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { settings } = useSettingsStore();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/shop?keyword=${encodeURIComponent(searchKeyword.trim())}`);
      setIsSearchOpen(false);
      setSearchKeyword('');
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const brandName = settings?.businessName || 'OSOAA';
  const tagline = settings?.tagline || 'A Journey of Wellness';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-black focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo & Slogan */}
          <Link to="/" className="flex flex-col items-start group">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-2xl sm:text-3xl tracking-wider text-black">
                {brandName}
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
            </div>
            <span className="text-[10px] sm:text-xs text-black/80 font-semibold tracking-widest uppercase group-hover:text-orange-600 transition">
              {tagline}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/"
              className={`text-sm font-semibold transition pb-1 border-b-2 ${location.pathname === '/' ? 'text-orange-500 border-orange-500' : 'text-slate-700 border-transparent hover:text-orange-500'
                }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-sm font-semibold transition pb-1 border-b-2 ${location.pathname === '/shop' && !location.search ? 'text-orange-500 border-orange-500' : 'text-slate-700 border-transparent hover:text-orange-500'
                }`}
            >
              Shop All
            </Link>
            <Link
              to="/shop?category=protein"
              className={`text-sm font-semibold transition pb-1 border-b-2 ${location.search.includes('category=protein') ? 'text-orange-500 border-orange-500' : 'text-slate-700 border-transparent hover:text-orange-500'
                }`}
            >
              Proteins
            </Link>
            <Link
              to="/shop?category=creatine"
              className={`text-sm font-semibold transition pb-1 border-b-2 ${location.search.includes('category=creatine') ? 'text-orange-500 border-orange-500' : 'text-slate-700 border-transparent hover:text-orange-500'
                }`}
            >
              Creatine
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-semibold transition pb-1 border-b-2 ${location.pathname === '/blog' ? 'text-orange-500 border-orange-500' : 'text-slate-700 border-transparent hover:text-orange-500'
                }`}
            >
              Blog & Recipes
            </Link>
            <Link
              to="/about"
              className={`text-sm font-semibold transition pb-1 border-b-2 ${location.pathname === '/about' ? 'text-orange-500 border-orange-500' : 'text-slate-700 border-transparent hover:text-orange-500'
                }`}
            >
              About OSOAA
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-semibold transition pb-1 border-b-2 ${location.pathname === '/contact' ? 'text-orange-500 border-orange-500' : 'text-slate-700 border-transparent hover:text-orange-500'
                }`}
            >
              Contact
            </Link>
            <Link
              to="/order-tracking"
              className="text-sm font-semibold text-slate-600 hover:text-orange-500 flex items-center gap-1 transition"
            >
              <Package className="w-4 h-4 text-orange-500" />
              <span>Track Order</span>
            </Link>
          </nav>

          {/* Search, Wishlist, Account, Cart Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Bar Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-700 hover:text-orange-500 hover:bg-slate-100 rounded-lg transition"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/account/wishlist"
              className="relative p-2 text-slate-700 hover:text-rose-500 hover:bg-slate-100 rounded-lg transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openDrawer}
              className="relative p-2 text-slate-700 hover:text-orange-500 hover:bg-slate-100 rounded-lg transition"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {getItemCount() > 0 && (
                <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-orange-sm animate-pulse">
                  {getItemCount()}
                </span>
              )}
            </button>

            {/* User Account Menu */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold shadow-sm transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Login</span>
                </Link>
              )}

              {/* User Dropdown */}
              {user && isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>

                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-slate-50 transition font-bold"
                    >
                      <LayoutDashboard className="w-4 h-4 text-orange-500" />
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    to="/account/orders"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition font-medium"
                  >
                    <Package className="w-4 h-4 text-slate-400" />
                    My Orders
                  </Link>

                  <Link
                    to="/account/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition font-medium"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition border-t border-slate-100 mt-1 font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown Input */}
        {isSearchOpen && (
          <div className="py-4 border-t border-slate-200 animate-in fade-in">
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search whey protein, creatine, pre-workout, gym accessories..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                autoFocus
                className="w-full pl-12 pr-28 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white shadow-inner"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <button
                type="submit"
                className="absolute right-2 top-2 px-5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg shadow-sm transition"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top-4">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-orange-500"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-orange-500"
          >
            Shop All Products
          </Link>
          <Link
            to="/shop?category=protein"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-orange-500"
          >
            Proteins & Isolates
          </Link>
          <Link
            to="/shop?category=creatine"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-orange-500"
          >
            Micronized Creatine
          </Link>
          <Link
            to="/shop?category=pre-workout"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-orange-500"
          >
            Pre-Workout Formulas
          </Link>
          <Link
            to="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-orange-500"
          >
            Blog & Healthy Recipes
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-orange-500"
          >
            About OSOAA & NABL Lab Quality
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-orange-500"
          >
            Contact Us
          </Link>
          <Link
            to="/order-tracking"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-orange-600"
          >
            Track Your Order
          </Link>

          {!user && (
            <div className="pt-4 border-t border-slate-200 flex gap-3">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-2.5 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-xl"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-2.5 text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
