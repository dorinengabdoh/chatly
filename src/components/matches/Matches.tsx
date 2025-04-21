import React, { useState } from 'react';
import { Heart, X, MessageCircle, Filter, MapPin, Star } from 'lucide-react';

const Matches = () => {
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const matches = [
    {
      id: 1,
      name: 'Sarah Parker',
      age: 28,
      location: 'New York City',
      distance: '2 miles away',
      bio: 'Adventure seeker and coffee enthusiast. Love exploring new places and meeting new people.',
      interests: ['Travel', 'Coffee', 'Photography', 'Hiking'],
      image: 'https://source.unsplash.com/random/400x400?portrait&1',
      compatibility: 95,
      lastActive: '2 hours ago',
      verified: true,
    },
    {
      id: 2,
      name: 'Emily Johnson',
      age: 26,
      location: 'Los Angeles',
      distance: '5 miles away',
      bio: 'Art lover and yoga instructor. Looking for someone to share peaceful moments with.',
      interests: ['Yoga', 'Art', 'Meditation', 'Cooking'],
      image: 'https://source.unsplash.com/random/400x400?portrait&2',
      compatibility: 88,
      lastActive: '5 hours ago',
      verified: true,
    },
    {
      id: 3,
      name: 'Jessica Williams',
      age: 27,
      location: 'Chicago',
      distance: '3 miles away',
      bio: 'Music lover and concert enthusiast. Always up for a spontaneous adventure.',
      interests: ['Music', 'Concerts', 'Travel', 'Food'],
      image: 'https://source.unsplash.com/random/400x400?portrait&3',
      compatibility: 92,
      lastActive: '1 day ago',
      verified: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Matches</h1>
          <p className="text-gray-600 dark:text-gray-400">
            We found {matches.length} potential matches for you
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Matches</option>
            <option value="new">New Matches</option>
            <option value="nearby">Nearby</option>
            <option value="online">Online Now</option>
          </select>
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Matches Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}>
        {matches.map((match) => (
          <div
            key={match.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}>
              <img
                src={match.image}
                alt={match.name}
                className={`${viewMode === 'list' ? 'h-full' : 'h-64'} w-full object-cover`}
              />
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-400">
                {match.compatibility}% Match
              </div>
              {match.verified && (
                <div className="absolute top-4 left-4 bg-blue-500 rounded-full p-1">
                  <Star className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className={`${viewMode === 'list' ? 'w-2/3' : ''} p-4`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {match.name}, {match.age}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{match.distance}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {match.bio}
              </p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {match.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                  <X className="w-5 h-5 mr-1" />
                  Pass
                </button>
                <button className="flex-1 flex items-center justify-center px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors">
                  <Heart className="w-5 h-5 mr-1" />
                  Like
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;