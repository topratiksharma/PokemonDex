import React from 'react';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import { ThemeModeProvider, useColorScheme } from '../contexts';
import { PokemonDialog } from '../components';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './client';
import { ListPage } from '../screens';

const TopBar = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        height: '48px',
        background: 'var(--c-topbar)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--c-rim-header)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src="/pokeball-white.png"
          style={{ width: '20px', height: '20px', filter: 'var(--c-logo-filter)', flexShrink: 0 }}
          alt=""
        />
        <span
          style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: '17px',
            letterSpacing: '-0.02em',
            color: 'var(--c-text)',
            lineHeight: 1,
          }}
        >
          Pokédex
        </span>
      </div>

      <button
        onClick={toggleColorScheme}
        aria-label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'transparent',
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-nav-hover)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <span
          className="material-icons"
          style={{ fontSize: '18px', color: 'var(--c-toggle-icon)' }}
        >
          {colorScheme === 'dark' ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
    </div>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeModeProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <HashRouter future={{ v7_startTransition: true }}>
            <TopBar />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Navigate to="/pokemon" replace />} />
                <Route path="pokemon" element={<ListPage />}>
                  <Route path=":id" element={<PokemonDialog open={true} />} />
                </Route>
                <Route path="*" element={<Navigate to="/pokemon" replace />} />
              </Routes>
            </div>
          </HashRouter>
        </div>
      </ThemeModeProvider>
    </ApolloProvider>
  );
}

export default App;
