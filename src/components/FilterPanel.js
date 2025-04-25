import React, { useState, useEffect, useMemo } from 'react';
import '../styles/FilterPanel.css';

const ALL_SPECIALTIES = [
  'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician', 
  'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist', 
  'Physiotherapist', 'Endocrinologist', 'Orthopaedic', 
  'Ophthalmologist', 'Gastroenterologist', 'Pulmonologist', 
  'Psychiatrist', 'Urologist', 'Dietitian/Nutritionist', 
  'Psychologist', 'Sexologist', 'Nephrologist', 'Neurologist', 
  'Oncologist', 'Ayurveda', 'Homeopath'
];

const FilterPanel = ({ 
  consultationType, 
  specialties, 
  sortBy, 
  onConsultationTypeChange, 
  onSpecialtyChange, 
  onSortChange, 
  onClearAll, 
  availableSpecialities = [],
  onFilterChange
}) => {
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(true);
  const [isConsultationOpen, setIsConsultationOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const toggleSpecialty = () => setIsSpecialtyOpen(!isSpecialtyOpen);
  const toggleConsultation = () => setIsConsultationOpen(!isConsultationOpen);
  const toggleSort = () => setIsSortOpen(!isSortOpen);


  const specialtiesToDisplay = availableSpecialities.length > 0 ? availableSpecialities : ALL_SPECIALTIES;


  useEffect(() => {
    let count = 0;
    if (consultationType && consultationType.length > 0) count += consultationType.length;
    if (specialties && specialties.length > 0) count += specialties.length;
    if (sortBy) count++;
    setActiveFilterCount(count);

    if (typeof onFilterChange === 'function') {
      onFilterChange({
        consultationType,
        specialty: specialties && specialties.length > 0 ? specialties[0] : null
      });
    }
  }, [consultationType, specialties, sortBy, onFilterChange]);

  const filteredSpecialties = useMemo(() => {
    if (!searchTerm.trim()) return specialtiesToDisplay;
    return specialtiesToDisplay.filter(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, specialtiesToDisplay]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearAllFilters = () => {
    if (typeof onConsultationTypeChange === 'function') onConsultationTypeChange([]);
    if (typeof onSpecialtyChange === 'function') onSpecialtyChange([]);
    if (typeof onSortChange === 'function') onSortChange('');
    if (typeof onClearAll === 'function') onClearAll();
    setSearchTerm('');
  };

  return (
    <div className="filter-panel-container">

      <div className="filter-panel">
        <div className="filter-header">
          <h2>Filters {activeFilterCount > 0 && <span className="filter-count">({activeFilterCount})</span>}</h2>
          <button className="clear-all" onClick={clearAllFilters}>Reset Filters</button>
        </div>


        <div className="filter-section">
          <div 
            className="filter-section-header" 
            onClick={toggleConsultation}
            data-testid="filter-header-moc"
          >
            <h3>Mode of Consultation</h3>
            <span className={`chevron ${isConsultationOpen ? 'down' : 'right'}`}>
              {isConsultationOpen ? '▼' : '▶'}
            </span>
          </div>
          
          {isConsultationOpen && (
            <div className="filter-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="consultationType"
                  value="video"
                  checked={consultationType && consultationType.includes('video')}
                  onChange={(e) => onConsultationTypeChange(e.target.checked ? ['video'] : [])}
                  data-testid="filter-video-consult"
                />
                Video Consult
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="consultationType"
                  value="clinic"
                  checked={consultationType && consultationType.includes('clinic')}
                  onChange={(e) => onConsultationTypeChange(e.target.checked ? ['clinic'] : [])}
                  data-testid="filter-in-clinic"
                />
                In Clinic
              </label>
            </div>
          )}
        </div>


        <div className="filter-section">
          <div 
            className="filter-section-header" 
            onClick={toggleSpecialty}
            data-testid="filter-header-speciality"
          >
            <h3>Speciality</h3>
            <span className={`chevron ${isSpecialtyOpen ? 'down' : 'right'}`}>
              {isSpecialtyOpen ? '▼' : '▶'}
            </span>
          </div>
          
          {isSpecialtyOpen && (
            <div className="filter-options">
              <div className="specialty-search-container">
                <input
                  type="text"
                  className="search-specialty"
                  placeholder="Search specialties"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className="clear-search" onClick={clearSearch}>
                    ×
                  </button>
                )}
              </div>
              <div className="specialty-options">
                {filteredSpecialties.map(specialty => (
                  <label key={specialty} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={specialty}
                      checked={specialties && specialties.includes(specialty)}
                      onChange={(e) => onSpecialtyChange(specialty)}
                      data-testid={`filter-specialty-${specialty.replace(/[\/\s]/g, '-')}`}
                    />
                    {specialty}
                  </label>
                ))}
                {filteredSpecialties.length === 0 && (
                  <div className="no-results">No specialties match your search</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>


      <div className="sort-panel">
        <div 
          className="sort-header" 
          onClick={toggleSort}
          data-testid="filter-header-sort"
        >
          <h3>Sort by</h3>
          <span className={`chevron ${isSortOpen ? 'down' : 'right'}`}>
            {isSortOpen ? '▼' : '▶'}
          </span>
        </div>
        
        {isSortOpen && (
          <div className="sort-options">
            <label className="radio-label">
              <input
                type="radio"
                name="sortBy"
                value="fees"
                checked={sortBy === 'fees'}
                onChange={() => onSortChange('fees')}
                data-testid="sort-fees"
              />
              Price: Low-High
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sortBy"
                value="experience"
                checked={sortBy === 'experience'}
                onChange={() => onSortChange('experience')}
                data-testid="sort-experience"
              />
              Experience: Most Experience first
            </label>
            {sortBy && (
              <label className="radio-label">
                <input
                  type="radio"
                  name="sortBy"
                  value=""
                  checked={sortBy === ''}
                  onChange={() => onSortChange('')}
                />
                Default
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel; 