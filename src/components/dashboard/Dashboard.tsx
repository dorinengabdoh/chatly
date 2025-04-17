import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Welcome back, {user?.name}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Matches */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Today's Matches
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((match) => (
              <div
                key={match}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <img
                  src={`https://source.unsplash.com/random/100x100?portrait&${match}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Sarah Parker
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    28 • New York City
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-300">❤️</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">
                  You matched with <span className="font-medium">Jessica</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300">💬</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">
                  New message from <span className="font-medium">Michael</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Profile Completion
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Overall Progress
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-primary-600 h-2.5 rounded-full"
                  style={{ width: '75%' }}
                ></div>
              </div>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <span className="mr-2">✅</span>
                <span className="text-gray-700 dark:text-gray-300">Basic Info</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-2">✅</span>
                <span className="text-gray-700 dark:text-gray-300">Profile Picture</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-2">❌</span>
                <span className="text-gray-700 dark:text-gray-300">Interests</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-2">❌</span>
                <span className="text-gray-700 dark:text-gray-300">Bio</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;