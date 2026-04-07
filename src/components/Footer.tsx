import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 sm:py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold gold-text mb-4">LUXE</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Where artisan craftsmanship meets the future of luxury design.
            </p>
          </div>
          {[
            { title: 'Shop', links: ['New Arrivals', 'Watches', 'Sneakers', 'Bags'] },
            { title: 'Company', links: ['About', 'Careers', 'Press', 'Sustainability'] },
            { title: 'Support', links: ['Contact', 'Shipping', 'Returns', 'FAQ'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border/30 text-center"
        >
          <p className="font-body text-xs text-muted-foreground">
            © 2026 LUXE. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
