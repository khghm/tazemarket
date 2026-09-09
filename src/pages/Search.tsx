import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useThemeStore } from '../store/themeStore';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const isDark = useThemeStore((s) => s.isDark);
  const [sortBy, setSortBy] = useState<'relevant' | 'cheapest' | 'expensive' | 'discount'>('relevant');
  const [inStockOnly, setInStockOnly] = useState(false);

  const results = useMemo(() => {
    const q = query.toLowerCase();
    let filtered = products.filter((p) =>
      p.name.includes(q) || p.brand.toLowerCase().includes(q) || p.description.includes(q) || p.category.includes(q)
    );

    // Fuzzy search - suggest similar products
    if (filtered.length === 0 && q.length > 2) {
      filtered = products.filter((p) =>
        p.name.split('').some((char) => q.includes(char)) || p.brand.toLowerCase().includes(q.slice(0, 2))
      ).slice(0, 10);
    }

    if (inStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    switch (sortBy) {
      case 'cheapest':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'expensive':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        // Prioritize in-stock items
        filtered.sort((a, b) => {
          if (a.inStock && !b.inStock) return -1;
          if (!a.inStock && b.inStock) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [query, sortBy, inStockOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {query ? (
            <>نتایج جستجو برای: <span className="text-green-600">«{query}»</span></>
          ) : (
            'جستجو در محصولات'
          )}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{results.length} محصول یافت شد</p>
      </div>

      {/* Filters Bar */}
      <div className={`flex items-center gap-3 mb-6 p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2 flex-1">
          <SlidersHorizontal size={16} className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className={`text-sm bg-transparent outline-none ${isDark ? 'text-white' : 'text-gray-700'}`}
          >
            <option value="relevant">مرتبط‌ترین</option>
            <option value="cheapest">ارزان‌ترین</option>
            <option value="expensive">گران‌ترین</option>
            <option value="discount">بیشترین تخفیف</option>
          </select>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-green-600"
          />
          <span className="text-sm text-gray-500">فقط موجود</span>
        </label>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={`text-center py-20 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>نتیجه‌ای یافت نشد</h3>
          <p className="text-sm text-gray-500 mb-4">عبارت جستجوی خود را تغییر دهید یا از دسته‌بندی‌ها استفاده کنید</p>
          <Link to="/" className="text-green-600 hover:text-green-700 text-sm font-medium">بازگشت به صفحه اصلی</Link>
        </div>
      )}
    </div>
  );
}
