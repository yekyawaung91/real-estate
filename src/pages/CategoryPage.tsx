import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Home, Building, Building2, Grid3X3, Store, Warehouse } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';
import { useProperty } from '../context/PropertyContext';
import { useState, useEffect, useCallback } from 'react';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { properties, filters } = useProperty();
  const [showFilters, setShowFilters] = useState(false);

  const categoryConfig = {
    all: {
      title: 'All Properties',
      icon: Grid3X3,
      description: 'Browse through our complete collection of properties',
      color: 'text-gray-600'
    },
    house: {
      title: 'Houses',
      icon: Home,
      description: 'Discover beautiful houses and family homes',
      color: 'text-blue-600'
    },
    apartment: {
      title: 'Apartments',
      icon: Building,
      description: 'Find modern apartments and condominiums',
      color: 'text-emerald-600'
    },
    commercial: {
      title: 'Commercials',
      icon: Building2,
      description: 'Explore office spaces and commercial buildings',
      color: 'text-purple-600'
    },
    cabin: {
      title: 'Cabins',
      icon: Warehouse,
      description: 'Cozy wooden retreats ideal for nature getaways',
      color: 'text-yellow-600'
    },
    condominium: {
      title: 'Condominiums',
      icon: Building2,
      description: 'Modern shared-living units with city conveniences',
      color: 'text-red-600'
    },
    bungalow: {
      title: 'Bungalows',
      icon: Store,
      description: 'Single-story homes with charm and comfort',
      color: 'text-amber-600'
    }
  };

  const currentCategory = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.all;
  const Icon = currentCategory.icon;

  // Filter properties based on category
  const categoryProperties = category && category !== 'all' 
    ? properties.filter(p => p.type === category)
    : properties;

  // Apply additional filters
  const filteredProperties = categoryProperties.filter(property => {
    const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice;
    const matchesLocation = !filters.location || 
                           property.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesBedrooms = !filters.bedrooms || property.bedrooms >= filters.bedrooms;
    const matchesBathrooms = !filters.bathrooms || property.bathrooms >= filters.bathrooms;
    const matchesAmenities = !filters.amenities?.length || 
                            filters.amenities.every(amenity => property.amenities.includes(amenity));

    return matchesPrice && matchesLocation && matchesBedrooms && matchesBathrooms && matchesAmenities;
  });

  const otherCategories = Object.entries(categoryConfig).filter(([key]) => key !== category);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 dark:text-white font-medium">
              {currentCategory.title}
            </span>
          </div>

          {/* Category Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${currentCategory.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {currentCategory.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentCategory.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-600">
                {filteredProperties.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filteredProperties.length === 1 ? 'Property' : 'Properties'}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar showFilters={false} onToggleFilters={() => setShowFilters(true)} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Category Navigation */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Browse Other Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            {otherCategories.map(([key, config]) => {
              const CategoryIcon = config.icon;
              const count = key === 'all' 
                ? properties.length 
                : properties.filter(p => p.type === key).length;
              
              return (
                <Link
                  key={key}
                  to={`/category/${key}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all duration-200"
                >
                  <CategoryIcon className={`h-4 w-4 ${config.color}`} />
                  <span className="text-gray-700 dark:text-gray-300">{config.title}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Icon className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              No {currentCategory.title.toLowerCase()} found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search criteria or check back later for new listings
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setShowFilters(true)}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Adjust Filters
              </button>
              <Link
                to="/category/all"
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Browse All Properties
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
              </h2>
              
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors lg:hidden"
              >
                <span>Filters</span>
              </button>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        )}

        {/* Featured Section */}
        {filteredProperties.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Featured {currentCategory.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Premium properties handpicked by our experts
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties
                .filter(p => p.isFeatured)
                .slice(0, 3)
                .map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <FilterPanel isOpen={showFilters} onClose={() => setShowFilters(false)} />
    </div>
  );
};

export default CategoryPage;