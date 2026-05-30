import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { LayoutProvider, useLayout, useToggleNav } from '../contexts';
import { Nav, PokemonDialog } from '../components';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './client';
import { ListPage, Home } from '../screens';

const MobileMenuButton = () => {
  const { navCollapsed } = useLayout();
  const toggleNav = useToggleNav();

  if (!navCollapsed) return null;

  return (
    <button
      className="md:hidden fixed top-3 left-3 z-[98] flex items-center justify-center w-10 h-10 rounded-lg bg-[#131924] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 shadow-lg"
      onClick={toggleNav}
      aria-label="Open navigation"
    >
      <span className="material-icons text-[20px]">menu</span>
    </button>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <LayoutProvider>
        <div className="bg-[#171E2b] min-h-screen min-w-full h-full w-full flex">
          <HashRouter future={{ v7_startTransition: true }}>
            <Nav />
            <MobileMenuButton />
            <div className="flex-1 overflow-hidden relative">
              <div className="absolute inset-0 overflow-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="pokemon" element={<ListPage />}>
                    <Route path=":id" element={<PokemonDialog open={true} />} />
                  </Route>
                  <Route path="*" element={<Home />} />
                </Routes>
              </div>
            </div>
          </HashRouter>
        </div>
      </LayoutProvider>
    </ApolloProvider>
  );
}

export default App;
