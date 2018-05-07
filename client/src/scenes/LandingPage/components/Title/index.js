import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Text from 'material-ui/Typography';
import lang from './lang';

const styles = theme => ({
  textWrapper: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 10,

  },
  headline: {
    fontSize: 40,
    marginBottom: theme.spacing.unit * 8,
  },
  subheading: {
    fontSize: 20,
  },
  imgWrapper: {
    padding: 24,
  },
  img: {
    width: '100%',
    height: 'auto',
  },
});
class Component extends React.Component {
  render () {
    const { classes, translate } = this.props;
    return (
      <div>
        <div className={classes.textWrapper}>
          <Text className={classes.headline}>
            <strong>{lang.Headline[translate]}</strong>
          </Text>
          <Text className={classes.subheading}>{lang.Subheading[translate]}</Text>
        </div>
        <div className={classes.imgWrapper}>
          <img className={classes.img} src="/title.png" />
        </div>
      </div>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
