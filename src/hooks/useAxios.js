const axios = require('axios');

const Client = axios.create({
  baseURL: 'https://tasked.iran.liara.run',
  headers: {
    accept: 'text/plain',
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (router = null) => {
  Client.interceptors.request.use(
    function (config) {
      config.headers['token'] = localStorage.getItem('token');
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  Client.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (!error.response) {
      } else {
        if (error.response.status === 401) {
          // localStorage.clear();
        }
        if (error.response.status === 403) {
          // alert('403 Forbidden Error')
        }

        if (error.response.status === 404) {
          //  alert(404)
        }
        if (error.response.status === 500) {
        }
      }
      return Promise.reject(error);
    }
  );
  return Client;
};
