import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ClearIcon from '@material-ui/icons/Clear';
import classNames from 'classnames';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import UploadIcon from '@material-ui/icons/Save';
import DownloadIcon from '@material-ui/icons/GetApp';
import CreateIcon from '@material-ui/icons/AddCircle';
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
  text: {
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
        <ListItem dense className={classes.listItem} button onClick={() => handleClick('download')}>
          <ListItemIcon>
            <DownloadIcon className={classes.listItemContent}/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.text }}
            primary="다운로드"
          />
        </ListItem>
        <ListItem dense className={classes.listItem} button onClick={() => handleClick('upload')}>
          <ListItemIcon>
            <UploadIcon className={classes.listItemContent}/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.text }}
            primary="업로드"
          />
        </ListItem>
      </React.Fragment>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
