import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart } from 'lucide-react';

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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('shop.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('shop.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('shop.categories.all')}
          </button>
          <button
            onClick={() => setFilter('teachers')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === 'teachers'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('shop.categories.teachers')}
          </button>
          <button
            onClick={() => setFilter('students')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === 'students'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('shop.categories.students')}
          </button>
          <button
            onClick={() => setFilter('kids')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === 'kids'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('shop.categories.kids')}
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {isRTL ? product.name_ar : product.name_en}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {isRTL ? product.description_ar : product.description_en}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    <span className={`text-sm ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock_quantity > 0 ? t('shop.inStock') : t('shop.outOfStock')}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock_quantity === 0}
                    className="w-full bg-accent text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    {t('common.addToCart')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
