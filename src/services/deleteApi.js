import Client from '../hooks/useAxios';

export default async function DeleteTodo(id) {
  const response = await Client().delete(`/user/todos/${id}`);
  return response.data;
}
