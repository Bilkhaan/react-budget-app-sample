import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const PublicRoutes = ({
  notAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    notAuthenticated ? (
      <div>
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/dashboard" />
    )
  )} />
)

const mapStateToProps = (state) => {
  return {
    notAuthenticated: !state.auth.uid
  }
}

export default connect(mapStateToProps)(PublicRoutes);