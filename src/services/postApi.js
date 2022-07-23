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

export const PostComplatedTodo = async (id, data) => {
  const response = await Client().put(`/user/todos/${id}/completed`, data);
  return response.data;
};

export async function postUpload(data) {
  const response = await Client().post(`/upload/profile/image`, data, {
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    },
  });
  return response.data;
}

export const PostWorkSpase = async (data) => {
  const response = await Client().post('/work/workspase', data);
  return response.data;
};
