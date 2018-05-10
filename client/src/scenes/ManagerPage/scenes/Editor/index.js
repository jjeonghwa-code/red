import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import update from 'react-addons-update';
import Button from 'material-ui/Button';
import Layout from './components/Layout';
import EditorSideMenu from './components/EditorSideMenu';
import makeExcel from './modules/makeExcel';

function equalShallow(a, b) {
  for (let key in a) {
    if (!(key in b) || a[key] !== b[key])
      return false;
  }
  for (let key in b) {
    if (!(key in a) || a[key] !== b[key])
      return false;
  }
  return true;
}
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      templateList: [],
      changeables: [],
      events: [],
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
      if (err) console.error(err);
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
    editor.on('create', (e) => console.log('create completed',e));
    editor.on('load', (e) => {
      console.log('load completed',e);
    });
    editor.on('change', (e) => {
      this.setState((prevState) => {
        const { info } = e;
        let newChangeables = prevState.changeables;
        if (e.action === 'var-added') {
          newChangeables = update(newChangeables, { $push: [info] });
        } else if (e.action === 'var-changed' || e.action === 'var-deleted') {
          const foundI = newChangeables.findIndex((o) => {
            const { path, variable } = o;
            return equalShallow(path, info.path) && equalShallow(variable, info.variable);
          });
          if (e.action === 'var-changed') {
            if (foundI < 0) {
              newChangeables = update(newChangeables, { $push: [info] });
            } else {
              newChangeables = update(newChangeables, { $splice: [[foundI, 1, info]] });
            }
          }
          if (e.action === 'var-deleted') {
            newChangeables = update(newChangeables, { $splice: [[foundI, 1]] });
          }
        }
        return {
          changeables: newChangeables,
          events: this.state.events.concat(e),
        }
      });
    });
    editor.on('close', (e) => console.log('close completed',e));
  }
  componentWillUnmount() {
    const { editor } = this.props.editor.response;
    editor.deleteProject();
  }
  handleSideMenuClick = (name, data) => {
    switch(name) {
      case 'goBack':
        this.props.goBack();
        break;
      case 'removeText':
        console.log(data);
        break;
      case 'addText':
        this.handleAddText();
        break;
      case 'productClick':
        this.getTemplateList({ code: data.code });
        break;
      case 'addImage':
        this.handleAddImage();
        break;
      case 'download':
        makeExcel(this.state.changeables);
        break;
      default:
        break;
    }
  };
  handleFormChange = (changeable, e) => {
    // 폼 이벤트 통해 remoteEditor 호출 부분
    let newChangeables = this.state.changeables;
    const foundI = newChangeables.findIndex((o) => {
      const { path , variable } = o;
      return equalShallow(path, changeable.path) && equalShallow(variable, changeable.variable);
    });

    changeable.data.text = e.target.value;

    newChangeables = update(
      newChangeables, { $splice: [[foundI, 1, changeable]] });
    this.setState({
      changeables: newChangeables,
    });

    const { editor } = this.props.editor.response;
    const { path, data, variable } = changeable;
    // 이하 폼 이벤트 수신 부분

    //*
    editor.remoteEditor('var-changed', {
      feature: 'var:text',
      data,
      path,
      variable,
    });
  };
  handleAddImage = (info =  {
    src_type: 'file-input',
    method: 'add',
    item_type: 'sticker',
  }) => {
    const { editor } = this.props.editor.response;
    editor.remoteEditor('add-image', info);
  };
  handleAddText = () => {
    // 텍스트 폼 추가 부분
    const { changeables } = this.state;
    const { editor } = this.props.editor.response;

    //*
    const newText = {
      name: `text_${changeables.length}`,
      feature: 'var:text',
      variable: {
        id: `textId_${changeables.length}`,
        extra: null,
      },
      data: {
        text: '내용을 입력',
        font_size: 10,
        align: 'left',
      },
    };
    editor.remoteEditor('add-text', newText);
  };
  handleSave = () => {
    const { editor } = this.props.editor.response;
    editor.remoteEditor('command', { type: 'save' });
  };
  handleGetThumbnail = () => {
    const { editor } = this.props.editor.response;
    const projectId = editor.getProjectId();
    console.log(projectId);
    editor.getProjectThumbnails(projectId, function(err,	data){
      if (err) console.error(err);
      console.log(data) //	->	thumbnail	목록
    });
  };
  handlePrepareOrder = () => {
    const { editor } = this.props.editor.response;
    editor.prepareOrder({
      order_count: 10,
      total_price: 20,
      orderId: "2018181818_2",
      name: "test_kiyeop",
    }, console.log)
  };
  render() {
    const { editor } = this.props.editor.response;
    const { changeables, events, productList, templateList } = this.state;
    console.log('changeables', changeables);
    console.log('events', events);
    console.log(this.state);
    // {/*<Button onClick={this.handleSave}>save</Button>*/}
    // {/*<Button onClick={this.handleGetThumbnail}>getThumbnail</Button>*/}
    // {/*<Button onClick={this.handlePrepareOrder}>prepareOrder</Button>*/}
    return (
      <React.Fragment>
        <EditorSideMenu
          handleClick={this.handleSideMenuClick}
          handleChange={this.handleFormChange}
          forms={changeables}
          productsAndTemplates={{
            productList,
            templateList,
          }}
        />
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
