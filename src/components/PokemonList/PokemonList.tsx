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
    <div className="flex flex-col min-h-screen box-border">
      {/* Search header */}
      {!loading && (
        <div
          className="sticky top-0 z-[2] flex items-center justify-between gap-4 py-3 pl-14 pr-4 md:px-6"
          style={{
            background: 'var(--c-header-bar)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--c-rim-header)',
          }}
        >
          <div className="relative flex-1 max-w-md">
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none">
              search
            </span>
            <label htmlFor="search" className="sr-only">Search Pokémon</label>
            <input
              type="text"
              id="search"
              placeholder="Search…"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="search-input w-full pl-9 pr-9 py-2 text-[14px] rounded-xl outline-none transition-all duration-200"
              style={{
                background: 'var(--c-search)',
                border: '1px solid var(--c-rim-search)',
                color: 'var(--c-text)',
                fontFamily: '"Figtree", sans-serif',
              }}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full transition-all"
                style={{ background: 'var(--c-rim)' }}
              >
                <span className="material-icons text-[13px]">close</span>
              </button>
            )}
          </div>

          {filteredPokemons.length > 0 && (
            <span
              className="shrink-0 text-[11px] tabular-nums px-3 py-1.5 rounded-full"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                color: 'var(--c-count-text)',
                background: 'var(--c-count-bg)',
                border: '1px solid var(--c-rim-count)',
              }}
            >
              {filteredPokemons.length}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className="flex-1 px-4 pt-5 pb-12">
        {loading && (
          <div className="flex flex-col items-center justify-center mt-24 gap-4">
            <CircularProgress size={24} sx={{ color: 'var(--c-loading-text)' }} />
            <p
              className="text-[11px] tracking-[0.18em] uppercase"
              style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--c-loading-text)' }}
            >
              Loading
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center mt-24">
            <span className="material-icons text-4xl mb-3">wifi_off</span>
            <p className="text-[14px]" style={{ color: 'var(--c-text-2)' }}>Failed to load Pokémon.</p>
          </div>
        )}

        {!loading && !error && filteredPokemons.length === 0 && debouncedSearch && (
          <div className="flex flex-col items-center justify-center mt-24">
            <span className="material-icons text-5xl mb-4">search_off</span>
            <p className="text-[15px] font-semibold" style={{ color: 'var(--c-text-2)' }}>
              No results for "{debouncedSearch}"
            </p>
          </div>
        )}

        {!loading && !error && filteredPokemons.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
            {filteredPokemons.map((pkmn, i) => (
              <Link
                key={pkmn.id}
                to={`/pokemon/${pkmn.id}`}
                className="rounded-2xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2"
                aria-label={`View ${pkmn.name}`}
              >
                <PokemonCard
                  id={pkmn.id}
                  number={pkmn.number}
                  image={pkmn.image}
                  name={pkmn.name}
                  types={pkmn.types}
                  animationDelay={Math.min(i * 18, 600)}
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
