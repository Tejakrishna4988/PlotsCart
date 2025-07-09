import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, MessageCircle, Search, Filter } from 'lucide-react';
import { PlotsContext, WishlistContext } from '../App';

const PlotsList = () => {
  const { plots, loading, API_BASE_URL } = useContext(PlotsContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlots, setFilteredPlots] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredPlots([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${API_BASE_URL}/plots?search=${encodeURIComponent(searchTerm)}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredPlots(data);
      }
    } catch (error) {
      console.error('Error searching plots:', error);
    }
    setIsSearching(false);
  };

  const displayPlots = searchTerm.trim() ? filteredPlots : plots;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getWhatsAppLink = (plot) => {
    const message = `Hi, I'm interested in your plot: ${plot.title}`;
    return `https://wa.me/91${plot.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Plot</h1>
        <p className="text-gray-600">Discover amazing plots for sale across India</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex">
            <input
              type="text"
              placeholder="Search by location, title, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 bg-primary text-white rounded-r-lg hover:bg-blue-700 focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>
        {searchTerm && (
          <div className="mt-2 text-sm text-gray-600">
            {displayPlots.length} result{displayPlots.length !== 1 ? 's' : ''} found for "{searchTerm}"
            <button
              onClick={() => {
                setSearchTerm('');
                setFilteredPlots([]);
                setIsSearching(false);
              }}
              className="ml-2 text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Plots Grid */}
      {displayPlots.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No plots found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search terms.' : 'Be the first to post a plot!'}
          </p>
          <Link
            to="/post"
            className="mt-4 inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            Post Your Plot
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPlots.map((plot) => (
            <div key={plot.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image Carousel */}
              <div className="relative h-48 bg-gray-200">
                {plot.images && plot.images.length > 0 ? (
                  <img
                    src={plot.images[0]}
                    alt={plot.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(plot.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isInWishlist(plot.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>

                {/* Image Count */}
                {plot.images && plot.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    1/{plot.images.length}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {plot.title}
                  </h3>
                  <span className="text-lg font-bold text-primary ml-2">
                    {plot.price}
                  </span>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {plot.location}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Dimensions:</span> {plot.dimensions}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Owner:</span> {plot.ownerName}
                  </div>
                </div>

                {plot.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {plot.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>Posted: {formatDate(plot.postedDate)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`/plot/${plot.id}`}
                    className="flex-1 bg-primary text-white text-center py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <a
                    href={`tel:${plot.phoneNumber}`}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    title="Call"
                  >
                    <Phone className="h-4 w-4 text-gray-600" />
                  </a>
                  <a
                    href={getWhatsAppLink(plot)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlotsList; 