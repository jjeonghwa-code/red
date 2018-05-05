import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Item from './components/Item';

const styles = theme => ({

});
class ListView extends React.Component {
  render () {
    const { classes, list, handleItemClick } = this.props;
    return (
      <List>
        {
          list.map(({ id, ...rest}) => (
            <Item
              key={id}
              handleClick={() => handleItemClick(id)}
              {...rest}
            />
          ))
        }
      </List>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ListView);
