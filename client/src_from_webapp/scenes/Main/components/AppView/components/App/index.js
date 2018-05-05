import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    margin: theme.spacing.unit * 3,
  },
});
function App ({ classes, ...rest }) {
  const {
    title,
    favicon,
    isHttps,
    domain,
    path,
  } = rest;
  return (
    <div className={classes.app}>
      <img
        className={classes.img}
        alt="favicon"
        src={favicon}
        width="64"
        height="64"
      />
      <Typography variant="title" gutterBottom>
        { title }
      </Typography>
      <Typography variant="subheading" gutterBottom>
        {
          `${isHttps ? 'https://':'http://'}${domain}${path}`
        }
      </Typography>
    </div>
  );
}
export default withStyles(styles, { withTheme: true })(App);
