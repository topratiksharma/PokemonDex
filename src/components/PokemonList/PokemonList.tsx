import { Box, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link, Outlet } from 'react-router-dom';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonCard } from '../PokemonCard';

export const PokemonList = () => {
  const classes: any = useStyles();
  const { pokemons, loading, error } = useGetPokemons();
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchValue), 300);
    return () => clearTimeout(t);
  }, [searchValue]);

  useEffect(() => {
    if (debouncedSearch) {
      setFilteredPokemons(
        pokemons.filter((p) =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      );
    } else {
      setFilteredPokemons(pokemons);
    }
  }, [debouncedSearch, pokemons]);

  return (
    <div className={classes.root}>
      <div className={classes.pokemonContainer}>
        {!loading && (
          <div className={classes.searchComponent}>
            <input
              type="text"
              id="search"
              placeholder="Search Pokémon"
              aria-label="Search Pokémon"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={classes.search}
            />
          </div>
        )}
        <div className={classes.allContainer}>
          {loading && (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}
          {error && <p>Failed to load Pokémon. Please try again.</p>}
          {filteredPokemons.map((pkmn) => (
            <Button component={Link} to={`/pokemon/${pkmn.id}`} key={pkmn.id}>
              <PokemonCard
                id={pkmn.id}
                number={pkmn.number}
                image={pkmn.image}
                name={pkmn.name}
                types={pkmn.types}
              />
            </Button>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '32px',
      textAlign: 'center',
    },
    search: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      color: '#180d0d',
      fontSize: '16px',
      height: '2rem',
      padding: '5px 10px',
      width: '84vw',
      '@media (max-width: 1280px)': { width: '74vw' },
      '@media (max-width: 768px)': { width: '58vw' },
    },
    searchComponent: {
      alignItems: 'center',
      background: '#171e2b',
      display: 'flex',
      flexWrap: 'wrap',
      height: '69px',
      justifyContent: 'center',
      position: 'fixed',
      top: '0',
      width: '100%',
      zIndex: 2,
    },
    pokemonContainer: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '50px',
    },
    allContainer: {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
  { name: 'PokemonList' }
);
