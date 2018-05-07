/* global RedEditorSDK */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MessageBar from './components/MessageBar';
import { auth } from './data/auth/actions';
import { language } from './data/language/actions';
import ManagerPage from './scenes/ManagerPage';
import LandingPage from './scenes/LandingPage';
import Loader from './components/Loader';

// 차후 메세지 큐는 메세지 컴포넌트에 통합
class App extends Component {
  constructor(props) {
    super(props);
    this.setLanguage();
    // setInterval(() => {
    //   const { types, selected } = this.props.language;
    //   this.props.setLanguage((selected + 1) % types.length);
    // }, 1000);
    this.props.requestAuth();
  }
  setLanguage = () => {
    const lang = window.LANGUAGE || 'kr';
    const { setLanguage, language } = this.props;
    const selected = language.types.findIndex(o => o === lang);
    setLanguage(selected > -1 ? selected : 1);
  };
  render() {
    const {
      auth,
    } = this.props;
    return (
      <React.Fragment>
        {
          auth.response ? <ManagerPage/> : auth.loading? <Loader/> : <LandingPage/>
        }
        <MessageBar />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.data.auth,
  language: state.data.language,
});
export default connect(mapStateToProps, {
  requestAuth: auth.request,
  setLanguage: language.set,
})(App);
