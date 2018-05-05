import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Loader } from 'react-loaders';
import 'loaders.css/loaders.min.css';

const styles = {
  layout: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: 'rgb(0,0,0,0.2)',
  },
  img: {
    width: 100,
    height: 100,
  },
};
export default withStyles(styles)(({ classes }) => (
  <div className={classes.layout}>
    <Loader type="line-scale-pulse-out-rapid" color="#e91b23" active/>
  </div>
));
