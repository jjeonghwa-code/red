import React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  avatar: {
    borderRadius: 0,
  },
});
class Item extends React.Component {
  render() {
    const { classes, title, favicon, handleClick } = this.props;
    return (
      <ListItem
        button
        onClick={handleClick}
      >
        <Avatar
          className={classes.avatar}
          alt={title}
          src={favicon}
        />
        <ListItemText primary={title}/>
      </ListItem>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Item);
