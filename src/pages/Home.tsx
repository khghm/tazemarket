import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, Shield, Zap, ChevronLeft } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { useThemeStore } from '../store/themeStore';

export default function Home() {
  const isDark = useThemeStore((s) => s.isDark);
  const flashDeals = products.filter((p) => p.flashDeal);
  const popularProducts = products.filter((p) => p.rating >= 4.5).slice(0, 8);
  const discountedProducts = products.filter((p) => p.discount && p.discount > 0).slice(0, 8);

  // Flash deal countdown
  const [countdown, setCountdown] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown: { [key: string]: string } = {};
      flashDeals.forEach((p) => {
        if (p.flashDealEnd) {
          const diff = p.flashDealEnd - Date.now();
          if (diff > 0) {
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            newCountdown[p.id] = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
          }
        }
      });
      setCountdown(newCountdown);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Banner */}
      <div className={`relative rounded-3xl overflow-hidden ${isDark ? 'bg-gradient-to-l from-green-900 to-green-800' : 'bg-gradient-to-l from-green-600 to-emerald-500'}`}>
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-white space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm">
              <Zap size={14} />
              <span>تحویل زیر ۱ ساعت</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              خرید تازه و سریع
              <br />
              <span className="text-green-200">از سوپرمارکت محله</span>
            </h1>
            <p className="text-green-100 text-sm md:text-base max-w-md">
              بیش از ۵۰۰۰ محصول تازه و باکیفیت با تحویل سریع به درب منزل شما
            </p>
            <Link
              to="/category/fruits-vegetables"
              className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
            >
              شروع خرید
              <ChevronLeft size={18} />
            </Link>
          </div>
          <div className="text-8xl md:text-9xl">🛒</div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: <Truck size={20} />, title: 'ارسال سریع', desc: 'زیر ۱ ساعت', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' },
          { icon: <Shield size={20} />, title: 'ضمانت کیفیت', desc: 'تازگی تضمینی', color: 'text-green-600 bg-green-50 dark:bg-green-900/30' },
          { icon: <Clock size={20} />, title: 'تحویل برنامه‌ریزی', desc: 'زمان دلخواه شما', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30' },
          { icon: <Zap size={20} />, title: 'تخفیف‌های ویژه', desc: 'تا ۵۰٪ تخفیف', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/30' },
        ].map((f, i) => (
          <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className={`p-2.5 rounded-xl ${f.color}`}>{f.icon}</div>
            <div>
              <p className={`text-sm font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{f.title}</p>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>دسته‌بندی‌ها</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md ${
                isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-green-50 border border-gray-100'
              }`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className={`text-xs font-medium text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      {flashDeals.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>⚡ پیشنهادات لحظه‌ای</h2>
              <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg text-sm font-mono">
                {Object.values(countdown)[0] || '00:00:00'}
              </div>
            </div>
            <Link to="/flash-deals" className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
              مشاهده همه <ChevronLeft size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {flashDeals.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                {countdown[product.id] && (
                  <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl p-2 pt-6">
                    <p className="text-white text-xs text-center font-mono">{countdown[product.id]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>🔥 پرفروش‌ترین‌ها</h2>
          <Link to="/popular" className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
            مشاهده همه <ChevronLeft size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Discounted Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>🏷️ تخفیف‌دارها</h2>
          <Link to="/discounts" className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
            مشاهده همه <ChevronLeft size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
