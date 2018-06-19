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
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
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
  views: [],
  uploadDialogOn: false,
  uploadDialogData: null,
  error: '',
  collapsed: false,
};
const styles = theme => ({
  layout: {
    padding: theme.spacing.unit * 3,
  },
  marginBottom: {
    marginBottom: theme.spacing.unit,
  },
  imgWrapper: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
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
  views: {
    textAlign: 'right',
  },
});
const ViewsInput = function({ classes, handleUpload, label, ...rest }) {
  return (
    <React.Fragment {...rest}>
      <input
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={handleUpload}
        onClick={e => e.target.value = null}
      />
      <label htmlFor="contained-button-file">
        <Button
          className={classes.marginBottom}
          color="primary"
          variant="contained"
          component="span"
        >
          <UploadIcon className={classes.buttonIcon}/>
          {label}
        </Button>
      </label>
    </React.Fragment>
  );
};
class Component extends React.Component {
  state = initState;
  componentWillReceiveProps(nextProps) {
    if (!nextProps.selected) {
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
          views,
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
          views,
          collapsed: false,
        });
      // }
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
            views,
          },
        });
      }
    } catch(e) {
      this.setState({ error: e });
    }
  };
  viewsSubmit = views => {
    this.props.handleSubmit({
      ...this.state,
      views,
    });
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
      views,
      collapsed,
    } = this.state;
    const { classes, loading, translate, handleMenuClick, editor, batchNotAllowed, ...props } = this.props;
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
                  src={hovered && thumbnails.length > 1 ? thumbnails[1] : thumbnails[0]}
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
                  {lang.Editor[translate]}
                </Button>
              </div>: null
          }
          {
            batchNotAllowed ? null :
              <div className={classes.views}>
                {
                  views && views.length ?
                    <React.Fragment>
                      <Text>
                        {`${views.length} ${lang.DataEntered[translate]}`}
                      </Text>
                      <Text gutterBottom>
                        {`${views.filter(o => o.isConfirmed).length} ${lang.Confirmed[translate]}(${views.filter(o => !o.isConfirmed).length} ${lang.NotConfirmed[translate]})`}
                      </Text>
                      <div>
                        <Button
                          color="primary"
                          variant="raised"
                          className={classes.marginBottom}
                          onClick={() => this.setState({
                            uploadDialogOn: true,
                            uploadDialogData: {
                              projectId,
                              views,
                            },
                          })}
                        >
                          {lang.ApproveAndEdit[translate]}
                        </Button>
                      </div>
                      <div>
                        <Button
                          className={classes.marginBottom}
                          color="secondary"
                          variant="raised"
                          onClick={() => this.setState({
                            views: [],
                          })}
                        >
                          {lang.DeleteEntered[translate]}
                        </Button>
                      </div>
                    </React.Fragment> :
                    <ViewsInput
                      classes={classes}
                      handleUpload={this.handleUpload}
                      label={lang.EnterData[translate]}
                    />
                }
              </div>
          }
          {
            error && error !== '' ?
              <Text align="center">{String(error)}</Text> : null
          }
          <TextField
            className={classes.marginBottom}
            label={lang.ProjectID[translate]}
            fullWidth
            value={projectId}
            disabled
          />
          <TextField
            className={classes.marginBottom}
            label={lang.ProductName[translate]}
            fullWidth
            value={productName}
            disabled
          />
          <TextField
            className={classes.marginBottom}
            label={lang.Size[translate]}
            fullWidth
            value={sizeName}
            disabled
          />
          <TextField
            className={classes.marginBottom}
            label={lang.Quantity[translate]}
            fullWidth
            value={quantity}
            type="number"
            onChange={this.handleChange('quantity')}
          />
          <TextField
            className={classes.marginBottom}
            label={lang.IndividualPrice[translate]}
            fullWidth
            value={price}
            disabled
          />
          {
            views.length ?
              <TextField
                className={classes.field}
                label={lang.TotalQuantity[translate]}
                fullWidth
                value={quantity * views.length}
                type="number"
                disabled
              /> : null
          }
          <TextField
            className={classes.marginBottom}
            label={lang.TotalPrice[translate]}
            fullWidth
            value={views.length ? views.length * price * quantity : price * quantity}
            disabled
          />
        </div>
        <UploadDialog
          fullScreen
          title={lang.ApprovalOfDrafts[translate]}
          open={editor && uploadDialogOn}
          onClose={() => this.setState({
            uploadDialogOn: false,
            uploadDialogData: null,
          })}
          onSubmit={this.viewsSubmit}
          data={uploadDialogData}
          editor={editor}
        />
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
