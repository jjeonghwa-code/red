import React from 'react';
import { connect } from 'react-redux';
import lang from './lang';
import Dialog from '../../../../components/Dialog';
import Loader from '../../../../components/Loader';
import TableForSelection from '../TableForSelection';

class Component extends React.Component {
  render () {
    const { translate, loading, data, handleRowClick, ...props } = this.props;
    return (
      <Dialog
        title={lang.FranchiseeLogin[translate]}
        {...props}
      >
        {loading ? <Loader/> : null}
        {
          data ?
            <TableForSelection data={data} handleRowClick={handleRowClick}/> : null
        }
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(Component);
