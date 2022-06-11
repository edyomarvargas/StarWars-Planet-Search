import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, filteredData, setFilteredData } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const INITIAL_COLUMN_OPTIONS = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const { filterByNumericValues, filterByName: { name } } = filter;

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

    /*
    A lógica abaixo para implementar os filtros acumulados foi baseada na monitoria do
    dia 07/06/22, que pode ser acessada no seguinte link:
    https://trybecourse.slack.com/archives/C02T5FNGN07/p1654616455215879
    */
    const resultArray = filterByNumericValues.reduce((acc, filterType) => (
      acc.filter((planet) => {
        switch (filterType.comparison) {
        case 'maior que':
          return Number(planet[filterType.column]) > Number(filterType.value);
        case 'menor que':
          return Number(planet[filterType.column]) < Number(filterType.value);
        case 'igual a':
          return Number(planet[filterType.column]) === Number(filterType.value);
        default:
          return true;
        }
      })
    ), filteredPlanets);

    setFilteredData(resultArray);

    if (filterByNumericValues.length > 0) {
      setIsDisabled(false);
    }
  }, [name, filterByNumericValues]);

  const applyFilters = () => {
    setFilter({
      ...filter,
      filterByNumericValues: [
        ...filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });

    const filteredColumnOptions = columnOptions.filter((option) => option !== column);
    setColumnOptions([...filteredColumnOptions]);
  };

  useEffect(() => {
    setColumn(columnOptions[0]);
  }, [columnOptions]);

  const deleteFilter = (index) => {
    const newArray = filterByNumericValues.filter(
      ((_filterType, filterIndex) => index !== filterIndex),
    );

    const arrayOfColumns = [];
    newArray.map((array) => arrayOfColumns.push(array.column));

    // Consultei o seguinte link para filtrar 2 arrays:
    // https://stackoverflow.com/questions/30389599/comparing-and-filtering-two-arrays
    const INDEX_REFERENCE = -1;
    const columnOptionsFiltered = INITIAL_COLUMN_OPTIONS.filter((columnOption) => (
      arrayOfColumns.indexOf(columnOption) === INDEX_REFERENCE
    ));

    setColumnOptions(columnOptionsFiltered);

    setFilter({
      ...filter,
      filterByNumericValues: newArray,
    });
  };

  const removeAllFilters = () => {
    setFilter({
      ...filter,
      filterByNumericValues: [],
    });
    setColumnOptions([INITIAL_COLUMN_OPTIONS]);
  };
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

        <select
          data-testid="column-filter"
          onChange={ ({ target }) => setColumn(target.value) }
        >
          {
            columnOptions.map((option, index) => <option key={ index }>{option}</option>)
          }
        </select>

        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          data-testid="value-filter"
          type="number"
          value={ value }
          onChange={ ({ target }) => setValue(Number(target.value)) }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ applyFilters }
        >
          Filtrar
        </button>
      </form>

      <div>
        {
          <button
            data-testid="button-remove-filters"
            type="button"
            disabled={ isDisabled }
            onClick={ removeAllFilters }
          >
            Remover todos os filtros
          </button>
        }
        {
          filterByNumericValues.map((filterType, index) => (
            <div key={ index }>
              <p data-testid="filter">
                {`${filterType.column} ${filterType.comparison} ${filterType.value}`}

                <button
                  type="button"
                  id={ index }
                  onClick={ () => deleteFilter(index) }
                >
                  Remover filtro
                </button>
              </p>
            </div>
          ))
        }
      </div>

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
