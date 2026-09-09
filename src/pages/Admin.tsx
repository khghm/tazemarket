import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Tag, Users, BarChart3,
  Plus, Edit2, Trash2, Eye, Search, Filter, Download,
  CheckCircle, XCircle, Clock, Truck, ChefHat, AlertCircle,
  ArrowRight, TrendingUp, TrendingDown, DollarSign, Activity,
  ToggleLeft, ToggleRight, MoreVertical, ChevronDown, X,
  Save, RefreshCw, Ban, Check, ArrowLeft
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useAdminStore, Order } from '../store/adminStore';
import { getIconComponent } from '../data/categories';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

type TabId = 'dashboard' | 'products' | 'orders' | 'coupons' | 'users' | 'carts' | 'reports';

export default function AdminPage() {
  const isDark = useThemeStore((s) => s.isDark);
  const store = useAdminStore();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);

  const analytics = store.getAnalytics();

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const tabs: { id: TabId; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
    { id: 'products', label: 'محصولات', icon: Package, count: store.products.length },
    { id: 'orders', label: 'سفارشات', icon: ShoppingCart, count: store.orders.length },
    { id: 'coupons', label: 'تخفیف‌ها', icon: Tag, count: store.coupons.length },
    { id: 'users', label: 'کاربران', icon: Users, count: store.users.length },
    { id: 'carts', label: 'سبد رها شده', icon: AlertCircle, count: store.abandonedCarts.length },
    { id: 'reports', label: 'گزارشات', icon: BarChart3 },
  ];

  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    pending: { label: 'در انتظار تأیید', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock },
    confirmed: { label: 'تأیید شده', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: CheckCircle },
    preparing: { label: 'در حال آماده‌سازی', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: ChefHat },
    'out-for-delivery': { label: 'در مسیر ارسال', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400', icon: Truck },
    delivered: { label: 'تحویل شده', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle },
    cancelled: { label: 'لغو شده', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: XCircle },
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in-up">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Sidebar + Content Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className={`hidden lg:flex flex-col w-64 min-h-screen fixed right-0 top-0 border-l ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-black">ت</span>
              </div>
              <div>
                <h2 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>پنل مدیریت</h2>
                <p className="text-xs text-slate-500">تازه‌مارکت</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                      : isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1 text-right">{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeTab === tab.id ? 'bg-white/20' : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>{tab.count}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ArrowRight size={18} />
              <span>بازگشت به سایت</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:mr-64">
          {/* Top Bar */}
          <div className={`sticky top-0 z-40 border-b ${isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-xl`}>
            <div className="flex items-center justify-between px-6 py-4">
              <div className="lg:hidden flex items-center gap-3">
                <button onClick={() => setActiveTab(activeTab)} className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                  <LayoutDashboard size={20} />
                </button>
                <h1 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {tabs.find(t => t.id === activeTab)?.label}
                </h1>
              </div>
              <div className="hidden lg:block">
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {tabs.find(t => t.id === activeTab)?.label}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg ${isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-700'}`}>
                  <Activity size={14} />
                  <span className="text-xs font-medium">آنلاین</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                  م
                </div>
              </div>
            </div>

            {/* Mobile Tabs */}
            <div className="lg:hidden flex items-center gap-1 overflow-x-auto no-scrollbar px-4 pb-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white'
                        : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'درآمد کل', value: `${(analytics.totalRevenue / 1000000).toFixed(1)}M`, sub: 'تومان', change: '+12%', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
                    { label: 'سفارشات', value: analytics.totalOrders.toString(), sub: 'سفارش', change: '+8%', icon: ShoppingCart, color: 'from-blue-500 to-cyan-600' },
                    { label: 'کاربران', value: analytics.totalUsers.toString(), sub: 'کاربر', change: '+5%', icon: Users, color: 'from-purple-500 to-pink-600' },
                    { label: 'محصولات', value: analytics.totalProducts.toString(), sub: 'محصول', change: '+2', icon: Package, color: 'from-orange-500 to-red-600' },
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                            <Icon size={20} />
                          </div>
                          <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                            <TrendingUp size={12} />
                            {stat.change}
                          </span>
                        </div>
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{stat.value}</p>
                        <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Charts */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                    <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>درآمد هفتگی</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={analytics.revenueByDay}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                        <XAxis dataKey="date" tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }} />
                        <YAxis tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }} />
                        <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', direction: 'rtl' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="url(#colorRevenue)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                    <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>وضعیت سفارشات</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={analytics.ordersByStatus}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                        <XAxis dataKey="status" tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }} />
                        <YAxis tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }} />
                        <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', direction: 'rtl' }} />
                        <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Top Products & Recent Orders */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                    <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>محصولات پرفروش</h3>
                    <div className="space-y-3">
                      {analytics.topProducts.map((product, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                            idx === 0 ? 'bg-amber-100 text-amber-700' :
                            idx === 1 ? 'bg-slate-100 text-slate-600' :
                            'bg-orange-50 text-orange-600'
                          }`}>{idx + 1}</span>
                          <span className={`flex-1 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{product.name}</span>
                          <span className="text-sm font-bold text-green-600">{product.count}x</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>سفارشات اخیر</h3>
                      <button onClick={() => setActiveTab('orders')} className="text-xs text-green-600 hover:text-green-700 font-medium">مشاهده همه</button>
                    </div>
                    <div className="space-y-3">
                      {store.orders.slice(0, 5).map((order) => {
                        const config = statusConfig[order.status];
                        const Icon = config.icon;
                        return (
                          <div key={order.id} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${config.color}`}>
                              <Icon size={16} />
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.userName}</p>
                              <p className="text-xs text-slate-500">{order.id}</p>
                            </div>
                            <span className="text-sm font-bold text-green-600">{order.total.toLocaleString()} ت</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Management */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
                    <div className={`flex-1 sm:max-w-xs flex items-center gap-2 px-4 py-2.5 rounded-xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}>
                      <Search size={16} className="text-slate-400" />
                      <input
                        type="text"
                        placeholder="جستجو محصول..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-slate-500' : 'text-slate-800'}`}
                      />
                    </div>
                    <button className={`p-2.5 rounded-xl ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-50'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                      <Filter size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`px-4 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-white hover:bg-slate-50 text-slate-700'} border ${isDark ? 'border-slate-700' : 'border-slate-200'} flex items-center gap-2`}>
                      <Download size={16} />
                      <span>خروجی</span>
                    </button>
                    <button onClick={() => setShowAddProduct(true)} className="btn-primary">
                      <Plus size={16} />
                      <span>محصول جدید</span>
                    </button>
                  </div>
                </div>

                {/* Products Table */}
                <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className={isDark ? 'bg-slate-700/50' : 'bg-slate-50'}>
                        <tr>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">محصول</th>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">دسته‌بندی</th>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">قیمت</th>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">موجودی</th>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">وضعیت</th>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {store.products
                          .filter(p => p.name.includes(searchQuery) || p.brand.includes(searchQuery))
                          .map((product) => (
                          <tr key={product.id} className={`border-t ${isDark ? 'border-slate-700/50 hover:bg-slate-700/30' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{product.name}</p>
                                  <p className="text-xs text-slate-500">{product.brand}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{product.category}</td>
                            <td className="p-4">
                              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{product.price.toLocaleString()} ت</p>
                              {product.originalPrice && (
                                <p className="text-xs text-slate-400 line-through">{product.originalPrice.toLocaleString()}</p>
                              )}
                            </td>
                            <td className="p-4">
                              <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {product.inStock ? 'موجود' : 'ناموجود'}
                              </span>
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => { store.toggleProductStock(product.id); showNotif('وضعیت موجودی تغییر کرد'); }}
                                className={`p-1.5 rounded-lg ${product.inStock ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
                              >
                                {product.inStock ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                              </button>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-1">
                                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} text-slate-500`}>
                                  <Eye size={16} />
                                </button>
                                <button
                                  onClick={() => setEditingProduct(product.id)}
                                  className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} text-blue-600`}>
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => { if (confirm('آیا مطمئن هستید؟')) { store.deleteProduct(product.id); showNotif('محصول حذف شد'); } }}
                                  className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} text-red-600`}>
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
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  {['all', 'pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderFilter(status)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        orderFilter === status
                          ? 'bg-green-600 text-white'
                          : isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      {status === 'all' ? 'همه' : statusConfig[status]?.label}
                    </button>
                  ))}
                </div>

                {/* Orders List */}
                <div className="space-y-3">
                  {store.orders
                    .filter(o => orderFilter === 'all' || o.status === orderFilter)
                    .map((order) => {
                      const config = statusConfig[order.status];
                      const Icon = config.icon;
                      return (
                        <div key={order.id} className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}>
                                <Icon size={18} />
                              </div>
                              <div>
                                <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.userName}</p>
                                <p className="text-xs text-slate-500">{order.id} • {order.trackingCode}</p>
                              </div>
                            </div>
                            <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${config.color}`}>
                              {config.label}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            <div>
                              <p className="text-xs text-slate-500">مبلغ</p>
                              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.total.toLocaleString()} ت</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">تعداد کالا</p>
                              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.items.length} عدد</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">نوع ارسال</p>
                              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.deliveryType === 'express' ? 'فوری' : 'برنامه‌ریزی'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">تاریخ</p>
                              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</p>
                            </div>
                          </div>

                          {/* Status Change Buttons */}
                          <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                            {order.status !== 'delivered' && order.status !== 'cancelled' && (
                              <>
                                {order.status === 'pending' && (
                                  <button
                                    onClick={() => { store.updateOrderStatus(order.id, 'confirmed'); showNotif('سفارش تأیید شد'); }}
                                    className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700"
                                  >
                                    تأیید سفارش
                                  </button>
                                )}
                                {order.status === 'confirmed' && (
                                  <button
                                    onClick={() => { store.updateOrderStatus(order.id, 'preparing'); showNotif('در حال آماده‌سازی'); }}
                                    className="flex-1 py-2 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700"
                                  >
                                    شروع آماده‌سازی
                                  </button>
                                )}
                                {order.status === 'preparing' && (
                                  <button
                                    onClick={() => { store.updateOrderStatus(order.id, 'out-for-delivery'); showNotif('تحویل پیک شد'); }}
                                    className="flex-1 py-2 rounded-lg bg-cyan-600 text-white text-xs font-medium hover:bg-cyan-700"
                                  >
                                    تحویل به پیک
                                  </button>
                                )}
                                {order.status === 'out-for-delivery' && (
                                  <button
                                    onClick={() => { store.updateOrderStatus(order.id, 'delivered'); showNotif('سفارش تحویل داده شد'); }}
                                    className="flex-1 py-2 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700"
                                  >
                                    تأیید تحویل
                                  </button>
                                )}
                                <button
                                  onClick={() => { store.cancelOrder(order.id); showNotif('سفارش لغو شد'); }}
                                  className="px-4 py-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-xs font-medium hover:bg-red-200 dark:hover:bg-red-900/30"
                                >
                                  لغو
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Coupons Management */}
            {activeTab === 'coupons' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{store.coupons.length} کد تخفیف فعال</p>
                  </div>
                  <button onClick={() => setShowAddCoupon(true)} className="btn-primary">
                    <Plus size={16} />
                    <span>کد تخفیف جدید</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {store.coupons.map((coupon) => (
                    <div key={coupon.id} className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <code className={`text-lg font-mono font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{coupon.code}</code>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${coupon.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}>
                              {coupon.isActive ? 'فعال' : 'غیرفعال'}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500">
                            {coupon.type === 'percentage' ? `${coupon.value}% تخفیف` : `${coupon.value.toLocaleString()} تومان تخفیف`}
                          </p>
                        </div>
                        <button
                          onClick={() => { store.toggleCoupon(coupon.id); showNotif('وضعیت کد تغییر کرد'); }}
                          className={`p-2 rounded-lg ${coupon.isActive ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                        >
                          {coupon.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-slate-500">حداقل سفارش</p>
                          <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{coupon.minOrder.toLocaleString()} ت</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">استفاده شده</p>
                          <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{coupon.usedCount} / {coupon.maxUses}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-xs text-slate-500">انقضا: {coupon.expiresAt}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingCoupon(coupon.id)}
                            className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} text-blue-600`}>
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => { store.deleteCoupon(coupon.id); showNotif('کد تخفیف حذف شد'); }}
                            className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} text-red-600`}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users Management */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className={isDark ? 'bg-slate-700/50' : 'bg-slate-50'}>
                        <tr>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">کاربر</th>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">شماره تماس</th>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">سفارشات</th>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">مجموع خرید</th>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">وضعیت</th>
                          <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {store.users.map((user) => (
                          <tr key={user.id} className={`border-t ${isDark ? 'border-slate-700/50 hover:bg-slate-700/30' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                                  {user.name[0]}
                                </div>
                                <div>
                                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{user.name}</p>
                                  <p className="text-xs text-slate-500">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{user.phone}</td>
                            <td className="p-4 text-sm">{user.orderCount}</td>
                            <td className="p-4 text-sm font-bold">{user.totalSpent.toLocaleString()} ت</td>
                            <td className="p-4">
                              <span className={`text-xs px-2 py-1 rounded-full ${user.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {user.isActive ? 'فعال' : 'مسدود'}
                              </span>
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => { store.toggleUserStatus(user.id); showNotif('وضعیت کاربر تغییر کرد'); }}
                                className={`p-1.5 rounded-lg ${user.isActive ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
                              >
                                {user.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Abandoned Carts */}
            {activeTab === 'carts' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-orange-900/20 border-orange-800/30' : 'bg-orange-50 border-orange-100'} border`}>
                  <div className="flex items-center gap-3">
                    <AlertCircle size={20} className="text-orange-600" />
                    <div>
                      <p className={`font-medium text-sm ${isDark ? 'text-orange-300' : 'text-orange-800'}`}>
                        {store.abandonedCarts.length} سبد خرید رها شده
                      </p>
                      <p className="text-xs text-orange-600 dark:text-orange-400">
                        مجموع ارزش: {store.abandonedCarts.reduce((sum, c) => sum + c.total, 0).toLocaleString()} تومان
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {store.abandonedCarts.map((cart) => (
                    <div key={cart.id} className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{cart.userName}</p>
                          <p className="text-xs text-slate-500">آخرین فعالیت: {new Date(cart.lastUpdatedAt).toLocaleDateString('fa-IR')}</p>
                        </div>
                        <p className="text-lg font-bold text-green-600">{cart.total.toLocaleString()} ت</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {cart.items.map((item, idx) => (
                          <span key={idx} className={`text-xs px-2 py-1 rounded-lg ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                            {item.name} × {item.quantity}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reports */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                    <p className="text-sm text-slate-500 mb-1">میانگین سبد خرید</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {Math.round(analytics.averageOrderValue).toLocaleString()} ت
                    </p>
                  </div>
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                    <p className="text-sm text-slate-500 mb-1">نرخ تبدیل</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {analytics.conversionRate.toFixed(1)}%
                    </p>
                  </div>
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                    <p className="text-sm text-slate-500 mb-1">سبدهای رها شده</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {store.abandonedCarts.length}
                    </p>
                  </div>
                </div>

                <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
                  <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>روند درآمد ۷ روز اخیر</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analytics.revenueByDay}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }} />
                      <YAxis tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }} />
                      <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', direction: 'rtl' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="url(#colorRev)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
