import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    try {
      const fetchPlanets = async () => {
        const response = await fetch(API_URL);
        const { results } = await response.json();
        setData(results);
        setFilteredData(results);
      };
      fetchPlanets();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const contextValue = {
    data,
    setData,
    filteredData,
    setFilteredData,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
