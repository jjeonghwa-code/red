import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Text from 'material-ui/Typography';
import IconAccount from '@material-ui/icons/AccountCircle';
import IconHelp from '@material-ui/icons/HelpOutline';
import IconFranchisee from '@material-ui/icons/Home';
import classNames from 'classnames';
import Menu, { MenuItem } from 'material-ui/Menu';
import Loader from '../../../../components/Loader';
import lang from './lang';

const styles = theme => ({
  root: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 2,
    width: '100%',
    minWidth: 1000,
  },
  leftOfToolbar: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    minHeight: 64,
    borderBottom: '1px solid #efefed',
    background: 'white',
  },
  verticalLine: {
    height: 40,
    borderLeft: '1px solid #efefed',
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  editorTitle: {
    fontSize: 28,
    display: 'inline-block',
  },
  accountText: {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  account: {
    height: '100%',
    marginRight: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButton: {
    fontSize: 18,
    borderRadius: 0,
    width: 180,
    height: '100%',
  },
  rightOfToolbar: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    marginLeft: theme.spacing.unit * 3,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});
class Component extends React.Component {
  state = {
    anchorEl: null,
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = (name) => {
    this.setState({ anchorEl: null });
    if (name) this.props.handleClick(name);
  };
  render () {
    const {
      classes,
      translate,
      loading,
      franchisee,
      handleClick,
      account,
      editorMode,
      disabled,
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        { loading ? <Loader/> : null }
        <div className={classes.toolbar}>
          <div className={classes.leftOfToolbar}>
            <img className={classes.img} height={50} src="/squareLogo.png" />
            <div className={classes.verticalLine}/>
            <Text className={classes.editorTitle}>
              <strong>{lang.Title[translate]}</strong>
            </Text>
          </div>
          <div className={classes.rightOfToolbar}>
            <div className={classes.account}>
              <Text
                className={classes.accountText}
                aria-owns={anchorEl ? 'account-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <IconAccount className={classes.icon}/>{account.userId}
              </Text>
              {
                franchisee ?
                  <Text
                    className={classes.accountText}
                    aria-owns={anchorEl ? 'account-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <IconFranchisee className={classes.icon}/>{franchisee.name}
                  </Text> : null
              }
            </div>
            <Button
              className={classes.orderButton}
              onClick={() => handleClick('contact')}
            >
              <IconHelp className={classes.icon}/>
              {lang.Contact[translate]}
            </Button>
            <Button
              disabled={disabled}
              color="secondary"
              variant="raised"
              className={classes.orderButton}
              onClick={() => handleClick(editorMode ? 'save':'order')}
            >
              { editorMode ? '저장':lang.Order[translate]}
            </Button>
          </div>
        </div>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose()}
        >
          <MenuItem onClick={() => this.handleClose('info')}>{lang.AccountInfo[translate]}</MenuItem>
          <MenuItem onClick={() => this.handleClose('logout')}>{lang.Logout[translate]}</MenuItem>
          {
            franchisee ?
              <MenuItem onClick={() => this.handleClose('franchiseeLogout')}>{lang.FranchiseeLogout[translate]}</MenuItem> :
            account.type === 'serviceManager' || account.type === 'supervisor' ?
              <MenuItem onClick={() => this.handleClose('franchiseeLogin')}>{lang.FranchiseeLogin[translate]}</MenuItem> : null
          }
        </Menu>
      </div>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
