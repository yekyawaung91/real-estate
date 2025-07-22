import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, Calendar, 
  Phone, Mail, MessageCircle, Camera, Navigation, Shield, Car, Leaf, Wifi, Home
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import MortgageCalculator from '../components/MortgageCalculator';
import ContactModal from '../components/ContactModal';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById, favorites, toggleFavorite, properties } = useProperty();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const property = id ? getPropertyById(id) : null;

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Property not found
          </h2>
          <Link to="/" className="text-emerald-600 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(property.id);

  // Get similar properties
  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.type === property.type || p.location === property.location))
    .slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'Parking': <Car className="h-4 w-4" />,
    'Garden': <Leaf className="h-4 w-4" />,
    'Security': <Shield className="h-4 w-4" />,
    'High-speed Internet': <Wifi className="h-4 w-4" />,
    'Modern Kitchen': <Home className="h-4 w-4" />
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Navigation */}
        <div className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Properties</span>
            </Link>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          {/* Image controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 bg-black/50 rounded-full px-3 py-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            <button className="p-3 bg-white/80 backdrop-blur-sm text-gray-600 rounded-full hover:bg-white transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            
            <button className="p-3 bg-white/80 backdrop-blur-sm text-gray-600 rounded-full hover:bg-white transition-colors">
              <Camera className="h-5 w-5" />
            </button>
          </div>

          {/* Gallery count */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} of {property.images.length}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span className="text-lg">{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                      {formatPrice(property.price)}
                    </div>
                    <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {property.type}
                    </span>
                  </div>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  {property.bedrooms > 0 && (
                    <div className="text-center">
                      <Bed className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                    </div>
                  )}
                  <div className="text-center">
                    <Bath className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Square className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">{property.area}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">{property.yearBuilt}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Year Built</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Description</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {amenityIcons[amenity] || <Navigation className="h-4 w-4" />}
                      <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Location</h2>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">Interactive map will be integrated here</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Coordinates: {property.coordinates.lat}, {property.coordinates.lng}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Contact */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Contact Agent</h3>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-xl">
                      {property.agent.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{property.agent.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Licensed Real Estate Agent</p>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Now</span>
                  </a>
                  
                  <a
                    href={`https://wa.me/${property.agent.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                  
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </button>
                </div>
              </div>

              {/* Mortgage Calculator Toggle */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="w-full bg-amber-600 text-white px-4 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  {showCalculator ? 'Hide Calculator' : 'Calculate Mortgage'}
                </button>
              </div>

              {/* Mortgage Calculator */}
              {showCalculator && (
                <MortgageCalculator propertyPrice={property.price} />
              )}

              {/* Similar Properties */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Similar Properties</h3>
                <div className="space-y-4">
                  {similarProperties.map(similarProperty => (
                    <Link
                      key={similarProperty.id}
                      to={`/property/${similarProperty.id}`}
                      className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors"
                    >
                      <div className="flex space-x-3">
                        <img
                          src={similarProperty.images[0]}
                          alt={similarProperty.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 dark:text-white text-sm line-clamp-1">
                            {similarProperty.title}
                          </h4>
                          <p className="text-emerald-600 font-bold">
                            {formatPrice(similarProperty.price)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {similarProperty.location}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
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

export default PropertyDetails;