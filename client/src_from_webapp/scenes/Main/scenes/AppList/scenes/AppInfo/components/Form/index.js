import React from 'react';
import { withStyles } from 'material-ui/styles';
import LoadingButton from 'components/LoadingButton';

const styles = theme => ({
  form: {
    textAlign: 'center',
  },
});
function Form ({ classes, add, ...rest }) {
  return (
    <div className={classes.form}>
      <LoadingButton
        color="primary"
        onClick={add}
        {...rest}
      >
        Add to My App
      </LoadingButton>
    </div>
  );
}
export default withStyles(styles, { withTheme: true })(Form);
