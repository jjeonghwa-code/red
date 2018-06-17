import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0, // So the Typography noWrap works
    position: 'relative',
    height: '100vh',
    overflowY: 'auto',
  },
  wrapper: {
    height: `calc(100% - 70px)`
  },
  toolbar: theme.mixins.toolbar,
});
class Component extends React.Component {
  render () {
    const { classes, children, id } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.toolbar} />
        <div className={classes.wrapper} id={id}>
          {children}
        </div>
      </div>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
