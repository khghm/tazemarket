import { 
  Apple, 
  Milk, 
  Beef, 
  CupSoda, 
  Soup, 
  Wheat, 
  SprayCan, 
  Sparkles, 
  Baby 
} from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  subcategories: { id: string; name: string }[];
}

export const categories: Category[] = [
  {
    id: 'fruits-vegetables',
    name: 'میوه و سبزیجات',
    icon: 'Apple',
    description: 'تازه‌ترین میوه‌ها و سبزیجات',
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
    icon: 'Milk',
    description: 'محصولات لبنی تازه و تخم‌مرغ',
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
    icon: 'Beef',
    description: 'گوشت تازه و محصولات پروتئینی',
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
    icon: 'CupSoda',
    description: 'انواع نوشیدنی‌های سرد و گرم',
    subcategories: [
      { id: 'water', name: 'آب معدنی' },
      { id: 'soda', name: 'نوشابه' },
      { id: 'juice', name: 'آبمیوه' },
      { id: 'tea-coffee', name: 'چای و قهوه' },
    ],
  },
  {
    id: 'canned-food',
    name: 'کنسرو و خوراکی',
    icon: 'Soup',
    description: 'کنسروها و مواد غذایی آماده',
    subcategories: [
      { id: 'canned', name: 'کنسرو' },
      { id: 'pasta', name: 'ماکارونی' },
      { id: 'sauce', name: 'سس' },
      { id: 'snacks', name: 'تنقلات' },
    ],
  },
  {
    id: 'staples',
    name: 'کالاهای اساسی',
    icon: 'Wheat',
    description: 'برنج، روغن، قند و کالاهای اساسی',
    subcategories: [
      { id: 'rice', name: 'برنج' },
      { id: 'oil', name: 'روغن' },
      { id: 'sugar', name: 'قند و شکر' },
      { id: 'flour', name: 'آرد' },
    ],
  },
  {
    id: 'household',
    name: 'خانگی و نظافت',
    icon: 'SprayCan',
    description: 'محصولات نظافتی و خانگی',
    subcategories: [
      { id: 'cleaning', name: 'مواد شوینده' },
      { id: 'tissue', name: 'دستمال کاغذی' },
      { id: 'detergent', name: 'پودر لباسشویی' },
    ],
  },
  {
    id: 'beauty-health',
    name: 'آرایشی و بهداشتی',
    icon: 'Sparkles',
    description: 'محصولات آرایشی و بهداشتی',
    subcategories: [
      { id: 'hair-care', name: 'مراقبت مو' },
      { id: 'skin-care', name: 'مراقبت پوست' },
      { id: 'oral-care', name: 'بهداشت دهان' },
    ],
  },
  {
    id: 'baby',
    name: 'کالای بچه',
    icon: 'Baby',
    description: 'محصولات ویژه نوزاد و کودک',
    subcategories: [
      { id: 'diapers', name: 'پوشک' },
      { id: 'baby-food', name: 'غذای کودک' },
      { id: 'baby-care', name: 'مراقبت کودک' },
    ],
  },
];

export const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Apple,
    Milk,
    Beef,
    CupSoda,
    Soup,
    Wheat,
    SprayCan,
    Sparkles,
    Baby,
  };
  return icons[iconName] || Apple;
};
