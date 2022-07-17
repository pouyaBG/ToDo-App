import Auth from './view/Auth';
import Panel from './view/Dashboard/Panel';
import NotFound from './view/NotFound/NotFound';
import RenderTodo from './view/Todos/RenderTodos';
import Profile from './view/Profile/Profile';
import RenderWorkSpase from './view/WorkSpase/RenderWorkSpase';

const routes = [
  { path: '/panel/profile', element: <Profile /> },
  { path: '/panel/workspase', element: <RenderWorkSpase /> },
  { path: '/panel/mytodo', element: <RenderTodo /> },
  { path: '/panel', element: <Panel /> },
  { path: '/', element: <Auth /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
