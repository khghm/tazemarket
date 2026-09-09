import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, X, ChevronLeft, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { useThemeStore } from '../store/themeStore';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const isDark = useThemeStore((s) => s.isDark);
  const [sortBy, setSortBy] = useState<'popular' | 'cheapest' | 'expensive' | 'discount'>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find((c) => c.id === categoryId);
  const categoryProducts = products.filter((p) => p.category === categoryId);
  const brands = [...new Set(categoryProducts.map((p) => p.brand))];

  const filteredProducts = useMemo(() => {
    let result = categoryProducts.filter((p) => {
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });

    switch (sortBy) {
      case 'cheapest':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'expensive':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [categoryProducts, sortBy, priceRange, selectedBrand, inStockOnly]);

  const resetFilters = () => {
    setPriceRange([0, 1000000]);
    setSelectedBrand('');
    setInStockOnly(false);
    setSortBy('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className={`flex items-center gap-2 text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <Link to="/" className="hover:text-green-600">خانه</Link>
        <ChevronLeft size={14} />
        <span className={isDark ? 'text-white' : 'text-gray-800'}>{category?.name}</span>
      </div>

      {/* Category Header */}
      <div className={`flex items-center gap-4 mb-6 p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <span className="text-5xl">{category?.icon}</span>
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{category?.name}</h1>
          <p className="text-sm text-gray-500">{categoryProducts.length} محصول</p>
        </div>
      </div>

      {/* Subcategories */}
      {category && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6">
          {category.subcategories.map((sub) => (
            <button
              key={sub.id}
              className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-green-50 border border-gray-200 text-gray-700'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors md:hidden ${
            isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-300' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
          }`}
        >
          <SlidersHorizontal size={16} />
          <span className="text-sm">فیلترها</span>
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>مرتب‌سازی:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className={`px-3 py-2 rounded-xl text-sm border outline-none ${
              isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-700'
            }`}
          >
            <option value="popular">محبوب‌ترین</option>
            <option value="cheapest">ارزان‌ترین</option>
            <option value="expensive">گران‌ترین</option>
            <option value="discount">بیشترین تخفیف</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters - Desktop */}
        <aside className={`hidden md:block w-64 shrink-0 space-y-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <Filter size={16} />
              فیلترها
            </h3>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">محدوده قیمت</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  placeholder="از"
                  className={`w-full px-3 py-2 rounded-lg text-sm border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                />
                <span className="text-xs text-gray-500">تا</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  placeholder="تا"
                  className={`w-full px-3 py-2 rounded-lg text-sm border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium">برند</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-sm border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              >
                <option value="">همه برندها</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* In Stock */}
            <div className="mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm">فقط کالاهای موجود</span>
              </label>
            </div>

            <button
              onClick={resetFilters}
              className="w-full mt-4 py-2 text-sm text-red-500 hover:text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              حذف فیلترها
            </button>
          </div>
        </aside>

        {/* Mobile Filters Overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
            <div className={`absolute right-0 top-0 bottom-0 w-80 p-6 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">فیلترها</h3>
                <button onClick={() => setShowFilters(false)}><X size={24} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">محدوده قیمت (تومان)</label>
                  <div className="flex gap-2">
                    <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className={`flex-1 px-3 py-2 rounded-lg text-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`} />
                    <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className={`flex-1 px-3 py-2 rounded-lg text-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">برند</label>
                  <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className={`w-full px-3 py-2 rounded-lg text-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <option value="">همه</option>
                    {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="w-4 h-4 rounded" />
                  <span className="text-sm">فقط موجود</span>
                </label>
                <button onClick={() => { resetFilters(); setShowFilters(false); }} className="w-full py-3 bg-red-500 text-white rounded-xl">حذف فیلترها</button>
              </div>
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
            <div className={`text-center py-20 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <span className="text-5xl mb-4 block">🔍</span>
              <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>محصولی با این فیلترها یافت نشد</p>
              <button onClick={resetFilters} className="mt-4 text-green-600 hover:text-green-700 text-sm font-medium">حذف فیلترها</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
