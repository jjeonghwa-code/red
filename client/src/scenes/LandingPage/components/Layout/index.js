import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    maxWidth: 1000,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 10,
  },
});
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
