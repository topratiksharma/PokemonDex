import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { LayoutProvider } from '../contexts';
import { Nav, PokemonDialog } from '../components';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './client';
import { ListPage, Home } from '../screens';

function App() {
  return (
    <ApolloProvider client={client}>
      <LayoutProvider>
        <div className="bg-[#171E2b] min-h-screen min-w-full h-full w-full flex">
          <HashRouter future={{ v7_startTransition: true }}>
            <Nav />
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
