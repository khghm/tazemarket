import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts, Product } from '../data/products';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  items: { productId: string; name: string; price: number; quantity: number; image: string }[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  address: string;
  deliveryTime: string;
  deliveryType: 'express' | 'scheduled';
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  createdAt: string;
  updatedAt: string;
  trackingCode: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
  category?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  addresses: { id: string; title: string; address: string; lat?: number; lng?: number }[];
  orderCount: number;
  totalSpent: number;
  registeredAt: string;
  lastOrderAt?: string;
  isActive: boolean;
}

export interface AbandonedCart {
  id: string;
  userId: string;
  userName: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  createdAt: string;
  lastUpdatedAt: string;
}

interface AdminStore {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;

  // Orders
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
  cancelOrder: (id: string) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  toggleCoupon: (id: string) => void;

  // Users
  users: User[];
  toggleUserStatus: (id: string) => void;

  // Abandoned Carts
  abandonedCarts: AbandonedCart[];

  // Analytics
  getAnalytics: () => {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
    averageOrderValue: number;
    conversionRate: number;
    topProducts: { name: string; count: number }[];
    ordersByStatus: { status: string; count: number }[];
    revenueByDay: { date: string; revenue: number }[];
  };
}

// Generate realistic initial data
const generateOrders = (): Order[] => {
  const statuses: Order['status'][] = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];
  const names = ['علی محمدی', 'مریم احمدی', 'رضا کریمی', 'زهرا حسینی', 'حسین رضایی', 'فاطمه نوری', 'محمد صادقی', 'سارا عباسی'];
  const orders: Order[] = [];

  for (let i = 0; i < 25; i++) {
    const name = names[i % names.length];
    const itemCount = Math.floor(Math.random() * 5) + 1;
    const items = [];
    let total = 0;

    for (let j = 0; j < itemCount; j++) {
      const product = initialProducts[Math.floor(Math.random() * initialProducts.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      });
      total += product.price * quantity;
    }

    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    orders.push({
      id: `ORD-${1000 + i}`,
      userId: `U-${Math.floor(Math.random() * 8) + 1}`,
      userName: name,
      userPhone: `09${Math.floor(Math.random() * 900000000 + 100000000)}`,
      items,
      total,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      address: `تهران، خیابان ${['ولیعصر', 'انقلاب', 'آزادی', 'دماوند', 'پاسداران'][Math.floor(Math.random() * 5)]}`,
      deliveryTime: Math.random() > 0.5 ? 'فوری (کمتر از ۱ ساعت)' : 'برنامه‌ریزی شده',
      deliveryType: Math.random() > 0.5 ? 'express' : 'scheduled',
      paymentMethod: 'درگاه زرین‌پال',
      paymentStatus: 'paid',
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      trackingCode: `TRK${Math.floor(Math.random() * 900000 + 100000)}`,
    });
  }

  return orders;
};

const generateCoupons = (): Coupon[] => [
  {
    id: 'c1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrder: 100000,
    maxUses: 1000,
    usedCount: 234,
    expiresAt: '2025-03-20',
    isActive: true,
  },
  {
    id: 'c2',
    code: 'FRUIT20',
    type: 'percentage',
    value: 20,
    minOrder: 200000,
    maxUses: 500,
    usedCount: 89,
    expiresAt: '2025-02-28',
    isActive: true,
    category: 'fruits-vegetables',
  },
  {
    id: 'c3',
    code: 'FREESHIP',
    type: 'fixed',
    value: 30000,
    minOrder: 300000,
    maxUses: 200,
    usedCount: 156,
    expiresAt: '2025-04-01',
    isActive: true,
  },
  {
    id: 'c4',
    code: 'DAIRY15',
    type: 'percentage',
    value: 15,
    minOrder: 150000,
    maxUses: 300,
    usedCount: 67,
    expiresAt: '2025-02-15',
    isActive: false,
    category: 'dairy-eggs',
  },
];

const generateUsers = (): User[] => {
  const names = ['علی محمدی', 'مریم احمدی', 'رضا کریمی', 'زهرا حسینی', 'حسین رضایی', 'فاطمه نوری', 'محمد صادقی', 'سارا عباسی'];
  return names.map((name, i) => ({
    id: `U-${i + 1}`,
    name,
    phone: `09${Math.floor(Math.random() * 900000000 + 100000000)}`,
    email: `${name.replace(' ', '.')}@email.com`,
    addresses: [
      {
        id: `addr-${i}-1`,
        title: 'منزل',
        address: `تهران، خیابان ${['ولیعصر', 'انقلاب', 'آزادی'][i % 3]}، پلاک ${Math.floor(Math.random() * 100) + 1}`,
      },
    ],
    orderCount: Math.floor(Math.random() * 20) + 1,
    totalSpent: Math.floor(Math.random() * 5000000) + 500000,
    registeredAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastOrderAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: Math.random() > 0.1,
  }));
};

const generateAbandonedCarts = (): AbandonedCart[] => {
  const names = ['علی محمدی', 'مریم احمدی', 'رضا کریمی', 'زهرا حسینی'];
  return names.map((name, i) => {
    const itemCount = Math.floor(Math.random() * 4) + 2;
    const items = [];
    let total = 0;

    for (let j = 0; j < itemCount; j++) {
      const product = initialProducts[Math.floor(Math.random() * initialProducts.length)];
      const quantity = Math.floor(Math.random() * 2) + 1;
      items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
      });
      total += product.price * quantity;
    }

    return {
      id: `AC-${i + 1}`,
      userId: `U-${i + 1}`,
      userName: name,
      items,
      total,
      createdAt: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
      lastUpdatedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      orders: generateOrders(),
      coupons: generateCoupons(),
      users: generateUsers(),
      abandonedCarts: generateAbandonedCarts(),

      // Product operations
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      toggleProductStock: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, inStock: !p.inStock } : p
          ),
        })),

      // Order operations
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o
          ),
        })),

      cancelOrder: (id) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status: 'cancelled' as const, updatedAt: new Date().toISOString() } : o
          ),
        })),

      // Coupon operations
      addCoupon: (coupon) =>
        set((state) => ({ coupons: [...state.coupons, coupon] })),

      updateCoupon: (id, updates) =>
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),

      deleteCoupon: (id) =>
        set((state) => ({
          coupons: state.coupons.filter((c) => c.id !== id),
        })),

      toggleCoupon: (id) =>
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === id ? { ...c, isActive: !c.isActive } : c
          ),
        })),

      // User operations
      toggleUserStatus: (id) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, isActive: !u.isActive } : u
          ),
        })),

      // Analytics
      getAnalytics: () => {
        const state = get();
        const deliveredOrders = state.orders.filter((o) => o.status === 'delivered');
        const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
        const totalOrders = state.orders.length;
        const totalProducts = state.products.length;
        const totalUsers = state.users.length;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        const conversionRate = totalUsers > 0 ? (totalOrders / totalUsers) * 100 : 0;

        // Top products
        const productCounts: { [key: string]: number } = {};
        state.orders.forEach((order) => {
          order.items.forEach((item) => {
            productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
          });
        });
        const topProducts = Object.entries(productCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({ name, count }));

        // Orders by status
        const statusCounts: { [key: string]: number } = {};
        state.orders.forEach((order) => {
          statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
        });
        const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({
          status,
          count,
        }));

        // Revenue by day (last 7 days)
        const revenueByDay: { date: string; revenue: number }[] = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toLocaleDateString('fa-IR');
          const dayOrders = state.orders.filter((o) => {
            const orderDate = new Date(o.createdAt);
            return orderDate.toDateString() === date.toDateString();
          });
          const dayRevenue = dayOrders.reduce((sum, o) => sum + o.total, 0);
          revenueByDay.push({ date: dateStr, revenue: dayRevenue });
        }

        return {
          totalRevenue,
          totalOrders,
          totalProducts,
          totalUsers,
          averageOrderValue,
          conversionRate,
          topProducts,
          ordersByStatus,
          revenueByDay,
        };
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);
