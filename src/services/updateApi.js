import Client from '../hooks/useAxios';

export const PostComplatedTodo = async (id, data) => {
  const response = await Client().put(`/user/todos/${id}`, data);
  return response.data;
};

export const PostUnComplatedTodo = async (id, data) => {
  const response = await Client().put(`/user/todos/${id}`, data);
  return response.data;
};
