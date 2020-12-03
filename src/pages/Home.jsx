import React from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import '../styles/home.scss';

const Home = () => {
  const currentUser = useSelector((state) => state.currentUser.login, isEqual);

  return (
    <div className="home container">
      <span className="home__welcome-text">Привет, {currentUser}</span>
    </div>
  );
};

export default Home;
