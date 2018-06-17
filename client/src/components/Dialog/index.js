import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Text from '@material-ui/core/Typography';
import lang from './lang';

const styles = theme => ({
  title: {
    background: theme.palette.primary.main,
    padding: theme.spacing.unit * 2,
  },
  titleText: {
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
});
class Component extends React.Component {
  render() {
    const {
      classes,
      open,
      onClose,
      onSubmit,
      children,
      fullScreen,
      title,
      translate,
      disabled,
    } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        aria-labelledby="dialog"
        aria-describedby="dialog_description"
        open={open}
        onClose={onClose}
      >
        <DialogTitle
          className={classes.title}
        >
          <Text className={classes.titleText}>
            {title}
          </Text>
        </DialogTitle>
        { children }
        <DialogActions>
          {
            onSubmit ?
              <Button
                disabled={disabled}
                color="primary"
                onClick={onSubmit}
                size="large"
              >
                {lang.Submit[translate]}
              </Button> : null
          }
          <Button
            color="primary"
            onClick={onClose}
            size="large"
          >
            {lang.Close[translate]}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withMobileDialog()(withStyles(styles)(Component)));
