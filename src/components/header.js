import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

export const Header = (props) => (
  <header>
    <h2>Expensify</h2>
    <div>
      <NavLink to="/dashboard" activeClassName="is-active" exact={true}>Home</NavLink>
      <NavLink to="/create" activeClassName="is-active">New</NavLink>
      <NavLink to="/edit" activeClassName="is-active">Edit</NavLink>
      <NavLink to="/help" activeClassName="is-active">Help</NavLink>
      <button id="logout-btn" onClick={props.logoutClicked}>Logout</button>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => {
  return {
    logoutClicked: () => dispatch(logout())
  }
}

export default connect(undefined, mapDispatchToProps)(Header);