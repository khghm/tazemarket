import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';

interface ProductCardProps {
  product: Product;
  onAddAnimation?: (id: string) => void;
}

export default function ProductCard({ product, onAddAnimation }: ProductCardProps) {
  const { addItem, items, updateQuantity } = useCartStore();
  const isDark = useThemeStore((s) => s.isDark);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    setIsAdding(true);
    addItem(product);
    onAddAnimation?.(product.id);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <div
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isDark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-green-200'
      } ${!product.inStock ? 'opacity-70' : ''}`}
    >
      {/* Discount Badge */}
      {product.discount && product.discount > 0 && (
        <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
          {product.discount}%
        </div>
      )}

      {/* Flash Deal Badge */}
      {product.flashDeal && (
        <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
          ⚡ پیشنهاد ویژه
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
        className={`absolute top-2 ${product.discount ? 'right-14' : 'right-2'} z-10 p-2 rounded-full transition-all ${
          isWishlisted ? 'bg-red-50 text-red-500' : `${isDark ? 'bg-gray-700 text-gray-400' : 'bg-white/80 text-gray-400'} opacity-0 group-hover:opacity-100`
        }`}
      >
        <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className={`aspect-square p-6 flex items-center justify-center ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {product.image.includes('🍎') ? '🍎' :
             product.image.includes('🍌') ? '🍌' :
             product.image.includes('🍅') ? '🍅' :
             product.image.includes('🥒') ? '🥒' :
             product.image.includes('🍊') ? '🍊' :
             product.image.includes('🥬') ? '🥬' :
             product.image.includes('🥕') ? '🥕' :
             product.image.includes('🍋') ? '🍋' :
             product.image.includes('🥛') ? '🥛' :
             product.image.includes('🫙') ? '🫙' :
             product.image.includes('🧀') ? '🧀' :
             product.image.includes('🧈') ? '🧈' :
             product.image.includes('🥚') ? '🥚' :
             product.image.includes('🍗') ? '🍗' :
             product.image.includes('🥩') ? '🥩' :
             product.image.includes('🐟') ? '🐟' :
             product.image.includes('🌭') ? '🌭' :
             product.image.includes('💧') ? '💧' :
             product.image.includes('🥤') ? '🥤' :
             product.image.includes('🧃') ? '🧃' :
             product.image.includes('🍵') ? '🍵' :
             product.image.includes('🍚') ? '🍚' :
             product.image.includes('🫒') ? '🫒' :
             product.image.includes('🍬') ? '🍬' :
             product.image.includes('🧴') ? '🧴' :
             product.image.includes('🧻') ? '🧻' :
             product.image.includes('🪥') ? '🪥' :
             product.image.includes('👶') ? '👶' :
             product.image.includes('🍼') ? '🍼' :
             product.image.includes('🍝') ? '🍝' :
             product.image.includes('🍿') ? '🍿' : '📦'}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className={`text-sm font-medium line-clamp-2 leading-5 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">{product.brand}</span>
          {!product.inStock && (
            <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">ناموجود</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-xs">★</span>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{product.rating}</span>
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-1">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through block">
                {product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className={`text-sm font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
              {product.price.toLocaleString()} <span className="text-xs font-normal">تومان</span>
            </span>
          </div>

          {/* Add to Cart */}
          {product.inStock ? (
            quantity > 0 ? (
              <div className={`flex items-center gap-2 rounded-xl border ${isDark ? 'border-gray-600' : 'border-green-200'}`}>
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-green-50'} transition-colors`}
                >
                  <Minus size={14} className="text-green-600" />
                </button>
                <span className={`text-sm font-bold min-w-[20px] text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {quantity}
                </span>
                <button
                  onClick={handleAdd}
                  className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-green-50'} transition-colors`}
                >
                  <Plus size={14} className="text-green-600" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className={`p-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-all ${isAdding ? 'scale-90' : 'hover:scale-105'}`}
              >
                <ShoppingCart size={16} />
              </button>
            )
          ) : (
            <button className={`text-xs px-3 py-2 rounded-lg border ${isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
              اطلاع‌رسانی موجودی
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
