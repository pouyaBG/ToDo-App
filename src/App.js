import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// routes
import routes from './routes';

function App() {
  const [isLogin, serIsLogin] = React.useState(false);

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <div className='App'>
        <Routes>
          {routes.map((route, index) => {
            return <Route {...route} index={index} />;
          })}
        </Routes>
      </div>
    </CacheProvider>
  );
}

export default App;
