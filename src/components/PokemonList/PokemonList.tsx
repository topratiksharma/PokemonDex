import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonCard } from '../PokemonCard';

export const PokemonList = () => {
  const { pokemons, loading, error } = useGetPokemons();
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  useEffect(() => { setFilteredPokemons(pokemons); }, [pokemons]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchValue), 300);
    return () => clearTimeout(t);
  }, [searchValue]);

  useEffect(() => {
    setFilteredPokemons(
      debouncedSearch
        ? pokemons.filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
        : pokemons
    );
  }, [debouncedSearch, pokemons]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search bar */}
      {!loading && (
        <div
          className="sticky top-0 z-[2] flex items-center gap-3 py-2.5 pl-14 pr-4 md:px-5"
          style={{
            background: 'var(--c-header-bar)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--c-rim-header)',
          }}
        >
          <div className="relative flex-1 max-w-xs">
            <span className="material-icons absolute left-2.5 top-1/2 -translate-y-1/2 text-[16px] pointer-events-none">
              search
            </span>
            <label htmlFor="search" className="sr-only">Search Pokémon</label>
            <input
              type="text"
              id="search"
              placeholder="Search…"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="search-input w-full pl-8 pr-7 py-1.5 text-[13px] rounded-lg outline-none transition-all duration-150"
              style={{
                background: 'var(--c-search)',
                border: '1px solid var(--c-rim-search)',
                color: 'var(--c-text)',
                fontFamily: '"Instrument Sans", sans-serif',
              }}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue('')}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <span className="material-icons text-[14px]">close</span>
              </button>
            )}
          </div>

          <span
            className="text-[11px] tabular-nums ml-auto"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              color: 'var(--c-count-text)',
            }}
          >
            {filteredPokemons.length}
          </span>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 px-4 pt-5 pb-12">
        {loading && (
          <div className="flex flex-col items-center justify-center mt-24 gap-3">
            <CircularProgress size={20} sx={{ color: 'var(--c-text-3)' }} />
            <span
              className="text-[11px] tracking-widest uppercase"
              style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--c-text-3)' }}
            >
              Loading
            </span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center mt-24 gap-2">
            <span className="material-icons text-3xl" style={{ color: 'var(--c-text-3)' }}>wifi_off</span>
            <p className="text-[13px]" style={{ color: 'var(--c-text-2)' }}>Failed to load Pokémon.</p>
          </div>
        )}

        {!loading && !error && filteredPokemons.length === 0 && debouncedSearch && (
          <div className="flex flex-col items-center justify-center mt-24 gap-2">
            <span className="material-icons text-4xl" style={{ color: 'var(--c-text-3)' }}>search_off</span>
            <p className="text-[14px] font-medium" style={{ color: 'var(--c-text-2)' }}>
              No results for "{debouncedSearch}"
            </p>
          </div>
        )}

        {!loading && !error && filteredPokemons.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {filteredPokemons.map((pkmn, i) => (
              <Link
                key={pkmn.id}
                to={`/pokemon/${pkmn.id}`}
                className="rounded-2xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
                style={{ '--tw-ring-color': 'var(--c-rim-search)' } as React.CSSProperties}
                aria-label={`View ${pkmn.name}`}
              >
                <PokemonCard
                  id={pkmn.id}
                  number={pkmn.number}
                  image={pkmn.image}
                  name={pkmn.name}
                  types={pkmn.types}
                  animationDelay={Math.min(i * 14, 500)}
                />
              </Link>
            ))}
          </div>
        )}
      </div>

      <Outlet />
    </div>
  );
};
