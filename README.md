# Doctor Listing Application

A responsive web application for finding and filtering doctors based on specialties, consultation types, and other criteria.

## Features

- **Advanced Search**: Search for doctors by name with real-time suggestions
- **Filtering Options**:
  - Filter by mode of consultation (Video Consult, In Clinic)
  - Filter by specialties with searchable specialty list
  - Active filter count display
- **Sorting Options**:
  - Sort by price (low to high)
  - Sort by experience (most experienced first)
- **Responsive Design**: Optimized for both desktop and mobile devices
- **URL Parameter Support**: Filters and search queries are reflected in URL parameters for easy sharing

## Technologies Used

- React.js
- CSS3
- React Router DOM

## Project Structure

```
doctor-listing-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── DoctorList.js      # Doctor listing component
│   │   ├── FilterPanel.js     # Filter options sidebar
│   │   └── SearchBar.js       # Search with autocomplete
│   ├── styles/
│   │   ├── App.css            # Main application styles
│   │   ├── FilterPanel.css    # Filter panel styles
│   │   └── SearchBar.css      # Search bar styles
│   ├── App.js                 # Main application component
│   └── index.js               # Entry point
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/doctor-listing-app.git
   ```

2. Navigate to the project directory:
   ```
   cd doctor-listing-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## API Integration

The application fetches doctor data from the provided API endpoint. If the API is unavailable, the application falls back to sample data to ensure functionality.

## Features in Detail

### Search Functionality
- Real-time search with suggestions
- Doctor name search with autocomplete
- Clear search option

### Filter Panel
- Consultation type filtering (Video/In-Clinic)
- Specialty filtering with search capabilities
- Filter count indicator
- Reset filters option

### Sorting Options
- Price: Low to High
- Experience: Most experienced first
- Default ordering

### Doctor Cards
- Doctor profile image
- Name and specialty
- Experience and fees
- Available consultation types
- Location and clinic details
- Book appointment button

## Responsive Design

The application is fully responsive:
- Desktop: Side-by-side layout with fixed filter panel
- Mobile: Stacked layout with expandable filters

## Future Enhancements

- User authentication
- Appointment booking integration
- Doctor reviews and ratings
- Geolocation-based doctor suggestions
- Dark mode support

## Acknowledgements

- [React Router](https://reactrouter.com/) for routing
