import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(username, password);
    setIsSubmitting(false);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Image */}
      <div className="relative hidden w-1/2 bg-center bg-cover lg:flex" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-teal-900/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="mb-6 text-5xl font-bold">Modern Dental Care</h1>
          <p className="text-xl text-teal-50">Managing your clinic has never been easier. Secure, fast, and reliable patient management system.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full p-8 lg:w-1/2 bg-slate-50">
        <div className="w-full max-w-md p-10 bg-white shadow-xl rounded-2xl">
          <div className="mb-8 text-center">
            <span className="text-4xl">🦷</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-800">Teeth Clinic</h2>
            <p className="mt-2 text-slate-500">Sign in </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 transition duration-200 border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter your username"
                required
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 transition duration-200 border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-sm text-center text-slate-500">
            <p>Don't have an account? Contact the administrator.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
