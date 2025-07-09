import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, MessageCircle, Trash2 } from 'lucide-react';
import { PlotsContext, WishlistContext } from '../App';

const Wishlist = () => {
  const { API_BASE_URL } = useContext(PlotsContext);
  const { wishlist, toggleWishlist, fetchWishlist } = useContext(WishlistContext);
  const [wishlistPlots, setWishlistPlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistPlots();
  }, [wishlist]);

  const fetchWishlistPlots = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist?userId=guest`);
      if (response.ok) {
        const data = await response.json();
        setWishlistPlots(data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleRemoveFromWishlist = async (plotId) => {
    await toggleWishlist(plotId);
    // Refresh wishlist after removal
    fetchWishlistPlots();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          {wishlistPlots.length > 0 
            ? `You have ${wishlistPlots.length} plot${wishlistPlots.length !== 1 ? 's' : ''} in your wishlist`
            : 'Your wishlist is empty'
          }
        </p>
      </div>

      {/* Wishlist Content */}
      {wishlistPlots.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-6">
            Start browsing plots and add your favorites to your wishlist!
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Plots
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {wishlistPlots.map((plot) => (
            <div key={plot.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
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
                
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(plot.id)}
                  className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Image Count */}
                {plot.images && plot.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {plot.images.length} photos
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 pr-2">
                    {plot.title}
                  </h3>
                  <span className="text-lg font-bold text-primary whitespace-nowrap">
                    {plot.price}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{plot.location}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Size:</span> {plot.dimensions}
                    </div>
                    <div>
                      <span className="font-medium">Owner:</span> {plot.ownerName}
                    </div>
                  </div>
                </div>

                {plot.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {plot.description}
                  </p>
                )}

                <div className="text-xs text-gray-500 mb-4">
                  Posted: {formatDate(plot.postedDate)}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    to={`/plot/${plot.id}`}
                    className="col-span-3 sm:col-span-1 bg-primary text-white text-center py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <a
                    href={`tel:${plot.phoneNumber}`}
                    className="flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    title="Call"
                  >
                    <Phone className="h-4 w-4 text-gray-600" />
                  </a>
                  <a
                    href={getWhatsAppLink(plot)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
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

      {/* Wishlist Actions */}
      {wishlistPlots.length > 0 && (
        <div className="text-center pt-6 border-t">
          <p className="text-gray-600 mb-4">
            Found the perfect plot? Contact the owner directly!
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-blue-50 transition-colors mr-4"
          >
            Continue Browsing
          </Link>
          <Link
            to="/post"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post Your Plot
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist; 