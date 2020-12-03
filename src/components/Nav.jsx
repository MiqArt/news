import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/nav.scss';
import Login from './Login';

const Nav = () => {

  return (
    <nav className="nav">
      <ul className="nav__list container">
        <li className="nav__list-item">
          <NavLink className="nav__list-item--link" activeClassName="nav__list-item--active" to="/home">Главная</NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink className="nav__list-item--link" activeClassName="nav__list-item--active" to="/news">Новости</NavLink>
        </li>
        <li className="nav__list-item">
          <Login />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
