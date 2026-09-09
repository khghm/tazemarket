import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Minus, ShoppingCart, Heart, Star, Truck, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { products, reviews } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';

export default function ProductPage() {
  const { productId } = useParams();
  const isDark = useThemeStore((s) => s.isDark);
  const { addItem, items, updateQuantity } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [reviewSort, setReviewSort] = useState<'helpful' | 'newest'>('helpful');

  const product = products.find((p) => p.id === productId);
  const productReviews = reviews.filter((r) => r.productId === productId);
  const cartItem = items.find((item) => item.product.id === productId);
  const cartQuantity = cartItem?.quantity || 0;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">😕</span>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>محصول یافت نشد</h2>
        <Link to="/" className="mt-4 inline-block text-green-600 hover:text-green-700">بازگشت به صفحه اصلی</Link>
      </div>
    );
  }

  const sortedReviews = [...productReviews].sort((a, b) =>
    reviewSort === 'helpful' ? b.helpful - a.helpful : b.date.localeCompare(a.date)
  );

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className={`flex items-center gap-2 text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <Link to="/" className="hover:text-green-600">خانه</Link>
        <ChevronLeft size={14} />
        <Link to={`/category/${product.category}`} className="hover:text-green-600">{product.category}</Link>
        <ChevronLeft size={14} />
        <span className={`truncate max-w-[200px] ${isDark ? 'text-white' : 'text-gray-800'}`}>{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className={`aspect-square flex items-center justify-center p-12 ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <span className="text-[120px] md:text-[180px] hover:scale-110 transition-transform duration-500 cursor-zoom-in">
              {product.image.includes('🍎') ? '🍎' : product.image.includes('🍌') ? '🍌' : product.image.includes('🍅') ? '🍅' : product.image.includes('🥒') ? '🥒' : product.image.includes('🍊') ? '🍊' : product.image.includes('🥬') ? '🥬' : product.image.includes('🥕') ? '🥕' : product.image.includes('🍋') ? '🍋' : product.image.includes('🥛') ? '🥛' : product.image.includes('🫙') ? '🫙' : product.image.includes('🧀') ? '🧀' : product.image.includes('🧈') ? '🧈' : product.image.includes('🥚') ? '🥚' : product.image.includes('🍗') ? '🍗' : product.image.includes('🥩') ? '🥩' : product.image.includes('🐟') ? '🐟' : product.image.includes('🌭') ? '🌭' : product.image.includes('💧') ? '💧' : product.image.includes('🥤') ? '🥤' : product.image.includes('🧃') ? '🧃' : product.image.includes('🍵') ? '🍵' : product.image.includes('🍚') ? '🍚' : product.image.includes('🫒') ? '🫒' : product.image.includes('🍬') ? '🍬' : product.image.includes('🧴') ? '🧴' : product.image.includes('🧻') ? '🧻' : product.image.includes('🪥') ? '🪥' : product.image.includes('👶') ? '👶' : product.image.includes('🍼') ? '🍼' : product.image.includes('🍝') ? '🍝' : product.image.includes('🍿') ? '🍿' : '📦'}
            </span>
          </div>
          {product.discount && (
            <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1.5 rounded-xl">
              {product.discount}% تخفیف
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-sm px-2 py-0.5 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{product.brand}</span>
              {product.inStock ? (
                <span className="text-sm text-green-600 flex items-center gap-1"><Shield size={14} /> موجود</span>
              ) : (
                <span className="text-sm text-red-500">ناموجود</span>
              )}
            </div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{product.name}</h1>
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} className={star <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {product.rating} از ۵ ({product.reviewCount} نظر)
            </span>
          </div>

          {/* Price */}
          <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-green-50'} border ${isDark ? 'border-gray-700' : 'border-green-100'}`}>
            {product.originalPrice && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-400 line-through">{product.originalPrice.toLocaleString()} تومان</span>
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{product.discount}%</span>
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                {product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">تومان / {product.unit}</span>
            </div>
          </div>

          {/* Unit Selection */}
          <div>
            <label className={`text-sm font-medium block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>واحد:</label>
            <div className="flex items-center gap-2">
              {['کیلوگرم', 'گرم', 'عدد'].map((unit) => (
                <button
                  key={unit}
                  className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
                    isDark ? 'border-gray-700 hover:bg-gray-700 text-gray-300' : 'border-gray-200 hover:bg-green-50 text-gray-700'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          {product.inStock && (
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-3 border rounded-xl px-4 py-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-green-600"><Minus size={18} /></button>
                <span className={`font-bold min-w-[30px] text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-green-600"><Plus size={18} /></button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                <ShoppingCart size={20} />
                افزودن به سبد خرید
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3.5 rounded-xl border transition-colors ${
                  isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : isDark ? 'border-gray-700 text-gray-400 hover:bg-gray-800' : 'border-gray-200 text-gray-400 hover:bg-gray-50'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          )}

          {!product.inStock && (
            <button className={`w-full py-3.5 rounded-xl border-2 border-dashed ${isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
              🔔 موجودی اطلاع بده
            </button>
          )}

          {/* Delivery Info */}
          <div className={`grid grid-cols-2 gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className={`flex items-center gap-2 p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <Truck size={18} className="text-green-600" />
              <div>
                <p className="text-xs font-medium">ارسال اکسپرس</p>
                <p className="text-xs text-gray-500">کمتر از ۱ ساعت</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <Shield size={18} className="text-blue-600" />
              <div>
                <p className="text-xs font-medium">ضمانت تازگی</p>
                <p className="text-xs text-gray-500">بازگشت وجه</p>
              </div>
            </div>
          </div>

          {/* Nutrition Info */}
          {product.nutritionInfo && (
            <div className={`rounded-2xl border overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => setShowNutrition(!showNutrition)}
                className={`w-full flex items-center justify-between p-4 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
              >
                <span className="font-medium text-sm">اطلاعات تغذیه‌ای</span>
                {showNutrition ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {showNutrition && (
                <div className={`p-4 pt-0 space-y-2 ${isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
                  {product.nutritionInfo.map((info, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{info.name}</span>
                      <span className="font-medium">{info.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            نظرات کاربران ({productReviews.length})
          </h2>
          <select
            value={reviewSort}
            onChange={(e) => setReviewSort(e.target.value as 'helpful' | 'newest')}
            className={`px-3 py-1.5 rounded-lg text-sm border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
          >
            <option value="helpful">مفیدترین</option>
            <option value="newest">جدیدترین</option>
          </select>
        </div>

        {sortedReviews.length > 0 ? (
          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <div key={review.id} className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                      {review.userName[0]}
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{review.userName}</span>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} className={s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{review.text}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                  <span>👍 {review.helpful} نفر مفید دانستند</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">هنوز نظری ثبت نشده است</p>
        )}
      </div>

      {/* Cart quantity indicator */}
      {cartQuantity > 0 && (
        <div className={`fixed bottom-24 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:w-80 p-4 rounded-2xl shadow-xl border z-40 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{cartQuantity} عدد در سبد خرید</p>
            </div>
            <Link to="/cart" className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700">
              مشاهده سبد
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
