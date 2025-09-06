import React, { useState, useEffect } from 'react';
import ResponsiveSearchBar from '../components/SearcBar';
import ProductCard from '../components/ProductCard';

// --- Mock API Service ---
const mockApi = {
  get: (path) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (path.includes("/api/products/categories/")) {
          resolve({
            data: [
              { id: "electronics", name: "Electronics" },
              { id: "furniture", name: "Furniture" },
              { id: "clothing", name: "Clothing" },
              { id: "books", name: "Books" },
            ],
          });
        }
        if (path.includes("/api/products/")) {
          const allProducts = [
            {
              id: 1,
              title: 'Vintage Leather Jacket',
              name: 'Vintage Leather Jacket',
              price: '75.00',
              category: 'clothing',
              category_name: 'Clothing',
              primary_image: 'https://placehold.co/600x400/5a3a2a/ffffff?text=Jacket',
              seller: 'RetroWears',
              seller_name: 'RetroWears',
              condition: 'good'
            },
            {
              id: 2,
              title: 'Mid-Century Modern Armchair',
              name: 'Mid-Century Modern Armchair',
              price: '250.00',
              category: 'furniture',
              category_name: 'Furniture',
              primary_image: 'https://placehold.co/600x400/c2a58c/ffffff?text=Armchair',
              seller: 'TimelessDesigns',
              seller_name: 'TimelessDesigns',
              condition: 'excellent'
            },
            {
              id: 3,
              title: 'Portable Bluetooth Speaker',
              name: 'Portable Bluetooth Speaker',
              price: '45.00',
              category: 'electronics',
              category_name: 'Electronics',
              primary_image: 'https://placehold.co/600x400/333333/ffffff?text=Speaker',
              seller: 'SoundWave',
              seller_name: 'SoundWave',
              condition: 'like-new'
            },
            {
              id: 4,
              title: 'Classic Sci-Fi Novel Set',
              name: 'Classic Sci-Fi Novel Set',
              price: '30.00',
              category: 'books',
              category_name: 'Books',
              primary_image: 'https://placehold.co/600x400/4a5568/ffffff?text=Books',
              seller: 'PageTurners',
              seller_name: 'PageTurners',
              condition: 'good'
            },
            {
              id: 5,
              title: 'Hand-knitted Wool Scarf',
              name: 'Hand-knitted Wool Scarf',
              price: '25.00',
              category: 'clothing',
              category_name: 'Clothing',
              primary_image: 'https://placehold.co/600x400/7a527a/ffffff?text=Scarf',
              seller: 'CozyCreations',
              seller_name: 'CozyCreations',
              condition: 'excellent'
            },
            {
              id: 6,
              title: 'Ergonomic Office Chair',
              name: 'Ergonomic Office Chair',
              price: '120.00',
              category: 'furniture',
              category_name: 'Furniture',
              primary_image: 'https://placehold.co/600x400/2d3748/ffffff?text=Chair',
              seller: 'WorkComfort',
              seller_name: 'WorkComfort',
              condition: 'good'
            },
            {
              id: 7,
              title: 'Wireless Noise-Cancelling Headphones',
              name: 'Wireless Noise-Cancelling Headphones',
              price: '150.00',
              category: 'electronics',
              category_name: 'Electronics',
              primary_image: 'https://placehold.co/600x400/1a202c/ffffff?text=Headphones',
              seller: 'AudioPhile',
              seller_name: 'AudioPhile',
              condition: 'like-new'
            },
            {
              id: 8,
              title: 'Hardcover Fantasy Trilogy',
              name: 'Hardcover Fantasy Trilogy',
              price: '55.00',
              category: 'books',
              category_name: 'Books',
              primary_image: 'https://placehold.co/600x400/8c6a56/ffffff?text=Trilogy',
              seller: 'EpicReads',
              seller_name: 'EpicReads',
              condition: 'excellent'
            },
          ];

          const params = new URLSearchParams(path.split("?")[1]);
          const search = params.get("search")?.toLowerCase() || "";
          const category = params.get("category") || "";
          const sort = params.get("sort") || "";
          const group = params.get("group") || "";

          let filteredProducts = allProducts.filter(p => {
            const matchesSearch = search ?
              (p.title.toLowerCase().includes(search) ||
                p.category_name.toLowerCase().includes(search) ||
                p.seller_name.toLowerCase().includes(search)) : true;
            const matchesCategory = category ? p.category === category : true;
            return matchesSearch && matchesCategory;
          });

          // Sort functionality
          if (sort === "price_asc") {
            filteredProducts = filteredProducts.sort(
              (a, b) => parseFloat(a.price) - parseFloat(b.price)
            );
          } else if (sort === "price_desc") {
            filteredProducts = filteredProducts.sort(
              (a, b) => parseFloat(b.price) - parseFloat(a.price)
            );
          } else if (sort === "newest") {
            filteredProducts = filteredProducts.sort((a, b) => b.id - a.id);
          } else if (sort === "oldest") {
            filteredProducts = filteredProducts.sort((a, b) => a.id - b.id);
          }

          // Group By functionality (returns grouped array of arrays)
          if (group === "category") {
            const grouped = {};
            filteredProducts.forEach((p) => {
              if (!grouped[p.category]) grouped[p.category] = [];
              grouped[p.category].push(p);
            });
            filteredProducts = Object.values(grouped).flat();
          } else if (group === "seller") {
            const grouped = {};
            filteredProducts.forEach((p) => {
              if (!grouped[p.seller]) grouped[p.seller] = [];
              grouped[p.seller].push(p);
            });
            filteredProducts = Object.values(grouped).flat();
          }

          resolve({ data: filteredProducts });
        }
      }, 800); // Simulate network delay
    });
  },
};

// --- Home Page Component ---
const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [groupBy, setGroupBy] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (
    search = "",
    category = "",
    sort = "",
    group = ""
  ) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (sort) params.append("sort", sort);
      if (group) params.append("group", group);

      const response = await mockApi.get(`/api/products/?${params}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await mockApi.get("/api/products/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts(searchTerm, selectedCategory, sortBy, groupBy);
    }, 300); // Debounce to avoid searching on every keystroke

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCategory, sortBy, groupBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm, selectedCategory, sortBy, groupBy);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
  };

  const handleGroupByChange = (e) => {
    const value = e.target.value;
    setGroupBy(value);
  };

  const getCategoryName = (categoryId) => {
    if (!categoryId) return "Latest Products";
    const category = categories.find((c) => c.id === categoryId);
    return category ? `${category.name} Products` : "Filtered Products";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner Section */}
      <header className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Find Your Next Treasure
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-8">
            Discover unique second-hand items and give them a new life. Quality
            finds at unbeatable prices.
          </p>
          <div className="max-w-xl mx-auto">
            <ResponsiveSearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
            />
            {/* Sort, Filter, Group By Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {/* Sort */}
              <div className="relative">
                <select id="sort" value={sortBy} onChange={handleSortChange} className="w-full px-4 py-3 bg-white/20 text-white border-none rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none">
                  <option value="" className="text-black">Sort By</option>
                  <option value="price_asc" className="text-black">Price: Low to High</option>
                  <option value="price_desc" className="text-black">Price: High to Low</option>
                  <option value="newest" className="text-black">Newest</option>
                  <option value="oldest" className="text-black">Oldest</option>
                </select>
              </div>
              {/* Filter (Category) */}
              <div className="relative">
                <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="w-full px-4 py-3 bg-white/20 text-white border-none rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none">
                  <option value="" className="text-black">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id} className="text-black">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Group By */}
              <div className="relative">
                <select id="groupBy" value={groupBy} onChange={handleGroupByChange} className="w-full px-4 py-3 bg-white/20 text-white border-none rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none">
                  <option value="" className="text-black">Group By</option>
                  <option value="category" className="text-black">Category</option>
                  <option value="seller" className="text-black">Seller</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter and Title */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            {getCategoryName(selectedCategory)}
          </h2>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="appearance-none w-56 bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 leading-tight focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Products Grid or Loading/Empty State */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <div>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow">
                <p className="text-xl text-gray-600">No products found.</p>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or category filters.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
