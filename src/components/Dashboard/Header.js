import React from 'react';

import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated,setSortBy }) => {
  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
  };
  return (
    <header>
      <h1>Movie Review</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add Review</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
        <select name='type' onChange={handleSortChange}>
          <option value="title">Title</option>
          <option value="review">Review</option>
          <option value="releaseDate">Release Date</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
