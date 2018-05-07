import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Text from 'material-ui/Typography';
import AccountIcon from '@material-ui/icons/AccountCircle';
import SettingIcon from '@material-ui/icons/Settings';
import ShopIcon from '@material-ui/icons/Home';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import BasketIcon from '@material-ui/icons/ShoppingBasket';
import classNames from 'classnames';
import lang from './lang';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    background: theme.palette.primary.main,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  listItemContent: {
    color: theme.palette.primary.contrastText,
  },
  listItem: {
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  selected: {
    background: theme.palette.primary.dark,
  },
});
class Component extends React.Component {
  render () {
    const { classes, translate, type, selected, handleClick } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem dense className={classes.listItem} button onClick={() => handleClick('goBack')}>
            <ListItemIcon>
              <LeftIcon className={classes.listItemContent}/>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
