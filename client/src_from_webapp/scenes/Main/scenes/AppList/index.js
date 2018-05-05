import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Switch,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import { loader } from 'data/loader/actions';
import * as noticeDialogActions from 'data/noticeDialog/actions';
import { request as appListRequest } from './data/appList/actions';
import Layout from './components/Layout';
import ListView from './components/ListView';
import AppInfo from './scenes/AppInfo';

class AppList extends React.Component {
  constructor(props) {
    super(props);
    this.props.appListRequest();
  }
  toAppInfo = (id) => {
    const { push, match } = this.props;
    push(`${match.url}/${id}`);
  };
  render() {
    const { match, appList } = this.props;
    return (
      <Switch>
        <Route
          path={`${match.url}`}
          exact
          render={() => (
            <Layout>
              {
                appList.data ?
                  <ListView
                    list={appList.data}
                    handleItemClick={this.toAppInfo}
                  /> : null
              }
            </Layout>
          )}
        />
        <Route
          path={`${match.url}/:id`}
          component={AppInfo}
        />
      </Switch>
    );
  }
}
const mapStateToProps = state => ({
  appList: state.main.appList.data.appList,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  notice: noticeDialogActions.on,
  loader,
  appListRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppList));