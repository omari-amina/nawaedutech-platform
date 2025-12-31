import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Trash2, ShoppingBag, CreditCard, Banknote, ArrowRight, ArrowLeft } from 'lucide-react';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name_en: string;
    name_ar: string;
    price: number;
  };
}

export function CartPage() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'postal' | 'cod'>('cod');
  const [postalDetails, setPostalDetails] = useState({ ripNumber: '', ccpNumber: '' });
  const [shippingAddress, setShippingAddress] = useState({ fullName: '', address: '', city: '', phone: '' });
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('cart')
      .select('*, product:products(*)')
      .eq('user_id', user.id);

    if (data) {
      const mappedData = data.map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        product: {
          name_en: item.product.name_en,
          name_ar: item.product.name_ar,
          price: item.product.price,
        },
      }));
      setCartItems(mappedData);
    }
    setLoading(false);
  };

  const removeFromCart = async (cartItemId: string) => {
    await supabase.from('cart').delete().eq('id', cartItemId);
    loadCart();
  };

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await supabase
      .from('cart')
      .update({ quantity: newQuantity })
      .eq('id', cartItemId);
    loadCart();
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.phone) {
      alert('Please fill in all shipping details');
      return;
    }

    if (paymentMethod === 'postal' && (!postalDetails.ripNumber || !postalDetails.ccpNumber)) {
      alert('Please provide your RIP and CCP numbers for Postal Mobile Payment');
      return;
    }

    const items = cartItems.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.product.price,
    }));

    try {
      const orderNotes = paymentMethod === 'postal'
        ? `Postal Payment - RIP: ${postalDetails.ripNumber}, CCP: ${postalDetails.ccpNumber}`
        : 'Cash on Delivery';

      const { data, error } = await supabase.functions.invoke('create-order', {
        body: {
          items,
          paymentMethod: paymentMethod,
          shippingAddress,
          shippingCost: 10,
          currency: 'DZD',
          notes: orderNotes,
        },
      });

      if (error) throw error;

      const successMessage = paymentMethod === 'postal'
        ? 'Order placed! Please complete payment via Postal Mobile Payment using the provided details.'
        : 'Order placed successfully! You will pay upon delivery.';

      alert(successMessage);
      navigate('/dashboard');
    } catch (err: any) {
      alert('Failed to create order: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-muted/30">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-sm max-w-lg mx-auto">
            <ShoppingBag size={64} className="mx-auto text-primary mb-6 animate-bounce" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Please login to view your cart
            </h1>
            <p className="text-gray-500 mb-8">
              Join NawaEduTech to unlock your shopping experience.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary-light transition shadow-lg shadow-primary/20 font-bold"
            >
              {t('nav.login')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-muted/30">
      <div className="container mx-auto px-4">

        <div className="mb-8">
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center text-gray-500 hover:text-primary transition-colors group mb-4"
          >
            <ArrowLeft className={`w-4 h-4 mt-0.5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'} group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform`} />
            {t('cart.continueShopping')}
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t('cart.title')}
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <p className="text-xl text-gray-600 mb-6 font-medium">{t('cart.empty')}</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary-light transition shadow-lg shadow-primary/20 font-bold"
            >
              {t('cart.continueShopping')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center transition-all hover:shadow-md">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {isRTL ? item.product.name_ar : item.product.name_en}
                    </h3>
                    <p className="text-xl font-bold text-primary">
                      D.Z {item.product.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-gray-200 rounded-s-xl transition-colors font-medium text-lg"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 font-semibold text-gray-700 min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-gray-200 rounded-e-xl transition-colors font-medium text-lg"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-semibold text-gray-900">D.Z {calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t('cart.shipping')}</span>
                    <span className="font-semibold text-gray-900">D.Z 500.00</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-end">
                    <span className="font-bold text-lg text-gray-900">{t('cart.total')}</span>
                    <span className="font-bold text-2xl text-primary">
                      D.Z {(calculateSubtotal() + 500).toFixed(2)}
                    </span>
                  </div>
                </div>
                {!showCheckoutForm ? (
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full bg-black text-white py-4 rounded-xl hover:bg-primary transition-all font-bold shadow-lg shadow-black/10 flex items-center justify-center group"
                  >
                    {t('cart.checkout')}
                    <ArrowRight className={`w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div>
                      <h3 className="font-bold mb-3 text-gray-900">Shipping Details</h3>
                      <div className="space-y-3">
                        <input type="text" placeholder="Full Name" value={shippingAddress.fullName} onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                        <input type="text" placeholder="Address" value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                        <input type="text" placeholder="City" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                        <input type="tel" placeholder="Phone Number" value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold mb-3 text-gray-900">Payment Method</h3>
                      <div className="space-y-3">
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'postal' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                          <input type="radio" name="payment" value="postal" checked={paymentMethod === 'postal'} onChange={() => setPaymentMethod('postal')} className="mr-3 text-primary focus:ring-primary" />
                          <div className="flex-1">
                            <div className="flex items-center text-gray-900"><CreditCard size={18} className="me-2 text-primary" /><span className="font-semibold">Postal Mobile Payment</span></div>
                            <p className="text-sm text-gray-500 mt-0.5">سداد بريدي - RIP/CCP</p>
                          </div>
                        </label>
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                          <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="mr-3 text-primary focus:ring-primary" />
                          <div className="flex-1 flex items-center text-gray-900"><Banknote size={18} className="me-2 text-green-600" /><span className="font-semibold">Cash on Delivery</span></div>
                        </label>
                      </div>
                    </div>
                    {paymentMethod === 'postal' && (
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <h3 className="font-bold mb-3 text-sm text-gray-900">Postal Payment Details</h3>
                        <div className="space-y-3">
                          <input type="text" placeholder="RIP Number (Relevé d'Identité Postal)" value={postalDetails.ripNumber} onChange={(e) => setPostalDetails({ ...postalDetails, ripNumber: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" />
                          <input type="text" placeholder="CCP Number (Compte Courant Postal)" value={postalDetails.ccpNumber} onChange={(e) => setPostalDetails({ ...postalDetails, ccpNumber: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" />
                        </div>
                      </div>
                    )}
                    <div className="space-y-3 pt-2">
                      <button onClick={handleCheckout} className="w-full bg-accent text-black py-4 rounded-xl hover:bg-yellow-500 transition-all font-bold shadow-lg shadow-yellow-500/20">
                        Confirm Order
                      </button>
                      <button onClick={() => setShowCheckoutForm(false)} className="w-full text-gray-500 hover:text-gray-900 py-2 font-medium">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
