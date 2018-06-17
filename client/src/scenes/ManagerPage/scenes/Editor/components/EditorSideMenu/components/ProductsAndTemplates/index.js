import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClearIcon from '@material-ui/icons/Clear';
import classNames from 'classnames';
import Text from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import CreateIcon from '@material-ui/icons/AddCircle';
import lang from './lang';

const styles = theme => ({
  listItem: {
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  productName: {
    color: theme.palette.primary.contrastText,
  },
  productNameWrapper: {
    padding: 0,
  },
  text: {
    margin: 'auto',
    fontSize: 16,
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing.unit,
  },
  productItem: {
    height: 40,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  templateItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
  title: {
    height: 40,
    background: theme.palette.primary.dark,
  },
  img: {
    width: '100%',
  },
});
class Component extends React.Component {
  state = {
    productSelected: null,
    hoveredTemplate: null,
  };
  handleProductClick = (product) => {
    this.setState({
      productSelected: product,
    });
    this.props.handleClick('productClick', product);
  };
  handleTemplateClick = (template) => {
    this.props.handleClick('templateClick', template);
  };
  render () {
    const {
      classes,
      translate,
      type,
      selected,
      handleChange,
      handleClick,
      productList,
      templateList,
    } = this.props;
    const {
      productSelected,
    } = this.state;
    return (
      <React.Fragment>
        <ListItem className={classes.title}>
          <ListItemText
            classes={{ primary: classes.productName }}
            primary={productSelected ? '템플릿 선택' : '상품 선택'}
          />
        </ListItem>
        {
          productSelected === null ? productList.map(({ product }) => (
            <ListItem
              key={product.code}
              dense
              button
              className={classes.productItem}
              onClick={() => this.handleProductClick(product)}
            >
              <ListItemText
                classes={{ primary: classes.productName }}
                primary={product.name}
              />
            </ListItem>
          )) :
            <React.Fragment>
              <ListItem
                key={productSelected.code}
                dense
                button
                className={classes.listItem}
                onClick={() => this.setState({
                  productSelected: null,
                })}
              >
                <ListItemIcon>
                  <LeftIcon className={classes.icon}/>
                </ListItemIcon>
                <ListItemText
                  classes={{
                    root: classes.productNameWrapper,
                    primary: classes.productName,
                  }}
                  primary={productSelected.name}
                />
              </ListItem>
              {
                templateList.map((template) => (
                  <ListItem
                    key={template.template_uri}
                    dense
                    button
                    onClick={() => this.handleTemplateClick(template)}
                    className={classes.templateItem}
                    onMouseEnter={() => this.setState({
                      hoveredTemplate: template,
                    })}
                    onMouseLeave={() => this.setState({
                      hoveredTemplate: null,
                    })}
                  >
                    <img
                      className={classes.img}
                      src={
                        this.state.hoveredTemplate === template &&
                          template.thumbnails.length > 1 ?
                            template.thumbnails[1] : template.thumbnails[0]}
                    />
                  </ListItem>
                ))
              }
            </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
