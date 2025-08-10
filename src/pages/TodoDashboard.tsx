"use client"
import { useState, useEffect } from "react"
import { getItems, createItem, updateItem, deleteItem, type Todo } from "../services/todoService"


const Dashboard = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [formData, setFormData] = useState<Omit<Todo, "id">>({
    title: "",
    description: "",
    isCompleted: false,
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const [editId, setEditId] = useState<number | null> (null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getItems();
    setTodos(data);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev, 
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
       if (editId !== null) {
        await updateItem(editId, formData);
      } else{
        await createItem(formData);
      }
      setFormData({title: "", description: "", isCompleted: false});
      setEditId(null)
      loadTodos() 
      console.log('New item added')
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }

  }

  const handleEdit = (todo: Todo) => {
    try {
      setFormData({
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
    });

    setEditId(todo.id || null)
    console.log('Item edited successfully')

    } catch (err) {
      console.log(`An error occured ${err}`)
    }
  }

  const handleDelete = async(id: number) => {
    try {
      await deleteItem(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      console.log("Item deleted successfully")
    } catch (err) {
      console.log(`An error occured ${err}`);
    }
  }

 return(
  <div>
       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{editId ? "Edit Activity" : "Add A To-do Activity"}</h2>
          
              <form className="space-y-4 text-gray-900" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity Title:</label>

                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-2 border border-blue-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Title of event"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-blue-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="description of the activity..."
                  />
                </div>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isCompleted"
                    checked={formData.isCompleted}
                    onChange={handleChange}
                  />
                  <span>Completed</span>  
                </label>

                {error && <p className="text-red-700">{error}</p>}

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors" type="submit" disabled={loading}>
                  {loading ? "Updating Activity..." : "Save Activity"}
                </button>
              </form>

              <div className="space-y-3 mt-6">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="p-3 border rounded flex justify-between items-start"
                    >
                      <div>
                        <h3 className="font-semibold">{todo.title}</h3>
                        <p className="text-md text-grey-600">{todo.description}</p>
                        <p className="text-xs">Status: {" "}
                          <span className={`font-bold ${todo.isCompleted ? 'text-green-600' : 'text-red-700'}`}>
                            {todo.isCompleted ? 'Completed' : 'Pending'}
                          </span>
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(todo)} className="text-blue-800 underline rounded-lg">Edit</button>
                        <button className="bg-red-600 text-white underline rounded-lg" onClick={() => handleDelete(todo.id!)}>Delete</button>
                      </div>
                     </div>
                  ))}
              </div>
            </div>
          </div>
  </div>
 )
}

export default Dashboard