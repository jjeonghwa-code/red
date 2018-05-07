import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import {
  language,
} from '../../../../data/language/actions';
import PaperLayout from '../../components/PaperLayout';
import Language from './components/Language'

class Scene extends React.Component {
  render() {
    const { language, setLanguage } = this.props;
    return (
      <PaperLayout>
        <Language selected={language.selected} set={setLanguage}/>
      </PaperLayout>
    );
  }
}
const mapStateToProps = state => ({
  language: state.data.language,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  setLanguage: language.set,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
