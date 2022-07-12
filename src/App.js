import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// pages
import Auth from './view/Auth';
import Panel from './view/Dashboard/Panel';
import NotFound from './view/NotFound/NotFound';
import RenderTodo from './view/Todos/RenderTodos';
import Profile from './view/Profile/Profile';

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
          <Route path='/' element={<Auth />} />
          
          <Route path='/panel' element={<Panel />} />
          <Route path='/panel/mytodo' element={<RenderTodo />} />
          <Route path='/panel/profile' element={<Profile />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CacheProvider>
  );
}

export default App;
