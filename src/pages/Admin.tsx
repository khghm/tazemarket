import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, Package, Tag, TrendingUp, ShoppingCart, Users, AlertTriangle, 
  Clock, DollarSign, Eye, Edit, Trash2, Plus, Filter, Download,
  CheckCircle, XCircle, Truck, ChefHat, ArrowLeft, Settings, Bell,
  Search, Calendar, PieChart, Activity
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { products } from '../data/products';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RePieChart, Pie, Cell } from 'recharts';

export default function AdminPage() {
  const isDark = useThemeStore((s) => s.isDark);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'discounts' | 'users' | 'reports'>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Mock data
  const salesData = [
    { name: 'شنبه', sales: 4200000, orders: 45 },
    { name: 'یکشنبه', sales: 3800000, orders: 38 },
    { name: 'دوشنبه', sales: 5100000, orders: 52 },
    { name: 'سه‌شنبه', sales: 4600000, orders: 47 },
    { name: 'چهارشنبه', sales: 6200000, orders: 63 },
    { name: 'پنجشنبه', sales: 7100000, orders: 72 },
    { name: 'جمعه', sales: 8500000, orders: 86 },
  ];

  const categoryData = [
    { name: 'میوه و سبزیجات', value: 35, color: '#22c55e' },
    { name: 'لبنیات', value: 25, color: '#3b82f6' },
    { name: 'گوشت و پروتئین', value: 20, color: '#ef4444' },
    { name: 'نوشیدنی‌ها', value: 12, color: '#f59e0b' },
    { name: 'سایر', value: 8, color: '#8b5cf6' },
  ];

  const orders = [
    { id: 'TM-100001', customer: 'علی محمدی', status: 'در حال آماده‌سازی', total: 285000, items: 5, time: '۱۰ دقیقه پیش', address: 'تهران، ولنجک' },
    { id: 'TM-100002', customer: 'فاطمه نوری', status: 'تحویل پیک', total: 156000, items: 3, time: '۲۵ دقیقه پیش', address: 'تهران، سعادت‌آباد' },
    { id: 'TM-100003', customer: 'حسین رضایی', status: 'تحویل شده', total: 420000, items: 8, time: '۱ ساعت پیش', address: 'تهران، تجریش' },
    { id: 'TM-100004', customer: 'زهرا حسینی', status: 'تأیید شده', total: 98000, items: 2, time: '۲ ساعت پیش', address: 'تهران، ونک' },
    { id: 'TM-100005', customer: 'رضا کریمی', status: 'در حال ارسال', total: 345000, items: 6, time: '۳ ساعت پیش', address: 'تهران، پونک' },
  ];

  const users = [
    { id: 1, name: 'علی محمدی', phone: '09123456789', orders: 23, totalSpent: 4500000, joinDate: '1402/06/15', status: 'فعال' },
    { id: 2, name: 'فاطمه نوری', phone: '09123456788', orders: 15, totalSpent: 2800000, joinDate: '1402/08/20', status: 'فعال' },
    { id: 3, name: 'حسین رضایی', phone: '09123456787', orders: 31, totalSpent: 6200000, joinDate: '1402/03/10', status: 'ویژه' },
    { id: 4, name: 'زهرا حسینی', phone: '09123456786', orders: 8, totalSpent: 1200000, joinDate: '1403/01/05', status: 'فعال' },
  ];

  const tabs = [
    { id: 'dashboard' as const, label: 'داشبورد', icon: <BarChart3 size={18} /> },
    { id: 'products' as const, label: 'محصولات', icon: <Package size={18} /> },
    { id: 'orders' as const, label: 'سفارشات', icon: <ShoppingCart size={18} /> },
    { id: 'discounts' as const, label: 'تخفیف‌ها', icon: <Tag size={18} /> },
    { id: 'users' as const, label: 'کاربران', icon: <Users size={18} /> },
    { id: 'reports' as const, label: 'گزارشات', icon: <PieChart size={18} /> },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={`border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>پنل مدیریت</h1>
                <p className="text-sm text-slate-500">مدیریت کامل سیستم تازه‌مارکت</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className={`p-2.5 rounded-xl ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} relative`}>
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className={`p-2.5 rounded-xl ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                    : isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'فروش امروز', value: '۸.۵M', change: '+۱۲%', icon: <DollarSign size={24} />, color: 'from-green-500 to-emerald-600' },
                { label: 'سفارشات', value: '۱۲۴', change: '+۸%', icon: <ShoppingCart size={24} />, color: 'from-blue-500 to-cyan-600' },
                { label: 'کاربران فعال', value: '۱,۲۳۴', change: '+۵%', icon: <Users size={24} />, color: 'from-purple-500 to-pink-600' },
                { label: 'میانگین تحویل', value: '۳۸ دقیقه', change: '-۳%', icon: <Clock size={24} />, color: 'from-orange-500 to-red-600' },
              ].map((stat, idx) => (
                <div key={idx} className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
                    {stat.icon}
                  </div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{stat.value}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-slate-500">{stat.label}</span>
                    <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className={`lg:col-span-2 p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>نمودار فروش هفتگی</h3>
                  <select className={`text-sm px-3 py-1.5 rounded-lg ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} border`}>
                    <option>هفته جاری</option>
                    <option>هفته قبل</option>
                    <option>ماه جاری</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: isDark ? '#94a3b8' : '#64748b' }} />
                    <YAxis tick={{ fontSize: 12, fill: isDark ? '#94a3b8' : '#64748b' }} />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px' }} />
                    <Bar dataKey="sales" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                <h3 className={`font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>سهم دسته‌بندی‌ها</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RePieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {categoryData.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{cat.name}</span>
                      </div>
                      <span className="font-bold">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders & Top Products */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>سفارشات اخیر</h3>
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium">مشاهده همه</button>
                </div>
                <div className="space-y-3">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.customer}</p>
                        <p className="text-xs text-slate-500">{order.id} • {order.items} کالا</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-green-600">{order.total.toLocaleString()} ت</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          order.status === 'تحویل شده' ? 'bg-green-100 text-green-700' :
                          order.status === 'تحویل پیک' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>محصولات پرفروش</h3>
                <div className="space-y-3">
                  {products.slice(0, 5).map((product, idx) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                        idx === 1 ? 'bg-slate-100 text-slate-600' :
                        'bg-orange-50 text-orange-600'
                      }`}>{idx + 1}</span>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{product.name}</p>
                        <p className="text-xs text-slate-500">{product.reviewCount} فروش</p>
                      </div>
                      <p className="text-sm font-bold text-green-600">{product.price.toLocaleString()} ت</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>مدیریت محصولات</h2>
              <button className="btn-primary">
                <Plus size={18} />
                <span>افزودن محصول</span>
              </button>
            </div>

            <div className={`rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border overflow-hidden`}>
              <div className={`p-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'} flex items-center gap-4`}>
                <div className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                  <Search size={18} className="text-slate-400" />
                  <input type="text" placeholder="جستجو محصول..." className="flex-1 bg-transparent outline-none text-sm" />
                </div>
                <button className={`px-4 py-2 rounded-xl ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'} flex items-center gap-2`}>
                  <Filter size={16} />
                  <span className="text-sm">فیلتر</span>
                </button>
                <button className={`px-4 py-2 rounded-xl ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'} flex items-center gap-2`}>
                  <Download size={16} />
                  <span className="text-sm">خروجی</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDark ? 'bg-slate-700/50' : 'bg-slate-50'}>
                    <tr>
                      <th className="text-right p-4 text-sm font-medium">محصول</th>
                      <th className="text-right p-4 text-sm font-medium">دسته‌بندی</th>
                      <th className="text-right p-4 text-sm font-medium">قیمت</th>
                      <th className="text-right p-4 text-sm font-medium">موجودی</th>
                      <th className="text-right p-4 text-sm font-medium">وضعیت</th>
                      <th className="text-right p-4 text-sm font-medium">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 10).map((product) => (
                      <tr key={product.id} className={`border-t ${isDark ? 'border-slate-700 hover:bg-slate-700/30' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{product.name}</p>
                              <p className="text-xs text-slate-500">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{product.category}</td>
                        <td className="p-4 text-sm font-bold">{product.price.toLocaleString()} ت</td>
                        <td className="p-4">
                          <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {product.inStock ? 'موجود' : 'ناموجود'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {product.inStock ? 'فعال' : 'غیرفعال'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>مدیریت سفارشات</h2>
            <div className={`rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDark ? 'bg-slate-700/50' : 'bg-slate-50'}>
                    <tr>
                      <th className="text-right p-4 text-sm font-medium">شماره سفارش</th>
                      <th className="text-right p-4 text-sm font-medium">مشتری</th>
                      <th className="text-right p-4 text-sm font-medium">آدرس</th>
                      <th className="text-right p-4 text-sm font-medium">مبلغ</th>
                      <th className="text-right p-4 text-sm font-medium">وضعیت</th>
                      <th className="text-right p-4 text-sm font-medium">زمان</th>
                      <th className="text-right p-4 text-sm font-medium">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className={`border-t ${isDark ? 'border-slate-700 hover:bg-slate-700/30' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                        <td className="p-4 text-sm font-mono">{order.id}</td>
                        <td className="p-4 text-sm">{order.customer}</td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{order.address}</td>
                        <td className="p-4 text-sm font-bold">{order.total.toLocaleString()} ت</td>
                        <td className="p-4">
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            order.status === 'تحویل شده' ? 'bg-green-100 text-green-700' :
                            order.status === 'تحویل پیک' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'در حال آماده‌سازی' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>{order.status}</span>
                        </td>
                        <td className="p-4 text-sm text-slate-500">{order.time}</td>
                        <td className="p-4">
                          <button className="text-sm text-green-600 hover:text-green-700 font-medium">مشاهده</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Discounts Management */}
        {activeTab === 'discounts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>مدیریت تخفیف‌ها</h2>
              <button className="btn-primary">
                <Plus size={18} />
                <span>ایجاد تخفیف</span>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { type: 'تخفیف حجمی', desc: '۳ بخر، ۱ رایگان', active: true, count: 5, color: 'from-blue-500 to-cyan-600' },
                { type: 'کد تخفیف', desc: 'fresh20 - ۲۰٪', active: true, count: 12, color: 'from-green-500 to-emerald-600' },
                { type: 'تخفیف دسته‌ای', desc: 'لبنیات ۱۵٪', active: false, count: 3, color: 'from-purple-500 to-pink-600' },
              ].map((discount, idx) => (
                <div key={idx} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${discount.color} flex items-center justify-center text-white mb-4`}>
                    <Tag size={24} />
                  </div>
                  <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>{discount.type}</h3>
                  <p className="text-sm text-slate-500 mb-4">{discount.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{discount.count} محصول فعال</span>
                    <span className={`w-3 h-3 rounded-full ${discount.active ? 'bg-green-500' : 'bg-slate-400'}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>ایجاد تخفیف جدید</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 block mb-2">نوع تخفیف</label>
                  <select className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} border`}>
                    <option>درصدی</option>
                    <option>مبلغ ثابت</option>
                    <option>حجمی</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 block mb-2">کد تخفیف</label>
                  <input type="text" placeholder="مثلاً SUMMER30" className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} border`} />
                </div>
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 block mb-2">درصد تخفیف</label>
                  <input type="number" placeholder="20" className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} border`} />
                </div>
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400 block mb-2">تاریخ انقضا</label>
                  <input type="text" placeholder="1403/12/29" className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} border`} />
                </div>
              </div>
              <button className="btn-primary mt-4">ایجاد تخفیف</button>
            </div>
          </div>
        )}

        {/* Users Management */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>مدیریت کاربران</h2>
            <div className={`rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDark ? 'bg-slate-700/50' : 'bg-slate-50'}>
                    <tr>
                      <th className="text-right p-4 text-sm font-medium">کاربر</th>
                      <th className="text-right p-4 text-sm font-medium">شماره تماس</th>
                      <th className="text-right p-4 text-sm font-medium">تعداد سفارش</th>
                      <th className="text-right p-4 text-sm font-medium">مجموع خرید</th>
                      <th className="text-right p-4 text-sm font-medium">تاریخ عضویت</th>
                      <th className="text-right p-4 text-sm font-medium">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className={`border-t ${isDark ? 'border-slate-700 hover:bg-slate-700/30' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                              {user.name[0]}
                            </div>
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{user.phone}</td>
                        <td className="p-4 text-sm">{user.orders}</td>
                        <td className="p-4 text-sm font-bold">{user.totalSpent.toLocaleString()} ت</td>
                        <td className="p-4 text-sm text-slate-500">{user.joinDate}</td>
                        <td className="p-4">
                          <span className={`text-xs px-3 py-1 rounded-full ${user.status === 'ویژه' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>گزارشات و آمار</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>روند سفارشات</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: isDark ? '#94a3b8' : '#64748b' }} />
                    <YAxis tick={{ fontSize: 12, fill: isDark ? '#94a3b8' : '#64748b' }} />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px' }} />
                    <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>آمار کلی</h3>
                <div className="space-y-4">
                  {[
                    { label: 'کل فروش ماه', value: '۱۲۵M تومان', icon: <DollarSign size={20} />, color: 'text-green-600' },
                    { label: 'میانگین سبد خرید', value: '۲۸۵,۰۰۰ تومان', icon: <ShoppingCart size={20} />, color: 'text-blue-600' },
                    { label: 'نرخ بازگشت مشتری', value: '۶۸%', icon: <Activity size={20} />, color: 'text-purple-600' },
                    { label: 'رضایت مشتریان', value: '۴.۸ از ۵', icon: <TrendingUp size={20} />, color: 'text-orange-600' },
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`${stat.color}`}>{stat.icon}</div>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{stat.label}</span>
                      </div>
                      <span className="font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
