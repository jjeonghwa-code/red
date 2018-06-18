import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Text from '@material-ui/core/Typography';
import AccountIcon from '@material-ui/icons/AccountCircle';
import SettingIcon from '@material-ui/icons/Settings';
import ShopIcon from '@material-ui/icons/Home';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import BasketIcon from '@material-ui/icons/ShoppingBasket';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/AddCircle';
import ClassIcon from '@material-ui/icons/Class';
import TextIcon from '@material-ui/icons/Title';
import ImageIcon from '@material-ui/icons/Photo';
import ManyIcon from '@material-ui/icons/PlaylistAdd';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import TextForm from './components/TextForm';
import ImageForm from './components/ImageForm';
import BatchForm from './components/BatchForm';
import ProductsAndTemplates from './components/ProductsAndTemplates';
import lang from './lang';

const leftDrawerWidth = 100;
const drawerWidth = 240;
const styles = theme => ({
  leftDrawer: {
    position: 'relative',
    width: leftDrawerWidth,
    background: theme.palette.primary.dark,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    background: theme.palette.primary.main,
  },
  list: {
    paddingTop: 0,
    overflowY: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  listItemContent: {
    color: theme.palette.primary.contrastText,
    marginRight: 0,
    width: 24,
    height: 24,
  },
  listItem: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: 0,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  centerListItemContent: {
    margin: 'auto',
    color: theme.palette.primary.contrastText,
  },
  centerListItemSelected: {
    background: theme.palette.primary.main,
  },
  centerListItem: {
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  cssUnder: {
    color: 'white',
  },
  cssUnderline: {
    '&:before': {
      backgroundColor: '#efefed',
    },
    '&:after': {
      backgroundColor: 'white',
    },
  },
  hideIcon: {
    visibility: 'hidden',
  },
  titleText: {
    margin: 'auto',
    fontSize: 16,
    color: theme.palette.primary.contrastText,
  },
  titleListItem: {
    height: 40,
  },
  menuText: {
    color: theme.palette.primary.contrastText,
    margin: 'auto',
  },
});
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: null,
      menu: this.props.isOpened ? 'text':'productsAndTemplates',
    };
  }
  handleMenuChange = name => () => this.setState({
    menu: name,
  });
  render () {
    const {
      classes,
      translate,
      type,
      selected,
      handleChange,
      handleClick,
      forms,
      productsAndTemplates,
      batchDisabled,
      batchNotAllowed
    } = this.props;
    const {
      menu,
      hovered,
    } = this.state;
    return (
      <React.Fragment>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.leftDrawer,
          }}
        >
          <div className={classes.toolbar} />
          <List className={classes.list}>
            <ListItem dense className={classes.centerListItem} button onClick={() => handleClick('goBack')}>
              <ListItemIcon>
                <LeftIcon className={classes.centerListItemContent}/>
              </ListItemIcon>
            </ListItem>
            <ListItem dense className={classNames(classes.centerListItem, { [classes.centerListItemSelected] : menu === 'productsAndTemplates'})} button onClick={this.handleMenuChange('productsAndTemplates')}>
              <ListItemIcon>
                <ClassIcon className={classes.centerListItemContent}/>
              </ListItemIcon>
              <Text className={classes.menuText}>
                {lang.Template[translate]}
              </Text>
            </ListItem>
            <ListItem dense className={classNames(classes.centerListItem, { [classes.centerListItemSelected] : menu === 'text'})} button onClick={this.handleMenuChange('text')}>
              <ListItemIcon>
                <TextIcon className={classes.centerListItemContent}/>
              </ListItemIcon>
              <Text className={classes.menuText}>
                {lang.Text[translate]}
              </Text>
            </ListItem>
            <ListItem dense className={classNames(classes.centerListItem, { [classes.centerListItemSelected] : menu === 'image'})} button onClick={this.handleMenuChange('image')}>
              <ListItemIcon>
                <ImageIcon className={classes.centerListItemContent}/>
              </ListItemIcon>
              <Text className={classes.menuText}>
                {lang.Image[translate]}
              </Text>
            </ListItem>
            {
              batchNotAllowed ? null:
                <ListItem dense className={classNames(classes.centerListItem, { [classes.centerListItemSelected] : menu === 'batch'})} button onClick={this.handleMenuChange('batch')}>
                  <ListItemIcon>
                    <ManyIcon className={classes.centerListItemContent}/>
                  </ListItemIcon>
                  <Text className={classes.menuText}>
                    {lang.Batch[translate]}
                  </Text>
                </ListItem>
            }
          </List>
        </Drawer>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List className={classes.list}>
            {
              menu === 'text' ?
                <TextForm
                  forms={forms}
                  handleClick={handleClick}
                  handleChange={handleChange}
                /> :
              menu === 'productsAndTemplates' ?
                <ProductsAndTemplates
                  productList={productsAndTemplates.productList}
                  templateList={productsAndTemplates.templateList}
                  handleClick={handleClick}
                /> :
              menu === 'image' ?
                <ImageForm
                  handleClick={handleClick}
                /> :
              menu === 'batch' ?
                <BatchForm
                  handleClick={handleClick}
                  disabled={batchDisabled}
                /> : null
            }
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
