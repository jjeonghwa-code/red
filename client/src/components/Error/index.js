import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Loader } from 'react-loaders';
import Text from 'material-ui/Typography';

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
  text: {
    fontSize: 26,
    color: theme.palette.primary.main,
  },
});
export default withStyles(styles)(({ classes }) => (
  <div className={classes.layout}>
    <Text className={classes.text}>ERROR</Text>
  </div>
));
