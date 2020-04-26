import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h2>Info component</h2>
    <p>Some info: {props.details}</p>
  </div>
);

const infoWithAdminLimit = (WrappedComponent) => {
  return (props) => (
    <div>
      { props.isBlocked && <h4>Not a allowed area here</h4> }
      <WrappedComponent {...props}/>
    </div>
  )
}

const AdminInfo = infoWithAdminLimit(Info);

ReactDOM.render(<AdminInfo isBlocked={true} details="hello info compo" />, document.getElementById('app'));