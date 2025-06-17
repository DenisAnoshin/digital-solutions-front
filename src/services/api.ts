import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '/api';

export const getItems = async (params: { offset: number; limit: number; search: string }) => {
  const res = await axios.get(`${API}/items`, { params });
  return res.data;
};

export const postSelect = async (payload: { id: number; selected: boolean }) => {
  await axios.post(`${API}/select`, payload);
};

export const postSort = async ({ fromId, toId }: { fromId: number; toId: number }) => {
  await axios.post(`${API}/sort`, { fromId, toId });
};
