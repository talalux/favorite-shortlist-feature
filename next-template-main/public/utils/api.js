// utils/api.js
import api from "./axios";

export const get = (url, config = {}) => api.get(url, config);

export const post = (url, data, config = {}) =>
  api.post(url, data, config);

export const put = (url, data, config = {}) =>
  api.put(url, data, config);

export const del = (url, config = {}) => api.delete(url, config);
