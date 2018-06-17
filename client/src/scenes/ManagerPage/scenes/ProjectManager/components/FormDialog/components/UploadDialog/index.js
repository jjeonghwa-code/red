import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import Text from '@material-ui/core/Typography';
import lang from './lang';
import Dialog from '../../../../../../../../components/Dialog';
import Loader from '../../../../../../../../components/Loader';

const initState = {
  mode: 'create',
  projectId: '',
  views: [],
  productName: '디자인 명함',
  sizeName: '50x90',
  quantityForEach: 1,
  price: 1000,
  viewNow: 0,
  viewerOn: false,
};
const styles = theme => ({
  layout: {
    padding: theme.spacing.unit * 3,
  },
  field: {
    marginBottom: theme.spacing.unit,
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
  viewer: {
    height: 500,
    width: '100%',
  },
});
class Component extends React.Component {
  state = initState;
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data) {
      this.setState(initState);
    } else {
      const prev = JSON.stringify(this.props.data);
      const next = JSON.stringify(nextProps.data);
      // if (prev !== next) {
        const {
          projectId,
          views,
          productName,
          sizeName,
          price,
        } = nextProps.data;
        this.setState({
          projectId,
          views,
          productName,
          sizeName,
          quantityForEach: 1,
          price,
          viewNow: 0,
          viewerOn: false,
        });
      // }
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
    if (prevProps.open && this.props.open && (
      (prevState.viewNow !== this.state.viewNow)|| (
        prevState.views[this.state.viewNow] !== this.state.views[this.state.viewNow]
      ))) {
      this.props.editor.setVariableData({
        cols: this.state.views[this.state.viewNow],
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
  handleViewerDataChange = title => e => {
    const { value } = e.target;
    this.setState(prev => {
      const { views, viewNow } = prev;
      const prevViewI = views[viewNow].findIndex(o => o.title === title);
      views[viewNow][prevViewI].value = value;

      return {
        views: update(views, {
          [viewNow]: {
            $splice: [[ prevViewI, 1, update(views[viewNow][prevViewI], { value: { $set: value } })]]
          },
        }),
      };
    });
  };
  handleSubmit = () => {
    const { ...rest } = this.state;
    // this.props.handleSubmit(rest);
  };
  isDisabled = () => {
    return false;
  };
  changeViews = name => {
    const { views, viewNow } = this.state;
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
  render () {
    const {
      views,
      productName,
      sizeName,
      quantityForEach,
      price,
      viewNow,
      viewerOn,
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
          </div>
          {
            views && views[viewNow] ? views[viewNow].map(o => (
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

        </div>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
