import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Text from '@material-ui/core/Typography';
import lang from './lang';
import Dialog from '../../../../components/Dialog';

const styles = theme => ({
  text: {
    whiteSpace: 'pre-line',
    width: 200,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
  },
  imgWrapper: {
    marginRight: theme.spacing.unit * 2,
    width: 50,
  },
  img: {
    width: 45,
    height: 45,
  },
});
class Component extends React.Component {
  render () {
    const { classes, translate, ...props } = this.props;
    return (
      <Dialog
        title={lang.Contact[translate]}
        {...props}
      >
        <div className={classes.row}>
          <div className={classes.imgWrapper}>
            <img className={classes.img} src="/address.svg"/>
          </div>
          <Text className={classes.text}>
            {lang.AddressData[translate]}
          </Text>
        </div>
        <div className={classes.row}>
          <div className={classes.imgWrapper}>
            <img className={classes.img} src="/tel.svg"/>
          </div>
          <Text className={classes.text}>
            {`(+82)
            TEL : 1544-6698
          FAX : 02-6280-0264`}
          </Text>
        </div>
        <div className={classes.row}>
          <div className={classes.imgWrapper}>
            <img className={classes.img} src="/email.svg"/>
          </div>
          <Text className={classes.text}>
            {`EMAIL : admin@redprinting.co.kr
            WEB : Redprinting.co.kr`}
          </Text>
        </div>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
