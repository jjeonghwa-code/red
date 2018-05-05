import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import LoadingButton from 'components/LoadingButton';
import * as resizeImage from 'modules/resizeImage';
import UrlForm from './components/UrlForm';
import UrlInfo from './components/UrlInfo';

const styles = theme => ({
  wrapper: {
    margin: '8px',
  },
  buttons: {
    margin: theme.spacing.unit,
    textAlign: 'right',
  },
});
class Form extends React.Component {
  render() {
    const {
      classes,
      inputs,
      urlInfoForm,
      handleInputChange,
      imgUrl,
      formSuccess,
      formFetching,
      handleBtnA,
      handleBtnB,
    } = this.props;
    return (
      <div className={classes.wrapper}>
        <UrlForm
          inputs={{
            url: inputs.url,
          }}
          handleInputChange={handleInputChange}
          {...urlInfoForm}
        />
        {
          urlInfoForm.success ?
            <React.Fragment>
              <UrlInfo
                inputs={{
                  title: inputs.title,
                  doUseUploadedImg: inputs.doUseUploadedImg,
                }}
                imgUrl={imgUrl}
                disabled={formSuccess}
                handleInputChange={handleInputChange}
              />
              <div className={classes.buttons}>
                <LoadingButton
                  variant="raised"
                  color="primary"
                  loading={formFetching}
                  disabled={formFetching}
                  success={formSuccess}
                  onClick={handleBtnA.onClick}
                >
                  { handleBtnA.text }
                </LoadingButton>
                <Button
                  color="primary"
                  onClick={handleBtnB.onClick}
                  disabled={formFetching}
                >
                  { handleBtnB.text }
                </Button>
              </div>
            </React.Fragment>
            : null
        }
      </div>
    );
  }
}
export default withStyles(styles)(Form);
