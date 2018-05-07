import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import {
  login,
} from './data/login/actions';
import Layout from './components/Layout';
import Header from './components/Header';
import Title from './components/Title';
import Footer from './components/Footer';
import ContactDialog from '../../components/ContactDialog';
import LoginDialog from './components/LoginDialog';

class Scene extends React.Component {
  state = {
    loginDialogOn: false,
    contactDialogOn: false,
  };
  handleHeaderClick = (name) => {
    switch (name) {
      case 'login':
        this.setState({
          loginDialogOn: true,
        });
        break;
      case 'contact':
        this.setState({
          contactDialogOn: true,
        });
        break;
    }
  };
  handleLoginSubmit = (input) => {
    this.props.loginRequest(input);
  };
  render() {
    const {
      loginDialogOn,
      contactDialogOn,
    } = this.state;
    const {
      login,
    } = this.props;
    return (
      <React.Fragment>
        <Layout>
          <Header handleClick={this.handleHeaderClick}/>
          <Title/>
        </Layout>
        <Footer/>
        <ContactDialog
          open={contactDialogOn}
          onClose={() => this.setState({
            contactDialogOn: false,
          })}
        />
        <LoginDialog
          isLoading={login.loading}
          open={loginDialogOn}
          onClose={() => this.setState({
            loginDialogOn: false,
          })}
          onSubmit={this.handleLoginSubmit}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  login: state.LandingPage.data.login,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  loginRequest: login.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
