import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Moon, Sun, Menu, X, User, MapPin, Clock, Zap, Shield, Settings } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';
import { products } from '../data/products';
import { categories, getIconComponent } from '../data/categories';

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
      ).slice(0, 5);
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
    <header className={`sticky top-0 z-50 transition-all ${isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-100'} border-b backdrop-blur-xl`}>
      {/* Flash Deal Banner */}
      {timeLeft && (
        <div className="bg-gradient-to-l from-orange-500 via-red-500 to-orange-600 text-white text-center py-2 text-sm font-medium relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h20v20H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M10%200l5%2010-5%2010L5%2010z%22%20fill%3D%22rgba(255%2C255%2C255%2C0.05)%22%2F%3E%3C%2Fsvg%3E')] opacity-30" />
          <div className="relative flex items-center justify-center gap-3">
            <Zap size={14} className="animate-pulse" />
            <span className="font-bold">پیشنهاد شگفت‌انگیز</span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-mono text-xs tracking-wider">{timeLeft}</span>
            <Zap size={14} className="animate-pulse" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`lg:hidden p-2.5 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/20">
              <span className="text-white font-black text-lg">ت</span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-extrabold text-lg leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>تازه‌مارکت</h1>
              <p className="text-[10px] text-slate-400 -mt-0.5">سوپرمارکت آنلاین</p>
            </div>
          </Link>

          {/* Location */}
          <div className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl ${isDark ? 'bg-slate-800/50 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
            <MapPin size={14} className="text-green-600" />
            <span className="text-sm">تهران، ولنجک</span>
          </div>

          {/* Search */}
          <div ref={searchRef} className="flex-1 relative">
            <form onSubmit={handleSearch}>
              <div className={`flex items-center rounded-2xl border-2 transition-all ${isDark ? 'bg-slate-800 border-slate-700 focus-within:border-green-500' : 'bg-slate-50 border-slate-200 focus-within:border-green-500'} focus-within:shadow-lg focus-within:shadow-green-500/10`}>
                <Search size={18} className="mr-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="جستجو در هزاران محصول..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
                  onFocus={() => setShowSearch(true)}
                  className={`flex-1 py-3 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-slate-500' : 'text-slate-800 placeholder-slate-400'}`}
                />
                {searchQuery && (
                  <button type="button" onClick={() => { setSearchQuery(''); setSuggestions([]); }} className="px-4 text-slate-400 hover:text-slate-600">
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>

            {/* Suggestions */}
            {showSearch && suggestions.length > 0 && (
              <div className={`absolute top-full mt-2 w-full rounded-2xl shadow-2xl border overflow-hidden z-50 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                {suggestions.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                    className={`flex items-center gap-4 px-4 py-3 transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{product.name}</p>
                      <p className="text-xs text-slate-500">{product.brand} • {product.unit}</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">{product.price.toLocaleString()} ت</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${isDark ? 'hover:bg-slate-800 text-amber-400' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/profile"
              className={`hidden sm:flex p-2.5 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              <User size={20} />
            </Link>

            {/* Admin Button */}
            <Link
              to="/admin"
              className={`hidden md:flex p-2.5 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-purple-400' : 'hover:bg-slate-100 text-slate-500 hover:text-purple-600'}`}
              title="پنل مدیریت"
            >
              <Settings size={20} />
            </Link>

            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl gradient-primary text-white shadow-lg shadow-green-600/20 hover:shadow-green-600/40 transition-all hover:scale-105"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-in shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Info Bar */}
        <div className={`hidden lg:flex items-center gap-6 mt-3 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-green-600" />
            <span>تحویل اکسپرس زیر ۱ ساعت</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={12} className="text-blue-600" />
            <span>ضمانت تازگی و کیفیت</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap size={12} className="text-orange-500" />
            <span>ارسال رایگان بالای ۳۰۰ هزار تومان</span>
          </div>
        </div>
      </div>

      {/* Category Nav */}
      <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2.5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-green-50 text-slate-700 hover:text-green-700'}`}
              >
                {(() => { const Icon = getIconComponent(cat.icon); return <Icon size={16} className="text-green-600" />; })()}
                <span className="font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className={`lg:hidden absolute top-full left-0 right-0 shadow-2xl border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="p-4 space-y-1">
            <Link to="/admin" onClick={() => setShowMobileMenu(false)} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'hover:bg-slate-800 text-purple-400' : 'hover:bg-purple-50 text-purple-600'}`}>
              <Settings size={20} />
              <span className="font-medium">پنل مدیریت</span>
            </Link>
            <Link to="/profile" onClick={() => setShowMobileMenu(false)} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
              <User size={20} />
              <span>حساب کاربری</span>
            </Link>
            <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />
            <p className="text-xs font-medium text-slate-400 px-3 py-2">دسته‌بندی‌ها</p>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
              >
                {(() => { const Icon = getIconComponent(cat.icon); return <Icon size={20} className="text-green-600" />; })()}
                <span className="font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
