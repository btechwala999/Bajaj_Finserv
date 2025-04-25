import React from 'react';
import '../styles/DoctorList.css';

const DoctorList = ({ doctors, isLoading, error }) => {
  if (isLoading) {
    return <div className="loading">Loading doctors...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (doctors.length === 0) {
    return (
      <div className="no-doctors">
        <div className="no-results-icon">🔍</div>
        <h3>No doctors found matching your criteria.</h3>
        <p>Try adjusting your filters or search terms to find more results.</p>
      </div>
    );
  }

  // Format experience string
  const formatExperience = (years) => {
    if (!years && years !== 0) return "Experience not specified";
    return `${years} ${years === 1 ? 'year' : 'years'} of experience`;
  };

  // Format fees
  const formatFees = (fees) => {
    if (!fees && fees !== 0) return "Fees not specified";
    return `₹ ${fees}`;
  };

  return (
    <div className="doctor-list">
      {doctors.map((doctor, index) => (
        <div key={doctor.id || index} className="doctor-card" data-testid="doctor-card">
          <div className="doctor-image">
            {doctor.imageUrl ? (
              <img src={doctor.imageUrl} alt={doctor.name} />
            ) : (
              <div className="placeholder-image">
                {doctor.name ? doctor.name.charAt(0) : 'D'}
              </div>
            )}
          </div>
          
          <div className="doctor-info">
            <h2 className="doctor-name" data-testid="doctor-name">
              {doctor.name}
            </h2>
            <div className="doctor-specialty" data-testid="doctor-specialty">
              {Array.isArray(doctor.specialties) && doctor.specialties.length > 0
                ? doctor.specialties.join(', ') 
                : "General Physician"}
            </div>
            {doctor.introduction && (
              <div className="doctor-introduction">{doctor.introduction}</div>
            )}
            <div className="doctor-experience" data-testid="doctor-experience">
              {formatExperience(doctor.experience)}
            </div>
            {doctor.languages && doctor.languages.length > 0 && (
              <div className="doctor-languages">
                <span className="info-label">Languages:</span> {doctor.languages.join(', ')}
              </div>
            )}
            {doctor.location && (
              <div className="doctor-location">
                <span className="info-label">Location:</span> {doctor.location}
              </div>
            )}
            {doctor.clinicName && (
              <div className="doctor-clinic">
                <span className="info-label">Clinic:</span> {doctor.clinicName}
              </div>
            )}
          </div>
          
          <div className="doctor-booking">
            <div className="doctor-fee" data-testid="doctor-fee">
              {formatFees(doctor.fees)}
            </div>
            <div className="consultation-types">
              {doctor.consultationTypes.map((type, i) => (
                <span key={i} className={`consult-badge ${type.replace(/\s+/g, '-').toLowerCase()}`}>
                  {type}
                </span>
              ))}
            </div>
            <button className="book-appointment">
              Book Appointment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorList; 