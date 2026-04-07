import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout && isOpen) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => { setShowCheckout(false); setCartOpen(false); }}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-full max-w-md glass-panel border-l border-border/50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="font-display text-xl font-bold text-foreground">Checkout</h2>
              <button onClick={() => { setShowCheckout(false); setCartOpen(false); }} className="p-2 text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-body text-sm uppercase tracking-wider text-muted-foreground">Shipping</h3>
                {['Full Name', 'Email', 'Address', 'City'].map((field) => (
                  <input
                    key={field}
                    placeholder={field}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-body text-sm uppercase tracking-wider text-muted-foreground">Payment</h3>
                <input placeholder="Card Number" className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM/YY" className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold" />
                  <input placeholder="CVC" className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold" />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border/50 space-y-4">
              <div className="flex justify-between font-display text-lg">
                <span className="text-foreground">Total</span>
                <span className="gold-text font-bold">${total().toLocaleString()}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  clearCart();
                  setShowCheckout(false);
                  setCartOpen(false);
                }}
                className="w-full py-4 gold-gradient rounded-xl font-body font-semibold text-primary-foreground uppercase tracking-wider"
              >
                Place Order
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-full max-w-md glass-panel border-l border-border/50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="font-display text-xl font-bold text-foreground">
                Shopping Bag ({items.length})
              </h2>
              <button onClick={() => setCartOpen(false)} className="p-2 text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBag size={48} className="mb-4 opacity-30" />
                  <p className="font-body text-sm">Your bag is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 bg-secondary/30 rounded-xl"
                    >
                      <div className="w-16 h-16 rounded-lg gold-gradient flex-shrink-0 flex items-center justify-center">
                        <ShoppingBag size={20} className="text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-sm font-semibold text-foreground truncate">{item.product.name}</h3>
                        <p className="text-xs font-body text-muted-foreground">{item.product.category}</p>
                        <p className="font-display text-sm font-bold gold-text mt-1">${item.product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 size={14} />
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-foreground"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-body font-medium text-foreground w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-foreground"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border/50 space-y-4">
                <div className="flex justify-between font-display text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="gold-text font-bold">${total().toLocaleString()}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-4 gold-gradient rounded-xl font-body font-semibold text-primary-foreground uppercase tracking-wider"
                >
                  Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
