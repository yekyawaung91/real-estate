import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Search, Users, TrendingUp } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import CategoryFilter from '../components/CategoryFilter';
import { useProperty } from '../context/PropertyContext';

const HomePage: React.FC = () => {
  const { properties } = useProperty();
  
  // Get featured properties
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 3);
  const recentProperties = properties
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const stats = [
    { icon: Home, label: 'Properties Listed', value: '1,200+' },
    { icon: Users, label: 'Happy Customers', value: '850+' },
    { icon: Search, label: 'Cities Covered', value: '15+' },
    { icon: TrendingUp, label: 'Years Experience', value: '8+' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream Home
            <br />
            <span className="text-amber-300">in Myanmar</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            Discover the perfect property from our extensive collection of houses, apartments, 
            and commercial spaces across Myanmar's most desirable locations.
          </p>
          
          <div className="mb-8">
            <SearchBar />
          </div>

          <div className="mb-12">
            <CategoryFilter />
          </div>

          <Link
            to="/search"
            className="inline-flex items-center space-x-2 bg-amber-500 text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition-colors text-lg font-semibold"
          >
            <span>Browse All Properties</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <stat.icon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Handpicked premium properties that offer exceptional value and unique features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/search"
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <span>View All Featured Properties</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Recently Added
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Fresh listings from trusted agents and property owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream homes through our platform. 
            Start your property search today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Start Searching
            </Link>
            <button className="bg-emerald-700 text-white px-8 py-3 rounded-lg hover:bg-emerald-800 transition-colors font-semibold">
              Contact Agent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;