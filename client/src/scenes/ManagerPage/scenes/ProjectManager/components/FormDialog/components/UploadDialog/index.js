import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/Save';
import DownloadIcon from '@material-ui/icons/GetApp';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import Text from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ConfirmedIcon from '@material-ui/icons/Done';
import NotConfirmedIcon from '@material-ui/icons/Clear';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import lang from './lang';
import Loader from '../../../../../../../../components/Loader';

const initState = {
  mode: 'create',
  views: [],
  viewNow: -1,
};
const styles = theme => ({
  dialog: {
    background: '#f0f0f0',
  },
  layout: {
    display: 'flex',
    alignItems: 'stretch',
    height: '100%',
    background: '#f0f0f0',
  },
  title: {
    background: theme.palette.primary.main,
    padding: theme.spacing.unit * 2,
  },
  titleText: {
    color: theme.palette.primary.contrastText,
    fontSize: 20,
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
  list: {
    width: 375,
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: '100%',
    overflow: 'auto',
  },
  inputs: {
    width: 200,
    padding: theme.spacing.unit,
  },
  viewer: {
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'auto',
    minHeight: 500,
  },
  icon: {
    marginRight: 0,
  },
  actions: {
    background: '#f0f0f0',
    padding: '8px 4px',
    margin: 0,
  },
  selected: {
    background: 'gainsboro',
  },
  listItemText: {
    padding: 0,
  },
});
class Component extends React.Component {
  state = initState;
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data) {
      this.setState(initState);
    } else {
      const {
        id,
        views,
      } = nextProps.data;
      this.setState({
        id,
        views,
        viewNow: -1,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.open && this.props.open) {
      setTimeout(() => {
        this.props.editor.openVdpViewer({
          projectId: this.props.data.projectId,
          selector: '#viewer',
        }, (e, data) => {
          console.log('viewer', String(data));
        });
        this.setState({ viewerOn: true });
      }, 700);
    } else if (prevProps.open && !this.props.open) {
      const viewer = document.getElementById('viewer');
      while(viewer.firstChild) {
        viewer.removeChild(viewer.firstChild);
      }
    }
    if (prevProps.open && this.props.open && this.state.viewNow > -1 &&(
      (prevState.viewNow !== this.state.viewNow)|| (
        prevState.views[this.state.viewNow] !== this.state.views[this.state.viewNow]
      ))) {
      this.props.editor.setVariableData({
        cols: this.state.views[this.state.viewNow].data,
      });
    }
  }
  handleChange = name => e => {
    if (e.target.value > 0) {
      this.setState({
        [name]: e.target.value,
      });
    }
  };
  handleSubmit = () => {
    const { ...rest } = this.state;
    // this.props.handleSubmit(rest);
  };
  isDisabled = () => {
    return false;
  };
  changeViews = selected => {
    this.setState({
      viewNow: selected,
    });
  };
  handleViewerDataChange = title => e => {
    const { value } = e.target;
    this.setState(prev => {
      const { views, viewNow } = prev;
      const prevData = views[viewNow].data;
      const prevViewI = prevData.findIndex(o => o.title === title);
      const updatedView = update(prevData[prevViewI], { value: { $set: value } });

      const updatedViews = update(views, {
        [viewNow]: {
          data: {
            $splice: [[prevViewI, 1, updatedView]],
          },
        },
      });
      // this.props.editor.setVariableData({
      //   cols: updatedViews[viewNow].data,
      // });

      return {
        views: updatedViews,
      };
    });
  };
  handleConfirm = i => {
    const { views, viewNow } = this.state;
    if (i === -2) {
      this.setState({
        views: views.map(o => ({
          ...o,
          isConfirmed: false,
        })),
      });
    } else if (i === -1) {
      this.setState({
        views: views.map(o => ({
          ...o,
          isConfirmed: true,
        })),
      });
    } else {
      const newViews = views.map((o, ii) => ({
        ...o,
        isConfirmed: i === ii ?
          !o.isConfirmed : o.isConfirmed,
      }));
      const nextViewNow = viewNow === views.length - 1 ? viewNow : viewNow + 1;
      this.setState({
        views: newViews,
        viewNow: nextViewNow,
      });
    }
  };
  handleNext = () => {
    const { views, viewNow } = this.state;
    this.setState({
      viewNow: views.length - 1 === viewNow ? viewNow : viewNow + 1,
    });
  };
  render () {
    const {
      views,
      productName,
      sizeName,
      quantityForEach,
      price,
      viewNow,
      selected,
    } = this.state;
    const {
      classes,
      loading,
      translate,
      handleMenuClick,
      open,
      onClose,
      onSubmit,
      ...props,
    } = this.props;
    const disabled = this.isDisabled();
    const confirmedAll = views.every(o => o.isConfirmed);
    return (
      <Dialog
        fullScreen
        aria-labelledby="dialog"
        aria-describedby="dialog_description"
        open={open}
        onClose={onClose}
      >
        <DialogTitle
          className={classes.title}
        >
          <Text className={classes.titleText}>
            {lang.ApprovalOfDrafts[translate]}
          </Text>
        </DialogTitle>
        {loading ? <Loader/> : null}
        <div className={classes.layout}>
          <List className={classes.list}>
            <ListItem
              className={classNames({
                [classes.selected]: viewNow === -1,
              })}
              dense
              button
              onClick={() => this.changeViews(-1)}
            >
              <ListItemText
                className={classes.listItemText}
                primary={lang.BasicDraft[translate]}
                secondary={lang.NotIncluded[translate]}
              />
            </ListItem>
            <ListItem
              onClick={() => this.handleConfirm(confirmedAll ? -2 : -1)}
              button
              dense
            >
              <ListItemText primary={confirmedAll ?
                lang.CancelConfirmAll[translate]:lang.ConfirmAll[translate]}
              />
            </ListItem>
            {
              views.map((o, i) => (
                <ListItem
                  dense
                  key={i}
                  onClick={() => this.changeViews(i)}
                  button
                  className={viewNow === i ? classes.selected:null}
                >
                  <ListItemText primary={`Data ${i+1}`}/>
                  {
                    o.isConfirmed ?
                      <ListItemIcon className={classes.icon}>
                        <ConfirmedIcon/>
                      </ListItemIcon> : null
                  }
                </ListItem>
              ))
            }
          </List>
          <div className={classes.inputs}>
            {
              viewNow > -1 ?
                <Text variant="subheading" gutterBottom>
                  {`Data ${viewNow + 1}`}
                </Text>:null
            }
            {
              viewNow > -1 && views[viewNow] ? views[viewNow].data.map(o => (
                <TextField
                  key={`${o.title}`}
                  className={classes.field}
                  label={o.title}
                  fullWidth
                  value={o.value}
                  onChange={this.handleViewerDataChange(o.title)}
                />
              )) : null
            }
          </div>
          <div className={classes.viewer} id="viewer"/>
        </div>
        <DialogActions className={classes.actions}>
          {
            viewNow > -1 ?
              <Button
                disabled={disabled}
                color={views[viewNow].isConfirmed ? "secondary":"primary"}
                onClick={() => this.handleConfirm(viewNow)}
                size="large"
                variant={views[viewNow].isConfirmed ? "raised":"outlined"}
              >
                {views[viewNow].isConfirmed ?
                  lang.CancelConfirm[translate] : lang.Confirm[translate]}
              </Button>  : null
          }
          <Button
            disabled={disabled}
            color="primary"
            onClick={this.handleNext}
            size="large"
            variant="outlined"
          >
            {lang.Next[translate]}
          </Button>
          <Button
            disabled={disabled}
            color="primary"
            onClick={() => onSubmit(views)}
            variant="raised"
            size="large"
          >
            {lang.Save[translate]}
          </Button>
          <Button
            color="primary"
            onClick={onClose}
            size="large"
          >
            {lang.Close[translate]}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
