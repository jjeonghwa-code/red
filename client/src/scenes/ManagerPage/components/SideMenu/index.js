import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Text from '@material-ui/core/Typography';
import AccountIcon from '@material-ui/icons/AccountCircle';
import SettingIcon from '@material-ui/icons/Settings';
import ShopIcon from '@material-ui/icons/Home';
import ProjectIcon from '@material-ui/icons/ShoppingBasket';
import CompletedIcon from '@material-ui/icons/CheckCircle';
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
          {
            type === 'serviceManager' ?
              <ListItem className={classNames(classes.listItem, { [classes.selected]: selected === 'account' })} button
                        onClick={() => handleClick('account')}>
                <ListItemIcon>
                  <AccountIcon className={classes.listItemContent}/>
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.listItemContent }} primary={lang.Account[translate]}/>
              </ListItem> : null
          }
          <ListItem className={classNames(classes.listItem, { [classes.selected]: selected === 'project' })} button onClick={() => handleClick('project')}>
            <ListItemIcon>
              <ProjectIcon className={classes.listItemContent}/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemContent }} primary={lang.Project[translate]} />
          </ListItem>
          <ListItem className={classNames(classes.listItem, { [classes.selected]: selected === 'completed' })} button onClick={() => handleClick('completed')}>
            <ListItemIcon>
              <CompletedIcon className={classes.listItemContent}/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemContent }} primary={lang.Order[translate]} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem className={classNames(classes.listItem, { [classes.selected]: selected === 'setting' })} button onClick={() => handleClick('setting')}>
            <ListItemIcon>
              <SettingIcon className={classes.listItemContent}/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemContent }} primary={lang.Setting[translate]} />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
