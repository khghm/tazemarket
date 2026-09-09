import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Shield, Clock, Zap, TrendingUp, Gift } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useThemeStore } from '../store/themeStore';

export default function Home() {
  const isDark = useThemeStore((s) => s.isDark);
  const [flashTimeLeft, setFlashTimeLeft] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const flashProducts = products.filter((p) => p.flashDeal);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const discounted = products.filter((p) => p.discount && p.discount > 15).slice(0, 8);

  // Flash deal timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (flashProducts.length > 0 && flashProducts[0].flashDealEnd) {
        const diff = flashProducts[0].flashDealEnd - Date.now();
        if (diff > 0) {
          const h = Math.floor(diff / 3600000);
          const m = Math.floor((diff % 3600000) / 60000);
          const s = Math.floor((diff % 60000) / 1000);
          setFlashTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto slide banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banners = [
    { title: 'تازه‌ترین میوه‌ها', subtitle: 'مستقیم از باغ به سفره شما', gradient: 'from-green-600 to-emerald-500', emoji: '🍎🍊🍋' },
    { title: 'تخفیف‌های ویژه', subtitle: 'تا ۵۰٪ تخفیف روی محصولات منتخب', gradient: 'from-orange-500 to-red-500', emoji: '🎁🏷️✨' },
    { title: 'ارسال فوری', subtitle: 'تحویل زیر ۱ ساعت در تهران', gradient: 'from-blue-600 to-purple-600', emoji: '🚀⚡📦' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="relative rounded-3xl overflow-hidden h-[200px] sm:h-[280px] lg:h-[340px]">
          {banners.map((banner, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-gradient-to-l ${banner.gradient} transition-all duration-700 ease-out ${
                idx === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%200l15%2030-15%2030L15%2030z%22%20fill%3D%22rgba(255%2C255%2C255%2C0.03)%22%2F%3E%3C%2Fsvg%3E')]" />
              <div className="relative h-full flex items-center px-8 sm:px-12">
                <div className="text-white space-y-3">
                  <span className="text-4xl sm:text-5xl lg:text-6xl">{banner.emoji}</span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">{banner.title}</h2>
                  <p className="text-sm sm:text-base opacity-90">{banner.subtitle}</p>
                  <button className="mt-4 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-bold hover:bg-white/30 transition-all border border-white/30">
                    مشاهده محصولات
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: <Truck size={20} />, title: 'ارسال سریع', desc: 'زیر ۱ ساعت', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
            { icon: <Shield size={20} />, title: 'ضمانت کیفیت', desc: 'تضمین تازگی', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
            { icon: <Clock size={20} />, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در دسترس', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
            { icon: <Gift size={20} />, title: 'تخفیف ویژه', desc: 'هر روز پیشنهادات', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
          ].map((feat, idx) => (
            <div key={idx} className={`flex items-center gap-3 p-4 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-white'} border ${isDark ? 'border-slate-700/50' : 'border-slate-100'}`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${feat.color}`}>
                {feat.icon}
              </div>
              <div>
                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{feat.title}</p>
                <p className="text-xs text-slate-500">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>دسته‌بندی‌ها</h2>
          <Link to="/categories" className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium">
            <span>مشاهده همه</span>
            <ArrowLeft size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-700/50' : 'bg-white hover:bg-green-50 border-slate-100'} border`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className={`text-xs font-medium text-center ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      {flashProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white">
                <Zap size={20} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>پیشنهاد شگفت‌انگیز</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500">پایان تا:</span>
                  <span className="text-sm font-mono font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-lg">{flashTimeLeft}</span>
                </div>
              </div>
            </div>
            <Link to="/flash-deals" className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium">
              <span>مشاهده همه</span>
              <ArrowLeft size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {flashProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Top Rated */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
              <TrendingUp size={20} />
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>پرفروش‌ترین‌ها</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {topRated.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Discounted Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white">
              <Gift size={20} />
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>تخفیف‌های ویژه</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {discounted.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className={`rounded-3xl p-8 sm:p-12 ${isDark ? 'bg-gradient-to-l from-green-900/50 to-emerald-900/50 border border-green-800/30' : 'bg-gradient-to-l from-green-600 to-emerald-500'} text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%222%22%20fill%3D%22rgba(255%2C255%2C255%2C0.1)%22%2F%3E%3C%2Fsvg%3E')]" />
          <div className="relative text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black">اولین خریدت رو با ۲۰٪ تخفیف انجام بده!</h3>
            <p className="text-sm sm:text-base opacity-90">کد تخفیف: FIRST20</p>
            <button className="px-8 py-3 bg-white text-green-700 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl">
              شروع خرید
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
