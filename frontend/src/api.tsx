import axios from "axios";

const BASE_URL = "http://localhost:8000";

export async function fetchEvents() {
  const res = await axios.get(`${BASE_URL}/events`);
  return res.data;
}

export async function fetchStats() {
  const res = await axios.get(`${BASE_URL}/stats`);
  return res.data;
}

export async function postConfirm() {
  const res = await axios.post(`${BASE_URL}/confirm`);
  return res.data;
}

export async function resetLatest() {
  const res = await axios.post(`${BASE_URL}/reset_latest`);
  return res.data;
}
