import React, { useState, useEffect } from 'react';

// --- Mock API Service ---
const mockApi = {
  get: (path) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (path.includes('/api/products/categories/')) {
          resolve({
            data: [
              { id: 'electronics', name: 'Electronics' },
              { id: 'furniture', name: 'Furniture' },
              { id: 'clothing', name: 'Clothing' },
              { id: 'books', name: 'Books' },
            ],
          });
        }
        if (path.includes('/api/products/')) {
          const allProducts = [
            { id: 1, name: 'Vintage Leather Jacket', price: '75.00', category: 'clothing', imageUrl: 'https://placehold.co/600x400/5a3a2a/ffffff?text=Jacket', seller: 'RetroWears' },
            { id: 2, name: 'Mid-Century Modern Armchair', price: '250.00', category: 'furniture', imageUrl: 'https://placehold.co/600x400/c2a58c/ffffff?text=Armchair', seller: 'TimelessDesigns' },
            { id: 3, name: 'Portable Bluetooth Speaker', price: '45.00', category: 'electronics', imageUrl: 'https://placehold.co/600x400/333333/ffffff?text=Speaker', seller: 'SoundWave' },
            { id: 4, name: 'Classic Sci-Fi Novel Set', price: '30.00', category: 'books', imageUrl: 'https://placehold.co/600x400/4a5568/ffffff?text=Books', seller: 'PageTurners' },
            { id: 5, name: 'Hand-knitted Wool Scarf', price: '25.00', category: 'clothing', imageUrl: 'https://placehold.co/600x400/7a527a/ffffff?text=Scarf', seller: 'CozyCreations' },
            { id: 6, name: 'Ergonomic Office Chair', price: '120.00', category: 'furniture', imageUrl: 'https://placehold.co/600x400/2d3748/ffffff?text=Chair', seller: 'WorkComfort' },
            { id: 7, name: 'Wireless Noise-Cancelling Headphones', price: '150.00', category: 'electronics', imageUrl: 'https://placehold.co/600x400/1a202c/ffffff?text=Headphones', seller: 'AudioPhile' },
            { id: 8, name: 'Hardcover Fantasy Trilogy', price: '55.00', category: 'books', imageUrl: 'https://placehold.co/600x400/8c6a56/ffffff?text=Trilogy', seller: 'EpicReads' },
          ];

          const params = new URLSearchParams(path.split('?')[1]);
          const search = params.get('search')?.toLowerCase() || '';
          const category = params.get('category') || '';
          const sort = params.get('sort') || '';
          const group = params.get('group') || '';

          let filteredProducts = allProducts.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(search);
            const matchesCategory = category ? p.category === category : true;
            return matchesSearch && matchesCategory;
          });

          // Sort functionality
          if (sort === 'price_asc') {
            filteredProducts = filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          } else if (sort === 'price_desc') {
            filteredProducts = filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          } else if (sort === 'newest') {
            filteredProducts = filteredProducts.sort((a, b) => b.id - a.id);
          } else if (sort === 'oldest') {
            filteredProducts = filteredProducts.sort((a, b) => a.id - b.id);
          }

          // Group By functionality (returns grouped array of arrays)
          if (group === 'category') {
            const grouped = {};
            filteredProducts.forEach(p => {
              if (!grouped[p.category]) grouped[p.category] = [];
              grouped[p.category].push(p);
            });
            filteredProducts = Object.values(grouped).flat();
          } else if (group === 'seller') {
            const grouped = {};
            filteredProducts.forEach(p => {
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

// --- ProductCard Component ---
const ProductCard = ({ product }) => {
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
      </div>
      <div className="p-5">
        <h3 className="truncate text-lg font-bold text-gray-800" title={product.name}>
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">Sold by {product.seller}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-black text-green-600">
            ${product.price}
          </p>
          <button className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Home Page Component ---
const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [groupBy, setGroupBy] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (search = '', category = '', sort = '', group = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (sort) params.append('sort', sort);
      if (group) params.append('group', group);

      const response = await mockApi.get(`/api/products/?${params}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await mockApi.get('/api/products/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm, selectedCategory, sortBy, groupBy);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchProducts(searchTerm, category, sortBy, groupBy);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    fetchProducts(searchTerm, selectedCategory, value, groupBy);
  };

  const handleGroupByChange = (e) => {
    const value = e.target.value;
    setGroupBy(value);
    fetchProducts(searchTerm, selectedCategory, sortBy, value);
  };

  const getCategoryName = (categoryId) => {
    if (!categoryId) return 'Latest Products';
    const category = categories.find(c => c.id === categoryId);
    return category ? `${category.name} Products` : 'Filtered Products';
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner Section */}
      <header className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Find Your Next Treasure
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-8">
            Discover unique second-hand items and give them a new life. Quality finds at unbeatable prices.
          </p>
           <div className="max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center bg-white rounded-full p-2 shadow-2xl">
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow w-full sm:w-auto px-6 py-3 text-black bg-white border-none rounded-full focus:outline-none focus:ring-0 text-center sm:text-left"
              />
              <button type="submit" className="w-full sm:w-auto mt-2 sm:mt-0 rounded-full bg-green-500 text-white px-8 py-3 font-semibold transition-transform duration-200 hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400">
                Search
              </button>
            </form>
            {/* Sort, Filter, Group By Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full">
              {/* Sort */}
              <div className="flex flex-col w-full sm:w-1/3">
                <label htmlFor="sort" className="text-sm font-medium mb-1 text-black">Sort</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full px-6 py-3 bg-white text-black border-none rounded-full shadow-2xl focus:outline-none"
                >
                  <option value="">Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
              {/* Filter (Category) */}
              <div className="flex flex-col w-full sm:w-1/3">
                <label htmlFor="category" className="text-sm font-medium mb-1 text-black">Filter</label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-6 py-3 bg-white text-black border-none rounded-full shadow-2xl focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Group By */}
              <div className="flex flex-col w-full sm:w-1/3">
                <label htmlFor="groupBy" className="text-sm font-medium mb-1 text-black">Group By</label>
                <select
                  id="groupBy"
                  value={groupBy}
                  onChange={handleGroupByChange}
                  className="w-full px-6 py-3 bg-white text-black border-none rounded-full shadow-2xl focus:outline-none"
                >
                  <option value="">None</option>
                  <option value="category">Category</option>
                  <option value="seller">Seller</option>
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
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
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
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow">
                <p className="text-xl text-gray-600">No products found.</p>
                <p className="text-gray-500 mt-2">Try adjusting your search or category filters.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;