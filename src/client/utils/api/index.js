import axios from 'axios';

import history from './../history';

const pkg = require('./../../../../package.json');

let baseURL = process.env.DOMAIN_PROD; 

if (process.env.NODE_ENV === 'production') {
  baseURL = '/';
}

const fetch = axios.create({ baseURL });
fetch.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token') 
    if (token && token.length) {
      config.headers['Authorization'] = token;
    }

    config.headers['Cache-Control'] =
      'no-cache,no-store,must-revalidate,max-age=-1,private';

    if (process.env.NODE_ENV === 'development') {
      const keys = Object.keys(pkg.proxy);
      for (const key of keys) {
        const reg = new RegExp('^' + key.replace(/:\w+/gi, '(\\w+)') + '$');
        if (config.url.match(reg)) {
          config.baseURL = process.env.DOMAIN_LOCAL;
          continue;
        } else {
          config.baseURL = baseURL;
        }
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  response => {
    if (
      response.data == null &&
      response.config.responseType === 'json' &&
      response.request.responseText != null
    ) {
      try {
        // eslint-disable-next-line no-param-reassign
        response.data = JSON.parse(response.request.responseText)
      } catch (error) {
        // ignored
      }
    }
    if (response.request.responseType === 'arraybuffer') {
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText
      };
    }
    return {
      ...response.data,
      status: response.status,
      statusText: response.statusText
    };
  },
  error => {
    if (error.response && error.response.status === 401) {
      if (!history.location.pathname.includes('auth')) {
        history.push('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default fetch;
