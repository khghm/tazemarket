import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Tag, Users, BarChart3,
  Plus, Edit2, Trash2, Eye, Search, Filter, Download, Upload,
  CheckCircle, XCircle, Clock, Truck, ChefHat, AlertCircle,
  ArrowRight, TrendingUp, TrendingDown, DollarSign, Activity,
  ToggleLeft, ToggleRight, MoreVertical, X,
  Save, RefreshCw, Ban, Check, ArrowLeft, Settings, Bell,
  MessageSquare, Star, MapPin, Calendar, CreditCard,
  Percent, Hash, Image, FileText, LogOut, HelpCircle,
  ChevronLeft, ChevronDown, Copy, ExternalLink, Mail, Phone,
  Shield, Zap, Award, Target, PieChart as PieIcon
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useAdminStore, Order, Coupon, User as UserType } from '../store/adminStore';
import { Product } from '../data/products';
import { categories } from '../data/categories';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';

type TabId = 'dashboard' | 'products' | 'orders' | 'coupons' | 'users' | 'carts' | 'reports' | 'reviews' | 'settings';

// Modal Component
function Modal({ isOpen, onClose, title, children, size = 'md' }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const isDark = useThemeStore((s) => s.isDark);
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} border shadow-2xl`}>
        <div className={`sticky top-0 z-10 flex items-center justify-between p-5 border-b ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
          <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
            <X size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const isDark = useThemeStore((s) => s.isDark);
  const navigate = useNavigate();
  const store = useAdminStore();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [viewingUser, setViewingUser] = useState<UserType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const analytics = store.getAnalytics();

  const showNotif = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const tabs: { id: TabId; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
    { id: 'products', label: 'محصولات', icon: Package, count: store.products.length },
    { id: 'orders', label: 'سفارشات', icon: ShoppingCart, count: store.orders.length },
    { id: 'coupons', label: 'تخفیف‌ها', icon: Tag, count: store.coupons.length },
    { id: 'users', label: 'کاربران', icon: Users, count: store.users.length },
    { id: 'carts', label: 'سبد رها شده', icon: AlertCircle, count: store.abandonedCarts.length },
    { id: 'reviews', label: 'نظرات', icon: MessageSquare },
    { id: 'reports', label: 'گزارشات', icon: BarChart3 },
    { id: 'settings', label: 'تنظیمات', icon: Settings },
  ];

  const statusConfig: Record<string, { label: string; color: string; icon: any; bg: string }> = {
    pending: { label: 'در انتظار تأیید', color: 'text-yellow-700 dark:text-yellow-400', icon: Clock, bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    confirmed: { label: 'تأیید شده', color: 'text-blue-700 dark:text-blue-400', icon: CheckCircle, bg: 'bg-blue-100 dark:bg-blue-900/30' },
    preparing: { label: 'در حال آماده‌سازی', color: 'text-purple-700 dark:text-purple-400', icon: ChefHat, bg: 'bg-purple-100 dark:bg-purple-900/30' },
    'out-for-delivery': { label: 'در مسیر ارسال', color: 'text-cyan-700 dark:text-cyan-400', icon: Truck, bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
    delivered: { label: 'تحویل شده', color: 'text-green-700 dark:text-green-400', icon: CheckCircle, bg: 'bg-green-100 dark:bg-green-900/30' },
    cancelled: { label: 'لغو شده', color: 'text-red-700 dark:text-red-400', icon: XCircle, bg: 'bg-red-100 dark:bg-red-900/30' },
  };

  const filteredProducts = useMemo(() => {
    return store.products.filter(p => {
      const matchesSearch = p.name.includes(searchQuery) || p.brand.includes(searchQuery);
      const matchesCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [store.products, searchQuery, productCategoryFilter]);

  const filteredOrders = useMemo(() => {
    return store.orders.filter(o => orderFilter === 'all' || o.status === orderFilter);
  }, [store.orders, orderFilter]);

  // Product Form Handler
  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      store.updateProduct(editingProduct.id, productData);
      showNotif('محصول با موفقیت ویرایش شد');
    } else {
      const newProduct: Product = {
        id: `p${Date.now()}`,
        name: productData.name || '',
        category: productData.category || 'staples',
        subcategory: productData.subcategory || '',
        price: productData.price || 0,
        originalPrice: productData.originalPrice,
        discount: productData.discount,
        unit: productData.unit || 'عدد',
        image: productData.image || 'https://via.placeholder.com/200',
        brand: productData.brand || '',
        inStock: productData.inStock !== undefined ? productData.inStock : true,
        rating: productData.rating || 0,
        reviewCount: productData.reviewCount || 0,
        description: productData.description || '',
      };
      store.addProduct(newProduct);
      showNotif('محصول جدید اضافه شد');
    }
    setShowAddProduct(false);
    setEditingProduct(null);
  };

  // Coupon Form Handler
  const handleSaveCoupon = (couponData: Partial<Coupon>) => {
    if (editingCoupon) {
      store.updateCoupon(editingCoupon.id, couponData);
      showNotif('کد تخفیف ویرایش شد');
    } else {
      const newCoupon: Coupon = {
        id: `c${Date.now()}`,
        code: couponData.code || '',
        type: couponData.type || 'percentage',
        value: couponData.value || 0,
        minOrder: couponData.minOrder || 0,
        maxUses: couponData.maxUses || 100,
        usedCount: 0,
        expiresAt: couponData.expiresAt || '',
        isActive: true,
        category: couponData.category,
      };
      store.addCoupon(newCoupon);
      showNotif('کد تخفیف جدید ایجاد شد');
    }
    setShowAddCoupon(false);
    setEditingCoupon(null);
  };

  // Helper functions with proper types
  const handleProductEdit = (p: Product) => { setEditingProduct(p); setShowAddProduct(true); };
  const handleProductDelete = (id: string) => { if (confirm('آیا مطمئن هستید؟')) { store.deleteProduct(id); showNotif('محصول حذف شد'); } };
  const handleProductToggleStock = (id: string) => { store.toggleProductStock(id); showNotif('وضعیت موجودی تغییر کرد'); };
  const handleOrderView = (o: Order) => setViewingOrder(o);
  const handleOrderUpdateStatus = (id: string, status: Order['status']) => { store.updateOrderStatus(id, status); showNotif('وضعیت سفارش تغییر کرد'); };
  const handleOrderCancel = (id: string) => { store.cancelOrder(id); showNotif('سفارش لغو شد'); };
  const handleCouponEdit = (c: Coupon) => { setEditingCoupon(c); setShowAddCoupon(true); };
  const handleCouponDelete = (id: string) => { store.deleteCoupon(id); showNotif('کد تخفیف حذف شد'); };
  const handleCouponToggle = (id: string) => { store.toggleCoupon(id); showNotif('وضعیت کد تغییر کرد'); };
  const handleUserView = (u: UserType) => setViewingUser(u);
  const handleUserToggle = (id: string) => { store.toggleUserStatus(id); showNotif('وضعیت کاربر تغییر کرد'); };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[200] ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in-up`}>
          {notification.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
          <span className="text-sm font-medium">{notification.msg}</span>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMobileSidebar(false)} />
          <div className={`absolute right-0 top-0 h-full w-72 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-2xl`}>
            <SidebarContent
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={(tab: TabId) => { setActiveTab(tab); setShowMobileSidebar(false); }}
              isDark={isDark}
              onLogout={() => navigate('/')}
            />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className={`hidden lg:flex flex-col w-64 min-h-screen fixed right-0 top-0 bottom-0 border-l ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} z-30`}>
          <SidebarContent
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isDark={isDark}
            onLogout={() => navigate('/')}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:mr-64 min-h-screen">
          {/* Top Bar */}
          <div className={`sticky top-0 z-20 border-b ${isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-xl`}>
            <div className="flex items-center justify-between px-4 sm:px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileSidebar(true)}
                  className={`lg:hidden p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                >
                  <LayoutDashboard size={20} />
                </button>
                <h1 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {tabs.find(t => t.id === activeTab)?.label}
                </h1>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button className={`relative p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                    م
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>مدیر سیستم</p>
                    <p className="text-xs text-slate-500">admin@tazemarket.ir</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {/* Dashboard */}
            {activeTab === 'dashboard' && <DashboardTab analytics={analytics} store={store} isDark={isDark} statusConfig={statusConfig} setActiveTab={setActiveTab} />}

            {/* Products */}
            {activeTab === 'products' && (
              <ProductsTab
                products={filteredProducts}
                allProducts={store.products}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categoryFilter={productCategoryFilter}
                setCategoryFilter={setProductCategoryFilter}
                isDark={isDark}
                onAdd={() => { setEditingProduct(null); setShowAddProduct(true); }}
                onEdit={handleProductEdit}
                onDelete={handleProductDelete}
                onToggleStock={handleProductToggleStock}
              />
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <OrdersTab
                orders={filteredOrders}
                filter={orderFilter}
                setFilter={setOrderFilter}
                isDark={isDark}
                statusConfig={statusConfig}
                onView={handleOrderView}
                onUpdateStatus={handleOrderUpdateStatus}
                onCancel={handleOrderCancel}
              />
            )}

            {/* Coupons */}
            {activeTab === 'coupons' && (
              <CouponsTab
                coupons={store.coupons}
                isDark={isDark}
                onAdd={() => { setEditingCoupon(null); setShowAddCoupon(true); }}
                onEdit={handleCouponEdit}
                onDelete={handleCouponDelete}
                onToggle={handleCouponToggle}
              />
            )}

            {/* Users */}
            {activeTab === 'users' && (
              <UsersTab
                users={store.users}
                isDark={isDark}
                onView={handleUserView}
                onToggle={handleUserToggle}
              />
            )}

            {/* Abandoned Carts */}
            {activeTab === 'carts' && <AbandonedCartsTab carts={store.abandonedCarts} isDark={isDark} />}

            {/* Reviews */}
            {activeTab === 'reviews' && <ReviewsTab isDark={isDark} />}

            {/* Reports */}
            {activeTab === 'reports' && <ReportsTab analytics={analytics} isDark={isDark} />}

            {/* Settings */}
            {activeTab === 'settings' && <SettingsTab isDark={isDark} showNotif={showNotif} />}
          </div>
        </main>
      </div>

      {/* Modals */}
      <Modal isOpen={showAddProduct} onClose={() => { setShowAddProduct(false); setEditingProduct(null); }} title={editingProduct ? 'ویرایش محصول' : 'افزودن محصول جدید'} size="lg">
        <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={() => { setShowAddProduct(false); setEditingProduct(null); }} isDark={isDark} />
      </Modal>

      <Modal isOpen={showAddCoupon} onClose={() => { setShowAddCoupon(false); setEditingCoupon(null); }} title={editingCoupon ? 'ویرایش کد تخفیف' : 'ایجاد کد تخفیف جدید'} size="md">
        <CouponForm coupon={editingCoupon} onSave={handleSaveCoupon} onCancel={() => { setShowAddCoupon(false); setEditingCoupon(null); }} isDark={isDark} />
      </Modal>

      <Modal isOpen={!!viewingOrder} onClose={() => setViewingOrder(null)} title={`جزئیات سفارش ${viewingOrder?.id || ''}`} size="lg">
        {viewingOrder && <OrderDetails order={viewingOrder} isDark={isDark} statusConfig={statusConfig} onUpdateStatus={(status: Order['status']) => { store.updateOrderStatus(viewingOrder.id, status); setViewingOrder({ ...viewingOrder, status }); showNotif('وضعیت تغییر کرد'); }} onCancel={() => { store.cancelOrder(viewingOrder.id); setViewingOrder(null); showNotif('سفارش لغو شد'); }} />}
      </Modal>

      <Modal isOpen={!!viewingUser} onClose={() => setViewingUser(null)} title={`پروفایل کاربر: ${viewingUser?.name || ''}`} size="lg">
        {viewingUser && <UserDetails user={viewingUser} orders={store.orders.filter(o => o.userId === viewingUser.id)} isDark={isDark} />}
      </Modal>
    </div>
  );
}

// Sidebar Content
function SidebarContent({ tabs, activeTab, setActiveTab, isDark, onLogout }: any) {
  return (
    <>
      <div className="p-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-sm">ت</span>
          </div>
          <div>
            <h2 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>پنل مدیریت</h2>
            <p className="text-xs text-slate-500">تازه‌مارکت</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {tabs.map((tab: any) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
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

      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <Link to="/" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>
          <ExternalLink size={18} />
          <span>مشاهده سایت</span>
        </Link>
        <button onClick={onLogout} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-600 ${isDark ? 'hover:bg-red-900/20' : 'hover:bg-red-50'}`}>
          <LogOut size={18} />
          <span>خروج</span>
        </button>
      </div>
    </>
  );
}

// Dashboard Tab
function DashboardTab({ analytics, store, isDark, statusConfig, setActiveTab }: any) {
  const stats = [
    { label: 'درآمد کل', value: `${(analytics.totalRevenue / 1000000).toFixed(1)}M`, sub: 'تومان', change: '+12%', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
    { label: 'سفارشات', value: analytics.totalOrders, sub: 'سفارش', change: '+8%', icon: ShoppingCart, color: 'from-blue-500 to-cyan-600' },
    { label: 'کاربران', value: analytics.totalUsers, sub: 'کاربر', change: '+5%', icon: Users, color: 'from-purple-500 to-pink-600' },
    { label: 'محصولات', value: analytics.totalProducts, sub: 'محصول', change: '+2', icon: Package, color: 'from-orange-500 to-red-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`p-4 sm:p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                  <TrendingUp size={12} />{stat.change}
                </span>
              </div>
              <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div className={`p-5 sm:p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
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

        <div className={`p-5 sm:p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>وضعیت سفارشات</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analytics.ordersByStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ status, count }) => `${statusConfig[status]?.label?.slice(0, 8) || status}: ${count}`}
              >
                {analytics.ordersByStatus.map((entry: any, idx: number) => (
                  <Cell key={idx} fill={['#eab308', '#3b82f6', '#a855f7', '#06b6d4', '#22c55e', '#ef4444'][idx % 6]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', direction: 'rtl' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div className={`p-5 sm:p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>محصولات پرفروش</h3>
            <button onClick={() => setActiveTab('products')} className="text-xs text-green-600 hover:text-green-700 font-medium">مشاهده همه</button>
          </div>
          <div className="space-y-3">
            {analytics.topProducts.map((product: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  idx === 0 ? 'bg-amber-100 text-amber-700' : idx === 1 ? 'bg-slate-100 text-slate-600' : 'bg-orange-50 text-orange-600'
                }`}>{idx + 1}</span>
                <span className={`flex-1 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{product.name}</span>
                <span className="text-sm font-bold text-green-600">{product.count}x</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-5 sm:p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>سفارشات اخیر</h3>
            <button onClick={() => setActiveTab('orders')} className="text-xs text-green-600 hover:text-green-700 font-medium">مشاهده همه</button>
          </div>
          <div className="space-y-3">
            {store.orders.slice(0, 5).map((order: Order) => {
              const config = statusConfig[order.status];
              const Icon = config.icon;
              return (
                <div key={order.id} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${config.bg} ${config.color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.userName}</p>
                    <p className="text-xs text-slate-500">{order.id}</p>
                  </div>
                  <span className="text-sm font-bold text-green-600 whitespace-nowrap">{order.total.toLocaleString()} ت</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Products Tab
function ProductsTab({ products, allProducts, searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, isDark, onAdd, onEdit, onDelete, onToggleStock }: any) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
          <div className={`flex-1 sm:max-w-xs flex items-center gap-2 px-4 py-2.5 rounded-xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}>
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="جستجو محصول..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-slate-500' : 'text-slate-800'}`} />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={`px-3 py-2.5 rounded-xl text-sm ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200'} border`}>
            <option value="all">همه دسته‌ها</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className={`px-4 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-white hover:bg-slate-50 text-slate-700'} border ${isDark ? 'border-slate-700' : 'border-slate-200'} flex items-center gap-2`}>
            <Download size={16} />
            <span className="hidden sm:inline">خروجی</span>
          </button>
          <button onClick={onAdd} className="btn-primary">
            <Plus size={16} />
            <span>محصول جدید</span>
          </button>
        </div>
      </div>

      <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-slate-700/50' : 'bg-slate-50'}>
              <tr>
                <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">محصول</th>
                <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">دسته‌بندی</th>
                <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">قیمت</th>
                <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">موجودی</th>
                <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product) => (
                <tr key={product.id} className={`border-t ${isDark ? 'border-slate-700/50 hover:bg-slate-700/30' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{product.name}</p>
                        <p className="text-xs text-slate-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">{categories.find(c => c.id === product.category)?.name || product.category}</td>
                  <td className="p-4">
                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{product.price.toLocaleString()} ت</p>
                    {product.originalPrice && <p className="text-xs text-slate-400 line-through">{product.originalPrice.toLocaleString()}</p>}
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <button onClick={() => onToggleStock(product.id)} className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {product.inStock ? 'موجود' : 'ناموجود'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => onEdit(product)} className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} text-blue-600`}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => onDelete(product.id)} className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} text-red-600`}>
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
      <p className="text-sm text-slate-500">نمایش {products.length} از {allProducts.length} محصول</p>
    </div>
  );
}

// Product Form
function ProductForm({ product, onSave, onCancel, isDark }: any) {
  const [form, setForm] = useState<Partial<Product>>(product || {
    name: '', category: 'staples', subcategory: '', price: 0, originalPrice: 0, discount: 0,
    unit: 'عدد', image: '', brand: '', inStock: true, description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>نام محصول *</label>
          <input type="text" required value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>برند</label>
          <input type="text" value={form.brand || ''} onChange={(e) => setForm({ ...form, brand: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>دسته‌بندی *</label>
          <select value={form.category || 'staples'} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`}>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>واحد</label>
          <input type="text" value={form.unit || ''} onChange={(e) => setForm({ ...form, unit: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>قیمت (تومان) *</label>
          <input type="number" required value={form.price || 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>قیمت قبل از تخفیف</label>
          <input type="number" value={form.originalPrice || 0} onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>تخفیف (%)</label>
          <input type="number" value={form.discount || 0} onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>لینک تصویر</label>
          <input type="url" value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} placeholder="https://..." />
        </div>
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>توضیحات</label>
        <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="inStock" checked={form.inStock !== false} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="w-4 h-4" />
        <label htmlFor="inStock" className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>موجود در انبار</label>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button type="submit" className="btn-primary flex-1">
          <Save size={16} />
          <span>{product ? 'ذخیره تغییرات' : 'افزودن محصول'}</span>
        </button>
        <button type="button" onClick={onCancel} className={`px-6 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
          انصراف
        </button>
      </div>
    </form>
  );
}

// Orders Tab
function OrdersTab({ orders, filter, setFilter, isDark, statusConfig, onView, onUpdateStatus, onCancel }: any) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {['all', 'pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'].map((status) => (
          <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filter === status ? 'bg-green-600 text-white' : isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}>
            {status === 'all' ? 'همه' : statusConfig[status]?.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {orders.map((order: Order) => {
          const config = statusConfig[order.status];
          const Icon = config.icon;
          return (
            <div key={order.id} className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.bg} ${config.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.userName}</p>
                    <p className="text-xs text-slate-500">{order.id} • {order.trackingCode}</p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${config.bg} ${config.color}`}>{config.label}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div><p className="text-xs text-slate-500">مبلغ</p><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.total.toLocaleString()} ت</p></div>
                <div><p className="text-xs text-slate-500">تعداد کالا</p><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.items.length} عدد</p></div>
                <div><p className="text-xs text-slate-500">نوع ارسال</p><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.deliveryType === 'express' ? 'فوری' : 'برنامه‌ریزی'}</p></div>
                <div><p className="text-xs text-slate-500">تاریخ</p><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</p></div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                <button onClick={() => onView(order)} className={`px-4 py-2 rounded-lg text-xs font-medium ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} flex items-center gap-1`}>
                  <Eye size={14} />
                  <span>جزئیات</span>
                </button>
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <>
                    {order.status === 'pending' && <button onClick={() => onUpdateStatus(order.id, 'confirmed')} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700">تأیید</button>}
                    {order.status === 'confirmed' && <button onClick={() => onUpdateStatus(order.id, 'preparing')} className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700">آماده‌سازی</button>}
                    {order.status === 'preparing' && <button onClick={() => onUpdateStatus(order.id, 'out-for-delivery')} className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-xs font-medium hover:bg-cyan-700">ارسال</button>}
                    {order.status === 'out-for-delivery' && <button onClick={() => onUpdateStatus(order.id, 'delivered')} className="px-4 py-2 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700">تحویل</button>}
                    <button onClick={() => onCancel(order.id)} className="px-4 py-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-xs font-medium hover:bg-red-200">لغو</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Order Details
function OrderDetails({ order, isDark, statusConfig, onUpdateStatus, onCancel }: any) {
  const config = statusConfig[order.status];
  const Icon = config.icon;
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.bg} ${config.color}`}>
            <Icon size={22} />
          </div>
          <div>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.userName}</p>
            <p className="text-sm text-slate-500">{order.userPhone}</p>
          </div>
        </div>
        <span className={`text-sm px-4 py-2 rounded-full font-medium ${config.bg} ${config.color}`}>{config.label}</span>
      </div>

      <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
        <h4 className={`font-bold mb-3 text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>اطلاعات سفارش</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-slate-500">کد رهگیری:</span> <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.trackingCode}</span></div>
          <div><span className="text-slate-500">تاریخ:</span> <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</span></div>
          <div><span className="text-slate-500">نوع ارسال:</span> <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.deliveryTime}</span></div>
          <div><span className="text-slate-500">پرداخت:</span> <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.paymentMethod}</span></div>
        </div>
      </div>

      <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
        <h4 className={`font-bold mb-3 text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>آدرس تحویل</h4>
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-slate-400 mt-0.5" />
          <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{order.address}</p>
        </div>
      </div>

      <div>
        <h4 className={`font-bold mb-3 text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>اقلام سفارش</h4>
        <div className="space-y-2">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.name}</p>
                <p className="text-xs text-slate-500">{item.quantity} × {item.price.toLocaleString()} ت</p>
              </div>
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{(item.quantity * item.price).toLocaleString()} ت</p>
            </div>
          ))}
        </div>
        <div className={`mt-3 p-3 rounded-xl flex items-center justify-between ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}>
          <span className="text-sm font-medium text-green-700 dark:text-green-400">مجموع</span>
          <span className="text-lg font-bold text-green-700 dark:text-green-400">{order.total.toLocaleString()} تومان</span>
        </div>
      </div>

      {order.status !== 'delivered' && order.status !== 'cancelled' && (
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
          {order.status === 'pending' && <button onClick={() => onUpdateStatus('confirmed')} className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">تأیید سفارش</button>}
          {order.status === 'confirmed' && <button onClick={() => onUpdateStatus('preparing')} className="flex-1 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">شروع آماده‌سازی</button>}
          {order.status === 'preparing' && <button onClick={() => onUpdateStatus('out-for-delivery')} className="flex-1 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700">تحویل به پیک</button>}
          {order.status === 'out-for-delivery' && <button onClick={() => onUpdateStatus('delivered')} className="flex-1 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">تأیید تحویل</button>}
          <button onClick={onCancel} className="px-4 py-2.5 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-sm font-medium hover:bg-red-200">لغو</button>
        </div>
      )}
    </div>
  );
}

// Coupons Tab
function CouponsTab({ coupons, isDark, onAdd, onEdit, onDelete, onToggle }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{coupons.length} کد تخفیف</p>
        <button onClick={onAdd} className="btn-primary">
          <Plus size={16} />
          <span>کد تخفیف جدید</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {coupons.map((coupon: Coupon) => (
          <div key={coupon.id} className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
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
              <button onClick={() => onToggle(coupon.id)} className={`p-2 rounded-lg ${coupon.isActive ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                {coupon.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div><p className="text-xs text-slate-500">حداقل سفارش</p><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{coupon.minOrder.toLocaleString()} ت</p></div>
              <div><p className="text-xs text-slate-500">استفاده شده</p><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{coupon.usedCount} / {coupon.maxUses}</p></div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500">انقضا: {coupon.expiresAt}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => onEdit(coupon)} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} text-blue-600`}><Edit2 size={14} /></button>
                <button onClick={() => { if (confirm('حذف شود؟')) onDelete(coupon.id); }} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} text-red-600`}><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Coupon Form
function CouponForm({ coupon, onSave, onCancel, isDark }: any) {
  const [form, setForm] = useState<Partial<Coupon>>(coupon || {
    code: '', type: 'percentage', value: 0, minOrder: 0, maxUses: 100, expiresAt: '', category: '',
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>کد تخفیف *</label>
          <input type="text" required value={form.code || ''} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} className={`w-full px-4 py-2.5 rounded-xl border font-mono ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>نوع تخفیف</label>
          <select value={form.type || 'percentage'} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`}>
            <option value="percentage">درصدی (%)</option>
            <option value="fixed">مبلغ ثابت (تومان)</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>مقدار *</label>
          <input type="number" required value={form.value || 0} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>حداقل مبلغ سفارش</label>
          <input type="number" value={form.minOrder || 0} onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>حداکثر استفاده</label>
          <input type="number" value={form.maxUses || 100} onChange={(e) => setForm({ ...form, maxUses: Number(e.target.value) })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>تاریخ انقضا</label>
          <input type="date" value={form.expiresAt || ''} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
        </div>
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>دسته‌بندی (اختیاری)</label>
        <select value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`}>
          <option value="">همه دسته‌بندی‌ها</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button type="submit" className="btn-primary flex-1"><Save size={16} /><span>{coupon ? 'ذخیره' : 'ایجاد'}</span></button>
        <button type="button" onClick={onCancel} className={`px-6 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>انصراف</button>
      </div>
    </form>
  );
}

// Users Tab
function UsersTab({ users, isDark, onView, onToggle }: any) {
  return (
    <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={isDark ? 'bg-slate-700/50' : 'bg-slate-50'}>
            <tr>
              <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">کاربر</th>
              <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">شماره تماس</th>
              <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">سفارشات</th>
              <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">مجموع خرید</th>
              <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">وضعیت</th>
              <th className="text-right p-4 text-xs font-semibold text-slate-500 uppercase">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: UserType) => (
              <tr key={user.id} className={`border-t ${isDark ? 'border-slate-700/50 hover:bg-slate-700/30' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">{user.name[0]}</div>
                    <div><p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{user.name}</p><p className="text-xs text-slate-500">{user.email}</p></div>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">{user.phone}</td>
                <td className="p-4 text-sm hidden sm:table-cell">{user.orderCount}</td>
                <td className="p-4 text-sm font-bold hidden lg:table-cell">{user.totalSpent.toLocaleString()} ت</td>
                <td className="p-4">
                  <button onClick={() => onToggle(user.id)} className={`text-xs px-2 py-1 rounded-full ${user.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {user.isActive ? 'فعال' : 'مسدود'}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onView(user)} className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} text-blue-600`}><Eye size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// User Details
function UserDetails({ user, orders, isDark }: any) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-2xl">{user.name[0]}</div>
        <div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{user.name}</h3>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
          <p className="text-xs text-slate-500">شماره تماس</p>
          <p className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{user.phone}</p>
        </div>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
          <p className="text-xs text-slate-500">تعداد سفارشات</p>
          <p className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{user.orderCount}</p>
        </div>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
          <p className="text-xs text-slate-500">مجموع خرید</p>
          <p className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{user.totalSpent.toLocaleString()} ت</p>
        </div>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
          <p className="text-xs text-slate-500">تاریخ عضویت</p>
          <p className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{new Date(user.registeredAt).toLocaleDateString('fa-IR')}</p>
        </div>
      </div>

      <div>
        <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>آدرس‌ها</h4>
        <div className="space-y-2">
          {user.addresses.map((addr: any) => (
            <div key={addr.id} className={`flex items-start gap-2 p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
              <MapPin size={16} className="text-slate-400 mt-0.5" />
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{addr.title}</p>
                <p className="text-xs text-slate-500">{addr.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>سفارشات اخیر ({orders.length})</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {orders.slice(0, 10).map((order: Order) => (
            <div key={order.id} className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.id}</p>
                <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString('fa-IR')}</p>
              </div>
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{order.total.toLocaleString()} ت</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Abandoned Carts Tab
function AbandonedCartsTab({ carts, isDark }: any) {
  const totalValue = carts.reduce((sum: number, c: any) => sum + c.total, 0);
  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-2xl ${isDark ? 'bg-orange-900/20 border-orange-800/30' : 'bg-orange-50 border-orange-100'} border`}>
        <div className="flex items-center gap-3">
          <AlertCircle size={20} className="text-orange-600" />
          <div>
            <p className={`font-medium text-sm ${isDark ? 'text-orange-300' : 'text-orange-800'}`}>{carts.length} سبد خرید رها شده</p>
            <p className="text-xs text-orange-600 dark:text-orange-400">مجموع ارزش: {totalValue.toLocaleString()} تومان</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {carts.map((cart: any) => (
          <div key={cart.id} className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{cart.userName}</p>
                <p className="text-xs text-slate-500">آخرین فعالیت: {new Date(cart.lastUpdatedAt).toLocaleDateString('fa-IR')}</p>
              </div>
              <p className="text-lg font-bold text-green-600">{cart.total.toLocaleString()} ت</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {cart.items.map((item: any, idx: number) => (
                <span key={idx} className={`text-xs px-2 py-1 rounded-lg ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                  {item.name} × {item.quantity}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <button className="flex-1 py-2 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 flex items-center justify-center gap-1">
                <Mail size={14} />
                <span>ارسال یادآوری</span>
              </button>
              <button className={`px-4 py-2 rounded-lg text-xs font-medium ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                <Phone size={14} className="inline ml-1" />
                تماس
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reviews Tab
function ReviewsTab({ isDark }: any) {
  const reviews = [
    { id: 1, product: 'سیب قرمز دماوند', user: 'علی محمدی', rating: 5, text: 'سیب‌های خیلی تازه و خوش‌طعمی بود.', date: '1403/09/15', status: 'published' },
    { id: 2, product: 'شیر پرچرب کاله', user: 'مریم احمدی', rating: 4, text: 'کیفیت خوب بود.', date: '1403/09/14', status: 'pending' },
    { id: 3, product: 'تخم‌مرغ محلی', user: 'رضا کریمی', rating: 5, text: 'تخم‌مرغ‌ها خیلی تازه بودند.', date: '1403/09/13', status: 'published' },
    { id: 4, product: 'برنج ایرانی هاشمی', user: 'زهرا حسینی', rating: 3, text: 'کیفیت متوسطی داشت.', date: '1403/09/12', status: 'pending' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white'} border ${isDark ? 'border-slate-700/50' : 'border-slate-100'}`}>
          <p className="text-xs text-slate-500">کل نظرات</p>
          <p className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{reviews.length}</p>
        </div>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white'} border ${isDark ? 'border-slate-700/50' : 'border-slate-100'}`}>
          <p className="text-xs text-slate-500">منتشر شده</p>
          <p className={`text-xl font-bold mt-1 text-green-600`}>{reviews.filter(r => r.status === 'published').length}</p>
        </div>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white'} border ${isDark ? 'border-slate-700/50' : 'border-slate-100'}`}>
          <p className="text-xs text-slate-500">در انتظار تأیید</p>
          <p className={`text-xl font-bold mt-1 text-amber-600`}>{reviews.filter(r => r.status === 'pending').length}</p>
        </div>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white'} border ${isDark ? 'border-slate-700/50' : 'border-slate-100'}`}>
          <p className="text-xs text-slate-500">میانگین امتیاز</p>
          <p className={`text-xl font-bold mt-1 text-amber-500 flex items-center gap-1`}><Star size={16} fill="currentColor" />4.2</p>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{review.product}</p>
                <p className="text-xs text-slate-500">{review.user} • {review.date}</p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < review.rating ? 'text-amber-500' : 'text-slate-300'} fill={i < review.rating ? 'currentColor' : 'none'} />
                ))}
              </div>
            </div>
            <p className={`text-sm mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{review.text}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${review.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                {review.status === 'published' ? 'منتشر شده' : 'در انتظار تأیید'}
              </span>
              {review.status === 'pending' && (
                <button className="text-xs text-green-600 hover:text-green-700 font-medium">تأیید</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reports Tab
function ReportsTab({ analytics, isDark }: any) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
          <p className="text-sm text-slate-500 mb-1">میانگین سبد خرید</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{Math.round(analytics.averageOrderValue).toLocaleString()} ت</p>
        </div>
        <div className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
          <p className="text-sm text-slate-500 mb-1">نرخ تبدیل</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{analytics.conversionRate.toFixed(1)}%</p>
        </div>
        <div className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
          <p className="text-sm text-slate-500 mb-1">سبدهای رها شده</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{analytics.totalOrders}</p>
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

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>پرفروش‌ترین محصولات</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
              <XAxis type="number" tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }} width={120} />
              <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', direction: 'rtl' }} />
              <Bar dataKey="count" fill="#22c55e" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>توزیع سفارشات</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={analytics.ordersByStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                {analytics.ordersByStatus.map((_: any, idx: number) => (
                  <Cell key={idx} fill={['#eab308', '#3b82f6', '#a855f7', '#06b6d4', '#22c55e', '#ef4444'][idx % 6]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', direction: 'rtl' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab({ isDark, showNotif }: any) {
  const [settings, setSettings] = useState({
    siteName: 'تازه‌مارکت',
    siteDescription: 'سوپرمارکت آنلاین با ارسال سریع',
    supportPhone: '021-12345678',
    supportEmail: 'support@tazemarket.ir',
    minOrderAmount: 100000,
    deliveryFee: 30000,
    freeDeliveryThreshold: 500000,
    expressDeliveryTime: 60,
    enableNotifications: true,
    enableReviews: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    showNotif('تنظیمات با موفقیت ذخیره شد');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          <FileText size={18} />
          <span>اطلاعات سایت</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>نام سایت</label>
            <input type="text" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>توضیحات سایت</label>
            <input type="text" value={settings.siteDescription} onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          <Phone size={18} />
          <span>اطلاعات پشتیبانی</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>شماره تماس</label>
            <input type="text" value={settings.supportPhone} onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>ایمیل پشتیبانی</label>
            <input type="email" value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          <DollarSign size={18} />
          <span>تنظیمات مالی و ارسال</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>حداقل مبلغ سفارش (تومان)</label>
            <input type="number" value={settings.minOrderAmount} onChange={(e) => setSettings({ ...settings, minOrderAmount: Number(e.target.value) })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>هزینه ارسال (تومان)</label>
            <input type="number" value={settings.deliveryFee} onChange={(e) => setSettings({ ...settings, deliveryFee: Number(e.target.value) })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>آستانه ارسال رایگان (تومان)</label>
            <input type="number" value={settings.freeDeliveryThreshold} onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>زمان تحویل فوری (دقیقه)</label>
            <input type="number" value={settings.expressDeliveryTime} onChange={(e) => setSettings({ ...settings, expressDeliveryTime: Number(e.target.value) })} className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} outline-none focus:border-green-500`} />
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          <Settings size={18} />
          <span>تنظیمات عمومی</span>
        </h3>
        <div className="space-y-3">
          {[
            { key: 'enableNotifications', label: 'فعال‌سازی اعلان‌ها', desc: 'ارسال اعلان برای کاربران' },
            { key: 'enableReviews', label: 'فعال‌سازی نظرات', desc: 'امکان ثبت نظر برای کاربران' },
            { key: 'maintenanceMode', label: 'حالت تعمیر و نگهداری', desc: 'غیرفعال کردن سایت برای کاربران' },
          ].map((item) => (
            <div key={item.key} className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, [item.key]: !(settings as any)[item.key] })}
                className={`p-1.5 rounded-lg ${(settings as any)[item.key] ? 'text-green-600' : 'text-slate-400'}`}
              >
                {(settings as any)[item.key] ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="btn-primary w-full sm:w-auto">
        <Save size={16} />
        <span>ذخیره تنظیمات</span>
      </button>
    </div>
  );
}
