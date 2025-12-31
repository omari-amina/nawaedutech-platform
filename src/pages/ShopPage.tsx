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
    <div className="min-h-screen py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{t('nav.shop')}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
            {t('shop.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('shop.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 block h-full flex flex-col"
              >
                <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {/* Placeholder illustration */}
                  <div className="text-gray-200 group-hover:scale-110 transition-transform duration-500">
                    <Package size={80} />
                  </div>
                  {product.stock_quantity === 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        {t('shop.outOfStock')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md uppercase tracking-wide">
                      {product.target_audience}
                    </span>
                    {product.stock_quantity > 0 && product.stock_quantity < 5 && (
                      <span className="text-xs font-medium text-orange-600">
                        Only {product.stock_quantity} left
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {isRTL ? product.name_ar : product.name_en}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed flex-1">
                    {isRTL ? product.description_ar : product.description_en}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-gray-900">
                      D.Z {product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={product.stock_quantity === 0}
                      className="flex-1 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-primary transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-black/10 hover:shadow-primary/25"
                    >
                      <ShoppingCart size={18} className="me-2" />
                      {t('common.addToCart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <button onClick={() => setFilter('all')} className="mt-4 text-primary font-medium hover:underline">
              View all products
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
      className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${active
          ? 'bg-black text-white shadow-lg shadow-black/25'
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-black border border-transparent hover:border-gray-200'
        }`}
    >
      {children}
    </button>
  )
}
