import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';
import * as messageBarActions from 'data/messageBar/actions';

class MessageBar extends React.Component {
  render() {
    const { messageBar, off } = this.props;
    const { open, message } = messageBar;
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={off}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
    );
  }
}
const mapStateToProps = state => ({
  messageBar: state.data.messageBar,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  on: messageBarActions.on,
  off: messageBarActions.off,
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageBar);
