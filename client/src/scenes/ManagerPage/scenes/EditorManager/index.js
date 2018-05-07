import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import Table from '../../components/Table';
import { printList } from './data/printList/actions';
import Loader from '../../../../components/Loader';
import Error from '../../../../components/Error';
import lang from './lang';

const initialState = {
  formDialogOn: false,
  selectedRow: null,
};
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.requestPrintList();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.printList.loading) {
      this.setState(initialState);
    }
  }
  handleTableRowClick = (input) => {
    console.log('input');
    // this.setState({
    //   formDialogOn: true,
    //   selectedRow: this.props.printList.response.find(o => o.id === input),
    // });
  };
  handleTableMenuClick = (name, data) => {
    switch(name) {
      case 'create': this.props.openEditorMode();
        break;
      default:
        break;
    }
  };
  handleFormSubmit = (input) => {
    const { mode } = input;
  };
  render() {
    const { formDialogOn, selectedRow } = this.state;
    const { translate, printList } = this.props;
    return (
      <React.Fragment>
        {
          printList.loading ?
            <Loader/> :
          printList.response ?
            <Table
              title={lang.Cart[translate]}
              data={printList.response.map(o => ({
                ...o,
                companyName: o.company.name,
                thumbnailURL: <img width={200} src={o.thumbnailURL} />,
              }))}
              handleRowClick={this.handleTableRowClick}
              handleMenuClick={this.handleTableMenuClick}
              columnData={[
                { id: 'thumbnailURL', numeric: false, disablePadding: false, label: lang.Thumbnail[translate] },
                { id: 'name', numeric: false, disablePadding: false, label: lang.Name[translate]},
                { id: 'size', numeric: false, disablePadding: false, label: lang.Size[translate]},
                { id: 'quantity', numeric: false, disablePadding: false, label: lang.Quantity[translate]},
                { id: 'price', numeric: false, disablePadding: false, label: lang.Price[translate]},
                { id: 'companyName', numeric: false, disablePadding: false, label: lang.CompanyName[translate]},
              ]}
            /> :
            <Error/>
        }
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  translate: state.data.language.selected,
  printList: state.ManagerPage.EditorManager.data.printList,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  requestPrintList: printList.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
