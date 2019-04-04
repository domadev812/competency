import axios from 'axios'

const api = process.env.NODE_ENV === 'production' ? ':8089/' : 'http://localhost:8089/'
const config = {
    headers: {
      Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoibWlndWVsIn0.XnBRt8Lo5aG0UjWWgPi683fgWi3yBNh4gZVh9YW-9Fg',
    } 
}

const instanceAPI = axios.create({
    baseURL: api
  });
  
instanceAPI.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const instanceLogin = axios.create({
    baseURL: api
  });
  
