import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Title from './components/Title';
import Footer from './components/Footer';

class Scene extends React.Component {
  render() {
    console.log(window.LANGUAGE);
    return (
      <React.Fragment>
        <Layout>
          <Header/>
          <Title/>
        </Layout>
        <Footer/>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
