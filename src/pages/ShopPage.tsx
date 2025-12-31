import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, Filter, Package } from 'lucide-react';

interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  stock_quantity: number;
  target_audience: string;
}

export function ShopPage() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [filter]);

  const loadProducts = async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (filter !== 'all') {
      query = query.eq('target_audience', filter);
    }

    const { data } = await query;
    if (data) setProducts(data);
    setLoading(false);
  };

  const addToCart = async (productId: string) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const { error } = await supabase
        .from('cart')
        .insert({
          user_id: user.id,
          product_id: productId,
          quantity: 1,
        });

      if (error) {
        if (error.code === '23505') {
          // Item already in cart, update quantity
          const { data: cartItem } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', user.id)
            .eq('product_id', productId)
            .maybeSingle();

          if (cartItem) {
            const { error: updateError } = await supabase
              .from('cart')
              .update({ quantity: cartItem.quantity + 1 })
              .eq('id', cartItem.id);

            if (updateError) {
              console.error('Update error:', updateError);
              alert('Failed to update cart quantity');
              return;
            }
          }
        } else {
          console.error('Cart error:', error);
          alert('Failed to add to cart: ' + error.message);
          return;
        }
      }
      alert('Added to cart!');
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      alert('An error occurred: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 px-4 text-center overflow-hidden bg-gradient-to-br from-[#340690] via-[#5f2cc7] to-[#864bf5] mb-20">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f3b942]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto relative z-10 py-10">
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
            {t('shop.title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('shop.subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        {/* 2. FILTERS */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            {t('shop.categories.all')}
          </FilterButton>
          <FilterButton active={filter === 'teachers'} onClick={() => setFilter('teachers')}>
            {t('shop.categories.teachers')}
          </FilterButton>
          <FilterButton active={filter === 'students'} onClick={() => setFilter('students')}>
            {t('shop.categories.students')}
          </FilterButton>
          <FilterButton active={filter === 'kids'} onClick={() => setFilter('kids')}>
            {t('shop.categories.kids')}
          </FilterButton>
        </div>

        {/* 3. PRODUCTS GRID */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#340690] border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Product Image Area with Gradient Background */}
                <div className="h-64 bg-gradient-to-br from-gray-50 to-muted/30 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[#340690]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Decorative Elements Background */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#340690]/5 rounded-full blur-2xl group-hover:bg-[#340690]/10 transition-all"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#f3b942]/10 rounded-full blur-2xl"></div>

                  <div className="text-[#340690]/20 group-hover:text-[#340690]/30 group-hover:scale-110 transition-all duration-700">
                    <Package size={100} strokeWidth={1} />
                  </div>

                  {/* Stock Badges */}
                  <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto flex flex-col gap-2">
                    {product.stock_quantity === 0 && (
                      <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
                        {t('shop.outOfStock')}
                      </span>
                    )}
                    {product.stock_quantity > 0 && product.stock_quantity < 5 && (
                      <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
                        {isRTL ? `باقي ${product.stock_quantity} فقط` : `Only ${product.stock_quantity} left`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-black text-[#f3b942] bg-[#f3b942]/10 px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {product.target_audience}
                    </span>
                  </div>

                  <h3 className="text-xl font-black mb-3 text-gray-900 group-hover:text-[#340690] transition-colors leading-tight">
                    {isRTL ? product.name_ar : product.name_en}
                  </h3>

                  <p className="text-gray-500 mb-8 line-clamp-2 text-sm leading-relaxed flex-1">
                    {isRTL ? product.description_ar : product.description_en}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">
                        {isRTL ? 'السعر' : 'Price'}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#340690]">
                          {product.price}
                        </span>
                        <span className="text-sm font-bold text-[#340690]">
                          {isRTL ? 'د.ج' : 'DZD'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={product.stock_quantity === 0}
                      title={isRTL ? 'أضف إلى السلة' : 'Add to Cart'}
                      className="bg-[#340690] text-white p-4 rounded-2xl hover:bg-[#f3b942] hover:text-[#340690] transition-all duration-500 disabled:opacity-30 disabled:grayscale shadow-lg shadow-[#340690]/20 hover:shadow-[#f3b942]/40 group/btn"
                    >
                      <ShoppingCart size={22} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. EMPTY STATE */}
        {!loading && products.length === 0 && (
          <div className="text-center py-24 bg-muted/20 rounded-[3rem] border-2 border-dashed border-gray-100 max-w-lg mx-auto">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Filter size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-500 text-xl font-bold mb-6">
              {isRTL ? 'لا توجد منتجات في هذا القسم حالياً' : 'No products in this category yet'}
            </p>
            <button
              onClick={() => setFilter('all')}
              className="bg-[#340690] text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-[#340690]/20"
            >
              {isRTL ? 'عرض كل المنتجات' : 'Show All Products'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3.5 rounded-2xl font-black text-lg transition-all duration-500 transform ${active
        ? 'bg-[#340690] text-white shadow-2xl shadow-[#340690]/30 -translate-y-1'
        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-[#340690] border border-gray-100 hover:border-[#340690]/20'
        }`}
    >
      {children}
    </button>
  )
}
