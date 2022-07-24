import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// styles
import './App.scss';

// pages
import Auth from './view/Auth';
import Panel from './components/layout/Panel';
import { isLogin } from './services/getApi';

function App() {
  const redirect = useNavigate();

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });

  React.useEffect(() => {
    isLogin()
      .then(() => {})
      .catch((err) => {
        if (err.response.status == 401) {
          console.log('user not login');
          redirect('/');
          localStorage.clear();
        }
      });
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='panel' element={<Panel />}>
            <Route path='todos' />
            <Route path='workspase' />
            <Route path='profile' />
            <Route path='task' />
          </Route>
        </Routes>
      </div>
    </CacheProvider>
  );
}

export default App;
