import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from 'material-ui/TextField';
import update from 'react-addons-update';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/Save';
import DownloadIcon from '@material-ui/icons/GetApp';
import lang from './lang';
import Dialog from '../../../../../../components/Dialog';
import Loader from '../../../../../../components/Loader';

const initState = {
  mode: 'update',
  thumbnails: [],
  id: '',
  productName: '',
  sizeName: '',
  quantity: 1,
  price: 1000,
  hovered: false,
};
const styles = theme => ({
  layout: {
    padding: theme.spacing.unit * 3,
  },
  field: {
    marginBottom: theme.spacing.unit,
  },
  imgWrapper: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit * 3,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  buttonIcon: {
    marginRight: theme.spacing.unit,//
  },
  input: {
    display: 'none',
  },
});
class Component extends React.Component {
  state = initState;
  componentWillReceiveProps(nextProps) {
    if (!nextProps.selected) {
      this.setState(initState);
    } else {
      const prevRow = JSON.stringify(this.props.selected);
      const nextRow = JSON.stringify(nextProps.selected);
      if (prevRow !== nextRow) {
        const {
          id,
          thumbnails,
          productName,
          sizeName,
          quantity,
          price,
        } = nextProps.selected;
        this.setState({
          id,
          thumbnails,
          productName,
          sizeName,
          quantity,
          price,
        });
      }
    }
  }
  handleChange = name => e => {
    let value = e.target.value;
    if (name === 'quantity') {
      if (value > 0) {
        const price = (this.state.price / this.state.quantity) * value;
        this.setState({
          price,
          quantity: value,
        });
      }
    } else {
      this.setState({
        [name]: value,
      });
    }
  };
  handleSubmit = () => {
    const { hovered, ...rest } = this.state;
    this.props.handleSubmit(rest);
  };
  isDisabled = () => {
    const { quantity } = this.state;
    return quantity < 1;
  };
  render () {
    const {
      id,
      thumbnails,
      productName,
      sizeName,
      quantity,
      price,
      hovered,
    } = this.state;
    const { classes, loading, translate, handleMenuClick, ...props } = this.props;
    return (
      <Dialog
        title={"title"}
        onSubmit={this.handleSubmit}
        disabled={this.isDisabled()}
        {...props}
      >
        {loading ? <Loader/> : null}
        <div className={classes.layout}>
          {
            thumbnails.length > 0 ?
              <div className={classes.imgWrapper}>
                <img
                  width={150}
                  src={hovered ? thumbnails[1] : thumbnails[0]}
                  onMouseEnter={() => this.setState({
                    hovered: true
                  })}
                  onMouseLeave={() => this.setState({
                    hovered: false,
                  })}
                />
                <Button
                  className={classes.margin}
                  color="primary"
                  variant="outlined"
                  onClick={() => handleMenuClick('editor', id)}
                >
                  에디터
                </Button>
                <div>
                  <Button
                    className={classes.margin}
                    color="primary"
                    variant="contained"
                    onClick={() => handleMenuClick('download')}
                  >
                    <DownloadIcon className={classes.buttonIcon}/>
                    배치 폼 다운로드
                  </Button>
                  <input
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                  />
                  <label htmlFor="contained-button-file2">
                    <Button
                      className={classes.margin}
                      color="primary"
                      variant="contained"
                      component="span"
                      onClick={() => handleMenuClick('upload')}
                    >
                      <UploadIcon className={classes.buttonIcon}/>
                      배치 주문
                    </Button>
                  </label>
                </div>
              </div>: null
          }
          <TextField
            className={classes.field}
            label={"상품명"}
            fullWidth
            value={productName}
            disabled
          />
          <TextField
            className={classes.field}
            label={"사이즈"}
            fullWidth
            value={sizeName}
            disabled
          />
          <TextField
            className={classes.field}
            label={"수량"}
            fullWidth
            value={quantity}
            type="number"
            onChange={this.handleChange('quantity')}
          />
          <TextField
            className={classes.field}
            label={"가격"}
            fullWidth
            value={price}
            disabled
          />
        </div>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
