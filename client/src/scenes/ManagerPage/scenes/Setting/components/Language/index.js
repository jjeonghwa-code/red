import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Text from 'material-ui/Typography';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import lang from './lang';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
});
class Component extends React.Component {
  render () {
    const { classes, translate, selected, set } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.select}>
          <InputLabel htmlFor="language">{lang.Language[translate]}</InputLabel>
          <Select
            value={selected}
            onChange={(e) => set(parseInt(e.target.value))}
            inputProps={{
              name: 'language',
              id: 'language',
            }}
          >
            <MenuItem value={0}>
              English
            </MenuItem>
            <MenuItem value={1}>
              한국어
            </MenuItem>
            <MenuItem value={2}>
              日本語
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
