import React from 'react';
import { useSelector } from 'react-redux';
import { Camera, MapPin, Cake, Heart, Book, Music, Film, Coffee } from 'lucide-react';
import { RootState } from '../../store';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-t-lg"></div>
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&size=128`}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                <Camera className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-20 bg-white dark:bg-gray-800 rounded-b-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                <span>New York City, USA</span>
                <span className="mx-2">•</span>
                <Cake className="w-4 h-4 mr-1" />
                <span>28 years old</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About Me</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Adventure seeker and coffee enthusiast. Love exploring new places, trying different cuisines,
              and meeting interesting people. Looking for someone who shares my passion for life and
              spontaneous adventures.
            </p>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interests</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Heart, label: 'Dating' },
                { icon: Book, label: 'Reading' },
                { icon: Music, label: 'Music' },
                { icon: Film, label: 'Movies' },
                { icon: Coffee, label: 'Coffee' },
              ].map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full"
                >
                  <interest.icon className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">{interest.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Photos</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((photo) => (
                <div key={photo} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/random/300x300?portrait&${photo}`}
                    alt={`Photo ${photo}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;