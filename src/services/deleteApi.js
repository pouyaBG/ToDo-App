import Client from '../hooks/useAxios';

export async function DeleteTodo(id) {
  const response = await Client().delete(`/user/todos/${id}`);
  return response.data;
}

export async function DeleteTask(id) {
  const response = await Client().delete(`/task/0/${id}`);
  return response.data;
}
