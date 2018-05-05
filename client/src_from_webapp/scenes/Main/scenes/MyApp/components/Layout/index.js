import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  layout: {
    width: '100%',
    overflowX: 'hidden',
  },
};
class Layout extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.layout}>
        {children}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Layout);
