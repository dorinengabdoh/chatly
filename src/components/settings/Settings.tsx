import React, { useState } from 'react';
import {
  Bell,
  Shield,
  Eye,
  Globe,
  Moon,
  Smartphone,
  CreditCard,
  Lock,
  Mail,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const sections = [
    {
      title: 'Account',
      items: [
        {
          icon: Shield,
          label: 'Privacy',
          description: 'Manage your privacy settings and blocked users',
          action: 'button',
        },
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Choose what notifications you want to receive',
          action: 'button',
        },
        {
          icon: Eye,
          label: 'Profile Visibility',
          description: 'Control who can see your profile',
          action: 'select',
          options: ['Everyone', 'Matches Only', 'Hidden'],
          value: 'Everyone',
        },
        {
          icon: Lock,
          label: 'Password',
          description: 'Change your password',
          action: 'button',
        },
        {
          icon: Mail,
          label: 'Email Preferences',
          description: 'Manage your email notifications',
          action: 'button',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Globe,
          label: 'Language',
          description: 'Choose your preferred language',
          action: 'select',
          options: ['English (US)', 'Spanish', 'French', 'German'],
          value: 'English (US)',
        },
        {
          icon: Moon,
          label: 'Theme',
          description: 'Choose your preferred theme',
          action: 'toggle',
          value: theme === 'dark',
          onChange: toggleTheme,
        },
        {
          icon: Smartphone,
          label: 'Push Notifications',
          description: 'Receive notifications on your device',
          action: 'toggle',
          value: true,
        },
      ],
    },
    {
      title: 'Payment',
      items: [
        {
          icon: CreditCard,
          label: 'Subscription',
          description: 'Manage your subscription and payment methods',
          value: 'Free Plan',
          action: 'button',
        },
      ],
    },
    {
      title: 'Danger Zone',
      items: [
        {
          icon: Trash2,
          label: 'Delete Account',
          description: 'Permanently delete your account and all data',
          action: 'danger',
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                {section.items.map((item, index) => (
                  <div
                    key={item.label}
                    className={`p-4 flex items-center justify-between ${
                      index !== section.items.length - 1
                        ? 'border-b border-gray-200 dark:border-gray-700'
                        : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {item.action === 'select' && (
                        <select
                          value={item.value}
                          className="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm"
                        >
                          {item.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {item.action === 'toggle' && (
                        <button
                          onClick={item.onChange}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                            item.value
                              ? 'bg-primary-600'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              item.value ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      )}
                      {item.action === 'button' && item.value && (
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {item.value}
                        </span>
                      )}
                      {item.action === 'button' && (
                        <button className="px-3 py-1 text-sm text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded">
                          Manage
                        </button>
                      )}
                      {item.action === 'danger' && (
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 text-red-600 dark:text-red-400 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-medium">Delete Account</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your
              data will be permanently deleted.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;