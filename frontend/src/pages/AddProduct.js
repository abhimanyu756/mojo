import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    condition: '',
    yearOfManufacture: '',
    brand: '',
    model: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    material: '',
    color: '',
    originalPackaging: false,
    manualIncluded: false,
    workingConditionDescription: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Cleanup preview URL on component unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Add a new Product</h1>
          <p className="text-gray-600">Share your item with the EcoFinds community</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">Product Images</h3>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-gray-800">Product Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:border-green-500 hover:bg-green-50 transition-colors duration-300 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer block w-full">
                    {imagePreview ? (
                      <div className="relative w-full h-48 overflow-hidden rounded-lg">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 text-white">
                          <div className="text-2xl mb-2">📷</div>
                          <p className="text-sm font-medium mb-1">Click to change image</p>
                          <div className="text-xs opacity-80">
                            <small>{formData.image?.name}</small>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8">
                        <div className="text-4xl mb-4">📷</div>
                        <h4 className="text-lg font-medium text-gray-800 mb-2">Add product</h4>
                        <p className="text-gray-600 mb-4">Image</p>
                        <div className="text-gray-500 text-xs">
                          <small>Tips: Use good lighting and show multiple angles</small>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">Basic Information</h3>

              <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-800">Product Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a descriptive title for your item"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-semibold text-gray-800">Product Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Enter product category"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="condition" className="block mb-2 text-sm font-semibold text-gray-800">Condition</label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block mb-2 text-sm font-semibold text-gray-800">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block mb-2 text-sm font-semibold text-gray-800">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="1"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">Product Details</h3>

              <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-800">Product Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe your item in detail. Include any flaws, special features, or history."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="brand" className="block mb-2 text-sm font-semibold text-gray-800">Brand</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Enter brand name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="model" className="block mb-2 text-sm font-semibold text-gray-800">Model</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="Enter model number/name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="yearOfManufacture" className="block mb-2 text-sm font-semibold text-gray-800">Year of Manufacture (if applicable)</label>
                <input
                  type="number"
                  id="yearOfManufacture"
                  name="yearOfManufacture"
                  value={formData.yearOfManufacture}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="e.g. 2020"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="material" className="block mb-2 text-sm font-semibold text-gray-800">Material</label>
                  <input
                    type="text"
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    placeholder="e.g. Wood, Metal, Plastic"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="color" className="block mb-2 text-sm font-semibold text-gray-800">Color</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="Primary color"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">Dimensions & Weight</h3>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-gray-800">Dimensions (Length, Width, Height)</label>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    name="length"
                    placeholder="Length (cm)"
                    value={formData.length}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                  />
                  <input
                    type="number"
                    name="width"
                    placeholder="Width (cm)"
                    value={formData.width}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                  />
                  <input
                    type="number"
                    name="height"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="weight" className="block mb-2 text-sm font-semibold text-gray-800">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  placeholder="Weight in kilograms"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">Additional Information</h3>

              <div className="mb-4">
                <div className="flex items-start gap-2 mb-3">
                  <input
                    type="checkbox"
                    id="originalPackaging"
                    name="originalPackaging"
                    checked={formData.originalPackaging}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <label htmlFor="originalPackaging" className="text-sm font-normal text-gray-700 cursor-pointer leading-5">
                    Original Packaging (Checkbox - implies a boolean field)
                  </label>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="manualIncluded"
                    name="manualIncluded"
                    checked={formData.manualIncluded}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <label htmlFor="manualIncluded" className="text-sm font-normal text-gray-700 cursor-pointer leading-5">
                    Manual/Instructions Included (Checkbox - implies a boolean field)
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="workingConditionDescription" className="block mb-2 text-sm font-semibold text-gray-800">Working Condition Description</label>
                <textarea
                  id="workingConditionDescription"
                  name="workingConditionDescription"
                  value={formData.workingConditionDescription}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe the current working condition, any issues, repairs needed, etc."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white focus:shadow-sm transition-all duration-300"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-lg text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;