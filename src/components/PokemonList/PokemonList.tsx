import { Box, CircularProgress } from '@mui/material';
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
    <div className="flex flex-col min-h-screen pb-8 box-border">
      {!loading && (
        <div className="sticky top-0 z-[2] flex items-center justify-center h-[69px] bg-[#171e2b] border-b border-white/[0.06] backdrop-blur-sm pl-14 pr-4 md:px-4">
          <label htmlFor="search" className="sr-only">Search Pokémon</label>
          <input
            type="text"
            id="search"
            placeholder="Search Pokémon…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm transition-all duration-150"
          />
        </div>
      )}

      <div className="flex flex-wrap items-start justify-center gap-1 w-full px-4 pt-4">
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 8 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <p className="text-red-400 mt-8">Failed to load Pokémon. Please try again.</p>
        )}
        {!loading && !error && filteredPokemons.length === 0 && debouncedSearch && (
          <div className="flex flex-col items-center justify-center mt-16 text-white/50">
            <span className="material-icons text-5xl mb-3">search_off</span>
            <p className="text-lg font-medium">No Pokémon found</p>
            <p className="text-sm mt-1">Try a different name</p>
          </div>
        )}
        {filteredPokemons.map((pkmn) => (
          <Link
            key={pkmn.id}
            to={`/pokemon/${pkmn.id}`}
            className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171e2b]"
            aria-label={`View details for ${pkmn.name}`}
          >
            <PokemonCard
              id={pkmn.id}
              number={pkmn.number}
              image={pkmn.image}
              name={pkmn.name}
              types={pkmn.types}
            />
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};
