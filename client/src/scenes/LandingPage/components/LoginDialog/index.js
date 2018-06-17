import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import lang from './lang';
import Dialog from '../../../../components/Dialog';
import Loader from '../../../../components/Loader';

const styles = theme => ({
  layout: {
    maxWidth: 350,
    padding: 50,
    margin: 'auto',
  },
  textField: {
    marginBottom: theme.spacing.unit,
  },
});
class Component extends React.Component {
  state = {
    userId: '',
    password: '',
  };
  handleChange = name => e => this.setState({
    [name]: e.target.value,
  });
  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };
  render () {
    const { userId, password } = this.state;
    const { classes, translate, isLoading, ...props } = this.props;
    return (
      <Dialog
        {...props}
        title={lang.Login[translate]}
        onSubmit={this.handleSubmit}
      >
        <div className={classes.layout}>
          { isLoading ? <Loader/> : null }
          <TextField
            className={classes.textField}
            label="ID"
            fullWidth
            value={userId}
            onChange={this.handleChange('userId')}
          />
          <TextField
            className={classes.textField}
            label="PASSWORD"
            fullWidth
            type="password"
            value={password}
            onChange={this.handleChange('password')}
          />
        </div>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
