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
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 text-center box-border">
      <div className="flex flex-col items-center justify-center mt-[50px]">
        {!loading && (
          <div className="fixed top-0 z-[2] flex flex-wrap items-center justify-center w-full h-[69px] bg-[#171e2b]">
            <input
              type="text"
              id="search"
              placeholder="Search Pokémon"
              aria-label="Search Pokémon"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="border border-white/10 rounded-xl px-4 py-2 text-[#180d0d] bg-white/90 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base h-8 w-[84vw] max-[1280px]:w-[74vw] max-[768px]:w-[58vw] transition-all"
            />
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center">
          {loading && (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}
          {error && <p className="text-red-400">Failed to load Pokémon. Please try again.</p>}
          {filteredPokemons.map((pkmn) => (
            <Button component={Link} to={`/pokemon/${pkmn.id}`} key={pkmn.id} sx={{ p: 0 }}>
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
