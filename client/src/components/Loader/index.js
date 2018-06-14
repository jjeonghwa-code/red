import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Loader } from 'react-loaders';
import 'loaders.css/loaders.min.css';
import classNames from 'classnames';

const styles = theme => ({
  layout: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: 'rgb(0,0,0,0.2)',
  },
  global: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer * 2,
  }
});
export default withStyles(styles)(({ classes, isGlobal }) => (
  <div className={classNames(classes.layout, {
    [classes.global]: isGlobal,
  })}>
    <Loader type="line-scale" color="#3e4553" active/>
  </div>
));
