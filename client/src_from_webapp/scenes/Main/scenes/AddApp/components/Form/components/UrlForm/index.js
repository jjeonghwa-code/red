import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import LoadingButton from 'components/LoadingButton';

const styles = {
  centerText: {
    textAlign: 'center',
  },
};
class UrlForm extends React.Component {
  render() {
    const {
      classes,
      inputs,
      onSubmit,
      loading,
      success,
      handleInputChange,
    } = this.props;
    const { url } = inputs;
    return (
      <form>
        <TextField
          id="urlForm"
          label="Domain"
          margin="normal"
          fullWidth
          helperText="ex)google.com, www.naver.com"
          value={url}
          onChange={handleInputChange('url')}
          disabled={success}
        />
        {
          !success ?
            <div className={classes.centerText}>
              <LoadingButton
                type="submit"
                color="primary"
                loading={loading}
                disabled={loading}
                success={success}
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit(url);
                }}
              >
                Submit
              </LoadingButton>
            </div> : null
        }
      </form>
    );
  }
}
export default withStyles(styles)(UrlForm);
