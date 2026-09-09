import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChefHat, Bike, MapPin, CheckCircle2, Clock, Phone } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const steps = [
  { id: 1, label: 'تأیید سفارش', icon: CheckCircle2, description: 'سفارش شما تأیید و در سیستم ثبت شد' },
  { id: 2, label: 'در حال آماده‌سازی', icon: ChefHat, description: 'سفارش شما در حال بسته‌بندی است' },
  { id: 3, label: 'تحویل به پیک', icon: Bike, description: 'پیک سفارش شما را دریافت کرد' },
  { id: 4, label: 'در مسیر ارسال', icon: MapPin, description: 'پیک در مسیر تحویل سفارش شماست' },
  { id: 5, label: 'تحویل داده شد', icon: Package, description: 'سفارش با موفقیت تحویل داده شد' },
];

export default function TrackingPage() {
  const isDark = useThemeStore((s) => s.isDark);
  const [currentStep, setCurrentStep] = useState(1);
  const [riderLocation, setRiderLocation] = useState({ lat: 35.7595, lng: 51.4102 });
  const [estimatedTime, setEstimatedTime] = useState(25);

  // Simulate order progress
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(2), 3000);
    const timer2 = setTimeout(() => setCurrentStep(3), 8000);
    const timer3 = setTimeout(() => setCurrentStep(4), 13000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  // Simulate rider movement
  useEffect(() => {
    if (currentStep >= 4) {
      const interval = setInterval(() => {
        setRiderLocation((prev) => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
        }));
        setEstimatedTime((prev) => Math.max(1, prev - 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Order Header */}
      <div className={`p-6 rounded-2xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>رهگیری سفارش</h1>
            <p className="text-sm text-gray-500 mt-1">شماره سفارش: #TM-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'}`}>
            <Clock size={14} />
            <span className="text-sm font-medium">{estimatedTime} دقیقه تا تحویل</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className={`absolute top-5 right-5 left-5 h-1 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-1000"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between relative">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                      : isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
                  } ${isCurrent ? 'scale-110 ring-4 ring-green-500/20' : ''}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-xs mt-2 text-center max-w-[60px] ${isActive ? (isDark ? 'text-green-400' : 'text-green-700') : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rider Info (when step >= 3) */}
      {currentStep >= 3 && (
        <div className={`p-6 rounded-2xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl">🧑</div>
              <div>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>محمد رضایی</p>
                <p className="text-sm text-gray-500">پیک تازه‌مارکت</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                  <span className="text-xs text-gray-500">۴.۹</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
                <Phone size={18} />
              </button>
            </div>
          </div>

          {/* Simulated Map */}
          {currentStep >= 4 && (
            <div className={`mt-4 p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} relative overflow-hidden`}>
              <div className="aspect-video flex items-center justify-center relative">
                {/* Simple map visualization */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full gap-px">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className={isDark ? 'bg-gray-600' : 'bg-gray-300'} />
                    ))}
                  </div>
                </div>
                {/* Rider position */}
                <div className="absolute animate-bounce" style={{ top: `${30 + Math.random() * 20}%`, right: `${20 + Math.random() * 30}%` }}>
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    🏍️
                  </div>
                </div>
                {/* Destination */}
                <div className="absolute bottom-4 left-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    📍
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-2">موقعیت تقریبی پیک (بروزرسانی هر ۳۰ ثانیه)</p>
            </div>
          )}
        </div>
      )}

      {/* Order Details */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>جزئیات سفارش</h3>
        <div className="space-y-3">
          {[
            { label: 'وضعیت فعلی', value: steps[currentStep - 1].label },
            { label: 'آدرس تحویل', value: 'تهران، ولنجک، خیابان ۲۴ متری، پلاک ۱۲' },
            { label: 'زمان تحویل', value: currentStep >= 3 ? 'تحویل فوری' : 'کمتر از ۱ ساعت' },
            { label: 'روش پرداخت', value: 'آنلاین (زرین‌پال)' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-500">{item.label}</span>
              <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <Link to="/" className={`flex-1 py-3 rounded-xl text-center font-medium border ${isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
          بازگشت به فروشگاه
        </Link>
        <Link to="/profile" className="flex-1 py-3 bg-green-600 text-white rounded-xl text-center font-medium hover:bg-green-700">
          سفارشات من
        </Link>
      </div>
    </div>
  );
}
