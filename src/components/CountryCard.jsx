const CountryCard = ({ data }) => {
    if (!data || !data.name || !data.flags) return null;  // Handle missing data
  
    return (
      <div className="countryCard">
        <img src={data.flags?.png} alt={`Flag of ${data.name.common}`} />
        <h2>{data.name.common}</h2>
      </div>
    );
  };
  
  export default CountryCard;
  
