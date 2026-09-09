import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Moon, Sun, Menu, X, User, MapPin, Clock, Zap } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';
import { products } from '../data/products';
import { categories } from '../data/categories';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const navigate = useNavigate();
  const cartCount = useCartStore((s) => s.getItemCount());
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const searchRef = useRef<HTMLDivElement>(null);

  // Flash deal timer
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const flashProduct = products.find(p => p.flashDeal);
      if (flashProduct?.flashDealEnd) {
        const diff = flashProduct.flashDealEnd - Date.now();
        if (diff > 0) {
          const h = Math.floor(diff / 3600000);
          const m = Math.floor((diff % 3600000) / 60000);
          const s = Math.floor((diff % 60000) / 1000);
          setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const query = searchQuery.toLowerCase();
      const results = products.filter(
        (p) => p.name.includes(query) || p.brand.toLowerCase().includes(query) || p.category.includes(query)
      ).slice(0, 6);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 shadow-sm ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} border-b`}>
      {/* Flash Deal Banner */}
      {timeLeft && (
        <div className="bg-gradient-to-l from-orange-500 to-red-500 text-white text-center py-1.5 text-sm font-medium">
          <div className="flex items-center justify-center gap-2">
            <Zap size={14} className="animate-pulse" />
            <span>پیشنهاد لحظه‌ای</span>
            <span className="bg-white/20 px-2 py-0.5 rounded font-mono text-xs">{timeLeft}</span>
            <Zap size={14} className="animate-pulse" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🛒</span>
            </div>
            <span className="hidden sm:block font-bold text-lg text-green-700 dark:text-green-400">تازه‌مارکت</span>
          </Link>

          {/* Location */}
          <div className={`hidden md:flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
            <MapPin size={14} className="text-green-600" />
            <span className="truncate max-w-[120px]">تهران، ولنجک</span>
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="flex-1 relative">
            <form onSubmit={handleSearch}>
              <div className={`flex items-center rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 transition-all`}>
                <Search size={18} className="mr-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجو در محصولات..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
                  onFocus={() => setShowSearch(true)}
                  className={`flex-1 py-2.5 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
                />
                {searchQuery && (
                  <button type="button" onClick={() => { setSearchQuery(''); setSuggestions([]); }} className="px-3 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>

            {/* Search Suggestions */}
            {showSearch && suggestions.length > 0 && (
              <div className={`absolute top-full mt-2 w-full rounded-xl shadow-xl border overflow-hidden z-50 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                {suggestions.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                    className={`flex items-center gap-3 px-4 py-3 hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}
                  >
                    <span className="text-2xl">{product.image.includes('svg') ? '📦' : ''}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.brand} • {product.unit}</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">{product.price.toLocaleString()} ت</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-colors ${isDark ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'}`}
              title={isDark ? 'حالت روز' : 'حالت شب'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/profile"
              className={`hidden sm:flex p-2.5 rounded-xl transition-colors ${isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <User size={20} />
            </Link>

            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Delivery Time Info */}
        <div className={`hidden lg:flex items-center gap-4 mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-green-600" />
            <span>تحویل اکسپرس: کمتر از ۱ ساعت</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={12} className="text-orange-500" />
            <span>ارسال رایگان برای خرید بالای ۳۰۰ هزار تومان</span>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-green-50 text-gray-700 hover:text-green-700'}`}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className={`lg:hidden absolute top-full left-0 right-0 shadow-xl border-b ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-4 space-y-2">
            <Link to="/profile" onClick={() => setShowMobileMenu(false)} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
              <User size={20} />
              <span>حساب کاربری</span>
            </Link>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
              <MapPin size={20} />
              <span>تهران، ولنجک</span>
            </div>
            <hr className={isDark ? 'border-gray-700' : 'border-gray-200'} />
            <p className="text-sm font-medium text-gray-500 px-3">دسته‌بندی‌ها</p>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
