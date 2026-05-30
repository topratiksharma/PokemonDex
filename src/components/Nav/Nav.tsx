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
          'z-[100] bg-[#131924] fixed left-0 top-0 bottom-0 flex flex-col overflow-hidden transition-all duration-200 border-r border-white/[0.06]',
          navCollapsed ? 'w-[81px]' : 'w-[320px]'
        )}
      >
        <nav id="main-nav" className="flex-1 [&>*]:px-[18px]">
          <div className="flex items-center">
            <img src="/pokeball-white.png" className="w-12 py-3 brightness-75" alt="Pokéball logo" />
            <h3 className="ml-[18px] whitespace-nowrap">Pokémon</h3>
          </div>
          <NavOption to="/" icon="home" name="Home">Home</NavOption>
          <NavOption to="/pokemon" icon="list" name="List">List</NavOption>
        </nav>
        <div className="flex items-center justify-start px-[18px] py-3 border-t border-white/10">
          <button
            className="bg-transparent relative flex items-center justify-start w-full cursor-pointer overflow-hidden hover:bg-white/[0.04] active:bg-white/[0.06] p-0"
            onClick={toggleNav}
            aria-label={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            aria-expanded={!navCollapsed}
            aria-controls="main-nav"
          >
            <span className={clsx('material-icons rotate-90')}>
              {navCollapsed ? 'unfold_more' : 'unfold_less'}
            </span>
            <span className="ml-[18px] whitespace-nowrap transition-all duration-200">Collapse</span>
          </button>
        </div>
      </div>
      <div
        className={clsx(
          'h-full transition-all duration-200',
          navCollapsed ? 'w-[81px]' : 'w-[320px]'
        )}
      />
    </>
  );
};
