import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';
import lang from './lang';

const styles = {};
class Component extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <div>Component</div>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
