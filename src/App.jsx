import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

function App() {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');

  const fetchAvatar = async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setAvatarUrl(response.data.avatar_url);
      setError('');
    } catch (err) {
      setAvatarUrl('');
      setError('User not found');
    }
  };

  const debouncedFetchAvatar = useCallback(debounce(fetchAvatar, 500), []);

  const handleChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    if (newUsername) {
      debouncedFetchAvatar(newUsername);
    } else {
      setAvatarUrl('');
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">GitHub Avatar Fetcher</h1>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Enter GitHub username"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {error && <p className="text-red-500 mt-5">{error}</p>}
        {avatarUrl && (
          <div className="flex justify-center mt-5">
            <img src={avatarUrl} alt="GitHub Avatar" className="rounded-md w-32 h-32" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
