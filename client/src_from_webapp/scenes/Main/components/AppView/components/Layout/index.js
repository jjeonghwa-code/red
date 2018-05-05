import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  layout: {
    width: '100%',
    maxWidth: '450px',
  },
};
function Layout ({ classes, children }) {
  return (
    <div className={classes.layout}>
      { children }
    </div>
  );
}
export default withStyles(styles)(Layout);
