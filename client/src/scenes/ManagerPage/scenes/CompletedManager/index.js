import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import Table from '../../components/Table';
import { completedList } from './data/completedList/actions';
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
    this.props.requestCompletedList();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.completedList.loading) {
      this.setState(initialState);
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
    //   selectedRow: this.props.completedList.response.find(o => o.id === input),
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
    const { translate, completedList } = this.props;
    return (
      <React.Fragment>
        {
          completedList.loading ?
            <Loader/> :
          completedList.response ?
            <Table
              disabled
              title={lang.Order[translate]}
              data={completedList.response.map(o => ({
                ...o,
                companyName: o.company.name,
                thumbnailURL: <img width={200} src={o.thumbnailURL} />,
                completedDatetime: this.datetimeToString(o.completedDatetime),
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
                { id: 'completedDatetime', numeric: false, disablePadding: false, label: lang.Date[translate]},
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
  completedList: state.ManagerPage.CompletedManager.data.completedList,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  requestCompletedList: completedList.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene));
