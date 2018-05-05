import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  withRouter,
} from 'react-router-dom';
import Layout from './components/Layout';
import Bar from './components/Bar';
import DrawerMenu from './components/DrawerMenu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchMode: false,
      isDrawerOpen: false,
    };
  };
  toggleDrawer = (open) => () => {
    this.setState({ isDrawerOpen: open });
  };
  onSelect = (clicked) => {
    const { push } = this.props;
    switch (clicked) {
      case 'appList':
        // 잠시
        // this.setState({ isSearchMode: true });
        push('/appList');
        break;
      case 'addApp':
        this.setState({ isSearchMode: false });
        push('/addApp');
        break;
      case 'myApp':
        this.setState({ isSearchMode: false });
        push('/');
        break;
      default:
        break;
    }
  };
  render() {
    const { isSearchMode } = this.state;
    return (
      <Layout>
        <Bar
          isSearchMode={isSearchMode}
          onMenuIconClick={this.toggleDrawer(true)}
          onTitleClick={() => this.onSelect('appList')}
          onMyAppClick={() => this.onSelect('myApp')}
        />
        <DrawerMenu
          open={this.state.isDrawerOpen}
          onClose={this.toggleDrawer(false)}
          onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  user: state.data.user,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header));
