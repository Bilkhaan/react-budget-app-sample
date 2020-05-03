import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const Login =  (props) => (
  <div>
    <p>Login page</p>
    <button onClick={props.loginClicked} id="login-btn">Login here</button>
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    loginClicked: () => dispatch(startLogin())
  }
}

export default connect(undefined, mapDispatchToProps)(Login);