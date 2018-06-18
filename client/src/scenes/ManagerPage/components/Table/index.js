import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Head from './components/Head';
import Toolbar from './components/Toolbar';
import PaperLayout from '../../components/PaperLayout';
import lang from './lang';

const styles = {
  table: {
    minWidth: 600,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  imgWrapper: {
    margin: 'auto',
    width: 270,
    height: 270,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 'auto',
    maxHeight: '100%',
    width: 'auto',
    maxWidth: '100%',
  },
};
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.columnData = this.props.columnData;
    const initialOrderBy = this.columnData[0].id;
    this.state = {
      order: 'asc',
      orderBy: initialOrderBy,
      selected: [],
      data: this.props.data.sort(
        (a, b) => (a[initialOrderBy] < b[initialOrderBy] ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      hoveredItemId: null, // only for thumbnails
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selected !== this.state.selected) {
      this.props.handleSelect(this.state.selected);
    }
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };
  handleSelect = (id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;
  handleMenuClick = (name) => {
    let data;
    switch(name) {
      case 'create':
        break;
      case 'remove':
        data = this.state.selected;
        break;
      default: break;
    }
    this.props.handleMenuClick(name, data);
  };
  render() {
    const { classes, translate, handleRowClick, title, disabled } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, hoveredItemId } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <PaperLayout>
        <Toolbar
          numSelected={selected.length}
          title={title}
          handleMenuClick={this.handleMenuClick}
          disabled={disabled}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <Head
              disabled={disabled}
              columnData={this.columnData}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    {
                      disabled ? null :
                        <TableCell
                          onClick={() => this.handleSelect(n.id)}
                          padding="checkbox"
                        >
                          <Checkbox
                            checked={isSelected}
                          />
                        </TableCell>
                    }
                    {
                      this.columnData.map(o => (
                        <TableCell
                          key={o.id}
                          onClick={() => handleRowClick(n.id)}
                        >
                          {
                            o.thumbnails ?
                              <div className={classes.imgWrapper}>
                                <img
                                  className={classes.img}
                                  src={hoveredItemId === n.id && n.thumbnails.length > 1 ? n.thumbnails[1] : n.thumbnails[0]}
                                  onMouseEnter={() => this.setState({
                                    hoveredItemId: n.id,
                                  })}
                                  onMouseLeave={() => this.setState({
                                    hoveredItemId: null,
                                  })}
                                />
                              </div>: o.variantValue && n[o.variantValue] ? n[o.variantValue]: n[o.id]
                          }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage={lang.RowsPerPage[translate]}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </PaperLayout>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
