import axios from 'axios';
// import {apiLink} from '../constants/config';

const axiosInstance = axios.create({
  baseURL: 'https://api.premierevents.rw:444/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
