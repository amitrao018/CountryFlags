import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CountryCard from "./components/CountryCard";  // Correct import path

function App() {
  const [countryData, setCountryData] = useState([]);  // Stores all countries
  const [filterCountryData, setFilterCountryData] = useState([]);  // Stores filtered countries
  const [searchText, setSearchText] = useState("");

  // Handle search input change
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  // Fetch country data on component mount
  const fetchCountryData = async () => {
    const url = "https://restcountries.com/v3.1/all";
    try {
      const response = await axios.get(url);
      console.log("Fetched Data:", response.data);  // Verify fetched data
      setCountryData(response.data);
      setFilterCountryData(response.data);  // Initialize filtered data
    } catch (error) {
      console.error("Error fetching data:", error);  // Log error
    }
  };

  // Memoized function to filter countries based on search input
  const searchCountries = useCallback(() => {
    if (searchText === "") {
      setFilterCountryData(countryData);  // Show all countries if search is empty
    } else {
      const filteredData = countryData.filter((country) =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilterCountryData(filteredData);
    }
  }, [searchText, countryData]);  // Dependencies for the callback

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountryData();
  }, []);

  // Re-run search when searchText or countryData changes
  useEffect(() => {
    searchCountries();  // No need for API call here
  }, [searchCountries]);  // Include searchCountries as a dependency

  return (
    <div className="container">
      <div className="searchSection">
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchText}
          onChange={handleChange}
        />
      </div>
      <div className="countryGrid">
        {filterCountryData.length > 0 ? (
          filterCountryData.map((ele, index) => (
            <CountryCard key={index} data={ele} />
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default App;


