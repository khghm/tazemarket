export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  unit: string;
  image: string;
  brand: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  calories?: number;
  sugar?: number;
  weight?: string;
  description: string;
  nutritionInfo?: { name: string; value: string }[];
  flashDeal?: boolean;
  flashDealEnd?: number;
}

const img = (emoji: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0fdf4" rx="16"/><text x="100" y="120" font-size="80" text-anchor="middle">${emoji}</text></svg>`)}`;

export const products: Product[] = [
  // میوه و سبزیجات
  { id: 'p1', name: 'سیب قرمز دماوند', category: 'fruits-vegetables', subcategory: 'fruits', price: 45000, originalPrice: 55000, discount: 18, unit: 'کیلوگرم', image: img('🍎'), brand: 'دماوند', inStock: true, rating: 4.5, reviewCount: 128, calories: 52, sugar: 10, weight: '1 کیلو', description: 'سیب قرمز تازه و آبدار از باغ‌های دماوند', nutritionInfo: [{ name: 'کالری', value: '52 kcal' }, { name: 'قند', value: '10g' }, { name: 'فیبر', value: '2.4g' }], flashDeal: true, flashDealEnd: Date.now() + 3600000 },
  { id: 'p2', name: 'موز اکوادور', category: 'fruits-vegetables', subcategory: 'fruits', price: 65000, originalPrice: 75000, discount: 13, unit: 'کیلوگرم', image: img('🍌'), brand: 'اکوادور', inStock: true, rating: 4.2, reviewCount: 89, calories: 89, sugar: 12, weight: '1 کیلو', description: 'موز تازه وارداتی از اکوادور', nutritionInfo: [{ name: 'کالری', value: '89 kcal' }, { name: 'قند', value: '12g' }, { name: 'پتاسیم', value: '358mg' }] },
  { id: 'p3', name: 'گوجه‌فرنگی گلخانه‌ای', category: 'fruits-vegetables', subcategory: 'vegetables', price: 32000, unit: 'کیلوگرم', image: img('🍅'), brand: 'سبز', inStock: true, rating: 4.0, reviewCount: 56, calories: 18, sugar: 3, weight: '1 کیلو', description: 'گوجه‌فرنگی تازه گلخانه‌ای', nutritionInfo: [{ name: 'کالری', value: '18 kcal' }, { name: 'ویتامین C', value: '13mg' }] },
  { id: 'p4', name: 'خیار سبز', category: 'fruits-vegetables', subcategory: 'vegetables', price: 25000, unit: 'کیلوگرم', image: img('🥒'), brand: 'محلی', inStock: true, rating: 4.3, reviewCount: 45, calories: 15, sugar: 2, weight: '1 کیلو', description: 'خیار سبز تازه و ترد' },
  { id: 'p5', name: 'پرتقال تامسون', category: 'fruits-vegetables', subcategory: 'fruits', price: 38000, originalPrice: 48000, discount: 21, unit: 'کیلوگرم', image: img('🍊'), brand: 'شمال', inStock: true, rating: 4.7, reviewCount: 203, calories: 47, sugar: 9, weight: '1 کیلو', description: 'پرتقال شیرین و آبدار شمال', flashDeal: true, flashDealEnd: Date.now() + 7200000 },
  { id: 'p6', name: 'کاهو پیچ', category: 'fruits-vegetables', subcategory: 'vegetables', price: 18000, unit: 'عدد', image: img('🥬'), brand: 'سبز', inStock: true, rating: 3.9, reviewCount: 32, description: 'کاهو پیچ تازه و سالم' },
  { id: 'p7', name: 'هویج', category: 'fruits-vegetables', subcategory: 'vegetables', price: 22000, unit: 'کیلوگرم', image: img('🥕'), brand: 'محلی', inStock: true, rating: 4.1, reviewCount: 67, calories: 41, sugar: 5, weight: '1 کیلو', description: 'هویج تازه' },
  { id: 'p8', name: 'لیمو ترش', category: 'fruits-vegetables', subcategory: 'fruits', price: 55000, unit: 'کیلوگرم', image: img('🍋'), brand: 'جهرم', inStock: false, rating: 4.4, reviewCount: 91, description: 'لیمو ترش آبدار جهرم' },

  // لبنیات و تخم‌مرغ
  { id: 'p9', name: 'شیر پرچرب کاله 1 لیتری', category: 'dairy-eggs', subcategory: 'milk', price: 28000, unit: 'عدد', image: img('🥛'), brand: 'کاله', inStock: true, rating: 4.3, reviewCount: 156, description: 'شیر پرچرب پاستوریزه کاله' },
  { id: 'p10', name: 'ماست موسیر میهن', category: 'dairy-eggs', subcategory: 'yogurt', price: 35000, originalPrice: 42000, discount: 17, unit: 'عدد', image: img('🫙'), brand: 'میهن', inStock: true, rating: 4.6, reviewCount: 89, description: 'ماست موسیر خوش‌طعم میهن', flashDeal: true, flashDealEnd: Date.now() + 5400000 },
  { id: 'p11', name: 'پنیر UFTE رامک', category: 'dairy-eggs', subcategory: 'cheese', price: 68000, unit: 'عدد', image: img('🧀'), brand: 'رامک', inStock: true, rating: 4.4, reviewCount: 78, description: 'پنیر کم‌نمک UFTE رامک' },
  { id: 'p12', name: 'کره پاستوریزه میهن', category: 'dairy-eggs', subcategory: 'butter', price: 52000, unit: 'عدد', image: img('🧈'), brand: 'میهن', inStock: true, rating: 4.5, reviewCount: 112, description: 'کره پاستوریزه سنتی میهن' },
  { id: 'p13', name: 'تخم‌مرغ محلی 15 عددی', category: 'dairy-eggs', subcategory: 'eggs', price: 85000, originalPrice: 95000, discount: 11, unit: 'شانه', image: img('🥚'), brand: 'محلی', inStock: true, rating: 4.8, reviewCount: 234, description: 'تخم‌مرغ تازه محلی' },

  // گوشت و پروتئین
  { id: 'p14', name: 'سینه مرغ بدون پوست', category: 'meat-protein', subcategory: 'chicken', price: 145000, unit: 'کیلوگرم', image: img('🍗'), brand: 'زر', inStock: true, rating: 4.2, reviewCount: 167, description: 'سینه مرغ تازه بدون پوست' },
  { id: 'p15', name: 'گوشت چرخ‌کرده گوساله', category: 'meat-protein', subcategory: 'red-meat', price: 380000, unit: 'کیلوگرم', image: img('🥩'), brand: 'سردار', inStock: true, rating: 4.6, reviewCount: 89, description: 'گوشت چرخ‌کرده تازه گوساله' },
  { id: 'p16', name: 'ماهی قزل‌آلا', category: 'meat-protein', subcategory: 'fish', price: 220000, originalPrice: 260000, discount: 15, unit: 'کیلوگرم', image: img('🐟'), brand: 'دریا', inStock: true, rating: 4.7, reviewCount: 56, description: 'ماهی قزل‌آلای تازه', flashDeal: true, flashDealEnd: Date.now() + 4800000 },
  { id: 'p17', name: 'سوسیس کوکتل رزمونت', category: 'meat-protein', subcategory: 'sausage', price: 95000, unit: 'بسته', image: img('🌭'), brand: 'رزمونت', inStock: true, rating: 4.0, reviewCount: 145, description: 'سوسیس کوکتل مرغ رزمونت' },

  // نوشیدنی‌ها
  { id: 'p18', name: 'آب معدنی دماوند 1.5 لیتری', category: 'beverages', subcategory: 'water', price: 8000, unit: 'عدد', image: img('💧'), brand: 'دماوند', inStock: true, rating: 4.1, reviewCount: 312, description: 'آب معدنی طبیعی دماوند' },
  { id: 'p19', name: 'نوشابه کوکاکولا 1.5 لیتری', category: 'beverages', subcategory: 'soda', price: 25000, unit: 'عدد', image: img('🥤'), brand: 'کوکاکولا', inStock: true, rating: 4.0, reviewCount: 456, description: 'نوشابه کلاسیک کوکاکولا' },
  { id: 'p20', name: 'آبمیوه پرتقال سان‌استار', category: 'beverages', subcategory: 'juice', price: 32000, originalPrice: 38000, discount: 16, unit: 'عدد', image: img('🧃'), brand: 'سان‌استار', inStock: true, rating: 4.3, reviewCount: 178, description: 'آبمیوه طبیعی پرتقال' },
  { id: 'p21', name: 'چای سیاه گلستان', category: 'beverages', subcategory: 'tea-coffee', price: 120000, unit: 'بسته', image: img('🍵'), brand: 'گلستان', inStock: true, rating: 4.5, reviewCount: 289, description: 'چای سیاه ممتاز گلستان' },

  // کالاهای اساسی
  { id: 'p22', name: 'برنج ایرانی هاشمی', category: 'staples', subcategory: 'rice', price: 450000, originalPrice: 520000, discount: 13, unit: '10 کیلوگرم', image: img('🍚'), brand: 'گلها', inStock: true, rating: 4.8, reviewCount: 567, description: 'برنج درجه یک ایرانی هاشمی' },
  { id: 'p23', name: 'روغن آفتابگردان لادن', category: 'staples', subcategory: 'oil', price: 85000, unit: '1.8 لیتری', image: img('🫒'), brand: 'لادن', inStock: true, rating: 4.2, reviewCount: 198, description: 'روغن آفتابگردان لادن' },
  { id: 'p24', name: 'قند شکسته', category: 'staples', subcategory: 'sugar', price: 45000, unit: 'کیلوگرم', image: img('🍬'), brand: 'هفت', inStock: true, rating: 4.0, reviewCount: 87, description: 'قند شکسته ممتاز' },

  // خانگی و نظافت
  { id: 'p25', name: 'مایع ظرفشویی پریل', category: 'household', subcategory: 'cleaning', price: 55000, originalPrice: 65000, discount: 15, unit: 'عدد', image: img('🧴'), brand: 'پریل', inStock: true, rating: 4.4, reviewCount: 234, description: 'مایع ظرفشویی غلیظ پریل' },
  { id: 'p26', name: 'دستمال کاغذی پاپیا 200 برگ', category: 'household', subcategory: 'tissue', price: 38000, unit: 'بسته', image: img('🧻'), brand: 'پاپیا', inStock: true, rating: 4.3, reviewCount: 345, description: 'دستمال کاغذی سه لایه پاپیا' },

  // آرایشی و بهداشتی
  { id: 'p27', name: 'شامپو سر هد اند شولدرز', category: 'beauty-health', subcategory: 'hair-care', price: 125000, unit: 'عدد', image: img('🧴'), brand: 'هد اند شولدرز', inStock: true, rating: 4.5, reviewCount: 178, description: 'شامپو ضد شوره هد اند شولدرز' },
  { id: 'p28', name: 'خمیر دندان سیگنال', category: 'beauty-health', subcategory: 'oral-care', price: 45000, unit: 'عدد', image: img('🪥'), brand: 'سیگنال', inStock: true, rating: 4.2, reviewCount: 234, description: 'خمیر دندان محافظ دندان' },

  // کالای بچه
  { id: 'p29', name: 'پوشک بچه پمپرز سایز 3', category: 'baby', subcategory: 'diapers', price: 350000, originalPrice: 420000, discount: 17, unit: 'بسته', image: img('👶'), brand: 'پمپرز', inStock: true, rating: 4.7, reviewCount: 456, description: 'پوشک بچه پمپرز سایز 3 (4-9 کیلو)' },
  { id: 'p30', name: 'شیر خشک آپتامیل', category: 'baby', subcategory: 'baby-food', price: 580000, unit: 'قوطی', image: img('🍼'), brand: 'آپتامیل', inStock: true, rating: 4.6, reviewCount: 189, description: 'شیر خشک آپتامیل مرحله 1' },

  // کنسرو و خوراکی
  { id: 'p31', name: 'ماکارونی اسپاگتی زر', category: 'canned-food', subcategory: 'pasta', price: 22000, unit: 'بسته', image: img('🍝'), brand: 'زر', inStock: true, rating: 4.1, reviewCount: 123, description: 'ماکارونی اسپاگتی درجه یک' },
  { id: 'p32', name: 'رب گوجه‌فرنگی چین‌چین', category: 'canned-food', subcategory: 'sauce', price: 48000, originalPrice: 55000, discount: 13, unit: 'عدد', image: img('🫙'), brand: 'چین‌چین', inStock: true, rating: 4.3, reviewCount: 234, description: 'رب گوجه‌فرنگی غلیظ' },
  { id: 'p33', name: 'تن ماهی شیلتون', category: 'canned-food', subcategory: 'canned', price: 65000, unit: 'عدد', image: img('🐟'), brand: 'شیلتون', inStock: true, rating: 4.4, reviewCount: 167, description: 'تن ماهی در روغن' },
  { id: 'p34', name: 'چیپس خلالی مزمز', category: 'canned-food', subcategory: 'snacks', price: 35000, unit: 'بسته', image: img('🍿'), brand: 'مزمز', inStock: true, rating: 4.0, reviewCount: 289, description: 'چیپس خلالی با طعم نمکی' },
];

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
}

export const reviews: Review[] = [
  { id: 'r1', productId: 'p1', userName: 'علی محمدی', rating: 5, date: '1403/09/15', text: 'سیب‌های خیلی تازه و خوش‌طعمی بود. حتماً دوباره خرید می‌کنم.', helpful: 23 },
  { id: 'r2', productId: 'p1', userName: 'مریم احمدی', rating: 4, date: '1403/09/10', text: 'کیفیت خوب بود ولی یکی دو تا سیب لکه داشت.', helpful: 12 },
  { id: 'r3', productId: 'p1', userName: 'رضا کریمی', rating: 5, date: '1403/09/08', text: 'ارسال سریع و بسته‌بندی عالی. سیب‌ها آبدار و خوش‌طعم بودند.', helpful: 18 },
  { id: 'r4', productId: 'p5', userName: 'زهرا حسینی', rating: 5, date: '1403/09/12', text: 'پرتقال‌ها فوق‌العاده شیرین بودند. ممنون از ارسال سریع.', helpful: 31 },
  { id: 'r5', productId: 'p13', userName: 'حسین رضایی', rating: 5, date: '1403/09/14', text: 'تخم‌مرغ‌ها خیلی تازه بودند. زرده‌ها رنگ عالی داشتند.', helpful: 45 },
  { id: 'r6', productId: 'p22', userName: 'فاطمه نوری', rating: 5, date: '1403/09/11', text: 'برنج عالی! بعد از پخت خیلی خوش‌عطر و دانه بلند بود.', helpful: 56 },
];
