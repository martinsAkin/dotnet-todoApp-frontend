import { fetchApi } from "./api";

export const signup = (email: string, password: string) => {
 return fetchApi('/auth/signup', {
  method: 'POST',
  body: { email, password },
 });
};


export const login = (credentials: {email: string, password: string}) => {
 return fetchApi('/auth/login', {
  method: 'POST',
  body: credentials,
 });
};
