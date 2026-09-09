import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Truck } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';
import { useState } from 'react';

export default function CartPage() {
  const isDark = useThemeStore((s) => s.isDark);
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalDiscount, getDeliveryFee, getMinOrderAmount, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const totalPrice = getTotalPrice();
  const totalDiscount = getTotalDiscount();
  const deliveryFee = getDeliveryFee();
  const minOrder = getMinOrderAmount();
  const couponValue = couponApplied ? couponDiscount : 0;
  const finalPrice = totalPrice - couponValue;
  const remainingForFreeDelivery = Math.max(0, 300000 - totalPrice);

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'fresh20') {
      setCouponApplied(true);
      setCouponDiscount(Math.round(totalPrice * 0.2));
    } else if (couponCode.toLowerCase() === 'first50') {
      setCouponApplied(true);
      setCouponDiscount(50000);
    } else {
      alert('کد تخفیف نامعتبر است');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-7xl block mb-6">🛒</span>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>سبد خرید شما خالی است</h2>
        <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>محصولات مورد نظر خود را به سبد خرید اضافه کنید</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700">
          <ShoppingBag size={18} />
          شروع خرید
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>سبد خرید</h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600">حذف همه</button>
      </div>

      {/* Free delivery progress */}
      {remainingForFreeDelivery > 0 && (
        <div className={`mb-6 p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-blue-50'} border ${isDark ? 'border-gray-700' : 'border-blue-100'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Truck size={18} className="text-blue-600" />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {(remainingForFreeDelivery / 1000).toFixed(0)} هزار تومان تا ارسال رایگان
            </span>
          </div>
          <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-blue-100'}`}>
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min(100, (totalPrice / 300000) * 100)}%` }} />
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              }`}
            >
              {/* Image */}
              <div className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`} className={`text-sm font-medium line-clamp-1 hover:text-green-600 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {item.product.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{item.product.brand} • {item.product.unit}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-sm font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    {(item.product.price * item.quantity).toLocaleString()} تومان
                  </span>
                  {item.product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {(item.product.originalPrice * item.quantity).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-center gap-2">
                <div className={`flex items-center gap-2 rounded-xl border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                  >
                    {item.quantity === 1 ? <Trash2 size={14} className="text-red-500" /> : <Minus size={14} className="text-green-600" />}
                  </button>
                  <span className={`text-sm font-bold min-w-[24px] text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                  >
                    <Plus size={14} className="text-green-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className={`lg:sticky lg:top-32 h-fit p-6 rounded-2xl border space-y-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>خلاصه سفارش</h3>

          {/* Coupon */}
          <div className="flex gap-2">
            <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <Tag size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="کد تخفیف"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700"
            >
              اعمال
            </button>
          </div>
          <p className="text-xs text-gray-500">کد تست: fresh20 (۲۰٪ تخفیف) یا first50</p>

          <hr className={isDark ? 'border-gray-700' : 'border-gray-200'} />

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>جمع کالاها ({items.length} کالا)</span>
              <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>{totalPrice.toLocaleString()} تومان</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-red-500">
                <span>تخفیف کالاها</span>
                <span>-{totalDiscount.toLocaleString()} تومان</span>
              </div>
            )}
            {couponApplied && (
              <div className="flex justify-between text-green-600">
                <span>تخفیف کد تخفیف</span>
                <span>-{couponValue.toLocaleString()} تومان</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>هزینه ارسال</span>
              <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : isDark ? 'text-gray-200' : 'text-gray-800'}>
                {deliveryFee === 0 ? 'رایگان' : `${deliveryFee.toLocaleString()} تومان`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>بسته‌بندی</span>
              <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>۵,۰۰۰ تومان</span>
            </div>
          </div>

          <hr className={isDark ? 'border-gray-700' : 'border-gray-200'} />

          <div className="flex justify-between items-center">
            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>مبلغ قابل پرداخت</span>
            <span className={`text-xl font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
              {(finalPrice + deliveryFee + 5000).toLocaleString()} <span className="text-sm font-normal">تومان</span>
            </span>
          </div>

          {totalPrice < minOrder && (
            <p className="text-xs text-orange-500 text-center">
              حداقل مبلغ سفارش: {minOrder.toLocaleString()} تومان
            </p>
          )}

          <Link
            to="/checkout"
            className={`block w-full text-center py-3.5 rounded-xl font-bold transition-colors ${
              totalPrice >= minOrder
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              ادامه و پرداخت
              <ArrowLeft size={18} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
