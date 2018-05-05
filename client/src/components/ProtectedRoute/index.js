import {
  Route,
  Redirect,
} from 'react-router-dom';
import React from 'react';

export default ({
  component: Component,
  mode,
  isPassed,
  redirectPath,
  ...rest,
}) => (
  <Route {...rest} render={props => {
    if (mode !== 'private') {
      isPassed = !isPassed;
    }
    return isPassed ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: `${redirectPath}`,
        state: { from: props.location }
      }}/>
    )
  }}/>
);
