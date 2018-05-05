/* global RedEditorSDK */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Text from 'material-ui/Typography';
import {
  editorToken,
} from './data/editorToken/actions';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: null,
      productList: [],
      templateList: [],
      currentProject: null,
    };
    this.props.requestEditorToken();

  }
  componentWillReceiveProps(nextProps) {
    const { editorToken } = nextProps;
    if (editorToken) {
      const Editor = new RedEditorSDK({
        userId: 'Kiyeop Yang',
        accessToken: editorToken.token,
      });
      this.setState({
        editor: Editor,
      });
      Editor.on('create', console.log);
      Editor.on('load', console.log);
      Editor.on('close', console.log);
    }
  }
  handleChange = name => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };
  getProductList = () => {
    const { editor } = this.state;
    editor.getProductList((err, productList) => this.setState({
      productList,
    }));
  };
  getTemplateList = ({ code, num = 20 }) => {
    const { editor } = this.state;
    editor.getTemplateList(code, { limit: num }, (err, data) => {
      const { list } = data;
      this.setState({
        templateList: list,
      });
    });
  };
  handleTemplateClick = (template) => {
    const { editor, currentProject } = this.state;
    const { psCode, template_uri } = template;
    if (currentProject) {
      editor.changeTemplate(psCode, template_uri);
    } else {
      editor.createProject({
        selector: "#red",
        psCode: psCode,
        templateUrl: template_uri,
        title: "TEST TITLE",
      });
    }
    this.setState({
      currentProject: {
        template,
      },
    });
  };
  getProjectThumbnails = () => {
    const { editor } = this.state;
    editor.getProjectThumbnails(editor.getProjectId())
      .then(console.log);
  };
  handleSave = () => {
    const { editor } = this.state;
    editor.remoteEditor('command', { type: 'save' });
  };
  getProjectId = () => {
    const { editor } = this.state;
    const id = editor.getProjectId();
    console.log(id);
  };
  addImage = () => {
    const { editor } = this.state;
    editor.remoteEditor('add-image', {
      src_type: 'file-input',
      method: 'add',
      item_type: 'sticker',
    })
  };
  addText = () => {
    const { editor } = this.state;
    editor.remoteEditor('add-text', {
      name: 'text_001',
      feature: 'var:text',
      data: {
        text: 'haah',
        font_size: 10,
        align: 'left',
      },
    });
  };
  prepareOrder = () => {
    const { editor } = this.state;
    editor.prepareOrder({
      amount: 1,
      price: 1000,
      orderId: '2018_1234',
      name: 'kiyeop',
    }, console.log);
  };
  render() {
    const {
      productList,
      templateList,
      currentProject
    } = this.state;
    console.log(productList);
    console.log(templateList);
    return (
      <div
        className="App"
        style={{ display: 'flex '}}
      >
        <div
          style={{ width: '30%' }}
        >
          <Button
            onClick={this.handleSave}
            disabled={!currentProject}
          >
            save
          </Button>
          <Button
            onClick={this.prepareOrder}
            disabled={!currentProject}
          >
            prepareOrder
          </Button>
          <Button
            onClick={this.addText}
            disabled={!currentProject}
          >
            addText
          </Button>
          <Button
            onClick={this.addImage}
            disabled={!currentProject}
          >
            addImage
          </Button>
          <Button
            onClick={this.getProjectId}
            disabled={!currentProject}
          >
            getProjectId
          </Button>
          <Button
            onClick={() => {
              const a = this.state.editor.getCurrentTemplate();
              console.log(a);
            }}
            disabled={!currentProject}
          >
            getCurrentTemplate()
          </Button>
          <Button
            onClick={this.getProjectThumbnails}
            disabled={!currentProject}
          >
            getProjectThumbnails()
          </Button>
          <Button onClick={this.getProductList}>
            RedEditorSDK.getProductList()
          </Button>
          {
            productList.map(o => (
              <div key={o.product.code}>
                <Button onClick={() => this.getTemplateList({ code: o.product.code })}>
                  {o.product.name}-{o.product.code}
                </Button>
              </div>
            ))
          }
          {
            templateList.map((o) => {
              const { title, theme } = o.features;
              return (
                <div key={`${title}${theme}`}>
                  <Button
                    onClick={() => this.handleTemplateClick(o)}
                  >
                    {theme} - {title}
                  </Button>
                </div>
              )
            })
          }
        </div>
        <div
          id="red"
          style={{ width: '70%', height: '1000px' }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  editorToken: state.data.editorToken.response,
});
export default connect(mapStateToProps, {
  requestEditorToken: editorToken.request,
})(App);
