import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '../../../../../../components/Dialog';
import lang from './lang';

const styles = theme => ({
  layout: {
    padding: theme.spacing.unit * 3,
  },
});
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.open) {
      this.setState({
        input: '',
      });
    }
  }
  handleChange = name => e => {
    this.setState({
      [name]: e.target.value,
    });
  };
  isDisabled = () => {
    return this.state.input === '';
  };
  render () {
    const {
      input,
    } = this.state;
    const {
      classes,
      translate,
      onClose,
      onSubmit,
      ...props,
    } = this.props;
    const disabled = this.isDisabled();
    return (
      <Dialog
        aria-labelledby="dialog"
        aria-describedby="dialog_description"
        onSubmit={() => onSubmit(input)}
        onClose={onClose}
        disabled={disabled}
        {...props}
      >
        <div className={classes.layout}>
          <TextField
            id="title"
            label={lang.Title[translate]}
            value={input}
            onChange={this.handleChange('input')}
            margin="normal"
          />
        </div>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
