import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import Text from '@material-ui/core/Typography';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
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
  variableData: null,
  viewNow: 0,
  viewerOn: false,
  hovered: false,
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
  viewer: {
    height: 500,
    width: '100%',
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
  center: {
    textAlign: 'center',
  },
});
class Component extends React.Component {
  state = initState;
  componentWillReceiveProps(nextProps) {
    if (!nextProps.selected || (this.props.open && !nextProps.open)) {
      this.setState(initState);
    } else {
      const prevRow = JSON.stringify(this.props.selected);
      const nextRow = JSON.stringify(nextProps.selected);
      // if (prevRow !== nextRow) {
        const {
          id,
          thumbnails,
          productName,
          sizeName,
          quantity,
          price,
          projectId,
          variableData,
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
          variableData,
          viewNow: 0,
        });
      // }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.variableData && this.state.variableData) {
      setTimeout(() => {
        this.props.editor.openVdpViewer({
          projectId: this.state.projectId,
          selector: '#viewer',
        }, (e, data) => {
          console.log('viewer', String(data));
        });
        this.setState({ viewerOn: true });
      }, 700);
    } else if (prevProps.open && !this.props.open) {
      const viewer = document.getElementById('viewer');
      while(viewer && viewer.firstChild) {
        viewer.removeChild(viewer.firstChild);
      }
    }
    if (prevState.variableData && this.state.variableData && prevProps.open && this.props.open && (
      (prevState.viewNow !== this.state.viewNow)|| (
        prevState.variableData.views[this.state.viewNow]
          !== this.state.variableData.views[this.state.viewNow]
      ))) {
      this.props.editor.setVariableData({
        cols: this.state.variableData.views[this.state.viewNow],
      });
    }
  }
  handleViewerDataChange = title => e => {
    const { value } = e.target;
    this.setState(prev => {
      const { variableData, viewNow } = prev;
      const { views } = variableData;
      const prevViewI = views[viewNow].findIndex(o => o.title === title);
      views[viewNow][prevViewI].value = value;

      return {
        variableData: update(variableData, {
          views: {
            [viewNow]: {
              $splice: [[ prevViewI, 1, update(views[viewNow][prevViewI], { value: { $set: value } })]]
            }
          },
        })
      };
    });
  };
  changeViews = name => {
    const { variableData, viewNow } = this.state;
    const { views } = variableData;
    if (name === 'left') {
      if (viewNow + 1 > 1) {
        this.setState({
          viewNow: viewNow - 1,
        });
      } else {
        this.setState({
          viewNow: views.length - 1,
        });
      }
    } else if (name === 'right') {
      if (viewNow + 1 < views.length) {
        this.setState({
          viewNow: viewNow + 1,
        });
      } else {
        this.setState({
          viewNow: 0,
        });
      }
    }
  };
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
          variableData: {
            views,
            bases,
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
      variableData,
      hovered,
      error,
      viewerOn,
      viewNow,
    } = this.state;
    let views = [];
    if (variableData) views = variableData.views;
    const { classes, loading, translate, handleMenuClick, editor, ...props } = this.props;
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
            views.length ?
              <div>
                <div id="viewer" className={classes.viewer}/>
                <div className={classes.center}>
                  <IconButton
                    onClick={() => this.changeViews('left')}
                    color="primary"
                    disabled={!viewerOn}
                  >
                    <LeftIcon/>
                  </IconButton>
                  <Text style={{ display: 'inline-block' }}>
                    {
                      `${viewNow + 1}/${views.length}`
                    }
                  </Text>
                  <IconButton
                    onClick={() => this.changeViews('right')}
                    color="primary"
                    disabled={!viewerOn}
                  >
                    <RightIcon/>
                  </IconButton>
                  <div>
                    <Button
                      className={classes.margin}
                      color="primary"
                      variant="outlined"
                      onClick={() => handleMenuClick('editor', id)}
                    >
                      에디터
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={classes.margin}
                      color="primary"
                      variant="contained"
                      onClick={() => this.setState({
                        variableData: null,
                      })}
                    >
                      가변 데이터 삭제
                    </Button>
                  </div>
                </div>
              </div>
              : thumbnails.length > 0 ?
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
          {
            views[viewNow] ? views[viewNow].map(o => (
              <TextField
                key={`${o.title}`}
                className={classes.field}
                label={o.title}
                fullWidth
                value={o.value}
                onChange={this.handleViewerDataChange(o.title)}
                disabled={!viewerOn}
              />
            )) : null
          }
          <Text variant="headline" gutterBottom>주문 정보</Text>
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
            label={"개별 수량"}
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
          {
            variableData ?
              <TextField
                className={classes.field}
                label={"총 수량"}
                fullWidth
                value={quantity * views.length}
                type="number"
                disabled
              /> : null
          }
          <TextField
            className={classes.field}
            label={"총 가격"}
            fullWidth
            value={variableData ? price * quantity * views.length : price * quantity}
            disabled
          />
        </div>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
