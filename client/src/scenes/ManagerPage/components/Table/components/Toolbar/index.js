import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Add';
import { lighten } from 'material-ui/styles/colorManipulator';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Typography';
import lang from './lang';

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  },
});
const Component = props => {
  const { translate, disabled, numSelected, classes, title, handleMenuClick } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Text color="inherit" variant="subheading">
            {numSelected}{lang.Selected[translate]}
          </Text>
        ) : (
          <Text variant="title">{title}</Text>
        )}
      </div>
      <div className={classes.spacer} />
      {
        disabled ? null :
          <div className={classes.actions}>
            {numSelected > 0 ?
              <IconButton
                disabled={numSelected < 1}
                aria-label="Delete"
                onClick={() => handleMenuClick('remove')}
              >
                <DeleteIcon />
              </IconButton>
              :
              <IconButton
                disabled={numSelected > 0}
                aria-label="Create"
                onClick={() => handleMenuClick('create')}
              >
                <CreateIcon />
              </IconButton>
            }
          </div>
      }
    </Toolbar>
  );
};
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
