import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '';


export const getItems = async (params: { offset: number; limit: number; search: string }) => {
  const res = await axios.get(`${API}/items`, { params });
  return res.data.items;
};

export const postSelect = async (selected: number[]) => {
  await axios.post(`${API}/select`, { selected });
};

export const postSort = async (sorted: number[]) => {
  await axios.post(`${API}/sort`, { sorted });
};

export const getState = async () => {
  const res = await axios.get(`${API}/state`);
  return res.data;
};
