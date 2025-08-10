/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { signup, login } from "../services/authService"
import { useNavigate } from "react-router-dom"

type Props = {
 onSwitch: () =>  void
}

export const SignInForm = ({onSwitch}: Props) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async(e:React.FormEvent) => {
     e.preventDefault()
     setLoading(true);
     setError('');

     try {
      const response = await login({ email, password });
      console.log("Login Success: ", response);
      localStorage.setItem("loggedIn", "true");
      navigate('/dashboard');
     } catch (err: any) {
      setError(err.message || "Login failed")
     } finally {
      setLoading(false);
     }

    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
        
        <form className="space-y-4 text-gray-900" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500" onClick={() => alert("Feature coming soon!")}>Forgot password?</a>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors" disabled={loading}>
            {loading ? 'Trying to Login...' : 'Login'}
          </button>

          {error && <p className="text-red-700">{error}</p>}

        </form>

          
        <div className="mt-6 text-center text-sm text-gray-600">
          Don&#39;t have an account? 
          <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium" onClick={onSwitch}>Sign up</a>
        </div>
      </div>
    </div>
  )
}



export const SignUpForm = ({ onSwitch }: Props) => {
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [message, setMessage] = useState("")
 const [showModal, setShowModal] = useState(false)
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");


 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setLoading(true);
  setError('');

      if (!email || !password) {
        setMessage("invalid input")
        setShowModal(true)
        setTimeout(() => setShowModal, 3000);
        return;
      }

      try {
        const result = await signup(email, password);
        setMessage("Account created successfully!");
        console.log(result);
      } catch (err) {
        setMessage("Account creation process failed, Try again in few minutes");
        console.log(err);
      }
        
 }
 return(
  <div className="relative">
    
              {showModal && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
                        <p className="text-gray-800">{message}</p>
                        <button onClick={() => setShowModal(false)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">CLOSE</button>
                    </div>
                </div>
              )}
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign Up</h2>
          
              <form className="space-y-4 text-gray-900" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full px-4 py-2 border border-blue-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full px-4 py-2 border border-blue-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors" type="submit" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                {message && <p>{message}</p>}
                {error && <p className="text-red-700">{error}</p>}
              </form>
          

              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?
                <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium" onClick={onSwitch}>Sign In</a>
              </div>
            </div>
          </div>
  </div>

 )
}
