import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Trash2, ShoppingBag, CreditCard, Banknote } from 'lucide-react';

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
          currency: 'USD',
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
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Please login to view your cart
          </h1>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"
          >
            {t('nav.login')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('cart.title')}
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-6">{t('cart.empty')}</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"
            >
              {t('cart.continueShopping')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {isRTL ? item.product.name_ar : item.product.name_en}
                    </h3>
                    <p className="text-xl font-bold text-primary">
                      ${item.product.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.subtotal')}</span>
                    <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.shipping')}</span>
                    <span className="font-semibold">$10.00</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg">
                    <span className="font-bold">{t('cart.total')}</span>
                    <span className="font-bold text-primary">
                      ${(calculateSubtotal() + 10).toFixed(2)}
                    </span>
                  </div>
                </div>
                {!showCheckoutForm ? (
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full bg-accent text-black py-3 rounded-lg hover:bg-yellow-500 transition font-semibold"
                  >
                    {t('cart.checkout')}
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold mb-3">Shipping Details</h3>
                      <div className="space-y-2">
                        <input type="text" placeholder="Full Name" value={shippingAddress.fullName} onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        <input type="text" placeholder="Address" value={shippingAddress.address} onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        <input type="text" placeholder="City" value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        <input type="tel" placeholder="Phone Number" value={shippingAddress.phone} onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold mb-3">Payment Method</h3>
                      <div className="space-y-2">
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="payment" value="postal" checked={paymentMethod === 'postal'} onChange={() => setPaymentMethod('postal')} className="mr-3" />
                          <div className="flex-1">
                            <div className="flex items-center"><CreditCard size={18} className="mr-2" /><span className="font-semibold">Postal Mobile Payment</span></div>
                            <p className="text-sm text-gray-600">سداد بريدي - RIP/CCP</p>
                          </div>
                        </label>
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="mr-3" />
                          <div className="flex-1 flex items-center"><Banknote size={18} className="mr-2" /><span className="font-semibold">Cash on Delivery</span></div>
                        </label>
                      </div>
                    </div>
                    {paymentMethod === 'postal' && (
                      <div>
                        <h3 className="font-bold mb-3">Postal Payment Details</h3>
                        <div className="space-y-2">
                          <input type="text" placeholder="RIP Number (Relevé d'Identité Postal)" value={postalDetails.ripNumber} onChange={(e) => setPostalDetails({...postalDetails, ripNumber: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                          <input type="text" placeholder="CCP Number (Compte Courant Postal)" value={postalDetails.ccpNumber} onChange={(e) => setPostalDetails({...postalDetails, ccpNumber: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                      </div>
                    )}
                    <button onClick={handleCheckout} className="w-full bg-accent text-black py-3 rounded-lg hover:bg-yellow-500 transition font-semibold">Place Order</button>
                    <button onClick={() => setShowCheckoutForm(false)} className="w-full text-gray-600 hover:text-gray-900 py-2">Cancel</button>
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
