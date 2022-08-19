import { Box, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonCard } from '../PokemonCard';
import { PokemonDialog } from '../PokemonDialog';

export const PokemonList = () => {
  const classes: any = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSeletecdId] = React.useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<
    Pokemon[] | undefined
  >();

  const handleClickOpen = (id: string) => {
    setSeletecdId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  const handleChange = () => {
    const searchParam: any = document.getElementById('search');
    if (searchParam.value) {
      // filter with params
      const filteredPok = pokemons.filter((pkmn) =>
        pkmn.name.toLowerCase().includes(searchParam.value.toLowerCase())
      );
      setFilteredPokemons(filteredPok);
    } else {
      setFilteredPokemons(pokemons);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.pokemonContainer}>
        {!loading && (
          <div className={classes.searchComponent}>
            <input
              type="text"
              id="search"
              placeholder="Search"
              onChange={handleChange}
              className={classes.search}
            />
          </div>
        )}
        <div className={classes.allContainer}>
          {loading && (
            <div>
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            </div>
          )}
          {filteredPokemons?.map((pkmn) => (
            <Button
              component={Link}
              to={`/pokemon/details/${pkmn.id}`}
              key={pkmn.id}
            >
              <PokemonCard
                id={pkmn.id}
                number={pkmn.number}
                image={pkmn.image}
                name={pkmn.name}
                types={pkmn.types}
              ></PokemonCard>
            </Button>
          ))}
        </div>
      </div>
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
      '@media (max-width: 1362px)': { width: '74vw' },
      '@media (max-width: 848px)': { width: '58vw' },
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
