import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import * as messageBarActions from '../../data/messageBar/actions';

class MessageBar extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { messageBar } = nextProps;
    const { status, queue } = messageBar;
    if (status === 'CLOSED' && queue.length > 0) {
      const info = queue.shift();
      this.props.process({
        info,
        queue,
      });
    }
  }
  render() {
    const {
      messageBar,
      closing,
      closed,
    } = this.props;
    const {
      status,
      info,
    } = messageBar;
    return (
      <Snackbar
        open={status === 'PROCESS'}
        key={info.key}
        onClose={closing}
        onExited={closed}
        message={<span id={'message-id'}>{info.message}</span>}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        autoHideDuration={6000}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  messageBar: state.data.messageBar,
});
export default connect(mapStateToProps, {
  closing: messageBarActions.closing,
  closed: messageBarActions.closed,
  process: messageBarActions.process,
})(MessageBar);
