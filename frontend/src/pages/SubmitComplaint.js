import React, { useState } from 'react';
import axios from 'axios';
import { FaFileAlt, FaUpload, FaCheck, FaExclamationTriangle, FaSpinner, FaHome, FaBook, FaBuilding, FaArchive, FaQuestion } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SubmitComplaint({ user, handleLogout }) {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'hostel', label: 'Hostel', icon: FaHome },
    { value: 'academics', label: 'Academics', icon: FaBook },
    { value: 'infrastructure', label: 'Infrastructure', icon: FaBuilding },
    { value: 'library', label: 'Library', icon: FaArchive },
    { value: 'other', label: 'Other', icon: FaQuestion },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('category', category);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }

      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/complaints', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Complaint submitted successfully! ✓ We will review it shortly.');
      setCategory('');
      setDescription('');
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <FaFileAlt className="text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">File a Complaint</h1>
              <p className="text-gray-600">Help us improve by reporting issues</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6 flex items-center space-x-3 animate-shake">
            <FaExclamationTriangle className="text-2xl flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-2xl mb-6 flex items-center space-x-3 animate-pulse">
            <FaCheck className="text-2xl flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category Selection */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                Complaint Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <label
                      key={cat.value}
                      className={`relative cursor-pointer p-4 rounded-2xl border-2 transition transform hover:scale-105 flex flex-col items-center ${
                        category === cat.value
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={category === cat.value}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="hidden"
                      />
                      <Icon className={`text-2xl mb-2 ${category === cat.value ? 'text-blue-600' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium ${category === cat.value ? 'text-blue-600' : 'text-gray-700'}`}>
                        {cat.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-3">
                Complaint Details
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="6"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition bg-gray-50 hover:bg-white"
                placeholder="Please describe your complaint in detail. Include specific details like location, date, time, and any relevant information..."
              />
              <p className="text-gray-500 text-sm mt-2">{description.length}/500 characters</p>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-3">
                Upload Evidence (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                  id="file-input"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <label
                  htmlFor="file-input"
                  className="block border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition bg-gray-50"
                >
                  <FaUpload className="text-4xl text-blue-500 mx-auto mb-3" />
                  <p className="text-gray-700 font-semibold">Click to upload or drag and drop</p>
                  <p className="text-gray-500 text-sm">PNG, JPG, PDF, DOC up to 10MB</p>
                  {image && (
                    <p className="text-green-600 font-bold mt-2 flex items-center justify-center space-x-1">
                      <FaCheck /> {image.name}
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition transform hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center space-x-2 text-lg"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FaFileAlt />
                  <span>Submit Complaint</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <p className="text-blue-900 font-semibold flex items-center space-x-2">
            <span>ℹ️</span>
            <span>Your complaint will be reviewed by the administration team and you'll receive updates via notifications.</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}

export default SubmitComplaint;
