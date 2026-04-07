import { motion } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function Navbar() {
  const { toggleCart, itemCount } = useCartStore();
  const count = itemCount();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel"
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="font-display text-xl sm:text-2xl font-bold gold-text cursor-pointer"
        >
          LUXE
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {['Collection', 'New Arrivals', 'About'].map((item, i) => (
            <motion.a
              key={item}
              href="#shop"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCart}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 gold-gradient rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground"
              >
                {count}
              </motion.span>
            )}
          </motion.button>

          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass-panel border-t border-border/50 px-6 py-4 space-y-3"
        >
          {['Collection', 'New Arrivals', 'About'].map((item) => (
            <a
              key={item}
              href="#shop"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-body text-muted-foreground hover:text-foreground uppercase tracking-wide"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
