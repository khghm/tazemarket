export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: { id: string; name: string }[];
}

export const categories: Category[] = [
  {
    id: 'fruits-vegetables',
    name: 'میوه و سبزیجات',
    icon: '🍎',
    subcategories: [
      { id: 'fruits', name: 'میوه تازه' },
      { id: 'vegetables', name: 'سبزیجات' },
      { id: 'salad', name: 'سالاد آماده' },
      { id: 'dried-fruits', name: 'میوه خشک' },
    ],
  },
  {
    id: 'dairy-eggs',
    name: 'لبنیات و تخم‌مرغ',
    icon: '🥛',
    subcategories: [
      { id: 'milk', name: 'شیر' },
      { id: 'yogurt', name: 'ماست و دوغ' },
      { id: 'cheese', name: 'پنیر' },
      { id: 'butter', name: 'کره و خامه' },
      { id: 'eggs', name: 'تخم‌مرغ' },
    ],
  },
  {
    id: 'meat-protein',
    name: 'گوشت و پروتئین',
    icon: '🥩',
    subcategories: [
      { id: 'red-meat', name: 'گوشت قرمز' },
      { id: 'chicken', name: 'مرغ' },
      { id: 'fish', name: 'ماهی و میگو' },
      { id: 'sausage', name: 'سوسیس و کالباس' },
    ],
  },
  {
    id: 'beverages',
    name: 'نوشیدنی‌ها',
    icon: '🥤',
    subcategories: [
      { id: 'water', name: 'آب معدنی' },
      { id: 'juice', name: 'آبمیوه' },
      { id: 'soda', name: 'نوشابه' },
      { id: 'tea-coffee', name: 'چای و قهوه' },
      { id: 'energy-drinks', name: 'نوشیدنی انرژی‌زا' },
    ],
  },
  {
    id: 'canned-food',
    name: 'مواد خوراکی و کنسرو',
    icon: '🥫',
    subcategories: [
      { id: 'canned', name: 'کنسرو' },
      { id: 'sauce', name: 'سس و چاشنی' },
      { id: 'pasta', name: 'ماکارونی و رشته' },
      { id: 'snacks', name: 'تنقلات' },
    ],
  },
  {
    id: 'staples',
    name: 'کالاهای اساسی',
    icon: '🌾',
    subcategories: [
      { id: 'rice', name: 'برنج' },
      { id: 'oil', name: 'روغن' },
      { id: 'sugar', name: 'قند و شکر' },
      { id: 'flour', name: 'آرد و نان' },
      { id: 'spices', name: 'ادویه‌جات' },
    ],
  },
  {
    id: 'household',
    name: 'خانگی و نظافت',
    icon: '🧹',
    subcategories: [
      { id: 'cleaning', name: 'مواد شوینده' },
      { id: 'tissue', name: 'دستمال کاغذی' },
      { id: 'trash-bags', name: 'کیسه زباله' },
      { id: 'kitchen', name: 'لوازم آشپزخانه' },
    ],
  },
  {
    id: 'beauty-health',
    name: 'آرایشی و بهداشتی',
    icon: '💄',
    subcategories: [
      { id: 'skin-care', name: 'مراقبت پوست' },
      { id: 'hair-care', name: 'مراقبت مو' },
      { id: 'oral-care', name: 'بهداشت دهان' },
      { id: 'makeup', name: 'آرایشی' },
    ],
  },
  {
    id: 'baby',
    name: 'کالای بچه',
    icon: '🍼',
    subcategories: [
      { id: 'diapers', name: 'پوشک' },
      { id: 'baby-food', name: 'غذای کودک' },
      { id: 'baby-care', name: 'مراقبت نوزاد' },
    ],
  },
];
