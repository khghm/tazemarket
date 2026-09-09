import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/Category';
import ProductPage from './pages/Product';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import TrackingPage from './pages/Tracking';
import ProfilePage from './pages/Profile';
import AdminPage from './pages/Admin';
import SearchPage from './pages/Search';
import { useThemeStore } from './store/themeStore';

function App() {
  const isDark = useThemeStore((s) => s.isDark);

  useEffect(() => {
    document.documentElement.classList.add('light');
  }, []);

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <Header />
        <main className="pb-20 md:pb-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/flash-deals" element={<Home />} />
            <Route path="/popular" element={<Home />} />
            <Route path="/discounts" element={<Home />} />
          </Routes>
        </main>
        <Footer />

        {/* Mobile Bottom Navigation */}
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 border-t z-50 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-around py-2">
            {[
              { path: '/', icon: '🏠', label: 'خانه' },
              { path: '/category/fruits-vegetables', icon: '📂', label: 'دسته‌بندی' },
              { path: '/cart', icon: '🛒', label: 'سبد' },
              { path: '/tracking', icon: '📦', label: 'سفارشات' },
              { path: '/profile', icon: '👤', label: 'حساب' },
            ].map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'} hover:text-green-600`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[10px]">{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Admin Link (hidden, accessible via URL) */}
        <a href="/admin" className="fixed bottom-20 right-2 md:bottom-4 md:right-4 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs opacity-30 hover:opacity-100 transition-opacity z-40">
          ⚙️
        </a>
      </div>
    </BrowserRouter>
  );
}

export default App;
