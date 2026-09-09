import { useThemeStore } from '../store/themeStore';

export default function Footer() {
  const isDark = useThemeStore((s) => s.isDark);

  return (
    <footer className={`hidden md:block border-t ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🛒</span>
              </div>
              <span className="font-bold text-lg text-green-700 dark:text-green-400">تازه‌مارکت</span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              سوپرمارکت آنلاین با تحویل سریع و محصولات تازه. خرید آسان، ارسال سریع.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {['📱', '💬', '📸', '🐦'].map((icon, i) => (
                <button key={i} className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-bold text-sm mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>دسترسی سریع</h4>
            <ul className="space-y-2">
              {['درباره ما', 'تماس با ما', 'سوالات متداول', 'قوانین و مقررات'].map((link) => (
                <li key={link}>
                  <a href="#" className={`text-sm hover:text-green-600 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className={`font-bold text-sm mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>دسته‌بندی‌ها</h4>
            <ul className="space-y-2">
              {['میوه و سبزیجات', 'لبنیات', 'گوشت و پروتئین', 'نوشیدنی‌ها'].map((link) => (
                <li key={link}>
                  <a href="#" className={`text-sm hover:text-green-600 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-bold text-sm mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>ارتباط با ما</h4>
            <ul className="space-y-2 text-sm">
              <li className={isDark ? 'text-gray-400' : 'text-gray-500'}>📞 ۰۲۱-۹۱۰۰۰۰۰۰</li>
              <li className={isDark ? 'text-gray-400' : 'text-gray-500'}>📧 info@tazehmarket.ir</li>
              <li className={isDark ? 'text-gray-400' : 'text-gray-500'}>🕐 پشتیبانی ۲۴ ساعته</li>
              <li className={isDark ? 'text-gray-400' : 'text-gray-500'}>📍 تهران، ایران</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            © ۱۴۰۳ تازه‌مارکت. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>نماد اعتماد:</span>
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
              <span className="text-2xl">🛡️</span>
            </div>
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
