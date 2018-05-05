import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    maxWidth: 1000,
    margin: 'auto',
    marginBottom: 20,
  },
};
class Component extends React.Component {
  render () {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        {children}
      </div>
    );
  }
}
export default withStyles(styles)(Component);
