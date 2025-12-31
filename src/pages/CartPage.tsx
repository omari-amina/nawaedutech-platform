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
    <div className="min-h-screen py-16 bg-gray-50/50 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center text-[#340690]/60 hover:text-[#340690] transition-all font-black uppercase tracking-widest text-xs group mb-6"
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'} group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform`} />
              {t('cart.continueShopping')}
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-[#340690]">
              {t('cart.title')}
              <span className="text-[#f3b942] ml-4 text-2xl opacity-50">({cartItems.length})</span>
            </h1>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#340690]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-sm ring-1 ring-gray-100">
                <ShoppingBag size={48} className="text-gray-200" />
              </div>
              <p className="text-2xl text-gray-400 mb-10 font-medium">{t('cart.empty')}</p>
              <button
                onClick={() => navigate('/shop')}
                className="bg-[#340690] text-white px-12 py-5 rounded-2xl hover:bg-[#5f2cc7] hover:scale-105 transition-all shadow-2xl shadow-[#340690]/20 font-black text-lg"
              >
                {t('cart.continueShopping')}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-7 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 flex flex-col sm:flex-row items-center gap-8 transition-all hover:shadow-xl hover:border-[#340690]/10">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ShoppingBag size={32} className="text-gray-300 group-hover:text-[#340690] transition-colors" />
                  </div>

                  <div className="flex-1 text-center sm:text-left rtl:sm:text-right">
                    <h3 className="text-xl font-black text-[#340690] mb-2">
                      {isRTL ? item.product.name_ar : item.product.name_en}
                    </h3>
                    <p className="text-2xl font-black text-[#f3b942]">
                      {item.product.price} <span className="text-sm opacity-60 font-bold">{isRTL ? 'د.ج' : 'DZD'}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-[#340690]/20 transition-all p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-[#340690] transition-all rounded-xl font-black text-xl"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-black text-[#340690]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-[#340690] transition-all rounded-xl font-black text-xl"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-12 h-12 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl"
                      title="Remove item"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#340690] text-white rounded-[3rem] shadow-2xl p-10 sticky top-24 overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <h2 className="text-2xl font-black mb-10 uppercase tracking-widest text-[#f3b942] relative z-10">Order Summary</h2>

                <div className="space-y-6 mb-10 relative z-10">
                  <div className="flex justify-between items-center text-white/60 font-bold">
                    <span className="uppercase text-xs tracking-widest">{t('cart.subtotal')}</span>
                    <span className="text-xl text-white">{calculateSubtotal()} <span className="text-xs">DZD</span></span>
                  </div>
                  <div className="flex justify-between items-center text-white/60 font-bold">
                    <span className="uppercase text-xs tracking-widest">{t('cart.shipping')}</span>
                    <span className="text-xl text-white">500 <span className="text-xs">DZD</span></span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="font-black text-lg uppercase tracking-widest text-[#f3b942]">{t('cart.total')}</span>
                    <div className="text-right">
                      <span className="block text-4xl font-black leading-none">
                        {(calculateSubtotal() + 500)}
                      </span>
                      <span className="text-xs font-bold opacity-50 uppercase tracking-widest">Algerian Dinar</span>
                    </div>
                  </div>
                </div>

                {!showCheckoutForm ? (
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full bg-[#f3b942] text-[#340690] py-6 rounded-2xl hover:bg-white hover:scale-[1.02] transition-all font-black text-xl shadow-xl shadow-black/20 flex items-center justify-center gap-3 group relative z-10"
                  >
                    {t('cart.checkout')}
                    <ArrowRight className={`w-6 h-6 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500 relative z-10">
                    <div className="space-y-6">
                      <h3 className="font-black text-sm uppercase tracking-widest text-[#f3b942]">Shipping Details</h3>
                      <div className="grid gap-4">
                        <input type="text" placeholder="Full Name" value={shippingAddress.fullName} onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })} className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl focus:outline-none focus:border-[#f3b942] focus:bg-white/10 transition-all font-bold placeholder:text-white/30" />
                        <input type="text" placeholder="Address" value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl focus:outline-none focus:border-[#f3b942] focus:bg-white/10 transition-all font-bold placeholder:text-white/30" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="City" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl focus:outline-none focus:border-[#f3b942] focus:bg-white/10 transition-all font-bold placeholder:text-white/30" />
                          <input type="tel" placeholder="Phone" value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl focus:outline-none focus:border-[#f3b942] focus:bg-white/10 transition-all font-bold placeholder:text-white/30" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-black text-sm uppercase tracking-widest text-[#f3b942]">Payment Method</h3>
                      <div className="grid gap-4">
                        <label className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'postal' ? 'border-[#f3b942] bg-white/5' : 'border-white/10 hover:border-white/30'}`}>
                          <input type="radio" name="payment" value="postal" checked={paymentMethod === 'postal'} onChange={() => setPaymentMethod('postal')} className="sr-only peer" />
                          <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${paymentMethod === 'postal' ? 'border-[#f3b942]' : 'border-white/20'}`}>
                            {paymentMethod === 'postal' && <div className="w-2.5 h-2.5 bg-[#f3b942] rounded-full" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <CreditCard size={20} className="text-[#f3b942]" />
                              <span className="font-black uppercase tracking-widest text-xs">Postal Mobile</span>
                            </div>
                          </div>
                        </label>

                        <label className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#f3b942] bg-white/5' : 'border-white/10 hover:border-white/30'}`}>
                          <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="sr-only peer" />
                          <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[#f3b942]' : 'border-white/20'}`}>
                            {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-[#f3b942] rounded-full" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <Banknote size={20} className="text-[#f3b942]" />
                              <span className="font-black uppercase tracking-widest text-xs">Cash on Delivery</span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {paymentMethod === 'postal' && (
                      <div className="p-8 bg-white/5 rounded-[2rem] border-2 border-[#f3b942]/20 space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-[#f3b942]">Postal Details Required</p>
                        <input type="text" placeholder="RIP Number" value={postalDetails.ripNumber} onChange={(e) => setPostalDetails({ ...postalDetails, ripNumber: e.target.value })} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#f3b942] transition-all font-bold text-sm placeholder:text-white/30" />
                        <input type="text" placeholder="CCP Number" value={postalDetails.ccpNumber} onChange={(e) => setPostalDetails({ ...postalDetails, ccpNumber: e.target.value })} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#f3b942] transition-all font-bold text-sm placeholder:text-white/30" />
                      </div>
                    )}

                    <div className="pt-6 space-y-4">
                      <button onClick={handleCheckout} className="w-full bg-[#f3b942] text-[#340690] py-6 rounded-2xl hover:bg-white transition-all font-black text-xl shadow-2xl shadow-black/30">
                        Confirm & Place Order
                      </button>
                      <button onClick={() => setShowCheckoutForm(false)} className="w-full text-white/50 hover:text-white transition-colors font-black uppercase tracking-widest text-xs py-2">
                        Back to Cart
                      </button>
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
