import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import Table from '../../components/Table';
import { orderedList } from './data/orderedList/actions';
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
    this.props.requestOrderedList({
      accountId: this.props.auth.response.id,
      franchiseeId: this.props.franchiseeLogin.response ? this.props.franchiseeLogin.response.id : null,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.orderedList.loading) {
      this.setState(initialState);
    }
    if (this.props.franchiseeLogin.response !== nextProps.franchiseeLogin.response) {
      this.props.requestOrderedList({
        accountId: this.props.auth.response.id,
        franchiseeId: nextProps.franchiseeLogin.response ? nextProps.franchiseeLogin.response.id : null,
      });
    }
  }
  datetimeToString = (date) => {
    const D = new Date(date);
    const yy = D.getUTCFullYear();
    const mo = D.getMonth() + 1;
    const dates = D.getDate();
    return `${yy}/${mo}/${dates}`;
  };
  handleTableRowClick = (input) => {
    console.log('input');
    // this.setState({
    //   formDialogOn: true,
    //   selectedRow: this.props.orderedList.response.find(o => o.id === input),
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
    const { translate, orderedList, franchiseeLogin, auth } = this.props;
    const colData = [
      { id: 'thumbnails', thumbnails: true, numeric: false, disablePadding: false, label: lang.Thumbnail[translate] },
      { id: 'productName', numeric: false, disablePadding: false, label: lang.ProductName[translate] },
      { id: 'sizeName', numeric: false, disablePadding: false, label: lang.Size[translate]},
      { id: 'quantity', variantValue: 'quantityForViews', numeric: false, disablePadding: false, label: lang.Quantity[translate]},
      { id: 'sumOfPrice', numeric: false, disablePadding: false, label: lang.Price[translate]},
      { id: 'order_datetime', numeric: false, disablePadding: false, label: lang.Date[translate]},
    ];
    if (franchiseeLogin.response) {
      colData.push(
        { id: 'franchisee', numeric: false, disablePadding: false, label: lang.Franchisee[translate]},
      );
    }
    return (
      <React.Fragment>
        {
          orderedList.loading ?
            <Loader/> :
          orderedList.response ?
            <Table
              disabled
              title={lang.Order[translate]}
              data={orderedList.response.map(o => ({
                ...o,
                order_datetime: this.datetimeToString(o.order_datetime),
                quantityForViews: o.views && o.views.length ?
                  `${o.views.length * o.quantity}(${o.views.length}*${o.quantity})` : undefined,
                sumOfPrice: o.views.length ? o.quantity * o.price * o.views.length : o.quantity * o.price,
                franchisee: o.accountId !== auth.response.id && franchiseeLogin.response ? franchiseeLogin.response.name : '',
              }))}
              handleRowClick={this.handleTableRowClick}
              handleMenuClick={this.handleTableMenuClick}
              columnData={colData}
            /> :
            <Error/>
        }
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  translate: state.data.language.selected,
  orderedList: state.ManagerPage.OrderedManager.data.orderedList,
  franchiseeLogin: state.ManagerPage.data.franchiseeLogin,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  requestOrderedList: orderedList.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
