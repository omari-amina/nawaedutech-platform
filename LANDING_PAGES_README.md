# 🎨 NawaEduTech Landing Pages

## Quick Start

Three professional landing page templates have been created for NawaEduTech:

### 📍 Access the Pages

After running `npm run dev`, visit:

- **Printed Products**: `http://localhost:5173/landing/printed-product`
- **Digital Products**: `http://localhost:5173/landing/digital-product`
- **Courses**: `http://localhost:5173/landing/course`

### ✏️ How to Customize

1. Open the appropriate file:
   - `src/pages/PrintedProductLanding.tsx`
   - `src/pages/DigitalProductLanding.tsx`
   - `src/pages/CourseLanding.tsx`

2. Find the `PRODUCT_DATA` or `COURSE_DATA` section at the top

3. Edit the data according to your needs

### 📝 Example

```typescript
const PRODUCT_DATA = {
  title_ar: 'Your Product Name',
  price: 1500,
  heroImage: '/products/your-image.png',
  features: [
    {
      icon: '✨',
      title_ar: 'Feature Title',
      desc_ar: 'Feature Description'
    }
  ]
}
```

## 📚 Full Documentation

See `LANDING_PAGES_GUIDE.md` for complete Arabic documentation.

## 🎨 Design Features

- ✅ Fully responsive
- ✅ Brand-consistent colors
- ✅ Modern animations
- ✅ RTL support
- ✅ Easy to customize
- ✅ SEO optimized

## 🎯 Sections Included

### Printed Product Landing
- Hero with product image
- Trust badges
- Key features
- Image gallery
- What's included
- Specifications
- Testimonials
- Final CTA

### Digital Product Landing
- Hero with instant download badge
- Trust badges (instant download, secure payment)
- Key features
- Preview gallery
- What's included
- File information
- Benefits
- FAQ
- Testimonials
- Final CTA

### Course Landing
- Hero with video/image
- Course stats
- Learning outcomes
- Full curriculum (accordion)
- Course features
- Instructor profile
- Requirements & target audience
- Testimonials
- FAQ
- Final CTA

## 🎨 Brand Colors

- Primary Purple: `#340690`
- Secondary Purple: `#5f2cc7`
- Light Purple: `#864bf5`
- Accent Gold: `#f3b942`

## 📸 Image Guidelines

- **Hero Image**: 800×600px
- **Gallery Images**: 600×400px
- **Thumbnails**: 200×200px

Place images in `public/products/` or `public/courses/`

## 🔗 Integration with Database

To make pages dynamic:

```typescript
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function DynamicProductLanding() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const loadProduct = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      setProduct(data);
    };
    loadProduct();
  }, [id]);
  
  // Use product data instead of PRODUCT_DATA
}
```

## ✅ Pre-Launch Checklist

- [ ] All text updated
- [ ] All images uploaded
- [ ] Tested on mobile & desktop
- [ ] Prices verified
- [ ] Buttons tested
- [ ] Spelling checked
- [ ] English translation reviewed (if needed)

## 🆘 Troubleshooting

**Images not showing?**
- Check path: `/products/image.png`
- Verify file exists in `public` folder
- No spaces or special characters in filename

**Design not updating?**
- Clear cache: `Ctrl + Shift + R`
- Check server is running
- Check console for errors

---

**Created by NawaEduTech** 💜✨
