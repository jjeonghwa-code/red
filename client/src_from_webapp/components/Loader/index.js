import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  loader: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
});
function loader({ classes }) {
  return (
    <div
      className="loader-inner line-scale-pulse-out-rapid"
      style={{ textAlign: 'center' }}
    >
      <div className={classes.loader}/>
      <div className={classes.loader}/>
      <div className={classes.loader}/>
      <div className={classes.loader}/>
      <div className={classes.loader}/>
    </div>
  );
}

export default withStyles(styles)(loader);
