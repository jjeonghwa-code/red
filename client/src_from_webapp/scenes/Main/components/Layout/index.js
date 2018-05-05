import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  background: {
    // background: theme.palette.primary.main,
    height: 'auto',
    // minHeight: 'calc(100vh - (64px + 20px + 52px))',
    padding: '64px 0px 0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
class Layout extends React.Component{
  render() {
    const { classes, children } = this.props;
    return (
      <div
        className={classes.background}
      >
        {children}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Layout);
