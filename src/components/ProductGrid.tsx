import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { products, categories } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { addItem } = useCartStore();

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="shop" className="py-20 sm:py-32 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm font-body uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Curated Selection
          </p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold gold-text">
            The Collection
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-body font-medium uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'gold-gradient text-primary-foreground'
                  : 'glass-panel text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group glass-panel rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="relative bg-secondary/30 overflow-hidden">
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 gold-gradient px-3 py-1 rounded-full text-xs font-body font-semibold text-primary-foreground uppercase">
                      {product.badge}
                    </span>
                  )}
                  <div className="w-full h-48 sm:h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-[10px] sm:text-xs font-body uppercase tracking-widest text-muted-foreground mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs font-body text-muted-foreground mb-3 line-clamp-1">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={12}
                        className={idx < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-muted-foreground/30'}
                      />
                    ))}
                    <span className="text-[10px] font-body text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg sm:text-xl font-bold gold-text">
                      ${product.price.toLocaleString()}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(product);
                      }}
                      className="p-2.5 rounded-full gold-gradient text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ShoppingBag size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
