import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// pages
import Auth from './view/Auth';
import Panel from "./components/layout/Panel"

function App() {
  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path="panel" element={<Panel />}>
            <Route path="todos" />
            <Route path="workspase" />
            <Route path="profile" />
          </Route>
        </Routes>
      </div>
    </CacheProvider>
  );
}

export default App;
