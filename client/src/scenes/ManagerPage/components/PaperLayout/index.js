import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
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
