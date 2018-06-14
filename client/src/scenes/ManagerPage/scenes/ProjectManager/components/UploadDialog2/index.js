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
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import Text from '@material-ui/core/Typography';
import lang from './lang';
import Dialog from '../../../../../../components/Dialog';
import Loader from '../../../../../../components/Loader';

const initState = {
  mode: 'update',
  views: [
    {
      id: 0,
      thumbnails: [
        "https://firebasestorage.googleapis.com/v0/b/edicusbase.appspot.com/o/partners%2Fredp%2Fusers%2Fredp-5aef19b316bee33430dfb446%2Fprojects%2F-LEleWIG6WCS5kUyb0RJ%2Fpreivew%2Fpreview_0.jpg?alt=media&token=78e79a1f-9abc-482b-89c5-3d0e16cca1c3",
        "https://firebasestorage.googleapis.com/v0/b/edicusbase.appspot.com/o/partners%2Fredp%2Fusers%2Fredp-5aef19b316bee33430dfb446%2Fprojects%2F-LEleWIG6WCS5kUyb0RJ%2Fpreivew%2Fpreview_1.jpg?alt=media&token=8193a87b-0c8d-4028-8166-a7105e4de20b",
      ],
    },
    {
      id: 1,
      thumbnails: [
        "https://firebasestorage.googleapis.com/v0/b/edicusbase.appspot.com/o/partners%2Fredp%2Fusers%2Fredp-5aef19b316bee33430dfb446%2Fprojects%2F-LEleWIG6WCS5kUyb0RJ%2Fpreivew%2Fpreview_0.jpg?alt=media&token=78e79a1f-9abc-482b-89c5-3d0e16cca1c3",
        "https://firebasestorage.googleapis.com/v0/b/edicusbase.appspot.com/o/partners%2Fredp%2Fusers%2Fredp-5aef19b316bee33430dfb446%2Fprojects%2F-LEleWIG6WCS5kUyb0RJ%2Fpreivew%2Fpreview_1.jpg?alt=media&token=8193a87b-0c8d-4028-8166-a7105e4de20b",
      ],
    },
    {
      id: 2,
      thumbnails: [
        "https://firebasestorage.googleapis.com/v0/b/edicusbase.appspot.com/o/partners%2Fredp%2Fusers%2Fredp-5aef19b316bee33430dfb446%2Fprojects%2F-LEleWIG6WCS5kUyb0RJ%2Fpreivew%2Fpreview_0.jpg?alt=media&token=78e79a1f-9abc-482b-89c5-3d0e16cca1c3",
        "https://firebasestorage.googleapis.com/v0/b/edicusbase.appspot.com/o/partners%2Fredp%2Fusers%2Fredp-5aef19b316bee33430dfb446%2Fprojects%2F-LEleWIG6WCS5kUyb0RJ%2Fpreivew%2Fpreview_1.jpg?alt=media&token=8193a87b-0c8d-4028-8166-a7105e4de20b",
      ],
    },
  ],
  thumbnails: [
    "https://firebasestorage.googleapis.com/v0/b/edicusbase.appspot.com/o/partners%2Fredp%2Fusers%2Fredp-5aef19b316bee33430dfb446%2Fprojects%2F-LEleWIG6WCS5kUyb0RJ%2Fpreivew%2Fpreview_0.jpg?alt=media&token=78e79a1f-9abc-482b-89c5-3d0e16cca1c3",
    "https://firebasestorage.googleapis.com/v0/b/edicusbase.appspot.com/o/partners%2Fredp%2Fusers%2Fredp-5aef19b316bee33430dfb446%2Fprojects%2F-LEleWIG6WCS5kUyb0RJ%2Fpreivew%2Fpreview_1.jpg?alt=media&token=8193a87b-0c8d-4028-8166-a7105e4de20b",
  ],
  productName: '디자인 명함',
  sizeName: '50x90',
  quantityForEach: 1,
  price: 1000,
  viewNow: 0,
};
const styles = theme => ({
  layout: {
    padding: theme.spacing.unit * 3,
  },
  field: {
    marginBottom: theme.spacing.unit,
  },
  imgWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit * 3,
  },
  margin: {
    marginUp: theme.spacing.unit * 3,
    marginDown: theme.spacing.unit * 3,
  },
  buttonIcon: {
    marginRight: theme.spacing.unit,//
  },
  input: {
    display: 'none',
  },
  center: {
    textAlign: 'center',
  },
  img: {
    margin: theme.spacing.unit * 2,
  },
});
class Component extends React.Component {
  state = initState;
  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.selected) {
  //     this.setState(initState);
  //   } else {
  //     const prevRow = JSON.stringify(this.props.selected);
  //     const nextRow = JSON.stringify(nextProps.selected);
  //     if (prevRow !== nextRow) {
  //       const {
  //         id,
  //         thumbnails,
  //         productName,
  //         sizeName,
  //         quantity,
  //         price,
  //       } = nextProps.selected;
  //       this.setState({
  //         id,
  //         thumbnails,
  //         productName,
  //         sizeName,
  //         quantity,
  //         price,
  //       });
  //     }
  //   }
  // }
  handleChange = name => e => {
    if (e.target.value > 0) {
      this.setState({
        [name]: e.target.value,
      });
    }
  };
  handleSubmit = () => {
    const { ...rest } = this.state;
    this.props.handleSubmit(rest);
  };
  isDisabled = () => {
    return 0;
  };
  changeViews = name => {
    const { views, viewNow } = this.state;
    if (name === 'left' && viewNow + 1 > 1) {
      this.setState({
        viewNow: viewNow - 1,
      });
    } else if (name === 'right' && viewNow + 1 < views.length){
      this.setState({
        viewNow: viewNow + 1,
      });
    }
  };
  render () {
    const {
      views,
      productName,
      sizeName,
      quantityForEach,
      price,
      thumbnails,
      viewNow,
    } = this.state;
    const { classes, loading, translate, onClose, handleMenuClick, ...props } = this.props;
    return (
      <Dialog
        title={"title"}
        onSubmit={onClose}
        disabled={this.isDisabled()}
        {...props}
      >
        {loading ? <Loader/> : null}
        <div className={classes.layout}>
          <div className={classes.imgWrapper}>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[1]}
              />
            </div>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
          </div>
          <div className={classes.imgWrapper}>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
          </div>
          <div className={classes.imgWrapper}>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
            <div
              className={classes.img}
            >
              <img
                className={classes.img}
                width={150}
                src={thumbnails[0]}
              />
            </div>
          </div>
          <div className={classes.margin}/>
          <hr />
          <div className={classes.margin}/>
          <Text variant="headline" align="center" gutterBottom>주문 정보</Text>
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
            label={"개별 수량"}
            fullWidth
            value={quantityForEach}
            type="number"
            onChange={this.handleChange('quantityForEach')}
          />
          <TextField
            className={classes.field}
            label={"개별 가격"}
            fullWidth
            value={price}
            type="number"
            disabled
          />
          <TextField
            className={classes.field}
            label={"총 수량"}
            fullWidth
            value={quantityForEach * views.length}
            type="number"
            disabled
          />
          <TextField
            className={classes.field}
            label={"총 가격"}
            fullWidth
            value={price * views.length * quantityForEach}
            disabled
          />
        </div>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
