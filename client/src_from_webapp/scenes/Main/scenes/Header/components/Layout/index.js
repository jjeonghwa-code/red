import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles ={
  layout: {
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '64px',
  },
};
function Layout ({ classes, children }) {
  return (
    <div className={classes.layout}>
      { children }
    </div>
  );
}
export default withStyles(styles, { withTheme: true })(Layout);
