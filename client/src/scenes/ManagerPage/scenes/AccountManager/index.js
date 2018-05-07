import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import Table from '../../components/Table';
import {
  accountList,
} from './data/accountList/actions';
import {
  accountCreate,
} from './data/accountCreate/actions';
import {
  accountRemove,
} from './data/accountRemove/actions';
import {
  accountUpdate,
} from './data/accountUpdate/actions';
import Loader from '../../../../components/Loader';
import Error from '../../../../components/Error';
import FormDialog from './components/FormDialog';
import lang from './lang';

const initialState = {
  formDialogOn: false,
  selectedRow: null,
};
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.requestAccountList();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.accountList.loading) {
      this.setState(initialState);
    }
  }
  handleTableRowClick = (input) => {
    this.setState({
      formDialogOn: true,
      selectedRow: this.props.accountList.response.find(o => o.id === input),
    });
  };
  handleTableMenuClick = (name, data) => {
    switch(name) {
      case 'create': this.setState({
          formDialogOn: true,
          selectedRow: null,
        });
        break;
      case 'remove':
        this.props.requestAccountRemove(data);
      default:
        break;
    }
  };
  handleFormSubmit = (input) => {
    const { mode } = input;
    if (mode === 'create') {
      this.props.requestAccountCreate(input);
    } else if (mode === 'update') {
      this.props.requestAccountUpdate(input);
    }
  };
  render() {
    const { formDialogOn, selectedRow } = this.state;
    const { translate, accountList } = this.props;
    return (
      <React.Fragment>
        {
          accountList.loading || accountRemove.loading ?
            <Loader/> :
          accountList.response ?
            <Table
              title={lang.Account[translate]}
              data={accountList.response.map(o => ({
                ...o,
                companyName: o.company ? o.company.name : '',
                supervisorName: o.root && o.root.company ? o.root.company.name : '',
              }))}
              handleRowClick={this.handleTableRowClick}
              handleMenuClick={this.handleTableMenuClick}
              columnData={[
                { id: 'userId', numeric: false, disablePadding: false, label: 'ID' },
                { id: 'name', numeric: false, disablePadding: false, label: lang.Name[translate]},
                { id: 'type', numeric: false, disablePadding: false, label: lang.Type[translate]},
                { id: 'companyName', numeric: false, disablePadding: false, label: lang.CompanyName[translate]},
                { id: 'supervisorName', numeric: false, disablePadding: false, label: lang.SupervisorName[translate]},
              ]}
            /> :
            <Error/>
        }
        <FormDialog
          title={`${lang.Account[translate]} ${selectedRow ? lang.Update[translate]:lang.Create[translate]}`}
          loading={accountCreate.loading || accountUpdate.loading}
          open={formDialogOn}
          onClose={() => this.setState({
            formDialogOn: false,
          })}
          selected={selectedRow}
          handleSubmit={this.handleFormSubmit}
          rootList={accountList.response ?
            accountList.response.filter(o => o.type === 'supervisor')
              .map(o => ({ id: o.id, company: o.company }))
            : []
          }
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  translate: state.data.language.selected,
  accountList: state.ManagerPage.AccountManager.data.accountList,
  accountCreate: state.ManagerPage.AccountManager.data.accountCreate,
  accountRemove: state.ManagerPage.AccountManager.data.accountRemove,
  accountUpdate: state.ManagerPage.AccountManager.data.accountUpdate,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  requestAccountList: accountList.request,
  requestAccountCreate: accountCreate.request,
  requestAccountRemove: accountRemove.request,
  requestAccountUpdate: accountUpdate.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
