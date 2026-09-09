import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, Product } from '../data/products';
import { categories } from '../data/categories';
import { useThemeStore } from '../store/themeStore';

export default function CategoryPage() {
  const { id } = useParams();
  const isDark = useThemeStore((s) => s.isDark);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const category = categories.find((c) => c.id === id);
  const subcategories = category?.subcategories || [];

  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (id) {
      result = result.filter((p) => p.category === id);
    }
    if (activeSubcategory) {
      result = result.filter((p) => p.subcategory === activeSubcategory);
    }
    if (onlyDiscounted) {
      result = result.filter((p) => p.discount && p.discount > 0);
    }
    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...result].sort((a, b) => b.price - a.price);
      case 'rating': return [...result].sort((a, b) => b.rating - a.rating);
      case 'discount': return [...result].sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default: return [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [id, activeSubcategory, sortBy, priceRange, selectedBrands, onlyDiscounted, onlyInStock]);

  const allBrands = useMemo(() => {
    const catProducts = id ? products.filter(p => p.category === id) : products;
    return [...new Set(catProducts.map(p => p.brand))];
  }, [id]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category?.icon}</span>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {category?.name || 'همه محصولات'}
          </h1>
          <span className={`text-sm px-3 py-1 rounded-full ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
            {filteredProducts.length} محصول
          </span>
        </div>
        {category?.description && (
          <p className="text-sm text-slate-500">{category.description}</p>
        )}
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setActiveSubcategory(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              !activeSubcategory
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                : isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            همه
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubcategory(sub.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeSubcategory === sub.id
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                  : isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className={`flex items-center justify-between p-4 rounded-2xl mb-6 ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
        >
          <SlidersHorizontal size={16} />
          <span className="text-sm font-medium">فیلترها</span>
        </button>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2.5 rounded-xl text-sm ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'} border outline-none`}
          >
            <option value="popular">پربازدیدترین</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
            <option value="rating">بالاترین امتیاز</option>
            <option value="discount">بیشترین تخفیف</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className={`w-72 shrink-0 rounded-2xl p-5 h-fit sticky top-32 ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>فیلترها</h3>
              <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>محدوده قیمت</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="600000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-green-600"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{priceRange[0].toLocaleString()} ت</span>
                  <span>{priceRange[1].toLocaleString()} ت</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>برند</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {allBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 accent-green-600 rounded"
                    />
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>فقط تخفیف‌دار</span>
                <input
                  type="checkbox"
                  checked={onlyDiscounted}
                  onChange={(e) => setOnlyDiscounted(e.target.checked)}
                  className="w-5 h-5 accent-green-600 rounded"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>فقط موجود</span>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-5 h-5 accent-green-600 rounded"
                />
              </label>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
              <p className="text-4xl mb-4">🔍</p>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>محصولی یافت نشد</p>
              <p className="text-sm text-slate-500 mt-2">فیلترها را تغییر دهید</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
