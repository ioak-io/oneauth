import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import './BookmarkBar.scss';

const BookmarkBar = () => {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    console.log(history);
    console.log(location.state);
  }, [history, location]);

  return <div className="bookmark-bar">bookmark</div>;
};

export default BookmarkBar;
