import React from 'react';
import PostCard from './PostCard.tsx';
import Banner from './Banner.tsx';
import Classification from './Classification.tsx';
import Profile from './Profile.tsx';
import MannerBar from './MannerBar.tsx';

function Account() {
  return (
    <div>
      <Banner />

      <div className="-mt-10">
      <Profile />
      </div>

      <div className="flex justify-end">
      <MannerBar/>
      </div>

      <div className="flex justify-center">
        <Classification />
      </div>

    </div>
  );
}

export default Account;
