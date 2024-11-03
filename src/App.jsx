import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);  
  const [query, setQuery] = useState('bahubali');

  

  const fetchData = async (movie) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?t=${movie}&apikey=f2f0c004`);
      setData([response.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
  };

  const handleSearch = () => {
    if (query.trim()) {
      fetchData(query);
      setQuery("")
    }

  };

  useEffect(() => {
    fetchData(query);
  }, []); 

  return (
    <div className="app">
      <h1 className="app-title">Movie Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="movie-container">
        {data.map((ele, index) => (
          <div key={index} className="movie-card">
            <h2 className="movie-title">{ele.Title}</h2>
            <p><strong>Cast:</strong>{ele.Actors}</p>
            <p><strong>Year:</strong> {ele.Year}</p>
            <p><strong>Genre:</strong> {ele.Genre}</p>
            <p><strong>Plot:</strong> {ele.Plot}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;


