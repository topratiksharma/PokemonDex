import React from 'react';
import { useLayout, useToggleNav } from '../../contexts';
import clsx from 'clsx';
import { NavOption } from './NavOption';

export const Nav = () => {
  const { navCollapsed } = useLayout();
  const toggleNav = useToggleNav();

  return (
    <>
      {!navCollapsed && (
        <div
          className="md:hidden fixed inset-0 z-[99]"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
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
          background: 'rgba(7, 10, 18, 0.88)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <nav id="main-nav" className="flex-1">
          {/* Wordmark */}
          <div
            className="flex items-center px-3.5 py-4 mb-2"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <img
              src="/pokeball-white.png"
              className="w-7 shrink-0 opacity-60"
              alt=""
            />
            <span
              className="ml-3 whitespace-nowrap overflow-hidden text-white/90 text-[17px] leading-none"
              style={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' }}
            >
              Pokédex
            </span>
          </div>

          <NavOption to="/" icon="home" name="Home">Home</NavOption>
          <NavOption to="/pokemon" icon="grid_view" name="Pokémon">Pokémon</NavOption>
        </nav>

        <div
          className="px-2.5 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <button
            className="hidden md:flex items-center w-full rounded-xl px-2.5 py-2 transition-all duration-150"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            onClick={toggleNav}
            aria-label={navCollapsed ? 'Expand' : 'Collapse'}
          >
            <span
              className="material-icons !text-white/30 text-[18px] shrink-0 transition-transform duration-300"
              style={{ transform: navCollapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}
            >
              chevron_left
            </span>
            <span className="ml-3 whitespace-nowrap text-[13px] font-medium overflow-hidden text-white/40">
              Collapse
            </span>
          </button>
          <button
            className="md:hidden flex items-center w-full rounded-xl px-2.5 py-2 transition-all duration-150"
            onClick={toggleNav}
          >
            <span className="material-icons !text-white/30 text-[18px] shrink-0">close</span>
            <span className="ml-3 whitespace-nowrap text-[13px] font-medium text-white/40">Close</span>
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
