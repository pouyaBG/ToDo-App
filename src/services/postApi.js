import Client from '../hooks/useAxios';

export async function postLogin(data) {
  let ApiCall = await Client().post('/user/login', data);
  return ApiCall.data;
}

export async function postSingUp(data) {
  let ApiCall = await Client().post('/user/signup', data);
  return ApiCall.data;
}

export const PostTodoUser = async (data) => {
  const response = await Client().post('/user/todos', data);
  return response.data;
};
