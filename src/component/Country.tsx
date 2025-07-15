import "./Country.css";
import search_icon from "../assets/search.png";
import sample_flag from "../assets/samp_flag.png";
import coat_of_arm_icon from "../assets/coatArm.png";
import { useState, useEffect, useRef } from "react";

interface CountryData {
  countryName: string;
  officialName: string;
  region: string;
  capital: string;
  timeZone: string;
  population: number;
  flag: string;
  coatOfArms: string;
  currency: Record<string, { name: string; symbol: string }>;
}

const Country = () => {
  const [country, setCountry] = useState<CountryData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const getCountry = async (country: string) => {
    try {
      const url = `https://restcountries.com/v3.1/name/${country}`;
      const response = await fetch(url);
      const data = await response.json();
      const info: CountryData = {
        countryName: data[0].name.common,
        officialName: data[0].name.official,
        region: data[0].region,
        capital: data[0].capital[0],
        timeZone: data[0].timezones[0],
        population: data[0].population,
        flag: data[0].flags.png,
        coatOfArms: data[0].coatOfArms.png,
        currency: data[0].currencies,
      };
      setCountry(info);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    getCountry("usa");
  }, []);
  return (
    <div className="country">
      <nav>
        <input type="text" ref={inputRef} placeholder="Search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => getCountry(inputRef.current?.value || "")}
        />
      </nav>
      <div className="container">
        <div className="container-top">
          <img src={country?.flag || sample_flag} alt="Flag" />
          <div className="title-content">
            <div className="title-words">
              <h1 className="title">{country?.countryName || "Loading..."}</h1>
              <p>Official name: {country?.officialName || "N/A"}</p>
              <p>Region: {country?.region || "N/A"}</p>
            </div>
            <div className="arms-icon">
              <img
                src={country?.coatOfArms || coat_of_arm_icon}
                alt="Coat of Arms"
              />
            </div>
          </div>
        </div>
        <div className="container-bottom">
          <div className="currency-container">
            <h1>Currency</h1>
            {Object.entries(country?.currency || {}).map(([code, value]) => (
              <div className="currency" key={code}>
                <h4>{code}</h4>
                <p>{value.name}</p>
                <p>{value.symbol}</p>
              </div>
            ))}
          </div>
          {/* {country.currency.forEach((value) => {
              <div className="currency">
                <h4>{value}</h4>
                <p>{value.name}</p>
                <p>{value.symbol}</p>
              </div>;
            })} */}
          {/* <div className="currency">
              <h4>INR</h4>
              <p>Rupee</p>
              <p>₹</p>
            </div> */}

          <div className="bottom-content">
            <p>Capital: {country?.capital || "N/A"}</p>
            <p>Timezone: {country?.timeZone || "N/A"}</p>
            <p>Population: {country?.population.toLocaleString() || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
