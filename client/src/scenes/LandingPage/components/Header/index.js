import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import lang from './lang';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    background: 'white',
    boxShadow: 'none',
  },
  button: {
    color: 'black',
  },
};
class Component extends React.Component {
  render () {
    const { classes, translate } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <div className={classes.flex}>
              <img height={40} src="/logo.png" />
            </div>
            <Button className={classes.button}>{lang.Login[translate]}</Button>
            <Button className={classes.button}>{lang.Contact[translate]}</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));