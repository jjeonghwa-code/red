import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Text from 'material-ui/Typography';
import update from 'react-addons-update';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import lang from './lang';
import Dialog from '../../../../components/Dialog';

const styles = theme => ({
  layout: {
    padding: theme.spacing.unit * 2,
    minWidth: 400,
  },
  h: {
    fontSize: 20,
  },
  p: {
    fontSize: 16,
  },
  textWrapper: {
    marginBottom: theme.spacing.unit * 2,
  },
});
class Component extends React.Component {
  render () {
    const { classes, translate, title, data, ...props } = this.props;
    return (
      <Dialog
        title={title}
        {...props}
      >
        <div className={classes.layout}>
          {
            data.map(o => (
              <div className={classes.textWrapper} key={o.label}>
                <Text className={classes.h}>{o.label}</Text>
                <Text className={classes.p}>{o.data}</Text>
              </div>
            ))
          }
        </div>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
