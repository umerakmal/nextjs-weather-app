'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-500">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center transition-all duration-300"
        >
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              fill="#4285F4"
              d="M47.532 24.545c0-1.51-.137-3.016-.43-4.497H24v8.494h13.235c-.579 2.96-2.313 5.45-4.894 7.11v5.89h7.91c4.623-4.26 7.28-10.53 7.28-17.5z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.57 0 12.082-2.177 16.11-5.904l-7.91-5.89c-2.155 1.45-4.9 2.311-8.2 2.311-6.303 0-11.64-4.225-13.554-9.926H2.338v6.235C6.35 43.231 14.63 48 24 48z"
            />
            <path
              fill="#FBBC05"
              d="M10.446 28.69C9.962 27.24 9.7 25.68 9.7 24c0-1.68.262-3.24.745-4.69V13.07H2.338A23.986 23.986 0 000 24c0 3.924.933 7.624 2.598 10.93l7.848-6.24z"
            />
            <path
              fill="#EA4335"
              d="M24 9.54c3.575 0 6.772 1.24 9.29 3.677l6.957-6.956C35.964 2.356 30.571 0 24 0 14.63 0 6.35 4.769 2.338 12.07l7.853 6.24C12.36 14.27 17.697 9.54 24 9.54z"
            />
          </svg>
          Login with Google
        </button>

        <p className="mt-6 text-center text-gray-500">
          Don’t have an account?{' '}
          <a href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
