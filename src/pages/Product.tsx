import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, ShoppingCart, Plus, Minus, Truck, Shield, Clock, ChevronDown, ChevronUp, Package } from 'lucide-react';
import { products, reviews } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const isDark = useThemeStore((s) => s.isDark);
  const { addItem, items, updateQuantity } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState('کیلوگرم');
  const [showNutrition, setShowNutrition] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const product = products.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">😕</p>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>محصول یافت نشد</h2>
        <Link to="/" className="text-green-600 mt-4 inline-block">بازگشت به صفحه اصلی</Link>
      </div>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const cartItem = items.find((item) => item.product.id === product.id);
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6 overflow-x-auto no-scrollbar">
        <Link to="/" className="text-slate-500 hover:text-green-600 whitespace-nowrap">خانه</Link>
        <ChevronDown size={14} className="text-slate-400 rotate-[-90deg] shrink-0" />
        <Link to={`/category/${product.category}`} className="text-slate-500 hover:text-green-600 whitespace-nowrap">{product.category}</Link>
        <ChevronDown size={14} className="text-slate-400 rotate-[-90deg] shrink-0" />
        <span className={`font-medium whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-800'}`}>{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className={`aspect-square rounded-3xl overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-50'} relative`}>
            {product.discount && product.discount > 0 && (
              <span className="absolute top-4 right-4 badge-discount text-sm px-4 py-1.5 z-10">{product.discount}% تخفیف</span>
            )}
            {!imgError ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={60} className="text-slate-300" />
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          {/* Brand & Rating */}
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'} />
              ))}
              <span className="text-sm text-slate-500 mr-1">({product.reviewCount} نظر)</span>
            </div>
          </div>

          {/* Title */}
          <h1 className={`text-2xl sm:text-3xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {product.name}
          </h1>

          {/* Description */}
          <p className={`text-sm leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {product.description}
          </p>

          {/* Price */}
          <div className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-green-50 border-green-100'} border`}>
            <div className="flex items-end justify-between">
              <div>
                {product.originalPrice && (
                  <span className="price-original block text-lg">{product.originalPrice.toLocaleString()} تومان</span>
                )}
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-3xl font-black ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    {product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-500">تومان</span>
                </div>
              </div>
              {product.discount && (
                <span className="text-sm font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-lg">
                  {((product.originalPrice || product.price) - product.price).toLocaleString()} تومان تخفیف
                </span>
              )}
            </div>
          </div>

          {/* Unit Selection */}
          <div>
            <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>انتخاب واحد</label>
            <div className="flex items-center gap-2">
              {['کیلوگرم', 'گرم', 'عدد'].map((unit) => (
                <button
                  key={unit}
                  onClick={() => setSelectedUnit(unit)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedUnit === unit
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                      : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4">
            <div className={`flex items-center rounded-xl border ${isDark ? 'border-slate-600 bg-slate-800' : 'border-slate-200 bg-white'}`}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-xl transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className={`w-12 text-center font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-xl transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary h-12"
            >
              <ShoppingCart size={18} />
              <span>افزودن به سبد خرید</span>
            </button>

            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                isWishlisted
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : isDark ? 'border-slate-600 hover:bg-slate-700 text-slate-400' : 'border-slate-200 hover:bg-slate-50 text-slate-500'
              }`}
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Truck size={18} />, label: 'ارسال سریع', desc: 'زیر ۱ ساعت' },
              { icon: <Shield size={18} />, label: 'ضمانت تازگی', desc: '۱۰۰٪ تازه' },
              { icon: <Clock size={18} />, label: 'پشتیبانی', desc: '۲۴ ساعته' },
            ].map((feat, idx) => (
              <div key={idx} className={`p-3 rounded-xl text-center ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-100'} border`}>
                <div className="text-green-600 mb-1 flex justify-center">{feat.icon}</div>
                <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{feat.label}</p>
                <p className="text-[10px] text-slate-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nutrition Info */}
      {product.nutritionInfo && (
        <div className={`mt-8 rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
          <button
            onClick={() => setShowNutrition(!showNutrition)}
            className={`w-full p-5 flex items-center justify-between ${isDark ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50'} transition-colors`}
          >
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>اطلاعات تغذیه‌ای</h3>
            {showNutrition ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {showNutrition && (
            <div className={`px-5 pb-5 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {product.nutritionInfo.map((info, idx) => (
                  <div key={idx} className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                    <p className="text-lg font-bold text-green-600">{info.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{info.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reviews */}
      <div className={`mt-6 rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100'} border`}>
        <button
          onClick={() => setShowReviews(!showReviews)}
          className={`w-full p-5 flex items-center justify-between ${isDark ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50'} transition-colors`}
        >
          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>نظرات کاربران ({productReviews.length})</h3>
          {showReviews ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {showReviews && (
          <div className={`px-5 pb-5 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="space-y-4 mt-4">
              {productReviews.length > 0 ? productReviews.map((review) => (
                <div key={review.id} className={`p-4 rounded-xl ${isDark ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                        {review.userName[0]}
                      </div>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{review.userName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'} />
                      ))}
                    </div>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{review.text}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-slate-500">{review.date}</span>
                    <span className="text-xs text-slate-500">{review.helpful} نفر مفید دانستند</span>
                  </div>
                </div>
              )) : (
                <p className="text-center text-slate-500 py-8">هنوز نظری ثبت نشده است</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-8">
          <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>محصولات مرتبط</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
