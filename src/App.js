import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allSpecialities, setAllSpecialities] = useState([]);


  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [consultationType, setConsultationType] = useState(() => {
    const params = searchParams.get('consultationType');
    return params ? params.split(',') : [];
  });
  const [specialties, setSpecialties] = useState(() => {
    const params = searchParams.get('specialties');
    return params ? params.split(',') : [];
  });
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');


  const extractSpecialities = (specialitiesData) => {
    if (!specialitiesData || !Array.isArray(specialitiesData)) {
      return [];
    }
    
    const specialityNames = [];
    
    specialitiesData.forEach(spec => {
      if (spec && spec.name) {

        if (spec.name.includes(" and ")) {
          const split = spec.name.split(" and ");
          split.forEach(s => specialityNames.push(s.trim()));
        } else {
          specialityNames.push(spec.name.trim());
        }
      }
    });
    
    return specialityNames;
  };


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        

        let data;
        try {
          const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          data = await response.json();
          console.log("Fetched data from API:", data);
        } catch (apiError) {
          console.error("API fetch error:", apiError);

          data = [
            {
              "id": "131682",
              "name": "Dr. Chhaya Vora",
              "name_initials": "CV",
              "photo": "https://example.com/doctor1.jpg",
              "doctor_introduction": "Experienced gynecologist",
              "specialities": [
                {
                  "name": "Gynaecologist and Obstetrician"
                }
              ],
              "fees": "₹ 400",
              "experience": "39 Years of experience",
              "languages": [
                "English",
                "Hindi",
                "Marathi"
              ],
              "clinic": {
                "name": "Dr. Chaya Vora",
                "address": {
                  "locality": "Hadapsar",
                  "city": "Pune",
                  "address_line1": "Silver plaza aprt opp,Vitthal Rao Shivarkar Road, Fatima Nagar",
                  "location": "73.9011205,18.5045484",
                  "logo_url": ""
                }
              },
              "video_consult": false,
              "in_clinic": true
            },
            {
              "id": "131683",
              "name": "Dr. John Smith",
              "name_initials": "JS",
              "photo": "https://example.com/doctor2.jpg",
              "doctor_introduction": "",
              "specialities": [
                {
                  "name": "Cardiologist"
                }
              ],
              "fees": "₹ 600",
              "experience": "15 Years of experience",
              "languages": [
                "English",
                "Hindi"
              ],
              "clinic": {
                "name": "Heart Care Clinic",
                "address": {
                  "locality": "Koregaon Park",
                  "city": "Pune",
                  "address_line1": "123 Main Road",
                  "location": "73.9011205,18.5045484",
                  "logo_url": ""
                }
              },
              "video_consult": true,
              "in_clinic": true
            },
            {
              "id": "131684",
              "name": "Dr. Sarah Johnson",
              "name_initials": "SJ",
              "photo": "https://example.com/doctor3.jpg",
              "doctor_introduction": "Pediatric specialist",
              "specialities": [
                {
                  "name": "Paediatrician"
                }
              ],
              "fees": "₹ 500",
              "experience": "10 Years of experience",
              "languages": [
                "English"
              ],
              "clinic": {
                "name": "Child Care Center",
                "address": {
                  "locality": "Viman Nagar",
                  "city": "Pune",
                  "address_line1": "456 Health Road",
                  "location": "73.9011205,18.5045484",
                  "logo_url": ""
                }
              },
              "video_consult": true,
              "in_clinic": false
            }
          ];
          console.log("Using fallback sample data");
        }


        const normalizedData = Array.isArray(data) ? data : [data];
        

        const allSpecialitiesSet = new Set();
        

        const processedDoctors = normalizedData.map(doc => {

          const specialtiesArray = extractSpecialities(doc.specialities);
          console.log(`Doctor: ${doc.name}, Specialities: ${JSON.stringify(specialtiesArray)}`);
          

          specialtiesArray.forEach(spec => allSpecialitiesSet.add(spec));
          

          const feesString = doc.fees || "₹ 0";
          const feesValue = parseInt(feesString.replace(/[^\d]/g, '')) || 0;
          

          const experienceString = doc.experience || "0 Years of experience";
          const experienceValue = parseInt(experienceString.match(/\d+/) || 0);
          

          const clinicName = doc.clinic && doc.clinic.name ? doc.clinic.name : '';
          const clinicAddress = doc.clinic && doc.clinic.address ? 
            `${doc.clinic.address.locality || ''}, ${doc.clinic.address.city || ''}` : '';
          
          return {
            id: doc.id || '',
            name: doc.name || '',
            imageUrl: doc.photo || '',
            specialties: specialtiesArray,
            experience: experienceValue,
            fees: feesValue,
            languages: doc.languages || [],
            consultationTypes: [
              ...(doc.video_consult ? ['Video Consult'] : []),
              ...(doc.in_clinic ? ['In Clinic'] : [])
            ],
            clinicName: clinicName,
            location: clinicAddress,
            introduction: doc.doctor_introduction || ''
          };
        });
        

        const uniqueSpecialities = Array.from(allSpecialitiesSet).sort();
        console.log("All unique specialities:", uniqueSpecialities);
        setAllSpecialities(uniqueSpecialities);
        
        setDoctors(processedDoctors);
        setFilteredDoctors(processedDoctors);
        setIsLoading(false);
      } catch (err) {
        console.error("Processing error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);


  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (consultationType && consultationType.length > 0) params.set('consultationType', consultationType.join(','));
    if (specialties.length > 0) params.set('specialties', specialties.join(','));
    if (sortBy) params.set('sortBy', sortBy);
    setSearchParams(params);
  }, [searchQuery, consultationType, specialties, sortBy, setSearchParams]);


  useEffect(() => {
    if (!doctors.length) return;

    let filtered = [...doctors];


    if (searchQuery) {
      filtered = filtered.filter(doc => 
        String(doc.name).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


    if (consultationType && consultationType.length > 0) {
      filtered = filtered.filter(doc => {
        return consultationType.some(type => {
          if (type === 'video') {
            return doc.consultationTypes.includes('Video Consult');
          } else if (type === 'clinic') {
            return doc.consultationTypes.includes('In Clinic');
          }
          return false;
        });
      });
    }


    if (specialties.length > 0) {
      console.log("Filtering by specialties:", specialties);
      filtered = filtered.filter(doc => 
        specialties.some(specialty => 
          doc.specialties.some(s => 
            String(s).toLowerCase() === specialty.toLowerCase()
          )
        )
      );
    }


    if (sortBy === 'fees') {
      filtered.sort((a, b) => Number(a.fees || 0) - Number(b.fees || 0));
    } else if (sortBy === 'experience') {
      filtered.sort((a, b) => Number(b.experience || 0) - Number(a.experience || 0));
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchQuery, consultationType, specialties, sortBy]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleConsultationTypeChange = (types) => {
    setConsultationType(types);
  };

  const handleSpecialtyChange = (specialty) => {
    setSpecialties(prev => {
      if (prev.includes(specialty)) {
        return prev.filter(s => s !== specialty);
      } else {
        return [...prev, specialty];
      }
    });
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setConsultationType([]);
    setSpecialties([]);
    setSortBy('');
  };

  return (
    <div className="App">
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
        doctors={doctors}
      />
      <div className="main-content">
        <FilterPanel 
          consultationType={consultationType}
          specialties={specialties}
          sortBy={sortBy}
          onConsultationTypeChange={handleConsultationTypeChange}
          onSpecialtyChange={handleSpecialtyChange}
          onSortChange={handleSortChange}
          onClearAll={clearAllFilters}
          availableSpecialities={allSpecialities}
        />
        <div className="doctor-list-container">
          <DoctorList 
            doctors={filteredDoctors} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
