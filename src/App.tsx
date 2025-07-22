import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PropertyDetails from './pages/PropertyDetails';
import Dashboard from './pages/Dashboard';
import SearchResults from './pages/SearchResults';
import CategoryPage from './pages/CategoryPage';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <PropertyProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/category/:category" element={<CategoryPage />} />
              </Routes>
            </div>
          </Router>
        </PropertyProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;