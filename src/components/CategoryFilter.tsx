import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building, Building2, Grid3X3 } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

const CategoryFilter: React.FC = () => {
  const { filters, setFilters, properties } = useProperty();

  const categories = [
    {
      value: 'all',
      label: 'All Properties',
      icon: Grid3X3,
      count: properties.length
    },
    {
      value: 'house',
      label: 'Houses',
      icon: Home,
      count: properties.filter(p => p.type === 'house').length
    },
    {
      value: 'apartment',
      label: 'Apartments',
      icon: Building,
      count: properties.filter(p => p.type === 'apartment').length
    },
    {
      value: 'commercial',
      label: 'Commercial',
      icon: Building2,
      count: properties.filter(p => p.type === 'commercial').length
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
        Browse by Category
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = filters.type === (category.value === 'all' ? '' : category.value);
          
          return (
            <Link
              key={category.value}
              to={`/category/${category.value}`}
              className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                isActive
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md'
              } block`}
            >
              <div className="text-center">
                <div className={`inline-flex p-3 rounded-full mb-3 ${
                  isActive
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <h4 className={`font-semibold mb-1 ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-gray-800 dark:text-white'
                }`}>
                  {category.label}
                </h4>
                
                <p className={`text-sm ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {category.count} {category.count === 1 ? 'property' : 'properties'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;