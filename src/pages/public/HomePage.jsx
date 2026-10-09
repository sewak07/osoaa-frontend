import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Truck
} from 'lucide-react';
import api from '../../services/api';
import { ProductCard } from '../../components/product/ProductCard';
import { DftqcTrustSection } from '../../components/trust/DftqcTrustSection';
import { useSettingsStore } from '../../store/settingsStore';

export const HomePage = () => {
  const { settings } = useSettingsStore();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [featRes, bestRes, catRes, banRes] = await Promise.all([
          api.get('/products/featured'),
          api.get('/products/best-sellers'),
          api.get('/categories'),
          api.get('/banners'),
        ]);

        setFeaturedProducts(featRes.data.data || []);
        setBestSellers(bestRes.data.data || []);
        setCategories(catRes.data.data || []);
        setBanners(banRes.data.data || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const heroBanner = banners.length > 0 ? banners[0] : null;

  return (
    <div className="space-y-16 lg:space-y-24 pb-20 bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
        
        {/* Background Image with Neutral Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBanner?.desktopImage?.url || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1800&auto=format&fit=crop&q=80'}
            alt="OSOAA Hero"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/80 to-gray-900/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-orange-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>{heroBanner?.badge || 'A Journey of Wellness • Nepal'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {heroBanner?.title ? (
                heroBanner.title
              ) : (
                <>
                  Fuel Your Potential with{' '}
                  <span className="text-orange-400">
                    100% Authentic
                  </span>{' '}
                  Nutrition.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl">
              {heroBanner?.subtitle || 'Ultra-pure whey protein isolate, micronized creatine, pre-workout and performance supplements tested under DFTQC quality testing standards.'}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to={heroBanner?.ctaLink || '/shop'}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-xl shadow-orange-md flex items-center gap-2 transition-all active:scale-95"
              >
                <span>{heroBanner?.ctaText || 'Shop Best Sellers'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop?category=protein"
                className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm rounded-xl backdrop-blur-md transition-all"
              >
                Explore Whey Protein
              </Link>
            </div>

            {/* Trust Highlights under Hero */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-700/80 text-xs text-gray-300">
              <div>
                <p className="text-base font-extrabold text-white">DFTQC</p>
                <p className="text-[11px]">Quality Standards Aligned</p>
              </div>
              <div>
                <p className="text-base font-extrabold text-white">100% Purity</p>
                <p className="text-[11px]">Zero Banned Substances</p>
              </div>
              <div>
                <p className="text-base font-extrabold text-white">Fast Delivery</p>
                <p className="text-[11px]">Across all 7 Provinces</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Browse by Category</span>
            <h2 className="text-2xl sm:text-3xl font-black text-black mt-1">Shop By Goal & Category</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/shop?category=${cat.slug}`}
              className="group relative p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-brand flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <img
                  src={cat.image?.url || 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=200&auto=format&fit=crop&q=80'}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-slate-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-widest">
              <Flame className="w-4 h-4 fill-current" />
              <span>Trending in Nepal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black">Best Selling Supplements</h2>
          </div>
          <Link to="/shop?sortBy=popular" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. DFTQC QUALITY STANDARDS TRUST SECTION */}
      <DftqcTrustSection />

      {/* 5. FEATURED / NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-slate-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Handpicked Formulations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black">Featured Performance Products</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
            <span>View Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. WHY CHOOSE OSOAA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">The OSOAA Difference</span>
            <h2 className="text-2xl sm:text-3xl font-black text-black">Why Athletes & Fitness Enthusiasts Choose OSOAA</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We eliminate counterfeit risks with direct sourcing, rigorous batch testing, and transparent nutritional profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-black">100% Sealed & Authentic</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct manufacturing and verified distribution ensures you never receive diluted or counterfeit products.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-black">Optimal Bioavailability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Formulated with premium isolates and micronized particles for rapid absorption, minimal bloating, and maximum recovery.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-black">Fast Nationwide Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Delivering straight to your doorstep across Kathmandu Valley and all major cities in Nepal in 2-4 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
