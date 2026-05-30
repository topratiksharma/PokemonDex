import React from 'react';
import { useLayout, useToggleNav } from '../../contexts';
import clsx from 'clsx';
import { NavOption } from './NavOption';

export const Nav = () => {
  const { navCollapsed } = useLayout();
  const toggleNav = useToggleNav();

  return (
    <>
      <div
        className={clsx(
          'z-[100] bg-[#131924] fixed left-0 top-0 bottom-0 flex flex-col overflow-hidden transition-all duration-300 border-r border-white/[0.06] shadow-[4px_0_24px_rgba(0,0,0,0.3)]',
          navCollapsed ? 'w-[81px]' : 'w-[320px]'
        )}
      >
        <nav id="main-nav" className="flex-1">
          <div className="flex items-center px-[18px] py-3 border-b border-white/[0.06] mb-2">
            <img src="/pokeball-white.png" className="w-10 brightness-75 shrink-0" alt="Pokéball logo" />
            <h3 className="ml-4 whitespace-nowrap text-white/90 font-semibold tracking-wide overflow-hidden">Pokémon</h3>
          </div>
          <NavOption to="/" icon="home" name="Home">Home</NavOption>
          <NavOption to="/pokemon" icon="list" name="List">List</NavOption>
        </nav>
        <div className="flex items-center px-[18px] py-3 border-t border-white/10">
          <button
            className="flex items-center w-full cursor-pointer overflow-hidden rounded-lg px-2 py-2 text-white/60 hover:bg-white/[0.06] hover:text-white/90 active:bg-white/10 transition-all duration-150"
            onClick={toggleNav}
            aria-label={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            aria-expanded={!navCollapsed}
            aria-controls="main-nav"
          >
            <span className="material-icons rotate-90 shrink-0 text-[20px]">
              {navCollapsed ? 'unfold_more' : 'unfold_less'}
            </span>
            <span className="ml-4 whitespace-nowrap text-sm font-medium overflow-hidden">Collapse</span>
          </button>
        </div>
      </div>
      <div
        className={clsx(
          'shrink-0 transition-all duration-300',
          navCollapsed ? 'w-[81px]' : 'w-[320px]'
        )}
      />
    </>
  );
};
