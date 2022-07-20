import Client from '../hooks/useAxios';

export const isLogin = async () => {
  const response = await Client().get('/islogin');
  return response.data;
};

export const GetuserTodo = async () => {
  const response = await Client().get('/user/todos');
  return response.data;
};

export const GetUserInfo = async () => {
  const response = await Client().get('/user');
  return response.data;
};

export const GetUserWorkspase = async () => {
  const response = await Client().get('/work/workspase');
  return response.data;
};

export const GetProfileImg = async (id) => {
  const response = await Client().get('/list/'+ id);
  return response.data;
};
