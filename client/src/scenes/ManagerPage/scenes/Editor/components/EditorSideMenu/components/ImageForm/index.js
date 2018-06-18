import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClearIcon from '@material-ui/icons/Clear';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Add';
import lang from './lang';

const styles = theme => ({
  listItemContent: {
    color: theme.palette.primary.contrastText,
    marginRight: 0,
    width: 24,
    height: 24,
  },
  listItem: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: 0,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  cssUnder: {
    color: 'white',
  },
  cssUnderline: {
    '&:before': {
      backgroundColor: '#efefed',
    },
    '&:after': {
      backgroundColor: 'white',
    },
  },
  hideIcon: {
    visibility: 'hidden',
  },
  listItemPrimary: {
    color: theme.palette.primary.contrastText,
  },
});
class Component extends React.Component {
  state = {
    hovered: null,
  };
  render () {
    const { classes,
      translate,
      type,
      selected,
      handleChange,
      handleClick,
      forms,
    } = this.props;
    return (
      <React.Fragment>
        <ListItem dense className={classes.listItem} button onClick={() => handleClick('addImage')}>
          <ListItemIcon>
            <CreateIcon className={classes.listItemContent}/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemPrimary }}
            primary={lang.AddNew[translate]}
          />
        </ListItem>
      </React.Fragment>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
