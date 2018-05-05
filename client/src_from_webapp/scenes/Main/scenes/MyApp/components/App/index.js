import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  app: {
    position: 'absolute',
    height: '100px',
    overflow: 'hidden',
    textAlign: 'center',
    cursor: 'pointer',
    userDrag: 'none',
    userSelect: 'none',
  },
  img: {
    margin: theme.spacing.unit,
    userDrag: 'none',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  typo: {
    userDrag: 'none',
    userSelect: 'none',
    pointerEvents: 'none'
  },
});
function App ({ classes, favicon, title, ...props }) {
  return (
    <div className={classes.app} {...props}>
      <img
        className={classes.img}
        alt="favicon"
        src={favicon}
        width="32"
        height="32"
      />
      <Typography className={classes.typo} variant="subheading" gutterBottom>
        { title }
      </Typography>
    </div>
  );
}
export default withStyles(styles, { withTheme: true })(App);
