import React from 'react';
import { connect } from 'react-redux';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
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
