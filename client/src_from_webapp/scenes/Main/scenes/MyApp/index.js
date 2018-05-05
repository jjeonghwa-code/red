import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import { request as appListRequest } from './data/appList/actions';
import { request as setMyAppRequest } from '../../data/setMyApp/actions';
import { request as removeMyAppRequest } from '../../data/removeMyApp/actions';
import { request as userRequest } from 'data/user/actions';
import Layout from './components/Layout';
import App from './components/App';
import RemoveApp from './components/RemoveApp';

const springSetting1 = {stiffness: 30, damping: 5};
const springSetting2 = {stiffness: 120, damping: 17};
function range(n) {
  const arr = [];
  for (let i = 0; i < n; i += 1) { arr.push(i); }
  return arr;
}
function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr[from] = _arr[to];
  _arr[to] = val;
  return _arr;
}
function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}
const TIME_TO_MOVE_APP = 500;
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    const { innerWidth } = window;
    this.state = {
      appList: [],
      mouseXY: [0, 0],
      mouseCircleDelta: [0, 0], // difference between mouse and circle pos for x + y coords, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: null,
      initialAppList: [],
      cols: innerWidth >= 900 ? 8 : innerWidth >= 600 ? 6 : 4,
      appWidth: 1,
      appHeight: 100,
      layout: [],
      removeOn: false,
    };
  }
  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('resize', this.setUpLayoutByEvent);
    this.props.userRequest()
      .then(() => {
        this.setUpLayout(this.props.user.data.appList);
      })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setUpLayoutByEvent);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('resize', this.setUpLayoutByEvent);
  }
  setUpLayoutByEvent = () => {
    const { appList } = this.state;
    let cols;
    if (window.innerWidth >= 900) {
      cols = 8;
    } else if (window.innerWidth >= 600) {
      cols = 6;
    } else {
      cols = 4;
    }
    this.setUpLayout(appList, cols);
  };
  setUpLayout = (appList, cols = this.state.cols) => {
    const appWidth = window.innerWidth / cols;
    this.setState({
      layout: range(appList.length).map(n => {
        const row = Math.floor(n / cols);
        const col = n % cols;
        return [appWidth * col, this.state.appHeight * row];
      }),
      appWidth,
      appList: appList || this.state.appList,
      cols,
    });
  };
  handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  };
  handleTouchMove = (e) => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  };
  handleMouseMove = ({pageX, pageY}) => {
    const {initialAppList, lastPress, isPressed, mouseCircleDelta: [dx, dy]} = this.state;
    if (isPressed && new Date().getTime() - isPressed.getTime() > TIME_TO_MOVE_APP) {
      const mouseXY = [pageX - dx, pageY - dy];
      const col = clamp(Math.round(mouseXY[0] / this.state.appWidth), 0, this.state.cols - 1);
      const row = clamp(Math.round(mouseXY[1] / this.state.appHeight), 0, Math.floor(initialAppList.length / this.state.cols));
      let index = row * this.state.cols + col;
      if (index >= initialAppList.length) {
        index = initialAppList.length - 1;
      }
      const newAppList = reinsert(initialAppList, initialAppList.findIndex(o => o.id === lastPress), index);
      let removeOn = false;
      if (window.innerHeight - pageY < 100) {
        removeOn = true;
      }
      this.setState({
        mouseXY,
        appList: newAppList,
        removeOn,
      });
    }
  };
  handleMouseDown = (key, [pressX, pressY], {pageX, pageY}) => {
    this.setState({
      lastPress: key,
      isPressed: new Date(),
      mouseCircleDelta: [pageX - pressX, pageY - pressY],
      mouseXY: [pressX, pressY],
      initialAppList: this.state.appList,
    });
  };
  handleMouseUp = () => {
    const { appList, lastPress, isPressed, removeOn } = this.state;
    const { removeMyAppRequest, setMyAppRequest, userRequest } = this.props;
    let newAppList = appList;
    if (removeOn) {
      const foundI = newAppList.findIndex(o => o.id === lastPress);
      const app = newAppList[foundI];
      newAppList.splice(foundI, 1);
      removeMyAppRequest(app)
        .then(() => userRequest());
    } else if (isPressed && new Date().getTime() - isPressed.getTime() < TIME_TO_MOVE_APP) {
      const app = appList.find(o => o.id === lastPress);
      this.openWindow(app);
    } else if (lastPress && isPressed){
      setMyAppRequest(newAppList);
      // 정렬은 핵심 프로세스가 아니기 때문에
      // 즉시 유저 정보를 업데이트 할 필요는 없다.
      // 게다가 페이지를 다시 접속할 때 유저 정보를 다시 불러온다.
    }
    this.setState({
      isPressed: null,
      mouseCircleDelta: [0, 0],
      removeOn: false,
      appList: newAppList,
    });
  };
  openWindow = (app) => {
    const { isHttps, domain, path } = app;
    window.open(`${isHttps ? 'https://':'http://'}${domain}${path}`);
  };
  render() {
    const { appList, layout, lastPress, isPressed, mouseXY, removeOn, cols } = this.state;
    return (
      <Layout>
        {
          appList.length < 1 || layout.length < 1 ? null: appList.map((o, key) => {
            let style;
            let x;
            let y;
            const visualPosition = key;
            if (o.id === lastPress && isPressed) {
              [x, y] = mouseXY;
              style = {
                translateX: x,
                translateY: y,
                scale: spring(1.3, springSetting1),
              };
            } else {
              [x, y] = this.state.layout[visualPosition];
              style = {
                translateX: spring(x, springSetting2),
                translateY: spring(y, springSetting2),
                scale: spring(1, springSetting1),
              };
            }
            return (
              <Motion key={o.id} style={style}>
                {({translateX, translateY, scale}) =>
                  <App
                    onMouseDown={this.handleMouseDown.bind(null, o.id, [x, y])}
                    onTouchStart={this.handleTouchStart.bind(null, o.id, [x, y])}
                    style={{
                      WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                      zIndex: o.id === lastPress ? 99 : visualPosition,
                      width: `${100 / cols}%`,
                    }}
                    favicon={o.favicon}
                    title={o.title}
                  />
                }
              </Motion>
            );
          })
        }
        <Motion
          style={{
            x: isPressed ?
              spring(100, springSetting2) : spring(0, springSetting2),
          }}
        >
          {({x}) =>
            <RemoveApp
              style={{
                height: `${x}px`,
              }}
              on={removeOn}
            />
          }
        </Motion>
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  user: state.data.user,
  appList: state.main.myApp.data.appList,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  appListRequest,
  setMyAppRequest,
  removeMyAppRequest,
  userRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyApp));
