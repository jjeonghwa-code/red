import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
});
class Component extends React.Component {
  render () {
    const { classes, children } = this.props;
    return (
      <Paper className={classes.root}>
        {children}
      </Paper>
    );
  }
}
export default withStyles(styles)(Component);
