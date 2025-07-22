import React, { createContext, useContext, useState } from 'react';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'house' | 'apartment' | 'commercial' | 'cabin' | 'condominium' | 'bungalow';
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  description: string;
  images: string[];
  amenities: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  isFeatured: boolean;
  views: number;
  createdAt: string;
}

interface Filters {
  type: string;
  minPrice: number;
  maxPrice: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
}

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  filters: Filters;
  favorites: string[];
  searchQuery: string;
  sortBy: string;
  setFilters: (filters: Partial<Filters>) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  toggleFavorite: (propertyId: string) => void;
  getPropertyById: (id: string) => Property | undefined;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Villa with Garden',
      price: 450000,
      location: 'Yangon, Myanmar',
      type: 'house',
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      yearBuilt: 2020,
      description: 'Beautiful modern villa with spacious garden and premium finishes. Located in a quiet residential area with easy access to schools and shopping centers.',
      images: [
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['Garden', 'Parking', 'Security', 'Modern Kitchen'],
      agent: {
        name: 'Thant Zin',
        phone: '+95912345678',
        email: 'thant@realestate.mm',
        whatsapp: '+95912345678'
      },
      coordinates: { lat: 16.8661, lng: 96.1951 },
      isFeatured: true,
      views: 245,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Downtown Luxury Apartment',
      price: 320000,
      location: 'Mandalay, Myanmar',
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      yearBuilt: 2019,
      description: 'Luxury apartment in the heart of downtown with stunning city views. Modern amenities and close to business district.',
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['City View', 'Gym', 'Pool', 'Concierge'],
      agent: {
        name: 'Khin Myo',
        phone: '+95987654321',
        email: 'khin@realestate.mm',
        whatsapp: '+95987654321'
      },
      coordinates: { lat: 21.9588, lng: 96.0891 },
      isFeatured: false,
      views: 189,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'Commercial Office Space',
      price: 850000,
      location: 'Yangon, Myanmar',
      type: 'commercial',
      bedrooms: 0,
      bathrooms: 4,
      area: 5000,
      yearBuilt: 2018,
      description: 'Prime commercial office space in business district with modern facilities and ample parking.',
      images: [
        'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['Parking', 'Conference Rooms', 'High-speed Internet', '24/7 Security'],
      agent: {
        name: 'Aung Thu',
        phone: '+95911223344',
        email: 'aung@commercial.mm',
        whatsapp: '+95911223344'
      },
      coordinates: { lat: 16.7967, lng: 96.1610 },
      isFeatured: true,
      views: 156,
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      title: 'Spacious Family Home',
      price: 380000,
      location: 'Naypyidaw, Myanmar',
      type: 'house',
      bedrooms: 5,
      bathrooms: 4,
      area: 3200,
      yearBuilt: 2021,
      description: 'Perfect family home with large backyard and modern amenities in a safe neighborhood.',
      images: [
        'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['Large Backyard', 'Parking', 'Modern Kitchen', 'Study Room'],
      agent: {
        name: 'Nilar Win',
        phone: '+95955667788',
        email: 'nilar@homes.mm',
        whatsapp: '+95955667788'
      },
      coordinates: { lat: 19.7633, lng: 96.0785 },
      isFeatured: false,
      views: 203,
      createdAt: '2024-01-12'
    },
    {
      id: '5',
      title: 'Luxury Downtown Apartment',
      price: 320000,
      location: 'Mandalay, Myanmar',
      type: 'apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: 1600,
      yearBuilt: 2021,
      description: 'Stylish apartment with great city views and high-end facilities in the heart of Mandalay.',
      images: [
        'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/271800/pexels-photo-271800.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['Elevator', '24/7 Security', 'Gym', 'Balcony'],
      agent: {
        name: 'Aye Chan',
        phone: '+95998765432',
        email: 'ayechan@realestate.mm',
        whatsapp: '+95998765432'
      },
      coordinates: { lat: 21.9588, lng: 96.0891 },
      isFeatured: false,
      views: 187,
      createdAt: '2024-02-10'
    },
    {
    id: '6',
    title: 'Commercial Office Space in CBD',
    price: 600000,
    location: 'Naypyidaw, Myanmar',
    type: 'commercial',
    bedrooms: 0,
    bathrooms: 4,
    area: 4000,
    yearBuilt: 2019,
    description: 'Prime commercial building suitable for offices or retail with parking and backup generator.',
    images: [
      'https://images.pexels.com/photos/374023/pexels-photo-374023.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Parking', 'Elevator', 'Backup Generator'],
    agent: {
      name: 'Kyaw Win',
      phone: '+95976543210',
      email: 'kyawwin@realestate.mm',
      whatsapp: '+95976543210'
    },
    coordinates: { lat: 19.7633, lng: 96.0785 },
    isFeatured: true,
    views: 302,
    createdAt: '2024-03-05'
    },
    {
      id: '7',
      title: 'Peaceful Forest Cabin',
      price: 95000,
      location: 'Bagan, Myanmar',
      type: 'cabin',
      bedrooms: 2,
      bathrooms: 1,
      area: 1200,
      yearBuilt: 2018,
      description: 'Charming wooden cabin surrounded by nature, ideal for vacations or retreats.',
      images: [
        'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['Fireplace', 'Solar Power', 'Wood Deck'],
      agent: {
        name: 'Nyein Thandar',
        phone: '+95911122334',
        email: 'nyein@realestate.mm',
        whatsapp: '+95911122334'
      },
      coordinates: { lat: 21.1667, lng: 94.8667 },
      isFeatured: false,
      views: 99,
      createdAt: '2024-04-01'
    },
    {
      id: '8',
      title: 'Luxury Condo with Pool',
      price: 390000,
      location: 'Taunggyi, Myanmar',
      type: 'condominium',
      bedrooms: 3,
      bathrooms: 2,
      area: 1900,
      yearBuilt: 2022,
      description: 'Modern condominium in a secure complex with a swimming pool and gym.',
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['Pool', 'Gym', 'Security', 'Elevator'],
      agent: {
        name: 'Soe Moe',
        phone: '+95933445566',
        email: 'soe@realestate.mm',
        whatsapp: '+95933445566'
      },
      coordinates: { lat: 20.7866, lng: 97.0378 },
      isFeatured: true,
      views: 223,
      createdAt: '2024-05-10'
    },
    {
      id: '9',
      title: 'Cozy Bungalow with Garden',
      price: 275000,
      location: 'Yangon, Myanmar',
      type: 'bungalow',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      yearBuilt: 2017,
      description: 'Comfortable single-floor home with a lush garden in a quiet neighborhood.',
      images: ['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'],
      amenities: ['Garden', 'Carport', 'Fencing'],
      agent: { name: 'Myint Oo', phone: '+95999887766', email: 'myint@realestate.mm', whatsapp: '+95999887766' },
      coordinates: { lat: 16.8409, lng: 96.1735 },
      isFeatured: false,
      views: 110,
      createdAt: '2024-05-22'
    },
    {
      id: '10',
      title: 'New Family House in Suburbs',
      price: 230000,
      location: 'Mandalay, Myanmar',
      type: 'house',
      bedrooms: 4,
      bathrooms: 3,
      area: 2100,
      yearBuilt: 2023,
      description: 'Spacious house perfect for families, located in a growing suburban area.',
      images: ['https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=800'],
      amenities: ['Garage', 'Patio', 'Open Kitchen'],
      agent: { name: 'Nandar Hlaing', phone: '+95955667788', email: 'nandar@realestate.mm', whatsapp: '+95955667788' },
      coordinates: { lat: 21.9754, lng: 96.0863 },
      isFeatured: true,
      views: 175,
      createdAt: '2024-06-01'
    },
    {
      id: '11',
      title: 'Affordable Apartment Unit',
      price: 125000,
      location: 'Taunggyi, Myanmar',
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 1,
      area: 900,
      yearBuilt: 2020,
      description: 'Simple and affordable apartment suitable for small families or singles.',
      images: ['https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=800'],
      amenities: ['Balcony', 'Security'],
      agent: { name: 'Hla Hla', phone: '+95944556677', email: 'hla@realestate.mm', whatsapp: '+95944556677' },
      coordinates: { lat: 20.7762, lng: 97.0375 },
      isFeatured: false,
      views: 88,
      createdAt: '2024-06-10'
    },
    {
      id: '9',
      title: 'Penthouse with Panoramic View',
      price: 680000,
      location: 'Yangon, Myanmar',
      type: 'condominium',
      bedrooms: 4,
      bathrooms: 3,
      area: 3000,
      yearBuilt: 2021,
      description: 'Top-floor penthouse with stunning views of downtown Yangon.',
      images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'],
      amenities: ['Elevator', 'Gym', 'Rooftop Deck', 'Security'],
      agent: { name: 'Ko Ko', phone: '+95922446688', email: 'koko@realestate.mm', whatsapp: '+95922446688' },
      coordinates: { lat: 16.8050, lng: 96.1558 },
      isFeatured: true,
      views: 334,
      createdAt: '2024-06-18'
    },
  ]);

  const [filters, setFiltersState] = useState<Filters>({
    type: '',
    minPrice: 0,
    maxPrice: 1000000,
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    amenities: []
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const setFilters = (newFilters: Partial<Filters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const toggleFavorite = (propertyId: string) => {
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const getPropertyById = (id: string) => {
    return properties.find(p => p.id === id);
  };

  // Filter and sort properties
  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !filters.type || property.type === filters.type;
      const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice;
      const matchesLocation = !filters.location || 
                             property.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesBedrooms = !filters.bedrooms || property.bedrooms >= filters.bedrooms;
      const matchesBathrooms = !filters.bathrooms || property.bathrooms >= filters.bathrooms;

      return matchesSearch && matchesType && matchesPrice && matchesLocation && 
             matchesBedrooms && matchesBathrooms;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  return (
    <PropertyContext.Provider value={{
      properties,
      filteredProperties,
      filters,
      favorites,
      searchQuery,
      sortBy,
      setFilters,
      setSearchQuery,
      setSortBy,
      toggleFavorite,
      getPropertyById
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within PropertyProvider');
  }
  return context;
};