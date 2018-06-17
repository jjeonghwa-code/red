import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import Text from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/Save';
import DownloadIcon from '@material-ui/icons/GetApp';
import lang from './lang';
import Dialog from '../../../../../../components/Dialog';
import Loader from '../../../../../../components/Loader';
import parseExcel from '../../modules/parseExcel';
import UploadDialog from './components/UploadDialog';

const initState = {
  mode: 'update',
  thumbnails: [],
  id: '',
  productName: '',
  sizeName: '',
  quantity: 1,
  price: 1000,
  projectId: '',
  hovered: false,
  uploadDialogOn: false,
  uploadDialogData: null,
  error: '',
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
          projectId,
        } = nextProps.selected;
        this.setState({
          id,
          thumbnails,
          productName,
          sizeName,
          quantity,
          price,
          projectId,
          error: '',
          uploadDialogData: null,
        });
      }
    }
  }
  handleChange = name => e => {
    let value = e.target.value;
    if (name === 'quantity') {
      if (value > 0) {
        this.setState({
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
  handleUpload = async e => {
    try {
      const {
        productName,
        sizeName,
        price,
      } = this.state;

      const {
        projectId,
        views,
        bases,
      } = await parseExcel(e.target.files[0]);
      if (this.state.projectId !== projectId) {
        this.setState({
          error: '프로젝트가 같지 않습니다',
        });
      } else {
        this.setState({
          uploadDialogOn: true,
          uploadDialogData: {
            projectId,
            productName,
            sizeName,
            price,
            views,
          },
        });
      }
    } catch(e) {
      this.setState({ error: e });
    }
  };
  render () {
    const {
      id,
      projectId,
      thumbnails,
      productName,
      sizeName,
      quantity,
      price,
      hovered,
      uploadDialogOn,
      uploadDialogData,
      error,
    } = this.state;
    const { classes, loading, translate, handleMenuClick, editor, ...props } = this.props;
    console.log(this.props);
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
                {
                  <div>
                    <input
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      onChange={this.handleUpload}
                      onClick={e => e.target.value = null}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        className={classes.margin}
                        color="primary"
                        variant="contained"
                        component="span"
                      >
                        <UploadIcon className={classes.buttonIcon}/>
                        가변 데이터 주문
                      </Button>
                    </label>
                  </div>
                }
              </div>: null
          }
          {
            error && error !== '' ?
              <Text align="center">{String(error)}</Text> : null
          }
          <TextField
            className={classes.field}
            label={"프로젝트 ID"}
            fullWidth
            value={projectId}
            disabled
          />
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
            label={"개별 가격"}
            fullWidth
            value={price}
            disabled
          />
          <TextField
            className={classes.field}
            label={"총 가격"}
            fullWidth
            value={price * quantity}
            disabled
          />
        </div>
        <UploadDialog
          title={"가변 데이터 주문서"}
          open={editor && uploadDialogOn}
          onClose={() => this.setState({
            uploadDialogOn: false,
            uploadDialogData: null,
          })}
          data={uploadDialogData}
          editor={editor}
        />
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
