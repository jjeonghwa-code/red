import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem,  ListItemText } from 'material-ui/List';

const styles = theme => ({
  list: {
    width: 250,
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});
function DrawerMenu(props) {
  const {
    classes,
    onSelect,
    open,
    onClose,
  } = props;
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <div className={classes.list}>
          <List>
            <ListItem
              className={classes.menuItem}
              button
              onClick={() => onSelect('appList')}
            >
              <ListItemText
                classes={{ primary: classes.primary }}
                primary={"앱 보기"}
              />
            </ListItem>
            <ListItem
              className={classes.menuItem}
              button
              onClick={() => onSelect('addApp')}
            >
              <ListItemText
                classes={{ primary: classes.primary }}
                primary={"앱 등록"}
              />
            </ListItem>
            <ListItem
              className={classes.menuItem}
            >
              <ListItemText
                classes={{ primary: classes.primary }}
                primary={"kiyeopyang@gmail.com"}
              />
            </ListItem>
          </List>
        </div>
      </div>
    </Drawer>
  );
}
export default withStyles(styles, { withTheme: true })(DrawerMenu);
