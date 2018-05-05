import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/More';
import AppIcon from '@material-ui/icons/Apps';
import Input from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

const styles = {
  appBar: {
    height: '100%',
  },
  titleWrapper: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    width: '100%',
    maxWidth: '450px',
    margin: 'auto',
    cursor: 'pointer',
  },
  toolbar: {
    minHeight: 64,
    padding: '0px 24px',
  },
  input: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.3125rem',
  },
};
function Bar(props) {
  const {
    classes,
    onMenuIconClick,
    onMyAppClick,
    onTitleClick,
    isSearchMode,
  } = props;
  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="primary"
      elevation={0}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={onMenuIconClick}
        >
          <MoreIcon/>
        </IconButton>
        {
          isSearchMode ?
            <FormControl fullWidth>
              <Input
                id="search"
                autoFocus
                classes={{ input: classes.input }}
                disableUnderline
                placeholder="Webs"
              />
            </FormControl> :
            <div
              className={classes.titleWrapper}
            >
              <Typography
                className={classes.title}
                align="center"
                variant="title"
                color="inherit"
                onClick={onTitleClick}
              >
                Webs
                <SearchIcon/>
              </Typography>
            </div>
        }
        <IconButton
          color="inherit"
          onClick={onMyAppClick}
        >
          <AppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default withStyles(styles)(Bar);
