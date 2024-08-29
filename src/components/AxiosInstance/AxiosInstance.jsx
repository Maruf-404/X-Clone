import axios from 'axios';
import getCookie from "../../Cookies/GetCookie";
import removeCookie from '../../Cookies/RemoveCookie';

const accessToken = getCookie('accessToken');


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', 
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie('refreshToken');

      if (refreshToken) {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/v1/users/refresh-token',
            { refreshToken }
          );
          
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

          document.cookie = `accessToken=${newAccessToken}; path=/;`;
          document.cookie = `refreshToken=${newRefreshToken}; path=/;`;

          axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token failed', refreshError);
          removeCookie("accessToken");
          removeCookie("refreshToken");
      
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
