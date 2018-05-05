/* global RedEditorSDK */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
} from 'react-router-dom';
import {
  editorToken,
} from './data/editorToken/actions';
import ProtectedRoute from './components/ProtectedRoute';
import MessageBar from './components/MessageBar';
import * as messageBarActions from './data/messageBar/actions';
import { auth } from './data/auth/actions';
import { language } from './data/language/actions';
import ManagerPage from './scenes/ManagerPage';
import LandingPage from './scenes/LandingPage';
import Loader from './components/Loader';

// 차후 메세지 큐는 메세지 컴포넌트에 통합
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageOpen: false,
      messageInfo: {},
    };
    this.messageQueue = [];
    this.setLanguage();
    // setInterval(() => {
    //   const { types, selected } = this.props.language;
    //   console.log(this.props.language);
    //   this.props.setLanguage((selected + 1) % types.length);
    // }, 1000);
    this.props.requestAuth();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.messageBar.message !== nextProps.messageBar.message) {
      this.messageQueue.push({
        message: nextProps.messageBar.message,
        key: new Date().getTime(),
      });
      if (this.state.messageOpen) {
        this.setState({ messageOpen: false });
      } else {
        this.processMessageQueue();
      }
    }
  }
  setLanguage = () => {
    const lang = window.LANGUAGE || 'kr';
    const { setLanguage, language } = this.props;
    const selected = language.types.findIndex(o => o === lang);
    setLanguage(selected > -1 ? selected : 1);
  };
  processMessageQueue = () => {
    if (this.messageQueue.length > 0) {
      this.setState({
        messageInfo: this.messageQueue.shift(),
        messageOpen: true,
      });
    }
  };
  handleMessageBarClose = () => {
    this.props.messageBarOff();
    this.setState({ messageOpen: false });
  };
  handleMessageBarExited = () => {
    this.processMessageQueue();
  };
  render() {
    const {
      auth,
    } = this.props;
    const {
      message, key,
    } = this.state.messageInfo;
    if (auth.loading) return (<Loader/>);
    return (
      <React.Fragment>
        {
          auth.response ? <ManagerPage/> : <LandingPage/>
        }
        <MessageBar
          open={this.state.messageOpen}
          key={key}
          onClose={this.handleMessageBarClose}
          onExited={this.handleMessageBarExited}
          message={message}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  editorToken: state.data.editorToken.response,
  messageBar: state.data.messageBar,
  auth: state.data.auth,
  language: state.data.language,
});
export default connect(mapStateToProps, {
  requestEditorToken: editorToken.request,
  messageBarOff: messageBarActions.off,
  requestAuth: auth.request,
  setLanguage: language.set,
})(App);
