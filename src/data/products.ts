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

export const products: Product[] = [
  { id: 'p1', name: 'سیب قرمز دماوند', category: 'fruits-vegetables', subcategory: 'fruits', price: 45000, originalPrice: 55000, discount: 18, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/0b06d302-a611-41ef-bb58-958d86c7eeae/_result.png', brand: 'دماوند', inStock: true, rating: 4.5, reviewCount: 128, calories: 52, sugar: 10, weight: '1 کیلو', description: 'سیب قرمز تازه و آبدار از باغ‌های دماوند. محصولی ارگانیک و بدون سموم شیمیایی.', nutritionInfo: [{ name: 'کالری', value: '52 kcal' }, { name: 'قند', value: '10g' }, { name: 'فیبر', value: '2.4g' }, { name: 'ویتامین C', value: '8mg' }], flashDeal: true, flashDealEnd: Date.now() + 3600000 },
  { id: 'p2', name: 'موز اکوادور', category: 'fruits-vegetables', subcategory: 'fruits', price: 65000, originalPrice: 75000, discount: 13, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/20f653d6-0957-4ae5-b1a8-553bd5bc1d4f/_result.png', brand: 'اکوادور', inStock: true, rating: 4.2, reviewCount: 89, calories: 89, sugar: 12, weight: '1 کیلو', description: 'موز تازه وارداتی از اکوادور، سرشار از پتاسیم و انرژی‌زا', nutritionInfo: [{ name: 'کالری', value: '89 kcal' }, { name: 'قند', value: '12g' }, { name: 'پتاسیم', value: '358mg' }] },
  { id: 'p3', name: 'گوجه‌فرنگی گلخانه‌ای', category: 'fruits-vegetables', subcategory: 'vegetables', price: 32000, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/64e12b43-f836-4129-8e10-2a71f6e60fe4/_result.png', brand: 'سبز', inStock: true, rating: 4.0, reviewCount: 56, calories: 18, sugar: 3, weight: '1 کیلو', description: 'گوجه‌فرنگی تازه گلخانه‌ای، بدون سم', nutritionInfo: [{ name: 'کالری', value: '18 kcal' }, { name: 'ویتامین C', value: '13mg' }] },
  { id: 'p4', name: 'خیار سبز', category: 'fruits-vegetables', subcategory: 'vegetables', price: 25000, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/c4f045ec-429e-45dd-b775-91763c599456/_result.png', brand: 'محلی', inStock: true, rating: 4.3, reviewCount: 45, calories: 15, sugar: 2, weight: '1 کیلو', description: 'خیار سبز تازه و ترد، مناسب سالاد' },
  { id: 'p5', name: 'پرتقال تامسون', category: 'fruits-vegetables', subcategory: 'fruits', price: 38000, originalPrice: 48000, discount: 21, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/b35af7c1-d668-4ffc-a2cf-c2ea9a000ca1/_result.png', brand: 'شمال', inStock: true, rating: 4.7, reviewCount: 203, calories: 47, sugar: 9, weight: '1 کیلو', description: 'پرتقال شیرین و آبدار شمال، سرشار از ویتامین C', flashDeal: true, flashDealEnd: Date.now() + 7200000 },
  { id: 'p6', name: 'کاهو پیچ', category: 'fruits-vegetables', subcategory: 'vegetables', price: 18000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/c4f045ec-429e-45dd-b775-91763c599456/_result.png', brand: 'سبز', inStock: true, rating: 3.9, reviewCount: 32, description: 'کاهو پیچ تازه و سالم' },
  { id: 'p7', name: 'هویج', category: 'fruits-vegetables', subcategory: 'vegetables', price: 22000, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/c4f045ec-429e-45dd-b775-91763c599456/_result.png', brand: 'محلی', inStock: true, rating: 4.1, reviewCount: 67, calories: 41, sugar: 5, weight: '1 کیلو', description: 'هویج تازه' },
  { id: 'p8', name: 'لیمو ترش', category: 'fruits-vegetables', subcategory: 'fruits', price: 55000, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/b35af7c1-d668-4ffc-a2cf-c2ea9a000ca1/_result.png', brand: 'جهرم', inStock: false, rating: 4.4, reviewCount: 91, description: 'لیمو ترش آبدار جهرم' },
  { id: 'p9', name: 'شیر پرچرب کاله 1 لیتری', category: 'dairy-eggs', subcategory: 'milk', price: 28000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/927238d5-7959-4604-96ee-ff36ce870105/_result.png', brand: 'کاله', inStock: true, rating: 4.3, reviewCount: 156, description: 'شیر پرچرب پاستوریزه کاله' },
  { id: 'p10', name: 'ماست موسیر میهن', category: 'dairy-eggs', subcategory: 'yogurt', price: 35000, originalPrice: 42000, discount: 17, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/927238d5-7959-4604-96ee-ff36ce870105/_result.png', brand: 'میهن', inStock: true, rating: 4.6, reviewCount: 89, description: 'ماست موسیر خوش‌طعم میهن', flashDeal: true, flashDealEnd: Date.now() + 5400000 },
  { id: 'p11', name: 'پنیر UFTE رامک', category: 'dairy-eggs', subcategory: 'cheese', price: 68000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/927238d5-7959-4604-96ee-ff36ce870105/_result.png', brand: 'رامک', inStock: true, rating: 4.4, reviewCount: 78, description: 'پنیر کم‌نمک UFTE رامک' },
  { id: 'p12', name: 'کره پاستوریزه میهن', category: 'dairy-eggs', subcategory: 'butter', price: 52000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/927238d5-7959-4604-96ee-ff36ce870105/_result.png', brand: 'میهن', inStock: true, rating: 4.5, reviewCount: 112, description: 'کره پاستوریزه سنتی میهن' },
  { id: 'p13', name: 'تخم‌مرغ محلی 15 عددی', category: 'dairy-eggs', subcategory: 'eggs', price: 85000, originalPrice: 95000, discount: 11, unit: 'شانه', image: 'https://image.qwenlm.ai/generated-images/a6fab07e-ac76-4ca5-b0ee-848ae9c61500/_result.png', brand: 'محلی', inStock: true, rating: 4.8, reviewCount: 234, description: 'تخم‌مرغ تازه محلی' },
  { id: 'p14', name: 'سینه مرغ بدون پوست', category: 'meat-protein', subcategory: 'chicken', price: 145000, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/3d738e95-9225-4c1c-967c-444300cf610b/_result.png', brand: 'زر', inStock: true, rating: 4.2, reviewCount: 167, description: 'سینه مرغ تازه بدون پوست' },
  { id: 'p15', name: 'گوشت چرخ‌کرده گوساله', category: 'meat-protein', subcategory: 'red-meat', price: 380000, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/3d738e95-9225-4c1c-967c-444300cf610b/_result.png', brand: 'سردار', inStock: true, rating: 4.6, reviewCount: 89, description: 'گوشت چرخ‌کرده تازه گوساله' },
  { id: 'p16', name: 'ماهی قزل‌آلا', category: 'meat-protein', subcategory: 'fish', price: 220000, originalPrice: 260000, discount: 15, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/3d738e95-9225-4c1c-967c-444300cf610b/_result.png', brand: 'دریا', inStock: true, rating: 4.7, reviewCount: 56, description: 'ماهی قزل‌آلای تازه', flashDeal: true, flashDealEnd: Date.now() + 4800000 },
  { id: 'p17', name: 'سوسیس کوکتل رزمونت', category: 'meat-protein', subcategory: 'sausage', price: 95000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/3d738e95-9225-4c1c-967c-444300cf610b/_result.png', brand: 'رزمونت', inStock: true, rating: 4.0, reviewCount: 145, description: 'سوسیس کوکتل مرغ رزمونت' },
  { id: 'p18', name: 'آب معدنی دماوند 1.5 لیتری', category: 'beverages', subcategory: 'water', price: 8000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/927238d5-7959-4604-96ee-ff36ce870105/_result.png', brand: 'دماوند', inStock: true, rating: 4.1, reviewCount: 312, description: 'آب معدنی طبیعی دماوند' },
  { id: 'p19', name: 'نوشابه کوکاکولا 1.5 لیتری', category: 'beverages', subcategory: 'soda', price: 25000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/927238d5-7959-4604-96ee-ff36ce870105/_result.png', brand: 'کوکاکولا', inStock: true, rating: 4.0, reviewCount: 456, description: 'نوشابه کلاسیک کوکاکولا' },
  { id: 'p20', name: 'آبمیوه پرتقال سان‌استار', category: 'beverages', subcategory: 'juice', price: 32000, originalPrice: 38000, discount: 16, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/b35af7c1-d668-4ffc-a2cf-c2ea9a000ca1/_result.png', brand: 'سان‌استار', inStock: true, rating: 4.3, reviewCount: 178, description: 'آبمیوه طبیعی پرتقال' },
  { id: 'p21', name: 'چای سیاه گلستان', category: 'beverages', subcategory: 'tea-coffee', price: 120000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'گلستان', inStock: true, rating: 4.5, reviewCount: 289, description: 'چای سیاه ممتاز گلستان' },
  { id: 'p22', name: 'برنج ایرانی هاشمی', category: 'staples', subcategory: 'rice', price: 450000, originalPrice: 520000, discount: 13, unit: '10 کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'گلها', inStock: true, rating: 4.8, reviewCount: 567, description: 'برنج درجه یک ایرانی هاشمی' },
  { id: 'p23', name: 'روغن آفتابگردان لادن', category: 'staples', subcategory: 'oil', price: 85000, unit: '1.8 لیتری', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'لادن', inStock: true, rating: 4.2, reviewCount: 198, description: 'روغن آفتابگردان لادن' },
  { id: 'p24', name: 'قند شکسته', category: 'staples', subcategory: 'sugar', price: 45000, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'هفت', inStock: true, rating: 4.0, reviewCount: 87, description: 'قند شکسته ممتاز' },
  { id: 'p25', name: 'مایع ظرفشویی پریل', category: 'household', subcategory: 'cleaning', price: 55000, originalPrice: 65000, discount: 15, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'پریل', inStock: true, rating: 4.4, reviewCount: 234, description: 'مایع ظرفشویی غلیظ پریل' },
  { id: 'p26', name: 'دستمال کاغذی پاپیا 200 برگ', category: 'household', subcategory: 'tissue', price: 38000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'پاپیا', inStock: true, rating: 4.3, reviewCount: 345, description: 'دستمال کاغذی سه لایه پاپیا' },
  { id: 'p27', name: 'شامپو سر هد اند شولدرز', category: 'beauty-health', subcategory: 'hair-care', price: 125000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'هد اند شولدرز', inStock: true, rating: 4.5, reviewCount: 178, description: 'شامپو ضد شوره هد اند شولدرز' },
  { id: 'p28', name: 'خمیر دندان سیگنال', category: 'beauty-health', subcategory: 'oral-care', price: 45000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'سیگنال', inStock: true, rating: 4.2, reviewCount: 234, description: 'خمیر دندان محافظ دندان' },
  { id: 'p29', name: 'پوشک بچه پمپرز سایز 3', category: 'baby', subcategory: 'diapers', price: 350000, originalPrice: 420000, discount: 17, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'پمپرز', inStock: true, rating: 4.7, reviewCount: 456, description: 'پوشک بچه پمپرز سایز 3 (4-9 کیلو)' },
  { id: 'p30', name: 'شیر خشک آپتامیل', category: 'baby', subcategory: 'baby-food', price: 580000, unit: 'قوطی', image: 'https://image.qwenlm.ai/generated-images/927238d5-7959-4604-96ee-ff36ce870105/_result.png', brand: 'آپتامیل', inStock: true, rating: 4.6, reviewCount: 189, description: 'شیر خشک آپتامیل مرحله 1' },
  { id: 'p31', name: 'ماکارونی اسپاگتی زر', category: 'canned-food', subcategory: 'pasta', price: 22000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'زر', inStock: true, rating: 4.1, reviewCount: 123, description: 'ماکارونی اسپاگتی درجه یک' },
  { id: 'p32', name: 'رب گوجه‌فرنگی چین‌چین', category: 'canned-food', subcategory: 'sauce', price: 48000, originalPrice: 55000, discount: 13, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/64e12b43-f836-4129-8e10-2a71f6e60fe4/_result.png', brand: 'چین‌چین', inStock: true, rating: 4.3, reviewCount: 234, description: 'رب گوجه‌فرنگی غلیظ' },
  { id: 'p33', name: 'تن ماهی شیلتون', category: 'canned-food', subcategory: 'canned', price: 65000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/3d738e95-9225-4c1c-967c-444300cf610b/_result.png', brand: 'شیلتون', inStock: true, rating: 4.4, reviewCount: 167, description: 'تن ماهی در روغن' },
  { id: 'p34', name: 'چیپس خلالی مزمز', category: 'canned-food', subcategory: 'snacks', price: 35000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'مزمز', inStock: true, rating: 4.0, reviewCount: 289, description: 'چیپس خلالی با طعم نمکی' },
  
  // نوشیدنی‌ها
  { id: 'p35', name: 'آبمیوه پرتقال طبیعی', category: 'beverages', subcategory: 'juice', price: 45000, originalPrice: 55000, discount: 18, unit: 'لیتر', image: 'https://image.qwenlm.ai/generated-images/b35af7c1-d668-4ffc-a2cf-c2ea9a000ca1/_result.png', brand: 'سان‌استار', inStock: true, rating: 4.6, reviewCount: 234, description: 'آبمیوه پرتقال طبیعی بدون شکر افزوده' },
  { id: 'p36', name: 'شیر کم‌چرب کاله', category: 'beverages', subcategory: 'milk', price: 32000, unit: 'لیتر', image: 'https://image.qwenlm.ai/generated-images/927238d5-7959-4604-96ee-ff36ce870105/_result.png', brand: 'کاله', inStock: true, rating: 4.4, reviewCount: 189, description: 'شیر کم‌چرب پاستوریزه' },
  { id: 'p37', name: 'دوغ محلی سنتی', category: 'beverages', subcategory: 'soda', price: 18000, unit: 'لیتر', image: 'https://image.qwenlm.ai/generated-images/927238d5-7959-4604-96ee-ff36ce870105/_result.png', brand: 'محلی', inStock: true, rating: 4.3, reviewCount: 156, description: 'دوغ محلی با طعم سنتی' },
  { id: 'p38', name: 'چای سبز گلستان', category: 'beverages', subcategory: 'tea-coffee', price: 85000, originalPrice: 95000, discount: 11, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'گلستان', inStock: true, rating: 4.5, reviewCount: 267, description: 'چای سبز ممتاز گلستان' },
  { id: 'p39', name: 'قهوه فوری نسکافه', category: 'beverages', subcategory: 'tea-coffee', price: 125000, unit: 'قوطی', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'نسکافه', inStock: true, rating: 4.7, reviewCount: 312, description: 'قهوه فوری کلاسیک نسکافه' },
  
  // کنسرو و خوراکی
  { id: 'p40', name: 'کنسرو تن ماهی در روغن', category: 'canned-food', subcategory: 'canned', price: 78000, originalPrice: 89000, discount: 12, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/3d738e95-9225-4c1c-967c-444300cf610b/_result.png', brand: 'شیلتون', inStock: true, rating: 4.5, reviewCount: 198, description: 'تن ماهی در روغن آفتابگردان' },
  { id: 'p41', name: 'رب گوجه‌فرنگی چین‌چین', category: 'canned-food', subcategory: 'sauce', price: 52000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/64e12b43-f836-4129-8e10-2a71f6e60fe4/_result.png', brand: 'چین‌چین', inStock: true, rating: 4.4, reviewCount: 234, description: 'رب گوجه‌فرنگی غلیظ' },
  { id: 'p42', name: 'ماکارونی اسپاگتی زر', category: 'canned-food', subcategory: 'pasta', price: 28000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'زر', inStock: true, rating: 4.3, reviewCount: 167, description: 'ماکارونی اسپاگتی درجه یک' },
  { id: 'p43', name: 'سس مایونز بیژن', category: 'canned-food', subcategory: 'sauce', price: 45000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'بیژن', inStock: true, rating: 4.2, reviewCount: 145, description: 'سس مایونز خوش‌طعم' },
  { id: 'p44', name: 'پفک نمکی مزمز', category: 'canned-food', subcategory: 'snacks', price: 25000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'مزمز', inStock: true, rating: 4.1, reviewCount: 289, description: 'پفک نمکی کلاسیک' },
  
  // خانگی و نظافت
  { id: 'p45', name: 'مایع ظرفشویی پریل', category: 'household', subcategory: 'cleaning', price: 65000, originalPrice: 78000, discount: 17, unit: 'لیتر', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'پریل', inStock: true, rating: 4.5, reviewCount: 234, description: 'مایع ظرفشویی غلیظ با رایحه لیمو' },
  { id: 'p46', name: 'پودر ماشین لباسشویی تاide', category: 'household', subcategory: 'cleaning', price: 145000, unit: 'کیلوگرم', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'تاید', inStock: true, rating: 4.6, reviewCount: 312, description: 'پودر لباسشویی با قدرت پاک‌کنندگی بالا' },
  { id: 'p47', name: 'دستمال کاغذی پاپیا', category: 'household', subcategory: 'tissue', price: 42000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'پاپیا', inStock: true, rating: 4.4, reviewCount: 267, description: 'دستمال کاغذی سه لایه' },
  { id: 'p48', name: 'اسپری تمیزکننده سطوح', category: 'household', subcategory: 'cleaning', price: 58000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'سیف', inStock: true, rating: 4.3, reviewCount: 189, description: 'اسپری تمیزکننده چند منظوره' },
  { id: 'p49', name: 'کیسه زباله 100 عددی', category: 'household', subcategory: 'cleaning', price: 35000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'پاکسان', inStock: true, rating: 4.2, reviewCount: 156, description: 'کیسه زباله مقاوم' },
  
  // آرایشی و بهداشتی
  { id: 'p50', name: 'شامپو ضد شوره هد اند شولدرز', category: 'beauty-health', subcategory: 'hair-care', price: 135000, originalPrice: 155000, discount: 13, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'هد اند شولدرز', inStock: true, rating: 4.6, reviewCount: 289, description: 'شامپو ضد شوره قوی' },
  { id: 'p51', name: 'صابون بهداشتی لوکس', category: 'beauty-health', subcategory: 'skin-care', price: 28000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'لوکس', inStock: true, rating: 4.4, reviewCount: 234, description: 'صابون بهداشتی با رایحه گل' },
  { id: 'p52', name: 'خمیر دندان سیگنال', category: 'beauty-health', subcategory: 'oral-care', price: 48000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'سیگنال', inStock: true, rating: 4.5, reviewCount: 267, description: 'خمیر دندان محافظ دندان' },
  { id: 'p53', name: 'کرم مرطوب‌کننده نیوآ', category: 'beauty-health', subcategory: 'skin-care', price: 95000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'نیوآ', inStock: true, rating: 4.7, reviewCount: 312, description: 'کرم مرطوب‌کننده پوست' },
  { id: 'p54', name: 'مسواک اورال-بی', category: 'beauty-health', subcategory: 'oral-care', price: 42000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'اورال-بی', inStock: true, rating: 4.5, reviewCount: 198, description: 'مسواک با برس نرم' },
  
  // کالای بچه
  { id: 'p55', name: 'پوشک بچه پمپرز سایز 3', category: 'baby', subcategory: 'diapers', price: 385000, originalPrice: 450000, discount: 14, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'پمپرز', inStock: true, rating: 4.8, reviewCount: 456, description: 'پوشک بچه سایز 3 (4-9 کیلو)' },
  { id: 'p56', name: 'شیر خشک آپتامیل مرحله 1', category: 'baby', subcategory: 'baby-food', price: 620000, unit: 'قوطی', image: 'https://image.qwenlm.ai/generated-images/927238d5-7959-4604-96ee-ff36ce870105/_result.png', brand: 'آپتامیل', inStock: true, rating: 4.7, reviewCount: 234, description: 'شیر خشک مخصوص نوزادان' },
  { id: 'p57', name: 'غذای کودک سرلاک', category: 'baby', subcategory: 'baby-food', price: 85000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'سرلاک', inStock: true, rating: 4.6, reviewCount: 189, description: 'غذای کودک با طعم برنج' },
  { id: 'p58', name: 'دستمال مرطوب بچه', category: 'baby', subcategory: 'baby-care', price: 45000, unit: 'بسته', image: 'https://image.qwenlm.ai/generated-images/b39deaf3-06e8-49c3-898b-0a6a4250da55/_result.png', brand: 'پمپرز', inStock: true, rating: 4.5, reviewCount: 267, description: 'دستمال مرطوب بدون الکل' },
  { id: 'p59', name: 'شامپو بچه جانسون', category: 'baby', subcategory: 'baby-care', price: 78000, unit: 'عدد', image: 'https://image.qwenlm.ai/generated-images/9b9703d0-c12c-4b9a-b175-5953fae293ac/_result.png', brand: 'جانسون', inStock: true, rating: 4.7, reviewCount: 312, description: 'شامپو ملایم مخصوص بچه' },
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
