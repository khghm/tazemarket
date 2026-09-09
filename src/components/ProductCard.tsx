import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, items, updateQuantity } = useCartStore();
  const isDark = useThemeStore((s) => s.isDark);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imgError, setImgError] = useState(false);

  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 400);
  };

  return (
    <div className={`group relative rounded-2xl overflow-hidden card-hover ${isDark ? 'bg-slate-800/80 border border-slate-700/50' : 'bg-white border border-slate-100'} ${!product.inStock ? 'opacity-75' : ''}`}>
      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        {product.discount && product.discount > 0 && (
          <span className="badge-discount">{product.discount}%</span>
        )}
        {product.flashDeal && (
          <span className="badge-flash">⚡ پیشنهاد ویژه</span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
        className={`absolute top-3 left-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
          isWishlisted
            ? 'bg-red-50 text-red-500 shadow-sm'
            : `bg-white/80 dark:bg-slate-800/80 text-slate-400 opacity-0 group-hover:opacity-100 backdrop-blur-sm`
        }`}
      >
        <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="product-img-container">
        <div className={`aspect-square p-4 flex items-center justify-center ${isDark ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={`w-full h-full rounded-xl flex items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <span className="text-4xl text-slate-300">📦</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
            {product.brand}
          </span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-xs text-slate-500">{product.rating}</span>
          </div>
        </div>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className={`text-sm font-semibold leading-5 line-clamp-2 transition-colors ${isDark ? 'text-slate-100 group-hover:text-green-400' : 'text-slate-800 group-hover:text-green-700'}`}>
            {product.name}
          </h3>
        </Link>

        {/* Unit */}
        <p className="text-xs text-slate-400">{product.unit}</p>

        {/* Price & Cart */}
        <div className="flex items-end justify-between pt-2 border-t border-slate-100 dark:border-slate-700/50">
          <div className="space-y-0.5">
            {product.originalPrice && (
              <span className="price-original block">{product.originalPrice.toLocaleString()}</span>
            )}
            <div className="flex items-baseline gap-1">
              <span className={`text-lg font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                {product.price.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">تومان</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          {product.inStock ? (
            quantity > 0 ? (
              <div className={`flex items-center gap-1 rounded-xl border ${isDark ? 'border-slate-600 bg-slate-700/50' : 'border-green-200 bg-green-50'}`}>
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <Minus size={14} className="text-green-600" />
                </button>
                <span className={`text-sm font-bold min-w-[24px] text-center ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {quantity}
                </span>
                <button
                  onClick={handleAdd}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <Plus size={14} className="text-green-600" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isAdding ? 'scale-90 bg-green-700' : 'bg-green-600 hover:bg-green-700 hover:scale-105'} text-white shadow-lg shadow-green-600/20`}
              >
                <ShoppingCart size={16} />
              </button>
            )
          ) : (
            <button className={`text-xs px-3 py-2 rounded-lg border ${isDark ? 'border-slate-600 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              اطلاع‌رسانی
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
