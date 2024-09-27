'use client';

import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.push('/auth/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container       mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Weather App</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

