import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import update from 'react-addons-update';
import Layout from './components/Layout';
import EditorSideMenu from './components/EditorSideMenu';
import makeExcel from './modules/makeExcel';
import lang from './lang';
import Loader from '../../../../components/Loader';
import Header from '../../components/Header';
import {
  get,
} from './data/get/actions';
import {
  save,
} from './data/save/actions';
import {
  productList,
} from './data/productList/actions';
import {
  templateList,
} from './data/templateList/actions';

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
      addTextNum: 0,
      changeables: [],
      events: [],
      project: null,
      loading: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { editor } = this.props.editor.response;
    const {
      get,
    } = nextProps;
    if (get.response && !this.state.project && this.props.match.params.projectId) {
      const {
        projectId,
        id,
        thumbnails,
      } = get.response;
      if (projectId) {
        editor.openProject({
          projectId,
          hideToolbar: true,
          selector: "#editor",
        });
        this.setState({
          project: {
            projectId,
            id,
            thumbnails,
          },
        });
      }
    }
  }
  componentDidMount() {
    const { editor } = this.props.editor.response;
    window._editor = editor;
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
            if (info.data && info.data.text) {
              info.data.text = info.data.text.replace(/[\n\r]/g, '');
            }
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
          changeables: newChangeables.filter(o => o.variable.title && o.data && o.data.text),
          events: this.state.events.concat(e),
        }
      });
    });
    editor.on('close', (e) => console.log('close completed',e));

    const {
      requestProductList,
      match,
      requestGet,
    } = this.props;
    requestProductList({ editor });
    const { projectId } = match.params;
    if (projectId) {
      requestGet({ projectId });
    }
  };
  initEditorForDev = () => {
    this.createProject({
      template_uri: 'gcs://template/partners/redp/res/template/11173.json',
      psCode: '54x94@TPBCDFT',
      thumbnails: [
        "https://d2vgy67dgpwzce.cloudfront.net/Edicus/thumbnails/TP/TPBCDFT/2fb96ef1-376d-450d-b3ca-634e4ae18a80.png",
        "https://d2vgy67dgpwzce.cloudfront.net/Edicus/thumbnails/TP/TPBCDFT/4952b371-5e20-427b-b061-c9fda5a62483.png"],
      sizeName: '50x90',
      productName: '디자인명함',
      defaultPrice: 6900,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2NvZGUiOiJyZWRwIiwicmVzb3VyY2VfaWQiOjExMTczLCJpYXQiOjE1MjE1NDEwNDZ9.KIiY8qkMY38FADM_etzsBJTWNvWeihYJgS8GwCsgKdk",
    });
  };
  createProject = (template) => {
    const { editor } = this.props.editor.response;
    const {
      psCode,
      template_uri,
      thumbnails,
      sizeName,
      productName,
      defaultPrice,
      token,
    } = template;
    if (this.state.project) {
      editor.changeTemplate(psCode, template_uri);
      this.setState((state) => {
        const project = JSON.parse(JSON.stringify(state.project));
        project.psCode = psCode;
        project.templateToken = token;
        project.sizeName = sizeName;
        project.productName = productName;
        project.price = defaultPrice;
        project.thumbnails = thumbnails;
        return { project }
      });
    } else {
      editor.createProject({
        selector: "#editor",
        psCode,
        title: "TITLE",
        hideToolbar: true,
        templateUrl: template_uri,
      });
      this.setState({
        project: {
          psCode,
          thumbnails,
          sizeName,
          productName,
          price: defaultPrice,
          templateToken: token,
        },
      });
    }
  };
  handleSideMenuClick = (name, data) => {
    let editor;
    if (this.props.editor.response) {
      editor = this.props.editor.response.editor;
    }
    switch(name) {
      case 'dev':
        this.initEditorForDev();
        break;
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
        this.props.requestTemplateList({
          editor,
          code: data.code,
          option: {
            limit: 9999,
          },
        });
        // this.getTemplateList({ code: data.code });
        break;
      case 'templateClick':
        this.createProject(data);
        break;
      case 'addImage':
        this.handleAddImage();
        break;
      case 'download':
        makeExcel(this.state.changeables, editor.getProjectId());
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
    const { changeables, addTextNum } = this.state;
    const { editor } = this.props.editor.response;

    const num = addTextNum === 0 ? changeables.length : addTextNum + 1;
    //*
    const newText = {
      name: `text_${num}`,
      feature: 'var:text',
      variable: {
        id: `textId_${num}`,
        extra: null,
        title: `Text#${num}`,
      },
      data: {
        text: lang.Text[this.props.translate],
        font_size: 10,
        align: 'left',
      },
    };
    this.setState({
      addTextNum: num,
    });
    editor.remoteEditor('add-text', newText);
  };
  handleHeaderClick = (name) => {
    const { handleHeaderClick, requestSave, auth }  = this.props;
    const { editor } = this.props.editor.response;
    const { project } = this.state;
    switch(name) {
      case 'save':
        requestSave({
          editor,
          project,
          accountId: auth.response.id,
        });
        break;
      default:
        handleHeaderClick(name);
        break;
    }
  };
  render() {
    const {
      productList,
      templateList,
      auth,
      franchisee,
      save,
      get,
      match,
    } = this.props;
    const { editor } = this.props.editor.response;
    const {
      changeables,
      events,
      project,
    } = this.state;
    return (
      <React.Fragment>
        { get.loading || save.loading ? <Loader isGlobal/> : null }
        <Header
          account={auth.response}
          franchisee={franchisee}
          handleClick={this.handleHeaderClick}
          editorMode
          disabled={!project}
        />
        <EditorSideMenu
          isOpened={!!match.params.projectId}
          handleClick={this.handleSideMenuClick}
          handleChange={this.handleFormChange}
          forms={changeables}
          productsAndTemplates={{
            productList: productList.response || [],
            templateList: templateList.response ?
              templateList.response.list : [],
          }}
          batchNotAllowed={auth.response.type === 'franchisee' }
          batchDisabled={!match.params.projectId}
        />
        <Layout id="editor" />
        <div id="viewer"/>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  translate: state.data.language.selected,
  editor: state.ManagerPage.data.editor,
  save: state.ManagerPage.Editor.data.save,
  productList: state.ManagerPage.Editor.data.productList,
  templateList: state.ManagerPage.Editor.data.templateList,
  get: state.ManagerPage.Editor.data.get,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  requestSave: save.request,
  requestProductList: productList.request,
  requestTemplateList: templateList.request,
  requestGet: get.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
