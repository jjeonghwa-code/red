import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import * as noticeDialogActions from './data/noticeDialog/actions';
import * as userActions from './data/user/actions';
import * as signUpActions from './data/signUp/actions';
import * as loginActions from './data/login/actions';
import { loader } from './data/loader/actions';
import NoticeDialog from './components/NoticeDialog';
import MessageBar from './rootModules/MessageBar';
import Main from './scenes/Main';
import loaderDOM from './modules/loader';
import 'loaders.css/loaders.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    loaderDOM(this.props.loaderState);
    this.props.userRequest();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.loaderState !== nextProps.loaderState) {
      if (nextProps.user.status === 'WAITING') {
        loaderDOM(true);
      } else {
        loaderDOM(nextProps.loaderState);
      }
    }
  }
  render() {
    const {
      noticeDialog,
    } = this.props;
    return (
      <React.Fragment>
        <Main />
        <NoticeDialog
          open={noticeDialog.open}
          onClose={this.props.noticeDialogOff}
          title={noticeDialog.title}
          text={noticeDialog.text}
          onConfirm={noticeDialog.onConfirm}
        />
        <MessageBar />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  state,
  noticeDialog: state.data.noticeDialog,
  loaderState: state.data.loader,
  user: state.data.user,
  login: state.data.login,
  signUp: state.data.signUp,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  loader,
  userRequest: userActions.request,
  logout: userActions.logout,
  loginRequest: loginActions.request,
  signUpRequest: signUpActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
