import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, CreditCard, ChevronRight, ChevronLeft, Check, Calendar, Zap } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const isDark = useThemeStore((s) => s.isDark);
  const navigate = useNavigate();
  const { items, getTotalPrice, getDeliveryFee, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState('تهران، ولنجک، خیابان ۲۴ متری، پلاک ۱۲، واحد ۳');
  const [deliveryType, setDeliveryType] = useState<'express' | 'scheduled'>('express');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = getTotalPrice();
  const deliveryFee = getDeliveryFee();
  const packagingFee = 5000;
  const finalPrice = totalPrice + deliveryFee + packagingFee;

  const timeSlots = [
    { id: '1', label: 'امروز ۱۴:۰۰ - ۱۶:۰۰', available: true },
    { id: '2', label: 'امروز ۱۶:۰۰ - ۱۸:۰۰', available: true },
    { id: '3', label: 'امروز ۱۸:۰۰ - ۲۰:۰۰', available: true },
    { id: '4', label: 'فردا ۱۰:۰۰ - ۱۲:۰۰', available: true },
    { id: '5', label: 'فردا ۱۲:۰۰ - ۱۴:۰۰', available: true },
    { id: '6', label: 'فردا ۱۴:۰۰ - ۱۶:۰۰', available: false },
  ];

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/tracking');
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
          <Check size={40} className="text-green-600" />
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>سفارش با موفقیت ثبت شد!</h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>در حال انتقال به صفحه رهگیری...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[
          { num: 1, label: 'آدرس', icon: <MapPin size={16} /> },
          { num: 2, label: 'زمان تحویل', icon: <Clock size={16} /> },
          { num: 3, label: 'پرداخت', icon: <CreditCard size={16} /> },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              step >= s.num
                ? 'bg-green-600 text-white'
                : isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'
            }`}>
              {step > s.num ? <Check size={16} /> : s.icon}
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < 2 && <ChevronLeft size={16} className={isDark ? 'text-gray-600' : 'text-gray-300'} />}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <MapPin size={20} className="text-green-600" />
                آدرس تحویل
              </h2>

              {/* Saved Addresses */}
              <div className="space-y-3 mb-4">
                <div className={`p-4 rounded-xl border-2 border-green-500 ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>🏠 منزل</p>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{address}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">پیش‌فرض</span>
                  </div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>🏢 محل کار</p>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>تهران، سعادت‌آباد، بلوار دریا، پلاک ۵</p>
                    </div>
                  </div>
                </div>
              </div>

              <button className={`w-full py-3 rounded-xl border-2 border-dashed text-sm ${isDark ? 'border-gray-600 text-gray-400 hover:border-green-500 hover:text-green-400' : 'border-gray-300 text-gray-500 hover:border-green-500 hover:text-green-600'} transition-colors`}>
                + افزودن آدرس جدید
              </button>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2"
              >
                انتخاب زمان تحویل
                <ChevronLeft size={18} />
              </button>
            </div>
          )}

          {/* Step 2: Delivery Time */}
          {step === 2 && (
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <Clock size={20} className="text-green-600" />
                زمان تحویل
              </h2>

              {/* Delivery Type */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setDeliveryType('express')}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    deliveryType === 'express'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : isDark ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <Zap size={24} className="mx-auto mb-2 text-orange-500" />
                  <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>تحویل فوری</p>
                  <p className="text-xs text-gray-500 mt-1">کمتر از ۱ ساعت</p>
                  <p className="text-xs text-green-600 mt-1 font-medium">۴۵,۰۰۰ تومان</p>
                </button>
                <button
                  onClick={() => setDeliveryType('scheduled')}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    deliveryType === 'scheduled'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : isDark ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <Calendar size={24} className="mx-auto mb-2 text-blue-500" />
                  <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>برنامه‌ریزی شده</p>
                  <p className="text-xs text-gray-500 mt-1">انتخاب زمان دلخواه</p>
                  <p className="text-xs text-green-600 mt-1 font-medium">۲۵,۰۰۰ تومان</p>
                </button>
              </div>

              {deliveryType === 'scheduled' && (
                <div className="space-y-2">
                  <p className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>بازه زمانی را انتخاب کنید:</p>
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                      disabled={!slot.available}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                        selectedTimeSlot === slot.id
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                      } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{slot.label}</span>
                      {selectedTimeSlot === slot.id && <Check size={16} className="text-green-600" />}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className={`flex-1 py-3.5 rounded-xl border font-medium ${isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <ChevronRight size={18} />
                    بازگشت
                  </span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  ادامه
                  <ChevronLeft size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <CreditCard size={20} className="text-green-600" />
                پرداخت
              </h2>

              {/* Payment Methods */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setPaymentMethod('online')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'online' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : isDark ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">💳</div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>پرداخت آنلاین</p>
                    <p className="text-xs text-gray-500">درگاه زرین‌پال (امن)</p>
                  </div>
                  {paymentMethod === 'online' && <Check size={18} className="mr-auto text-green-600" />}
                </button>
                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'wallet' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : isDark ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">👛</div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>کیف پول</p>
                    <p className="text-xs text-gray-500">موجودی: ۱۵۰,۰۰۰ تومان</p>
                  </div>
                  {paymentMethod === 'wallet' && <Check size={18} className="mr-auto text-green-600" />}
                </button>
              </div>

              {/* Order Summary */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'} space-y-2 text-sm mb-6`}>
                <div className="flex justify-between">
                  <span className="text-gray-500">آدرس:</span>
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>تهران، ولنجک</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">زمان تحویل:</span>
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                    {deliveryType === 'express' ? 'فوری (زیر ۱ ساعت)' : timeSlots.find(s => s.id === selectedTimeSlot)?.label || 'انتخاب نشده'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">تعداد کالا:</span>
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>{items.length} کالا</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className={`flex-1 py-3.5 rounded-xl border font-medium ${isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <ChevronRight size={18} />
                    بازگشت
                  </span>
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  پرداخت {finalPrice.toLocaleString()} تومان
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className={`h-fit p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>خلاصه سفارش</h3>
          <div className="space-y-2 text-sm">
            {items.slice(0, 3).map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span className={`truncate max-w-[150px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.product.name} × {item.quantity}</span>
                <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            {items.length > 3 && <p className="text-xs text-gray-500">و {items.length - 3} کالای دیگر...</p>}
          </div>
          <hr className={isDark ? 'border-gray-700' : 'border-gray-200'} />
          <div className="flex justify-between text-sm font-bold">
            <span className={isDark ? 'text-white' : 'text-gray-800'}>مبلغ نهایی</span>
            <span className="text-green-600">{finalPrice.toLocaleString()} تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}
