import React, { useState, useEffect, useRef } from 'react';
import '../styles/SearchBar.css';


const SearchIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#666666" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const SearchBar = ({ searchQuery, onSearchChange, doctors }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);

    if (value.trim() === '') {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }


    const filtered = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5); 
    
    setSuggestions(filtered);
    setIsOpen(filtered.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion.name);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    onSearchChange('');
    setSuggestions([]);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };


  const getInitialsPlaceholder = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'D';
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          data-testid="autocomplete-input"
          type="text"
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          ref={inputRef}
        />
        {searchQuery && (
          <button className="clear-search-button" onClick={clearSearch} aria-label="Clear search">
            ×
          </button>
        )}
        <button className="search-button">
          <SearchIcon />
        </button>
      </div>
      
      {isOpen && (
        <div className="suggestions-container" ref={suggestionsRef}>
          <ul className="suggestions-list">
            {suggestions.map((doctor, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(doctor)}
                data-testid="suggestion-item"
                className="suggestion-item"
              >
                <div className="suggestion-image">
                  {doctor.imageUrl ? (
                    <img src={doctor.imageUrl} alt={doctor.name} />
                  ) : (
                    <div className="suggestion-placeholder">
                      {getInitialsPlaceholder(doctor.name)}
                    </div>
                  )}
                </div>
                <div className="suggestion-info">
                  <div className="suggestion-name">{doctor.name}</div>
                  <div className="suggestion-specialty">
                    {doctor.specialties && doctor.specialties.length > 0 
                      ? doctor.specialties.join(', ') 
                      : 'General Physician'}
                  </div>
                </div>
                <div className="suggestion-arrow">›</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 