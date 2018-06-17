import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {};
class Component extends React.Component {
  render () {
    const { classes, children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}
export default withStyles(styles)(Component);
