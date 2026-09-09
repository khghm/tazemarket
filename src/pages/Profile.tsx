import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronLeft, Star, RefreshCw, Phone, Key } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function ProfilePage() {
  const isDark = useThemeStore((s) => s.isDark);
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'addresses' | 'account'>('orders');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const mockOrders = [
    { id: 'TM-123456', date: '1403/09/15', status: 'تحویل شده', total: 285000, items: 5 },
    { id: 'TM-123455', date: '1403/09/12', status: 'تحویل شده', total: 156000, items: 3 },
    { id: 'TM-123454', date: '1403/09/08', status: 'تحویل شده', total: 420000, items: 8 },
  ];

  const mockFavorites = [
    { id: 'p1', name: 'سیب قرمز دماوند', price: 45000 },
    { id: 'p22', name: 'برنج ایرانی هاشمی', price: 450000 },
    { id: 'p13', name: 'تخم‌مرغ محلی 15 عددی', price: 85000 },
  ];

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={36} className="text-green-600" />
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>ورود / ثبت‌نام</h2>
            <p className="text-sm text-gray-500 mt-2">با شماره موبایل وارد شوید</p>
          </div>

          {!otpSent ? (
            <div className="space-y-4">
              <div className="relative">
                <Phone size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className={`w-full pr-10 pl-4 py-3.5 rounded-xl border text-left ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} outline-none focus:border-green-500`}
                  dir="ltr"
                />
              </div>
              <button
                onClick={() => setOtpSent(true)}
                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Key size={18} />
                ارسال کد تأیید
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-center text-gray-500">کد تأیید به شماره ۰۹۱۲***۶۷۸۹ ارسال شد</p>
              <input
                type="text"
                placeholder="کد ۵ رقمی"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={5}
                className={`w-full text-center text-2xl tracking-widest py-3.5 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} outline-none focus:border-green-500`}
                dir="ltr"
              />
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
              >
                ورود
              </button>
              <button onClick={() => setOtpSent(false)} className="w-full text-sm text-gray-500 hover:text-gray-700">
                تغییر شماره موبایل
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'orders' as const, label: 'سفارشات', icon: <Package size={18} /> },
    { id: 'favorites' as const, label: 'علاقه‌مندی‌ها', icon: <Heart size={18} /> },
    { id: 'addresses' as const, label: 'آدرس‌ها', icon: <MapPin size={18} /> },
    { id: 'account' as const, label: 'حساب', icon: <Settings size={18} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className={`p-6 rounded-2xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            ع
          </div>
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>علی محمدی</h2>
            <p className="text-sm text-gray-500">۰۹۱۲۳۴۵۶۷۸۹</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-gray-500">عضو ویژه (از ۱۴۰۲/۰۶/۱۵)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex gap-1 p-1 rounded-xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-green-600 text-white shadow-sm'
                : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div key={order.id} className={`p-4 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>سفارش #{order.id}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">{order.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{order.items} کالا • {order.total.toLocaleString()} تومان</span>
                <div className="flex gap-2">
                  <Link to="/tracking" className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                    رهگیری <ChevronLeft size={12} />
                  </Link>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <RefreshCw size={12} /> خرید مجدد
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="space-y-3">
          {mockFavorites.map((item) => (
            <div key={item.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <Package size={24} className="text-slate-300" />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item.name}</p>
                <p className="text-sm text-green-600 font-bold mt-1">{item.price.toLocaleString()} تومان</p>
              </div>
              <button className="text-red-400 hover:text-red-500">
                <Heart size={18} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="space-y-3">
          {[
            { title: '🏠 منزل', address: 'تهران، ولنجک، خیابان ۲۴ متری، پلاک ۱۲، واحد ۳', default: true },
            { title: '🏢 محل کار', address: 'تهران، سعادت‌آباد، بلوار دریا، پلاک ۵، طبقه ۳', default: false },
          ].map((addr, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${addr.default ? 'border-green-500' : isDark ? 'border-gray-700' : 'border-gray-200'} ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>{addr.title}</p>
                {addr.default && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">پیش‌فرض</span>}
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{addr.address}</p>
            </div>
          ))}
          <button className={`w-full py-3 rounded-xl border-2 border-dashed text-sm ${isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
            + افزودن آدرس جدید
          </button>
        </div>
      )}

      {activeTab === 'account' && (
        <div className="space-y-3">
          {[
            { label: 'اطلاعات شخصی', icon: <User size={18} /> },
            { label: 'تغییر شماره موبایل', icon: <Phone size={18} /> },
            { label: 'تنظیمات اعلان‌ها', icon: <Settings size={18} /> },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 p-4 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-100 hover:bg-gray-50'} transition-colors`}>
              <span className="text-green-600">{item.icon}</span>
              <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{item.label}</span>
              <ChevronLeft size={16} className="mr-auto text-gray-400" />
            </button>
          ))}
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 hover:bg-red-100 transition-colors mt-4"
          >
            <LogOut size={18} className="text-red-500" />
            <span className="text-sm font-medium text-red-600">خروج از حساب</span>
          </button>
        </div>
      )}
    </div>
  );
}
