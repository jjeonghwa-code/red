import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { loader } from 'data/loader/actions';
import * as noticeDialogActions from 'data/noticeDialog/actions';
import Header from './scenes/Header';
import AddApp from './scenes/AddApp';
import AppList from './scenes/AppList';
import MyApp from './scenes/MyApp';
import Layout from './components/Layout';

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Layout>
          <Switch>
            <Route
              path={'/appList'}
              component={AppList}
            />
            <Route
              path={'/addApp'}
              component={AddApp}
            />
            <Route
              path={'/'}
              component={MyApp}
            />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  noticeDialog: state.data.noticeDialog,
  loaderState: state.data.loader,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  loader,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main));
