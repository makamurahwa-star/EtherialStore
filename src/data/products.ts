export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  color: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export const categories = ["All", "Watches", "Sneakers", "Bags", "Accessories"] as const;

export const products: Product[] = [
  {
    id: "1",
    name: "Noir Chronograph",
    price: 2450,
    category: "Watches",
    description: "Swiss-made automatic chronograph with sapphire crystal",
    color: "#c9a962",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop",
    rating: 4.9,
    reviews: 128,
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Phantom Runner",
    price: 380,
    category: "Sneakers",
    description: "Ultra-lightweight performance sneaker with carbon plate",
    color: "#8b7355",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    rating: 4.7,
    reviews: 256,
    badge: "New",
  },
  {
    id: "3",
    name: "Eclipse Tote",
    price: 1890,
    category: "Bags",
    description: "Hand-stitched Italian leather tote with gold hardware",
    color: "#a0845c",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "4",
    name: "Solaris Ring",
    price: 560,
    category: "Accessories",
    description: "18K gold-plated statement ring with onyx inlay",
    color: "#d4af37",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
    rating: 4.6,
    reviews: 67,
    badge: "Limited",
  },
  {
    id: "5",
    name: "Meridian Diver",
    price: 3200,
    category: "Watches",
    description: "300m water-resistant diver with ceramic bezel",
    color: "#b8860b",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=600&fit=crop",
    rating: 5.0,
    reviews: 42,
  },
  {
    id: "6",
    name: "Velocity X",
    price: 290,
    category: "Sneakers",
    description: "Retro-futuristic high-top with reflective panels",
    color: "#9a8c6e",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop",
    rating: 4.5,
    reviews: 312,
  },
  {
    id: "7",
    name: "Obsidian Clutch",
    price: 950,
    category: "Bags",
    description: "Minimalist evening clutch in obsidian leather",
    color: "#8b7765",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=600&fit=crop",
    rating: 4.9,
    reviews: 54,
  },
  {
    id: "8",
    name: "Apex Shades",
    price: 420,
    category: "Accessories",
    description: "Titanium aviators with polarized gradient lenses",
    color: "#c0a060",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    rating: 4.7,
    reviews: 198,
    badge: "Trending",
  },
];
