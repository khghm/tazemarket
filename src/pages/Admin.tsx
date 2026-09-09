import { useState } from 'react';
import { BarChart3, Package, Tag, TrendingUp, ShoppingCart, Users, AlertTriangle, Clock } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { products } from '../data/products';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminPage() {
  const isDark = useThemeStore((s) => s.isDark);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'discounts' | 'orders'>('dashboard');

  const salesData = [
    { name: 'شنبه', sales: 4200000 },
    { name: 'یکشنبه', sales: 3800000 },
    { name: 'دوشنبه', sales: 5100000 },
    { name: 'سه‌شنبه', sales: 4600000 },
    { name: 'چهارشنبه', sales: 6200000 },
    { name: 'پنجشنبه', sales: 7100000 },
    { name: 'جمعه', sales: 8500000 },
  ];

  const topProducts = products.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  const abandonedCarts = [
    { id: 1, user: 'علی م.', items: 3, total: 185000, lastActive: '۲ ساعت پیش' },
    { id: 2, user: 'مریم ا.', items: 5, total: 320000, lastActive: '۵ ساعت پیش' },
    { id: 3, user: 'رضا ک.', items: 2, total: 95000, lastActive: '۱ روز پیش' },
  ];

  const orders = [
    { id: 'TM-100001', user: 'علی محمدی', status: 'در حال آماده‌سازی', total: 285000, time: '۱۰ دقیقه پیش' },
    { id: 'TM-100002', user: 'فاطمه نوری', status: 'تحویل پیک', total: 156000, time: '۲۵ دقیقه پیش' },
    { id: 'TM-100003', user: 'حسین رضایی', status: 'تحویل شده', total: 420000, time: '۱ ساعت پیش' },
    { id: 'TM-100004', user: 'زهرا حسینی', status: 'تأیید شده', total: 98000, time: '۲ ساعت پیش' },
  ];

  const tabs = [
    { id: 'dashboard' as const, label: 'داشبورد', icon: <BarChart3 size={18} /> },
    { id: 'inventory' as const, label: 'موجودی', icon: <Package size={18} /> },
    { id: 'discounts' as const, label: 'تخفیف‌ها', icon: <Tag size={18} /> },
    { id: 'orders' as const, label: 'سفارشات', icon: <ShoppingCart size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>پنل مدیریت</h1>
        <div className={`flex gap-1 p-1 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'فروش امروز', value: '۸.۵M ت', change: '+۱۲%', icon: <TrendingUp size={20} />, color: 'text-green-600 bg-green-50 dark:bg-green-900/30' },
              { label: 'سفارشات', value: '۱۲۴', change: '+۸%', icon: <ShoppingCart size={20} />, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' },
              { label: 'کاربران فعال', value: '۱,۲۳۴', change: '+۵%', icon: <Users size={20} />, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30' },
              { label: 'میانگین تحویل', value: '۳۸ دقیقه', change: '-۳%', icon: <Clock size={20} />, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/30' },
            ].map((stat, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>{stat.icon}</div>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{stat.value}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">{stat.label}</span>
                  <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>فروش هفتگی</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#4a7c59" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>روند سفارشات</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Products & Abandoned Carts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>🔥 پربازدیدترین محصولات</h3>
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-50 text-orange-600'}`}>
                      {i + 1}
                    </span>
                    <span className={`flex-1 text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{p.name}</span>
                    <span className="text-xs text-gray-500">{p.reviewCount} بازدید</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <AlertTriangle size={18} className="text-orange-500" />
                سبدهای رها شده
              </h3>
              <div className="space-y-3">
                {abandonedCarts.map((cart) => (
                  <div key={cart.id} className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{cart.user}</p>
                      <p className="text-xs text-gray-500">{cart.items} کالا • {cart.total.toLocaleString()} ت</p>
                    </div>
                    <span className="text-xs text-gray-500">{cart.lastActive}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory */}
      {activeTab === 'inventory' && (
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>مدیریت موجودی</h3>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">+ افزودن محصول</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="text-right p-3 font-medium">محصول</th>
                  <th className="text-right p-3 font-medium">دسته‌بندی</th>
                  <th className="text-right p-3 font-medium">قیمت</th>
                  <th className="text-right p-3 font-medium">موجودی</th>
                  <th className="text-right p-3 font-medium">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 10).map((p) => (
                  <tr key={p.id} className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{p.image.includes('🍎') ? '🍎' : p.image.includes('🥛') ? '🥛' : p.image.includes('🍗') ? '🍗' : '📦'}</span>
                        <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>{p.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-500">{p.category}</td>
                    <td className="p-3">{p.price.toLocaleString()} ت</td>
                    <td className="p-3">{p.inStock ? 'موجود' : 'ناموجود'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.inStock ? 'فعال' : 'غیرفعال'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Discounts */}
      {activeTab === 'discounts' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { type: 'تخفیف حجمی', desc: '۳ بخر، ۱ رایگان', active: true, count: 5 },
              { type: 'کد تخفیف', desc: 'fresh20 - ۲۰٪ تخفیف', active: true, count: 12 },
              { type: 'تخفیف دسته‌ای', desc: 'لبنیات ۱۵٪', active: false, count: 3 },
            ].map((d, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{d.type}</span>
                  <span className={`w-3 h-3 rounded-full ${d.active ? 'bg-green-500' : 'bg-gray-400'}`} />
                </div>
                <p className="text-sm text-gray-500">{d.desc}</p>
                <p className="text-xs text-gray-400 mt-2">{d.count} محصول فعال</p>
              </div>
            ))}
          </div>

          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>ایجاد تخفیف جدید</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">نوع تخفیف</label>
                <select className={`w-full px-3 py-2.5 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <option>درصدی</option>
                  <option>مبلغ ثابت</option>
                  <option>حجمی (X بخر Y رایگان)</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">کد تخفیف</label>
                <input type="text" placeholder="مثلاً SUMMER30" className={`w-full px-3 py-2.5 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">درصد تخفیف</label>
                <input type="number" placeholder="20" className={`w-full px-3 py-2.5 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">تاریخ انقضا</label>
                <input type="text" placeholder="1403/12/29" className={`w-full px-3 py-2.5 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
              </div>
            </div>
            <button className="mt-4 px-6 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700">
              ایجاد تخفیف
            </button>
          </div>
        </div>
      )}

      {/* Orders */}
      {activeTab === 'orders' && (
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>سفارشات اخیر</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="text-right p-3 font-medium">شماره</th>
                  <th className="text-right p-3 font-medium">مشتری</th>
                  <th className="text-right p-3 font-medium">وضعیت</th>
                  <th className="text-right p-3 font-medium">مبلغ</th>
                  <th className="text-right p-3 font-medium">زمان</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <td className="p-3 font-mono text-xs">{order.id}</td>
                    <td className="p-3">{order.user}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.status === 'تحویل شده' ? 'bg-green-100 text-green-700' :
                        order.status === 'تحویل پیک' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'در حال آماده‌سازی' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">{order.total.toLocaleString()} ت</td>
                    <td className="p-3 text-gray-500">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
