// api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://zn.by/',  // Укажите базовый URL вашего API
  withCredentials: true,
});

// Добавляем перехватчик для обработки 401 ошибок и обновления токенов
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 и запрос не был повторен
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get('refresh-token');  // Берем refresh токен из cookies
      if (refreshToken) {
        try {
          const { data } = await api.post('/api/auth/token/refresh/', { refresh: refreshToken });
          Cookies.set('access-token', data.access, { secure: true, sameSite: 'Strict' });
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
          return api(originalRequest);  // Повторно выполняем запрос с новым токеном
        } catch (refreshError) {
          Cookies.remove('access-token');
          Cookies.remove('refresh-token');
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

// Экспорт API-запросов
export const loginUser = (data) => api.post('/api/auth/login/', data);
export const registerUser = (data) => api.post('/api/auth/', data);
export const resetPassword = (email) => api.post('/api/auth/password-reset/', { email });
export const logoutUser = async () => {
  const response = await api.post('/api/auth/logout/');
  return response.data;
};
export const getUser = async () => {
  const response = await api.get('/api/auth/user/');
  return response.data;
};
export const updateUser = async (userData, method = 'PATCH') => {
  const response = await api({
    method: method,
    url: '/api/auth/user/',
    data: userData,
  });
  return response.data;
};

export const updateChannelLogo = async (channelId, file) => {
  const formData = new FormData();
  formData.append("favicon", file);

  const response = await api({
    method: "PATCH",
    url: `/api/v1/sources/${channelId}/logo/`,
    data: formData,
  });

  return response.data;
};

// Функции для работы с каналами
export const updateChannel = async (channelId, channelData, method = "PATCH") => {
  const isFormData = channelData instanceof FormData;

  const response = await api({
    method: method,
    url: `/api/v1/sources/${channelId}/`,
    data: channelData,
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
  });

  return response.data;
};

// Функция для удаления новостей
export const deleteNews = async (newsId) => {
  await api.delete(`/api/v1/news/${newsId}/`);
};

export const refreshToken = async (refresh) => {
  const response = await api.post('/api/auth/token/refresh/', { refresh });
  return response.data;
};

// Стандартная функция для аутентификации пользователя
export const authenticateUser = async (data) => {
  try {
    const response = await api.post('/login/', data);
    return response.data; 
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; 
    } else {
      throw new Error('Произошла ошибка при подключении к серверу');
    }
  }
};

export const getCurrencyRates = async () => {
  try {
    const response = await api.get('/api/v1/currency-rates/');
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных о курсах валют:", error);
  }
};

export const getWeather = async () => {
  try {
    const response = await api.get('/api/v1/weather/current/');
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
  }
};

export default api;
