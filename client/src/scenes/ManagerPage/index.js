import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { auth } from '../../data/auth/actions';
import { franchiseeList } from './data/franchiseeList/actions';
import { franchiseeLogin } from './data/franchiseeLogin/actions';
import { editor } from './data/editor/actions';
import {
  removeUserTokenFromCookie,
  getSecondaryUserTokenFromCookie,
  removeSecondaryUserTokenFromCookie,
  setSecondaryUserTokenToCookie,
} from '../../modules/authHelper';
import Layout from './components/Layout';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Content from './components/Content';
import ContactDialog from '../../components/ContactDialog';
import AccountManager from './scenes/AccountManager';
import EditorManager  from './scenes/EditorManager';
import CompletedManager from './scenes/CompletedManager';
import ViewDialog from './components/ViewDialog';
import SecondaryAccountDialog from './components/SecondaryAccountDialog';
import Setting from './scenes/Setting';
import lang from './lang';
import Loader from '../../components/Loader';
import Editor from './scenes/Editor';

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactDialogOn: false,
      viewDialogOn: false,
      viewDialogTitle: '',
      viewDialogData: [],
      selectedSideMenu: this.props.auth.response.type === 'serviceManager' ? 'account':'basket',
      secondaryAccountDialogOn: false,
      editorModeOn: false,
    };
    this.handleFranchiseeLogin();
    const { type, userId } = this.props.auth.response;
    this.props.requestEditor({
      userId,
    });
  }
  handleLogout = () => {
    removeUserTokenFromCookie();
    this.props.authRequest();
    if (this.props.franchiseeLogin) {
      this.handleFranchiseeLogout();
    }
  };
  handleFranchiseeLogout = () => {
    removeSecondaryUserTokenFromCookie();
    this.props.requestFranchiseeLogin();
  };
  parseMyInfo = () => {
    const { translate } = this.props;
    const { response } = this.props.auth;
    const {
      userId, name, phone, email, type, company, root,
    } = response;
    const data = [
      {
        label: 'ID',
        data: userId,
      },
      {
        label: lang.Name[translate],
        data: name,
      },
      {
        label: lang.Phone[translate],
        data: phone,
      },
      {
        label: lang.Email[translate],
        data: email,
      },
      {
        label: lang.Type[translate],
        data: type,
      },
    ];
    if (company) {
      data.push({ label: lang.CompanyName[translate], data: company.name });
      data.push({ label: lang.CompanyLocation[translate], data: company.location });
    }
    if (root) {
      data.push({ label: lang.SupervisorName[translate], data: root.name });
      data.push({ label: lang.SupervisorLocation[translate], data: root.location });
    }
    return data;
  };
  handleHeaderClick = (name) => {
    const { translate, auth, requestFranchiseeList } = this.props;
    switch(name) {
      case 'info':
        this.setState({
          viewDialogOn: true,
          viewDialogTitle: `${lang.Account[translate]} ${lang.Information[translate]}`,
          viewDialogData: this.parseMyInfo(),
        });
        break;
      case 'logout':
        this.handleLogout();
        break;
      case 'contact':
        this.setState({
          contactDialogOn: true,
        });
        break;
      case 'franchiseeLogin':
        const { id, type } = auth.response;
        requestFranchiseeList(type === 'supervisor' ? { id } : undefined);
        this.setState({
          secondaryAccountDialogOn: true,
        });
        break;
      case 'franchiseeLogout':
        this.handleFranchiseeLogout();
        break;
      default:
        break;
    }
  };
  handleSideMenuClick = (name) => {
    this.setState({
      selectedSideMenu: name,
    });
  };
  handleFranchiseeLogin = (selectedId = getSecondaryUserTokenFromCookie()) => {
    const { id, type } = this.props.auth.response;
    if (selectedId && selectedId !== '') {
      this.props.requestFranchiseeLogin({
        id: type === 'serviceManager' ? undefined : id,
        franchiseeId: selectedId,
      });
      this.setState({
        secondaryAccountDialogOn: false,
      });
    }
  };
  render() {
    const { auth, franchiseeList, franchiseeLogin, editor } = this.props;
    const {
      contactDialogOn,
      selectedSideMenu,
      viewDialogOn,
      viewDialogTitle,
      viewDialogData,
      secondaryAccountDialogOn,
      editorModeOn,
    } = this.state;
    return (
      <Layout>
        { editor.loading ? <Loader/> : null }
        <Header
          account={auth.response}
          loading={franchiseeLogin.loading}
          franchisee={franchiseeLogin.response}
          handleClick={this.handleHeaderClick}
          editorModeOn={editorModeOn}
        />
        {
          editorModeOn ?
            <Editor
              goBack={() => this.setState({ editorModeOn: false })}
            />:
            <React.Fragment>
              <SideMenu
                type={auth.response.type}
                selected={selectedSideMenu}
                handleClick={this.handleSideMenuClick}
              />
              <Content>
                {
                  selectedSideMenu === 'account' ?
                    <AccountManager/> :
                    selectedSideMenu === 'setting' ?
                      <Setting/> :
                      selectedSideMenu === 'basket' ?
                        <EditorManager
                          openEditorMode={() => this.setState({
                            editorModeOn: true,
                          })}
                        /> :
                        selectedSideMenu === 'completed' ?
                          <CompletedManager/> : null
                }
              </Content>
            </React.Fragment>
        }
        <ContactDialog
          open={contactDialogOn}
          onClose={() => this.setState({
            contactDialogOn: false,
          })}
        />
        <ViewDialog
          open={viewDialogOn}
          title={viewDialogTitle}
          data={viewDialogData}
          onClose={() => this.setState({
            viewDialogOn: false,
          })}
        />
        <SecondaryAccountDialog
          open={secondaryAccountDialogOn}
          onClose={() => this.setState({
            secondaryAccountDialogOn: false,
          })}
          loading={franchiseeList.loading}
          data={franchiseeList.response}
          handleRowClick={this.handleFranchiseeLogin}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  translate: state.data.language.selected,
  franchiseeList: state.ManagerPage.data.franchiseeList,
  franchiseeLogin: state.ManagerPage.data.franchiseeLogin,
  editor: state.ManagerPage.data.editor,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  authRequest: auth.request,
  requestFranchiseeList: franchiseeList.request,
  requestFranchiseeLogin: franchiseeLogin.request,
  requestEditor: editor.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
