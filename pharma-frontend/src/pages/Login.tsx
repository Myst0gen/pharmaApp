import  { useState } from 'react'
import type { LoginForm } from '../types';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
const[error, setError] = useState<string | null>(null);
const[form, setForm] = useState<LoginForm>({ username: "", password: "" });
const navigate = useNavigate();


const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
        
        if(form.username!='' && form.password!=''){
            var response = await api.post("/Login", form);
            localStorage.setItem("token", response.data.token);
            navigate("/medicines");
        }
        else
            setError("Please fill in all fields");
    } catch (error) {
        setError("Invalid username or password");
    }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Pharma Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login