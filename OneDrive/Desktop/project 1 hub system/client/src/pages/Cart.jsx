import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2, ArrowLeft, ShieldCheck, Truck, MessageSquare,
  Plus, Minus, ShoppingBag, Tag, CheckCircle, X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, tax, shipping, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRemove = (id, title) => {
    removeFromCart(id);
    showToast(`"${title}" removed from cart`, 'info');
  };

  const handleClearAll = () => {
    clearCart();
    showToast('Cart cleared', 'info');
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      showToast('Promo code applied! 10% off', 'success');
    } else {
      showToast('Invalid promo code', 'error');
    }
  };

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const finalTotal = total - discount;

  const handleCheckout = async () => {
    if (!user) {
      showToast('Please login to checkout', 'error');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setCheckoutLoading(true);
    try {
      const products = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      }));

      await api.post('/orders', {
        products,
        totalAmount: finalTotal,
      });

      clearCart();
      setOrderSuccess(true);
    } catch (err) {
      console.error('Checkout error:', err);
      showToast(
        err.response?.data?.message || 'Checkout failed. Please try again.',
        'error'
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  // ── Order Success Screen ──────────────────────────────────────────────────
  if (orderSuccess) {
    return (
      <div className="cart-success-screen fade-in">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle size={64} color="#00B517" />
          </div>
          <h2>Order Placed!</h2>
          <p>Thank you for your purchase. You'll receive a confirmation soon.</p>
          <Link to="/" className="btn btn-primary success-cta">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ── Empty Cart ────────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="cart-empty-screen fade-in">
        <div className="empty-card">
          <ShoppingBag size={80} strokeWidth={1} color="#BDC4CD" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={18} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ── Cart Page ─────────────────────────────────────────────────────────────
  return (
    <div className="cart-page fade-in">
      {/* Toast */}
      {toast && (
        <div className={`cart-toast cart-toast--${toast.type}`}>
          {toast.type === 'success' && <CheckCircle size={16} />}
          {toast.type === 'error' && <X size={16} />}
          {toast.type === 'info' && <ShoppingBag size={16} />}
          <span>{toast.msg}</span>
        </div>
      )}

      <div className="container">
        <div className="cart-header-row">
          <h2 className="cart-title">
            Shopping Cart <span className="cart-count-badge">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
          </h2>
          <button className="clear-all-btn" onClick={handleClearAll}>
            <Trash2 size={14} /> Clear all
          </button>
        </div>

        <div className="cart-layout">
          {/* ── Items Column ────────────────────────────────────────────── */}
          <div className="cart-items-section">
            {cart.map((item) => (
              <div key={item._id} className="cart-item card">
                <div className="item-img-wrap">
                  <img src={item.imageURL} alt={item.title} />
                </div>

                <div className="item-body">
                  <div className="item-top">
                    <div className="item-meta">
                      <h4 className="item-title">{item.title}</h4>
                      {item.brand && <p className="item-brand">{item.brand}</p>}
                      <p className="item-sku">SKU: {item._id?.slice(-8).toUpperCase()}</p>
                    </div>
                    <button
                      className="item-remove-btn"
                      onClick={() => handleRemove(item._id, item.title)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="item-bottom">
                    <div className="qty-stepper">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="item-price-block">
                      <span className="item-unit-price">${item.price} / pc</span>
                      <span className="item-line-total">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-actions">
              <Link to="/products" className="btn btn-outline">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* ── Summary Column ──────────────────────────────────────────── */}
          <div className="cart-summary-col">
            {/* Promo */}
            <div className="promo-card card">
              <div className="promo-header">
                <Tag size={16} />
                <span>Promo Code</span>
              </div>
              <div className="promo-input-row">
                <input
                  type="text"
                  placeholder="Enter code (try SAVE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                <button
                  className={`promo-apply-btn ${promoApplied ? 'applied' : ''}`}
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                >
                  {promoApplied ? 'Applied ✓' : 'Apply'}
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="summary-card card">
              <h3 className="summary-title">Order Summary</h3>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="summary-row discount-row">
                    <span>Promo (SAVE10)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'free-ship' : ''}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              {subtotal < 500 && (
                <div className="free-ship-bar">
                  <Truck size={14} />
                  <span>Add <strong>${(500 - subtotal).toFixed(2)}</strong> more for free shipping!</span>
                </div>
              )}

              <button
                className="checkout-btn btn btn-primary"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? (
                  <span className="btn-spinner">Processing…</span>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>

              <div className="payment-logos">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" />
              </div>
            </div>

            {/* Features */}
            <div className="feature-list-card card">
              <div className="feature-row">
                <ShieldCheck size={20} className="feat-icon" />
                <div>
                  <p>Secure Payment</p>
                  <span>SSL encrypted checkout</span>
                </div>
              </div>
              <div className="feature-row">
                <Truck size={20} className="feat-icon" />
                <div>
                  <p>Free Shipping</p>
                  <span>On orders over $500</span>
                </div>
              </div>
              <div className="feature-row">
                <MessageSquare size={20} className="feat-icon" />
                <div>
                  <p>24/7 Support</p>
                  <span>Dedicated customer service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
