import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  withRouter,
} from 'react-router-dom';
import Table from '../../components/Table';
import { projectList } from './data/projectList/actions';
import { remove } from './data/remove/actions';
import Loader from '../../../../components/Loader';
import Error from '../../../../components/Error';
import lang from './lang';
import FormDialog from './components/FormDialog';
import { update } from './data/update/actions';
import makeExcel from './modules/makeExcel';
import UploadDialog from './components/UploadDialog';

const initialState = {
  formDialogOn: false,
  uploadDialogOn: false,
  selectedRow: null,
};
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.requestProjectList({ accountId: this.props.auth.response.id });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.projectList.loading) {
      this.setState(initialState);
    }
  }
  handleTableRowClick = (input) => {
    this.setState({
      formDialogOn: true,
      selectedRow: this.props.projectList.response.find(o => o.id === input),
    });
    // this.props.push(`/editor/${input}`);
  };
  handleTableMenuClick = (name, data) => {
    switch(name) {
      case 'create': this.props.push('/editor');
        break;
      case 'remove':
        const { editor } = this.props.editor.response;
        const projects = this.props.projectList.response.filter(o => data.includes(o.id));
        this.props.requestRemove({
          projects,
          editor,
        });
        break;
      default:
        break;
    }
  };
  handleFormSubmit = (input) => {
    console.log(input);
    this.props.requestUpdate(input);
  };
  handleFormMenuClick = (name, input) => {
    switch(name) {
      case 'download':
        // const { editor } = this.props.editor.response;
        // makeExcel(this.state.changeables, editor.getProjectId());
        // break;
        break;
      case 'upload':
        this.setState({
          uploadDialogOn: true,
        });
        break;
      case 'editor':
        this.props.push(`/editor/${input}`);
        break;
      default:
        console.log(name);
        break;
    }
  };
  render() {
    const { formDialogOn, uploadDialogOn, selectedRow } = this.state;
    const { translate, projectList, remove, update } = this.props;
    return (
      <React.Fragment>
        {
          projectList.loading || remove.loading ?
            <Loader/> :
          projectList.response ?
            <Table
              title={lang.Project[translate]}
              data={projectList.response}
              handleRowClick={this.handleTableRowClick}
              handleMenuClick={this.handleTableMenuClick}
              columnData={[
                { id: 'thumbnails', thumbnails: true, numeric: false, disablePadding: false, label: lang.Thumbnail[translate] },
                { id: 'productName', numeric: false, disablePadding: false, label: lang.ProductName[translate] },
                { id: 'sizeName', numeric: false, disablePadding: false, label: lang.Size[translate]},
                { id: 'quantity', numeric: false, disablePadding: false, label: lang.Quantity[translate]},
                { id: 'price', numeric: false, disablePadding: false, label: lang.Price[translate]},
              ]}
            /> : <Error/>
        }
        <FormDialog
          title={"프로젝트 상세"}
          loading={update.loading}
          open={formDialogOn}
          onClose={() => this.setState({
            formDialogOn: false,
          })}
          selected={selectedRow}
          handleSubmit={this.handleFormSubmit}
          handleMenuClick={this.handleFormMenuClick}
        />
        <UploadDialog
          title={"배치 주문"}
          open={uploadDialogOn}
          onClose={() => this.setState({
            uploadDialogOn: false,
          })}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  translate: state.data.language.selected,
  projectList: state.ManagerPage.ProjectManager.data.projectList,
  remove: state.ManagerPage.ProjectManager.data.remove,
  update: state.ManagerPage.ProjectManager.data.update,
  editor: state.ManagerPage.data.editor,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  requestProjectList: projectList.request,
  requestRemove: remove.request,
  requestUpdate: update.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
