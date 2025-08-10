// const BASE_URL = import.meta.env.BASE_URL || "https://localhost:5001/api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type RequestOptions = {
 method?: string;
 body?: object;
 headers?: HeadersInit;
};

export const fetchApi = async (endpoint: string, options: RequestOptions = {}) => {
 const { method = 'GET', body, headers = {} } = options;

 const res = await fetch(`${BASE_URL}${endpoint}`, {
  method,
  headers: {
   'Content-Type': 'application/json',
   ...headers,
  },
  body: body ? JSON.stringify(body) : undefined,
 });

 if (!res.ok) {
  const errorData = await res.json().catch(() => ({}));
  throw new Error(errorData.message || 'An error occured');
 }

 return res.json();
}