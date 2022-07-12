import Client from '../hooks/useAxios';

export const GetuserTodo = async (roter) => {
  const response = await Client(roter).get('/user/todos');
  return response.data;
};

export const GetUserInfo = async (roter) => {
  const response = await Client(roter).get('/user');
  return response.data;
};
