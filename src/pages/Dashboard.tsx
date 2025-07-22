import React, { useState } from 'react';
import { Heart, Eye, Calendar, Plus, Edit, Trash2, BarChart3 } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { useProperty } from '../context/PropertyContext';
import { useUser } from '../context/UserContext';

const Dashboard: React.FC = () => {
  const { properties, favorites } = useProperty();
  const { user, isAgent } = useUser();
  const [activeTab, setActiveTab] = useState<'favorites' | 'listings' | 'stats'>('favorites');

  // Get favorite properties
  const favoriteProperties = properties.filter(property => 
    favorites.includes(property.id)
  );

  // Mock agent properties (in real app, filter by agent ID)
  const agentProperties = properties.slice(0, 2);

  const stats = {
    totalListings: agentProperties.length,
    totalViews: agentProperties.reduce((sum, p) => sum + p.views, 0),
    totalInquiries: 45,
    avgPrice: agentProperties.reduce((sum, p) => sum + p.price, 0) / agentProperties.length
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Please log in to access your dashboard
          </h2>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isAgent ? 'Manage your property listings and track performance' : 'Manage your saved properties and search history'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-lg mb-8 shadow-sm">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 px-4 py-3 rounded-md transition-colors flex items-center justify-center space-x-2 ${
              activeTab === 'favorites'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Heart className="h-4 w-4" />
            <span>Saved Properties</span>
          </button>
          
          {isAgent && (
            <>
              <button
                onClick={() => setActiveTab('listings')}
                className={`flex-1 px-4 py-3 rounded-md transition-colors flex items-center justify-center space-x-2 ${
                  activeTab === 'listings'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Edit className="h-4 w-4" />
                <span>My Listings</span>
              </button>
              
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex-1 px-4 py-3 rounded-md transition-colors flex items-center justify-center space-x-2 ${
                  activeTab === 'stats'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </button>
            </>
          )}
        </div>

        {/* Content */}
        {activeTab === 'favorites' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Saved Properties ({favoriteProperties.length})
              </h2>
            </div>

            {favoriteProperties.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  No saved properties yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start browsing and save properties you're interested in
                </p>
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Browse Properties
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        )}

        {isAgent && activeTab === 'listings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                My Listings ({agentProperties.length})
              </h2>
              <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add New Property</span>
              </button>
            </div>

            <div className="space-y-6">
              {agentProperties.map(property => (
                <div key={property.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {property.title}
                        </h3>
                        <p className="text-emerald-600 font-bold">
                          {formatCurrency(property.price)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Eye className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                      <div className="text-sm font-semibold text-gray-800 dark:text-white">
                        {property.views}
                      </div>
                      <div className="text-xs text-gray-500">Views</div>
                    </div>
                    <div>
                      <Heart className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                      <div className="text-sm font-semibold text-gray-800 dark:text-white">
                        12
                      </div>
                      <div className="text-xs text-gray-500">Favorites</div>
                    </div>
                    <div>
                      <Calendar className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                      <div className="text-sm font-semibold text-gray-800 dark:text-white">
                        5
                      </div>
                      <div className="text-xs text-gray-500">Inquiries</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isAgent && activeTab === 'stats' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Analytics Overview
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Listings</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {stats.totalListings}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                    <Edit className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {stats.totalViews}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Inquiries</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {stats.totalInquiries}
                    </p>
                  </div>
                  <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
                    <Calendar className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Price</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {formatCurrency(stats.avgPrice)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Views Over Time
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">Chart visualization will be integrated here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;