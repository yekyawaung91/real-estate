# 🏠 Real Estate Platform (React)

A modern, responsive real estate platform built with **React**, designed to help users effortlessly explore property listings, filter by preferences, and connect directly with agents or property owners.

## 🚀 Project Description
This platform provides an intuitive interface for users to browse real estate listings by **location**, **price**, and **property type**, and view detailed property information. It includes image galleries, interactive maps, and tools like cost calculators to support decision-making.

---
[Visit Demo](https://yekyawaung91.github.io/real-estate/)
---
---
## Screenshots
![Screenshot](screenshot.png)

---

## 🌟 Key Features

### 1. User Interface (UI) Components
- Fully responsive design (Mobile / Tablet / Desktop)
- Dark/Light mode toggle
- Interactive map integration (Google Maps / OpenStreetMap)
- Swipeable image gallery with zoom
- Smart search bar with auto-suggestions

---

### 2. Property Listings & Search
- 🔧 **Advanced Filters:**
  - Property type (House, Apartment, Land, Commercial)
  - Price range (slider-based)
  - Location (City, Township, Landmarks)
  - Bedrooms / Bathrooms
  - Amenities (Parking, Garden, Pool, etc.)

- **Sorting Options:**
  - Price: Low → High / High → Low
  - Newest Listings
  - Most Viewed

---

### 3. Property Details Page
- High-resolution image gallery + optional 360° virtual tour
- Key details: price, size, bed/bath, year built
- Embedded map showing exact location
- Mortgage / Loan calculator
- Contact agent/owner via WhatsApp, call, or email
- Similar property recommendations

---

### 4. User Accounts & Dashboard

#### Buyers / Renters
- Save favorite properties
- View search history
- Schedule property visits

#### 🏢 Agents / Sellers
- Post and manage listings
- Track property inquiries
- View performance analytics

---

### 5. Additional Features
- Price comparison tool (Nearby listings)
- Mortgage calculator (EMI, interest, down payment)
- Neighborhood insights (Schools, Hospitals, Transport, etc.)
- AI chatbot for instant support
- Multi-language support (English & Burmese)

---

## Tech Stack
- **Frontend**: React, Tailwind CSS, React Router, Axios
- **Maps**: Google Maps API / Leaflet + OpenStreetMap
- **State Management**: Context API or Redux (optional)
- **Authentication**: Firebase Auth / Custom backend (JWT)

---

## 📂 Folder Structure
/src
┣ /components
┣ /pages
┣ /assets
┣ /hooks
┣ /utils
┣ /context
┗ /api


---

## Setup Instructions


```bash
# Clone the repo
git clone https://github.com/yekyawaung91/real-estate.git

# Navigate to project folder
cd real-estate-platform

# Install dependencies
npm install

# Start development server
npm run dev