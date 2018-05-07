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
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import lang from './lang';
import Dialog from '../../../../components/Dialog';
import Loader from '../../../../components/Loader';
import TableForSelection from '../TableForSelection';

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
    const { classes, translate, loading, data, handleRowClick, ...props } = this.props;
    return (
      <Dialog
        title={lang.FranchiseeLogin[translate]}
        {...props}
      >
        {loading ? <Loader/> : null}
        {
          data ?
            <TableForSelection data={data} handleRowClick={handleRowClick}/> : null
        }
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
