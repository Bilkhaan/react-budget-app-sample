import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h2>Expensify</h2>
    <div>
      <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
      <NavLink to="/create" activeClassName="is-active">New</NavLink>
      <NavLink to="/edit" activeClassName="is-active">Edit</NavLink>
      <NavLink to="/help" activeClassName="is-active">Help</NavLink>
    </div>
  </header>
);

export default Header;