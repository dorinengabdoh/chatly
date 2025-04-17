import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, MessageCircle, Bell, User, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';

const Navbar = () => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Chatly</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>

            <Link to="/chat" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <MessageCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Link>

            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>

            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}`}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-gray-700 dark:text-gray-300">{user?.name}</span>
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 hidden group-hover:block">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;