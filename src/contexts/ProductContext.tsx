import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  setSearchQuery: (query: string) => void;
  setFilters: (filters: any) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Sample product data
const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Handwoven Boho Necklace',
    description: 'Beautiful handcrafted necklace made with sustainable materials and traditional techniques.',
    price: 1299,
    originalPrice: 1599,
    image: 'https://5.imimg.com/data5/ECOM/Default/2024/5/422451569/HT/JL/KS/43052074/img-2845-500x500.jpg',
    category: 'Jewelry',
    seller: 'Artisan Maya',
    rating: 5,
    reviews: 23,
    sustainable: true,
    featured: true
  },
  {
    id: '2',
    title: 'Watercolor Landscape Painting',
    description: 'Original watercolor painting depicting serene mountain landscapes with vibrant colors.',
    price: 2500,
    image: 'https://previews.123rf.com/images/mindsparx/mindsparx2303/mindsparx230378671/201024677-watercolor-landscape-with-lake-trees-and-sunset-digital-painting.jpg',
    category: 'Paintings',
    seller: 'Artist Priya',
    rating: 4,
    reviews: 15,
    sustainable: true,
    featured: true
  },
  {
    id: '3',
    title: 'Ceramic Planters Set',
    description: 'Set of 3 handmade ceramic planters perfect for succulents and small plants.',
    price: 899,
    originalPrice: 1199,
    image: 'https://www.orangeskies.in/cdn/shop/files/IMG_1787.jpg?v=1716549473&width=1445',
    category: 'Home Décor',
    seller: 'Potter Raj',
    rating: 5,
    reviews: 31,
    sustainable: true,
    featured: false
  },
  {
    id: '4',
    title: 'Embroidered Wall Hanging',
    description: 'Traditional embroidered wall art featuring intricate patterns and vibrant threads.',
    price: 1599,
    image: 'https://shop.gaatha.com/image/catalog/Saath/29-chakla-embroidared-(1).jpg',
    category: 'Crafts',
    seller: 'Craftsman Arjun',
    rating: 4,
    reviews: 8,
    sustainable: false,
    featured: true
  },
  {
    id: '5',
    title: 'Silver Bracelet with Stones',
    description: 'Elegant silver bracelet adorned with natural semi-precious stones.',
    price: 2199,
    image: 'https://www.silberuh.com/cdn/shop/files/TurquoiseSilverBracelet1_1200x1200.jpg?v=1684398639',
    category: 'Jewelry',
    seller: 'Jeweler Kavya',
    rating: 5,
    reviews: 42,
    sustainable: true,
    featured: false
  },
  {
    id: '6',
    title: 'Abstract Canvas Art',
    description: 'Modern abstract painting on canvas with bold colors and dynamic brushstrokes.',
    price: 3200,
    image: 'https://muselot.in/cdn/shop/files/Ocean_and_fire_abstract_canvas_fabric_muselot_2048x.jpg?v=1725177063',
    category: 'Paintings',
    seller: 'Artist Neha',
    rating: 4,
    reviews: 19,
    sustainable: false,
    featured: true
  },
  {
    id: '7',
    title: 'Macrame Table Runner',
    description: 'Beautifully crafted macrame table runner made from organic cotton rope.',
    price: 799,
    originalPrice: 999,
    image: 'https://loomsmith.com/cdn/shop/products/loomsmith-macrame-table-runner-natural.png?v=1655967804',
    category: 'Home Décor',
    seller: 'Designer Meera',
    rating: 5,
    reviews: 27,
    sustainable: true,
    featured: false
  },
  {
    id: '8',
    title: 'Wooden Carved Elephant',
    description: 'Hand-carved wooden elephant sculpture with intricate details and natural finish.',
    price: 1399,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeqwitjymkXfbSsuLIl1PHqe7CWHTeFwlmaw&s',
    category: 'Crafts',
    seller: 'Woodcarver Sam',
    rating: 4,
    reviews: 12,
    sustainable: true,
    featured: true
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 5000],
    sustainableOnly: false
  });

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Sustainability filter
    if (filters.sustainableOnly) {
      filtered = filtered.filter(product => product.sustainable);
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, filters]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      setSearchQuery,
      setFilters,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};