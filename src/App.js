import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, PlusCircle, Heart, MapPin } from 'lucide-react';
import PlotsList from './components/PlotsList';
import PostPlot from './components/PostPlot';
import PlotDetails from './components/PlotDetails';
import Wishlist from './components/Wishlist';

// Create contexts for global state
const PlotsContext = createContext();
const WishlistContext = createContext();

// API base URL
const API_BASE_URL = 'http://localhost:8010/api';

function App() {
  const [plots, setPlots] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  // Fetch plots from backend
  const fetchPlots = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/plots`);
      if (response.ok) {
        const data = await response.json();
        setPlots(data);
      }
    } catch (error) {
      console.error('Error fetching plots:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist?userId=guest`);
      if (response.ok) {
        const data = await response.json();
        setWishlist(data.map(plot => plot.id));
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  // Add plot to backend
  const addPlot = async (plot) => {
    try {
      const response = await fetch(`${API_BASE_URL}/plots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plot),
      });
      if (response.ok) {
        const newPlot = await response.json();
        setPlots(prev => [newPlot, ...prev]);
        return newPlot;
      }
    } catch (error) {
      console.error('Error adding plot:', error);
    }
    return null;
  };

  // Toggle wishlist
  const toggleWishlist = async (plotId) => {
    try {
      const isCurrentlyInWishlist = wishlist.includes(plotId);
      const url = `${API_BASE_URL}/wishlist/${plotId}?userId=guest`;
      
      const response = await fetch(url, {
        method: isCurrentlyInWishlist ? 'DELETE' : 'POST',
      });
      
      if (response.ok) {
        setWishlist(prev => {
          if (isCurrentlyInWishlist) {
            return prev.filter(id => id !== plotId);
          } else {
            return [...prev, plotId];
          }
        });
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const isInWishlist = (plotId) => wishlist.includes(plotId);

  useEffect(() => {
    fetchPlots();
    fetchWishlist();
  }, []);

  return (
    <PlotsContext.Provider value={{ plots, addPlot, fetchPlots, loading, API_BASE_URL }}>
      <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, fetchWishlist }}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <Link to="/" className="flex items-center space-x-2">
                      <MapPin className="h-8 w-8 text-primary" />
                      <span className="text-2xl font-bold text-gray-900">PlotsCart</span>
                    </Link>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                      Browse Plots
                    </Link>
                    <Link to="/post" className="text-gray-700 hover:text-primary transition-colors">
                      Post Plot
                    </Link>
                    <Link to="/wishlist" className="text-gray-700 hover:text-primary transition-colors">
                      Wishlist ({wishlist.length})
                    </Link>
                  </nav>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<PlotsList />} />
                <Route path="/post" element={<PostPlot />} />
                <Route path="/plot/:id" element={<PlotDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
              <div className="flex justify-around items-center h-16">
                <Link
                  to="/"
                  className={`flex flex-col items-center space-y-1 ${
                    activeTab === 'home' ? 'text-primary' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('home')}
                >
                  <Home className="h-5 w-5" />
                  <span className="text-xs">Home</span>
                </Link>
                <Link
                  to="/post"
                  className={`flex flex-col items-center space-y-1 ${
                    activeTab === 'post' ? 'text-primary' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('post')}
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="text-xs">Post</span>
                </Link>
                <Link
                  to="/wishlist"
                  className={`flex flex-col items-center space-y-1 ${
                    activeTab === 'wishlist' ? 'text-primary' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-xs">Wishlist</span>
                </Link>
              </div>
            </nav>
          </div>
        </Router>
      </WishlistContext.Provider>
    </PlotsContext.Provider>
  );
}

export { PlotsContext, WishlistContext };
export default App; 