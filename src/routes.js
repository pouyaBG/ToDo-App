import Auth from './view/Auth';
import Panel from './view/Dashboard/Panel';
import NotFound from './view/NotFound/NotFound';
import RenderTodo from './view/Todos/RenderTodos';
import Profile from './view/Profile/Profile';

const routes = [
  { path: '/', element: <Auth /> },
  { path: '/panel', element: <Panel /> },
  { path: '/panel/mytodo', element: <RenderTodo /> },
  { path: '/panel/profile', element: <Profile /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
