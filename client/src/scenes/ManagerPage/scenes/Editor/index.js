import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import Layout from './components/Layout';
import EditorSideMenu from './components/EditorSideMenu';

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      templateList: [],
    };
    this.getProductList();
  }
  getProductList = () => {
    const { editor } = this.props.editor.response;
    editor.getProductList((err, productList) => this.setState({
      productList,
    }));
  };
  getTemplateList = ({ code, num = 20 }) => {
    const { editor } = this.props.editor.response;
    editor.getTemplateList(code, { limit: num }, (err, data) => {
      const { list } = data;
      this.setState({
        templateList: list,
      });
    });
  };
  componentDidMount() {
    const { editor } = this.props.editor.response;
    editor.createProject({
      selector: "#editor",
      psCode: "54x94@TPBCDFT",
      templateUrl: "gcs://template/partners/redp/res/template/11184.json",
      title: "TEST TITLE",
      hideToolbar: true,
    });
  }
  handleSideMenuClick = (name) => {
    switch(name) {
      case 'goBack':
        this.props.goBack();
        break;
      default:
        break;
    }
  };
  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <EditorSideMenu handleClick={this.handleSideMenuClick}/>
        <Layout id="editor" />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  editor: state.ManagerPage.data.editor,
});
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
