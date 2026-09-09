import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Send, MessageCircle } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function Footer() {
  const isDark = useThemeStore((s) => s.isDark);

  return (
    <footer className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-t mt-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/20">
                <span className="text-white font-black text-lg">ت</span>
              </div>
              <div>
                <h3 className={`font-extrabold text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>تازه‌مارکت</h3>
                <p className="text-[10px] text-slate-400">سوپرمارکت آنلاین</p>
              </div>
            </div>
            <p className={`text-sm leading-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              تازه‌مارکت، سوپرمارکت آنلاین شما با ارسال سریع و تضمین تازگی محصولات. خرید آسان، تحویل فوری.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>
                <Instagram size={18} />
              </a>
              <a href="#" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>
                <Send size={18} />
              </a>
              <a href="#" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>دسترسی سریع</h4>
            <ul className="space-y-3">
              {['صفحه اصلی', 'دسته‌بندی‌ها', 'پیشنهاد ویژه', 'تخفیف‌ها'].map((item) => (
                <li key={item}>
                  <Link to="/" className={`text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-green-400' : 'text-slate-600 hover:text-green-700'}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>خدمات مشتریان</h4>
            <ul className="space-y-3">
              {['پیگیری سفارش', 'شرایط بازگشت', 'سوالات متداول', 'حریم خصوصی'].map((item) => (
                <li key={item}>
                  <Link to="/" className={`text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-green-400' : 'text-slate-600 hover:text-green-700'}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>تماس با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-500">
                <Phone size={14} className="text-green-600" />
                <span>۰۲۱-۹۱۰۰۰۰۰۰</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500">
                <Mail size={14} className="text-green-600" />
                <span>info@tazehmarket.ir</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-500">
                <MapPin size={14} className="text-green-600 mt-0.5" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={`mt-10 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            © ۱۴۰۳ تازه‌مارکت. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23e2e8f0' rx='8'/%3E%3Ctext x='20' y='25' font-size='12' text-anchor='middle' fill='%2364748b'%3Eنماد%3C/text%3E%3C/svg%3E" alt="نماد اعتماد" className="w-10 h-10 rounded-lg" />
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23e2e8f0' rx='8'/%3E%3Ctext x='20' y='25' font-size='12' text-anchor='middle' fill='%2364748b'%3Eساماندهی%3C/text%3E%3C/svg%3E" alt="ساماندهی" className="w-10 h-10 rounded-lg" />
          </div>
        </div>
      </div>
    </footer>
  );
}
