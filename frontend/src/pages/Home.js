import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import ResponsiveSearchBar from '../components/SearcBar';
import ProductCard from '../components/ProductCard';
import api from '../services/api'; // Make sure this points to your actual API client

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState(""); // e.g., 'price_desc'
  const [groupBy, setGroupBy] = useState(""); // e.g., 'category'

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async (search, category, sort, group) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);

      // --- CHANGE 1: Translate sortBy to the 'ordering' parameter for DRF ---
      if (sort) {
        let orderingValue = "";
        switch (sort) {
          case "price_asc":
            orderingValue = "price";
            break;
          case "price_desc":
            orderingValue = "-price";
            break;
          case "newest":
            orderingValue = "-created_at";
            break;
          case "oldest":
            orderingValue = "created_at";
            break;
          default:
            break;
        }
        if (orderingValue) {
          params.append("ordering", orderingValue);
        }
      }

      // We don't send 'group' to the backend, it will be handled on the frontend
      // The backend uses 'api' now, not 'mockApi'
      const response = await api.get(`/api/products/?${params}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced effect for fetching data
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts(searchTerm, selectedCategory, sortBy);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCategory, sortBy]); // Removed groupBy from dependency array

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/products/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // --- CHANGE 2: Frontend Grouping Logic using useMemo for performance ---
  const groupedProducts = useMemo(() => {
    if (!groupBy) return null; // If no grouping, return null

    return products.reduce((acc, product) => {
      const key = groupBy === 'category' ? product.category_name : product.seller_name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(product);
      return acc;
    }, {});
  }, [products, groupBy]);

  // Handler functions remain mostly the same
  const handleSearch = (e) => { e.preventDefault(); /* Debounce handles this */ };
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleGroupByChange = (e) => setGroupBy(e.target.value);

  const getCategoryName = (categoryId) => {
    if (!categoryId) return "All Products";
    const category = categories.find((c) => c.id === parseInt(categoryId));
    return category ? category.name : "Filtered Products";
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          {/* Header content and search bar... */}
          <div className="max-w-xl mx-auto">
            <ResponsiveSearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {/* Sort */}
              <select id="sort" value={sortBy} onChange={handleSortChange} className="...">
                <option value="" className="text-black">Sort By (Newest)</option>
                <option value="price_asc" className="text-black">Price: Low to High</option>
                <option value="price_desc" className="text-black">Price: High to Low</option>
                <option value="newest" className="text-black">Newest</option>
                <option value="oldest" className="text-black">Oldest</option>
              </select>
              {/* Filter (Category) */}
              <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="...">
                <option value="" className="text-black">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="text-black">{category.name}</option>
                ))}
              </select>
              {/* Group By */}
              <select id="groupBy" value={groupBy} onChange={handleGroupByChange} className="...">
                <option value="" className="text-black">Don't Group</option>
                <option value="category" className="text-black">Group by Category</option>
                <option value="seller" className="text-black">Group by Seller</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {getCategoryName(selectedCategory)}
          </h2>
          {/* --- CHANGE 3: Removed the redundant category dropdown from the main section --- */}
        </div>

        {/* --- CHANGE 4: Updated Rendering Logic for Grouping --- */}
        {loading ? (
          <div className="text-center py-20"><p>Loading products...</p></div>
        ) : (
          <div>
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg shadow">
                <p className="text-xl text-gray-600">No products found.</p>
              </div>
            ) : groupedProducts ? (
              // Render grouped products
              Object.keys(groupedProducts).map(groupName => (
                <div key={groupName} className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-700 border-b-2 border-green-200 pb-2 mb-6">
                    {groupName}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {groupedProducts[groupName].map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Render flat list of products
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;