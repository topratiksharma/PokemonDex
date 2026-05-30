import React from 'react';
import { useLayout, useToggleNav, useColorScheme } from '../../contexts';
import clsx from 'clsx';
import { NavOption } from './NavOption';

export const Nav = () => {
  const { navCollapsed } = useLayout();
  const toggleNav = useToggleNav();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      {!navCollapsed && (
        <div
          className="md:hidden fixed inset-0 z-[99]"
          style={{ background: 'var(--c-backdrop)', backdropFilter: 'blur(4px)' }}
          onClick={toggleNav}
          aria-hidden="true"
        />
      )}

      <div
        className={clsx(
          'z-[100] fixed left-0 top-0 bottom-0 flex flex-col overflow-hidden transition-all duration-300',
          navCollapsed
            ? '-translate-x-full md:translate-x-0 md:w-[56px]'
            : 'translate-x-0 w-[220px] md:w-[220px]'
        )}
        style={{
          background: 'var(--c-nav)',
          borderRight: '1px solid var(--c-rim-nav)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <nav id="main-nav" className="flex-1">
          {/* Wordmark */}
          <div
            className="flex items-center px-3.5 py-4 mb-2"
            style={{ borderBottom: '1px solid var(--c-rim-nav)' }}
          >
            <img
              src="/pokeball-white.png"
              className="w-7 shrink-0"
              style={{ filter: 'var(--c-logo-filter)' }}
              alt=""
            />
            <span
              className="ml-3 whitespace-nowrap overflow-hidden text-[17px] leading-none"
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--c-wordmark)',
              }}
            >
              Pokédex
            </span>
          </div>

          <NavOption to="/" icon="home" name="Home">Home</NavOption>
          <NavOption to="/pokemon" icon="grid_view" name="Pokémon">Pokémon</NavOption>
        </nav>

        {/* Theme toggle */}
        <div className="px-2.5 pb-1" style={{ borderTop: '1px solid var(--c-rim-nav)' }}>
          <button
            className="flex items-center w-full rounded-xl px-2.5 py-2.5 transition-all duration-150"
            onClick={toggleColorScheme}
            aria-label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-nav-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span
              className="material-icons text-[19px] shrink-0"
              style={{ color: 'var(--c-toggle-icon)' }}
            >
              {colorScheme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
            <span
              className="ml-3 whitespace-nowrap text-[13px] font-semibold overflow-hidden"
              style={{ color: 'var(--c-collapse-text)' }}
            >
              {colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          </button>
        </div>

        {/* Collapse / close */}
        <div className="px-2.5 py-2.5">
          <button
            className="hidden md:flex items-center w-full rounded-xl px-2.5 py-2 transition-all duration-150"
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-nav-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            onClick={toggleNav}
            aria-label={navCollapsed ? 'Expand' : 'Collapse'}
          >
            <span
              className="material-icons text-[18px] shrink-0 transition-transform duration-300"
              style={{
                color: 'var(--c-toggle-icon)',
                transform: navCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
              }}
            >
              chevron_left
            </span>
            <span
              className="ml-3 whitespace-nowrap text-[13px] font-medium overflow-hidden"
              style={{ color: 'var(--c-collapse-text)' }}
            >
              Collapse
            </span>
          </button>
          <button
            className="md:hidden flex items-center w-full rounded-xl px-2.5 py-2 transition-all duration-150"
            onClick={toggleNav}
          >
            <span className="material-icons text-[18px] shrink-0" style={{ color: 'var(--c-toggle-icon)' }}>close</span>
            <span className="ml-3 whitespace-nowrap text-[13px] font-medium" style={{ color: 'var(--c-collapse-text)' }}>Close</span>
          </button>
        </div>
      </div>

      <div
        className={clsx(
          'hidden md:block shrink-0 transition-all duration-300',
          navCollapsed ? 'md:w-[56px]' : 'md:w-[220px]'
        )}
      />
    </>
  );
};
