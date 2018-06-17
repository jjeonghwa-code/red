import React from 'react';
import { connect } from 'react-redux';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import lang from './lang';

class Component extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const { translate, onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell
            padding={'default'}
            sortDirection={'asc'}
          >
            <Tooltip
              title={lang.Sort[translate]}
              enterDelay={300}
            >
              <TableSortLabel
                active
                direction={order}
                onClick={this.createSortHandler('id')}
              />
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(Component);
