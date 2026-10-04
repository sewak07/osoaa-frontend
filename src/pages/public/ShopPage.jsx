import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../services/api';
import { ProductCard } from '../../components/product/ProductCard';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filters state from URL query params
  const categoryParam = searchParams.get('category') || '';
  const keywordParam = searchParams.get('keyword') || '';
  const sortByParam = searchParams.get('sortBy') || 'newest';
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  const inStockParam = searchParams.get('inStock') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  // Load Categories
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const catRes = await api.get('/categories');
        setCategories(catRes.data.data || []);
      } catch (err) {
        console.error('Failed to load filter metadata:', err);
      }
    };
    fetchMetadata();
  }, []);

  // Fetch Products on filter changes
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams(searchParams);
        const res = await api.get(`/products?${params.toString()}`);
        setProducts(res.data.products || []);
        setPagination(res.data.pagination || { page: 1, pages: 1, total: 0 });
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to page 1 on filter modification
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white min-h-[75vh]">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
            {categoryParam ? `Category: ${categoryParam.replace(/-/g, ' ')}` : keywordParam ? `Search: "${keywordParam}"` : 'All Products'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing {products.length} of {pagination.total} genuine wellness & sports supplements
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-orange-500" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
            <span className="text-slate-500 font-medium">Sort By:</span>
            <select
              value={sortByParam}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-white">Newest Arrivals</option>
              <option value="popular" className="bg-white">Most Popular</option>
              <option value="price-asc" className="bg-white">Price: Low to High</option>
              <option value="price-desc" className="bg-white">Price: High to Low</option>
              <option value="rating" className="bg-white">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block space-y-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h2 className="text-xs font-black text-brand-navy uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-orange-500" />
                <span>Filters</span>
              </h2>
              {(categoryParam || keywordParam || minPriceParam || maxPriceParam || inStockParam) && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-orange-600 hover:underline font-bold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Categories</h3>
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-2">
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    !categoryParam ? 'bg-brand-navy text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => handleFilterChange('category', cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                      categoryParam === cat.slug ? 'bg-brand-navy text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability Toggle */}
            <div className="pt-4 border-t border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockParam === 'true'}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked ? 'true' : '')}
                  className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-xs font-bold text-slate-700">In Stock Items Only</span>
              </label>
            </div>

          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3 space-y-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4 animate-pulse">
                  <div className="aspect-square bg-slate-200 rounded-xl" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <p className="text-base font-bold text-slate-900">No products found matching your filters.</p>
              <p className="text-xs text-slate-500">Try adjusting your keyword, category, or clear existing filters.</p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-orange-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[...Array(pagination.pages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                      pagination.page === pageNum
                        ? 'bg-orange-500 text-white shadow-orange-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>

      </div>

      {/* Mobile Filters Slide-over Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white p-6 space-y-6 flex flex-col justify-between shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-base font-black text-brand-navy">Filter Catalog</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-1 text-slate-500 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6">
                {/* Categories */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase">Categories</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => { handleFilterChange('category', ''); setIsMobileFiltersOpen(false); }}
                      className="w-full text-left text-xs py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-100"
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => { handleFilterChange('category', cat.slug); setIsMobileFiltersOpen(false); }}
                        className={`w-full text-left text-xs py-2 px-3 rounded-lg font-semibold ${
                          categoryParam === cat.slug ? 'bg-brand-navy text-white' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-orange-sm"
              >
                Apply Filters
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
