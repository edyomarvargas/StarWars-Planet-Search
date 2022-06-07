import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, filteredData, setFilteredData } = useContext(PlanetsContext);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
  });

  const { filterByName: { name } } = filter;

  const handleChange = ({ target }) => {
    setFilter({
      ...filter,
      filterByName: {
        name: target.value.toLowerCase(),
      },
    });
  };

  useEffect(() => {
    const filteredPlanets = data.filter((planet) => (
      planet.name.toLowerCase().includes(name)));

    setFilteredData([...filteredPlanets]);
  }, [name]);

  return (
    <section>
      <form>
        <label htmlFor="planet-name">
          <input
            data-testid="name-filter"
            id="planet-name"
            type="text"
            placeholder="Nome do planeta..."
            value={ name }
            onChange={ handleChange }
          />
        </label>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          {
            filteredData.map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films.map((film) => film)}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default Table;
