import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: ''
  });
  const [profilePhoto, setProfilePhoto] = useState(user?.profile_photo || '');
  const [previewPhoto, setPreviewPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setFormData({
      username: user.username || '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      phone: user.phone || '',
      address: user.address || ''
    });
    setProfilePhoto(user.profile_photo || '');
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewPhoto(URL.createObjectURL(file));
      setProfilePhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (profilePhoto && profilePhoto instanceof File) {
        data.append('profile_photo', profilePhoto);
      }
      await api.patch('/api/auth/profile/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setErrors(error.response?.data || {});
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  // Base input classes for reuse
  const inputClasses = "w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg text-base transition duration-300 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white";
  const disabledInputClasses = "bg-gray-100 cursor-not-allowed text-gray-500";
  const labelClasses = "block mb-2 text-sm font-semibold text-gray-700";
  const errorMessageClasses = "bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-lg mt-2 font-medium text-sm shadow-md";
  const successMessageClasses = "bg-gradient-to-r from-green-500 to-green-400 text-white p-4 rounded-lg font-medium shadow-md";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-10 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
          {/* Profile Photo */}
          <div className="flex flex-col items-center mt-6">
            <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden border-4 border-green-500 shadow-lg flex items-center justify-center mb-4">
              <img
                src={
                  previewPhoto ||
                  profilePhoto && typeof profilePhoto === 'string'
                    ? profilePhoto
                    : user.profile_photo ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(user.first_name + " " + user.last_name)
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100
                  cursor-pointer"
              />
            </label>
            {errors.profile_photo && (
              <div className={errorMessageClasses}>{errors.profile_photo[0]}</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-10">
            {message &&
              <div className={`${successMessageClasses} mb-6`}>
                {message}
              </div>
            }

            {/* Account Information Section */}
            <div className="mb-10 pb-8 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Information</h3>

              <div className="mb-5">
                <label htmlFor="email" className={labelClasses}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  disabled
                  className={`${inputClasses} ${disabledInputClasses}`}
                />
                <small className="block mt-1.5 text-xs text-gray-500">Email cannot be changed</small>
              </div>

              <div className="mb-5">
                <label htmlFor="username" className={labelClasses}>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
                {errors.username && <div className={errorMessageClasses}>{errors.username[0]}</div>}
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-10 pb-8 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>

              <div className="grid md:grid-cols-2 md:gap-x-6">
                <div className="mb-5">
                  <label htmlFor="first_name" className={labelClasses}>First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  {errors.first_name && <div className={errorMessageClasses}>{errors.first_name[0]}</div>}
                </div>

                <div className="mb-5">
                  <label htmlFor="last_name" className={labelClasses}>Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  {errors.last_name && <div className={errorMessageClasses}>{errors.last_name[0]}</div>}
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={inputClasses}
                />
                {errors.phone && <div className={errorMessageClasses}>{errors.phone[0]}</div>}
              </div>

              <div className="mb-5">
                <label htmlFor="address" className={labelClasses}>Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your address"
                  className={inputClasses}
                />
                {errors.address && <div className={errorMessageClasses}>{errors.address[0]}</div>}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-green-500 to-green-600 hover:-translate-y-0.5 hover:shadow-xl shadow-lg font-semibold rounded-lg text-base px-6 py-4 text-center transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;