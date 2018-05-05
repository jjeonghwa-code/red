import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

class Scene extends React.Component {
  render() {
    return (
      <React.Fragment>
     
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
