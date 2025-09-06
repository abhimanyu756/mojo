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
    <div className="container">
      <div className="add-product-container">
        <div className="add-product-header">
          <h1>Add a new Product</h1>
          <p>Share your item with the EcoFinds community</p>
        </div>

        <div className="add-product-form-container">
          <form onSubmit={handleSubmit} className="add-product-form">
            <div className="form-section">
              <h3>Product Images</h3>

              <div className="form-group">
  <label>Product Images</label>
  <div className="image-upload-placeholder">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      style={{ display: 'none' }}
      id="image-upload"
    />
    <label htmlFor="image-upload" className="cursor-pointer block w-full">
      {imagePreview ? (
        <div className="relative w-full h-48 overflow-hidden rounded-lg">
          <img
            src={imagePreview}
            alt="Product preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="text-2xl mb-2">📷</div>
            <p className="text-white text-sm mb-2">Click to change image</p>
            <div className="text-white text-xs">
              <small>{formData.image?.name}</small>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
          <div className="text-4xl mb-4">📷</div>
          <h4 className="text-lg font-medium mb-1">Add product</h4>
          <p className="text-gray-600 mb-4">Image</p>
          <div className="text-gray-500">
            <small>Tips: Use good lighting and show multiple angles</small>
          </div>
        </div>
      )}
    </label>
  </div>
</div>
</div>

            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-group">
                <label htmlFor="title">Product Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a descriptive title for your item"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Product Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Enter product category"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="condition">Condition</label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
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

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="1"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Product Details</h3>

              <div className="form-group">
                <label htmlFor="description">Product Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe your item in detail. Include any flaws, special features, or history."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Enter brand name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="model">Model</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="Enter model number/name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="yearOfManufacture">Year of Manufacture (if applicable)</label>
                <input
                  type="number"
                  id="yearOfManufacture"
                  name="yearOfManufacture"
                  value={formData.yearOfManufacture}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="e.g. 2020"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="material">Material</label>
                  <input
                    type="text"
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    placeholder="e.g. Wood, Metal, Plastic"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="Primary color"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Dimensions & Weight</h3>

              <div className="form-group">
                <label>Dimensions (Length, Width, Height)</label>
                <div className="form-row">
                  <input
                    type="number"
                    name="length"
                    placeholder="Length (cm)"
                    value={formData.length}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                  />
                  <input
                    type="number"
                    name="width"
                    placeholder="Width (cm)"
                    value={formData.width}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                  />
                  <input
                    type="number"
                    name="height"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  placeholder="Weight in kilograms"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Additional Information</h3>

              <div className="form-group">
                <div className="checkbox-group" style={{ marginBottom: '12px' }}>
                  <input
                    type="checkbox"
                    id="originalPackaging"
                    name="originalPackaging"
                    checked={formData.originalPackaging}
                    onChange={handleInputChange}
                    style={{ marginRight: '8px' }}
                  />
                  <label htmlFor="originalPackaging" style={{ margin: 0, fontWeight: 'normal', cursor: 'pointer' }}>
                    Original Packaging
                  </label>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="manualIncluded"
                    name="manualIncluded"
                    checked={formData.manualIncluded}
                    onChange={handleInputChange}
                    style={{ marginRight: '8px' }}
                  />
                  <label htmlFor="manualIncluded" style={{ margin: 0, fontWeight: 'normal', cursor: 'pointer' }}>
                    Manual/Instructions Included
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="workingConditionDescription">Working Condition Description</label>
                <textarea
                  id="workingConditionDescription"
                  name="workingConditionDescription"
                  value={formData.workingConditionDescription}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe the current working condition, any issues, repairs needed, etc."
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary create-listing-btn"
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