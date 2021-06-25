import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://class-calender.herokuapp.com/api',
});
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
