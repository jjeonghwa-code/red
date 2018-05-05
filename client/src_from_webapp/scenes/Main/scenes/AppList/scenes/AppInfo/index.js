import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { on as message } from 'data/messageBar/actions';
import { request as addMyAppRequest } from 'scenes/Main/data/addMyApp/actions';
import { request as appRequest } from 'scenes/Main/data/app/actions';
import { request as userRequest } from 'data/user/actions';
import Layout from './components/Layout';
import Form from './components/Form';
import AppView from 'scenes/Main/components/AppView';
import Loader from 'components/Loader';

class AppInfo extends React.Component {
  constructor(props) {
    super(props);
    const { match, appRequest } = this.props;
    const { id } = match.params;
    if (id) {
      appRequest(id);
    }
  }
  isAlreadyIncluded = (app) => {
    const { data } = this.props.user;
    return data.appList.findIndex(o => o.id === app.id) > -1;
  };
  addToMyApp = (app) => {
    this.props.addMyAppRequest(app)
      .then(() => {
        this.props.userRequest();
        this.props.message('앱이 추가되었습니다.');
      });
  };
  render() {
    const { app } = this.props;
    const included = app.data ? this.isAlreadyIncluded(app.data) : false;
    return (
      <Layout>
        {
          app.isFetching ?
            <Loader /> :
            <React.Fragment>
              <AppView app={app.data}/>
              <Form
                disabled={included}
                add={() => this.addToMyApp(app.data)}
              />
            </React.Fragment>
        }
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  user: state.data.user,
  addMyApp: state.main.data.addMyApp,
  app: state.main.data.app,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  message,
  addMyAppRequest,
  appRequest,
  userRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppInfo));