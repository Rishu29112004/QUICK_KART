import axios from "axios";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: ApiUrl,
  withCredentials: true,
});

let isRefreshing = false;
let refreshQueue = [];

const runQueue = () => {
  refreshQueue.forEach((cb) => cb());
  refreshQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          isRefreshing = false;
          refreshQueue = [];
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(error);
        }

        const response = await axiosInstance.post("/api/auth/refresh-token", {
          refreshToken,
        });

        if (response.data?.data?.token) {
          localStorage.setItem("accessToken", response.data.data.token);
          axiosInstance.defaults.headers.common["Authorization"] =
            `Bearer ${response.data.data.token}`;
        }

        isRefreshing = false;
        runQueue();
        return axiosInstance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        refreshQueue = [];
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(err);
      }
    }

    return new Promise((resolve) => {
      refreshQueue.push(() => resolve(axiosInstance(originalRequest)));
    });
  },
);

export default axiosInstance;
