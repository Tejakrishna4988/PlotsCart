import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, MapPin, Phone, MessageCircle, ChevronLeft, ChevronRight, ArrowLeft, Calendar, User, Ruler } from 'lucide-react';
import { PlotsContext, WishlistContext } from '../App';

const PlotDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_BASE_URL } = useContext(PlotsContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlotDetails();
  }, [id]);

  const fetchPlotDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/plots/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPlot(data);
      } else if (response.status === 404) {
        setError('Plot not found');
      } else {
        setError('Failed to load plot details');
      }
    } catch (error) {
      console.error('Error fetching plot details:', error);
      setError('An error occurred while loading plot details');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (plot?.images && plot.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % plot.images.length);
    }
  };

  const prevImage = () => {
    if (plot?.images && plot.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + plot.images.length) % plot.images.length);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWhatsAppLink = () => {
    if (!plot) return '#';
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

  if (error || !plot) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            {error || 'Plot not found'}
          </h3>
          <p className="text-red-600 mb-4">
            The plot you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Carousel */}
        <div className="relative h-96 bg-gray-200">
          {plot.images && plot.images.length > 0 ? (
            <>
              <img
                src={plot.images[currentImageIndex]}
                alt={`${plot.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop';
                }}
              />

              {/* Navigation Arrows */}
              {plot.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {plot.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {plot.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full">
                {currentImageIndex + 1} / {plot.images.length}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MapPin className="h-16 w-16 text-gray-400" />
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(plot.id)}
            className="absolute top-4 left-4 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Heart
              className={`h-6 w-6 ${
                isInWishlist(plot.id) ? 'text-red-500 fill-current' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{plot.title}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{plot.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Posted on {formatDate(plot.postedDate)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{plot.price}</div>
              <div className="text-sm text-gray-500">Total Price</div>
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Ruler className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Dimensions</h3>
              <p className="text-gray-600">{plot.dimensions}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <User className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Owner</h3>
              <p className="text-gray-600">{plot.ownerName}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <MapPin className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
              <p className="text-gray-600">{plot.location}</p>
            </div>
          </div>

          {/* Description */}
          {plot.description && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {plot.description}
                </p>
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Owner</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <User className="h-6 w-6 text-primary mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">{plot.ownerName}</h3>
                  <p className="text-gray-600">Plot Owner</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`tel:${plot.phoneNumber}`}
                  className="flex items-center justify-center space-x-3 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">Call {plot.phoneNumber}</span>
                </a>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">WhatsApp Chat</span>
                </a>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Contact the owner directly to inquire about this plot
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotDetails; 