import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square, Phone, Mail, MessageCircle, Star, Eye } from 'lucide-react';
import { useProperty, Property } from '../context/PropertyContext';
import ContactModal from './ContactModal';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { favorites, toggleFavorite } = useProperty();
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isFavorite = favorites.includes(property.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Image Gallery */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Image indicators */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Featured badge */}
          {property.isFeatured && (
            <div className="absolute top-4 left-4 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>Featured</span>
            </div>
          )}

          {/* Favorite button */}
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Views indicator */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{property.views}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price and Location */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                {formatPrice(property.price)}
              </h3>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>
            <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded-full text-xs font-medium capitalize">
              {property.type}
            </span>
          </div>

          {/* Title */}
          <Link to={`/property/${property.id}`}>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors line-clamp-2">
              {property.title}
            </h4>
          </Link>

          {/* Property details */}
          <div className="flex items-center space-x-4 mb-4 text-gray-600 dark:text-gray-400">
            {property.bedrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bed className="h-4 w-4" />
                <span className="text-sm">{property.bedrooms}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="h-4 w-4" />
              <span className="text-sm">{property.area} sqft</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-gray-500 text-xs">+{property.amenities.length - 3} more</span>
              )}
            </div>
          </div>

          {/* Agent info */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{property.agent.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={`tel:${property.agent.phone}`}
                className="p-2 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full transition-colors"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${property.agent.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900 rounded-full transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <button
                onClick={() => setShowContactModal(true)}
                className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full transition-colors"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        property={property}
      />
    </>
  );
};

export default PropertyCard;