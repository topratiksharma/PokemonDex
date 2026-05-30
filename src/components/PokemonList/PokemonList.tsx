import { Box, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonCard } from '../PokemonCard';

export const PokemonList = () => {
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
    <div className="flex flex-col items-center min-h-screen pt-[85px] pb-8 px-4 box-border">
      {!loading && (
        <div className="fixed top-0 left-0 right-0 z-[2] flex items-center justify-center h-[69px] bg-[#171e2b] border-b border-white/[0.06] backdrop-blur-sm px-4">
          <input
            type="text"
            id="search"
            placeholder="Search Pokémon…"
            aria-label="Search Pokémon"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm transition-all duration-150"
          />
        </div>
      )}

      <div className="flex flex-wrap items-start justify-center gap-1 w-full">
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 8 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <p className="text-red-400 mt-8">Failed to load Pokémon. Please try again.</p>
        )}
        {filteredPokemons.map((pkmn) => (
          <Button
            component={Link}
            to={`/pokemon/${pkmn.id}`}
            key={pkmn.id}
            sx={{ p: 0, minWidth: 0, textTransform: 'none' }}
          >
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
      <Outlet />
    </div>
  );
};
