import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';

const styles = theme => ({
  app: {
    position: 'absolute',
    width:'100%',
    overflow: 'hidden',
    textAlign: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  on: {
    backgroundColor: theme.palette.secondary.main,
  },
  iconOn: {
    color: theme.palette.secondary.contrastText,
  },
});
function RemoveApp ({ classes, on, ...props }) {
  return (
    <Paper
      className={classNames({
        [classes.app] : true,
        [classes.on] : on,
      })}
      elevation={10}
      {...props}
    >
      <DeleteIcon
        className={on ? classes.iconOn: null}
        style={{
          width: 36,
          height: 36,
        }}
      />
    </Paper>
  );
}
export default withStyles(styles, { withTheme: true })(RemoveApp);
