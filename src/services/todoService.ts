import { fetchApi } from "./api";

export type Todo = {
 id?: number;
 title: string;
 description: string;
 isCompleted: boolean;
}
export const getItems = (): Promise<Todo[]> => { 
  return fetchApi("/todos")
};

export const getItem = (id: number): Promise<Todo> => { 
  return fetchApi(`/todo/${id}`);
};

export const createItem = (data: Omit<Todo, 'id'>): Promise<Todo> => { 
  return fetchApi("/todo", {
    method: "POST",
    body: data,
  });
};

export const updateItem = (id: number, data: Omit<Todo, 'id'>): Promise<Todo> => { 
  return fetchApi(`/todo/${id}`, {
   method: "PUT",
   body: data,
  })
};

export const deleteItem = (id: number): Promise<void> => { 
  return fetchApi(`/todo/${id}`, {
   method: 'DELETE',
  })
};
