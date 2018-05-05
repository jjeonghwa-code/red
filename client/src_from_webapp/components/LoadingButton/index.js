import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import Button from 'material-ui/Button';

const styles = theme => ({
  wrapper: {
    display: 'inline-block',
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class LoadingButton extends React.Component {
    render() {
    const { classes, loading, success, children, ...rest } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });
    return (
      <div className={classes.wrapper}>
        <Button
          className={buttonClassname}
          {...rest}
        >
          { children }
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    );
  }
}

LoadingButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingButton);
