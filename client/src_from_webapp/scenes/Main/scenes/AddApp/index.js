import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import { loader } from 'data/loader/actions';
import * as noticeDialogActions from 'data/noticeDialog/actions';
import * as urlInfoActions from './data/urlInfo/actions';
import {
  request as addRequest,
  requestWithCustomImg as addWithCustomImgRequest,
  init as addInit,
} from './data/add/actions';
import Layout from './components/Layout';
import Form from './components/Form';
import * as resizeImage from 'modules/resizeImage';

const defaultImg = 'https://storage.googleapis.com/nonohyes20180219/favicon/no_image.png';
class AddApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlInfoFound: false,
      addSuccess: false,
      url: '',
      title: '',
      favicon: {
        canvas: null,
        name: '',
        url: '',
        success: false,
      },
      doUseUploadedImg: false,
      uploadedImg: {
        canvas: null,
        name: '',
        url: '',
        success: false,
      },
    };
  }
  getUrlInfo = (url) => {
    this.props.urlInfoRequest(encodeURIComponent(url))
      .then(() => {
        const { data } = this.props.urlInfo;
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          this.setState({
            favicon: {
              name: data,
              canvas,
              success: true,
              url: canvas.toDataURL(),
            }
          });
        };
        img.onerror = () => this.setState({
          favicon: {
            ...this.state.favicon,
            success: false,
          },
        });
        img.src = window.URL.createObjectURL(
          new Blob([new Uint8Array(data.favicon.buffer.data)], {type: 'image/jpeg'}));
        this.setState({
          url: data.url,
          title: data.title,
          urlInfoFound: true,
        });
      });
  };
  handleSubmit = async () => {
    const {
      isHttps,
      domain,
      path,
    } = this.props.urlInfo.data;
    const {
      title,
      favicon,
      doUseUploadedImg,
      uploadedImg,
    } = this.state;
    const formData = new FormData();
    if (favicon.success || uploadedImg.success) {
      const imgSource = doUseUploadedImg ? uploadedImg : favicon;
      const file = await resizeImage.fromCanvas(imgSource.canvas);
      formData.append(
        'file',
        file,
        imgSource.name,
      );
    }
    formData.append(
      'data',
      JSON.stringify({
        isHttps,
        domain,
        path,
        title,
      }),
    );
    this.props.addWithCustomImgRequest(formData)
      .then(() => {
        this.setState({ addSuccess: true });
      })
      .catch(() => {
        this.setState({ addSuccess: false })
      })
  };
  toAppPage = () => {
    this.props.push('/');
  };
  handleCancel = () => {
    this.setState({
      urlInfoFound: false,
      addSuccess: false,
      url: '',
      title: '',
      favicon: {
        canvas: null,
        name: '',
        url: '',
        success: false,
      },
      doUseUploadedImg: false,
      uploadedImg: {
        canvas: null,
        name: '',
        url: '',
        success: false,
      },
    });
  };
  handleInputChange = (prop, mode) => {
    if (!mode) {
      return e => {
        this.setState({ [prop]: e.target.value });
      };
    } else if (mode ==='favicon') {
      return e => {
        this.setState({
          favicon: {
            ...this.state.favicon,
            [prop]: e.target.value,
          },
        });
      };
    } else if (mode === 'switch') {
      return e => {
        this.setState({ [prop]: e.target.checked });
      };
    } else if (mode === 'img') {
      return e => {
        const input = e.target;
        if (input.files && input.files[0]) {
          const reader = new FileReader();
          reader.onload = re => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0, img.width, img.height);
              this.setState({
                uploadedImg: {
                  canvas,
                  name: input.files[0].name,
                  url: canvas.toDataURL(),
                  success: true,
                },
              });
            };
            img.onerror = () => this.setState({
              uploadedImg: {
                ...this.state.uploadedImg,
                success: false,
              },
            });
            img.src = re.target.result;
          };
          reader.readAsDataURL(input.files[0]);
        }
      }
    }
  };
  render() {
    const {
      urlInfo,
      add,
    } = this.props;
    const {
      urlInfoFound,
      url,
      favicon,
      title,
      doUseUploadedImg,
      uploadedImg,
      addSuccess,
    } = this.state;
    return (
      <Layout>
        <Form
          inputs={{
            url,
            title,
            doUseUploadedImg,
          }}
          imgUrl={
            doUseUploadedImg && uploadedImg.success?
              uploadedImg.url : favicon.success ?
              favicon.url : defaultImg
          }
          urlInfoForm={{
            loading: urlInfo.isFetching,
            success: urlInfoFound,
            onSubmit: this.getUrlInfo,
          }}
          formFetching={add.isFetching}
          formSuccess={addSuccess}
          handleBtnA={
            addSuccess ? {
              onClick: this.toAppPage,
              text: 'To App Page',
            } : {
              onClick: this.handleSubmit,
              text: 'Submit',
            }
          }
          handleBtnB={{
              onClick: this.handleCancel,
              text: addSuccess ? 'Add Another' : 'Cancel',
          }}
          handleInputChange={this.handleInputChange}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  urlInfo: state.main.addApp.data.urlInfo,
  add: state.main.addApp.data.add,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  notice: noticeDialogActions.on,
  loader,
  urlInfoRequest: urlInfoActions.request,
  urlInfoInit: urlInfoActions.init,
  addRequest,
  addWithCustomImgRequest,
  addInit,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddApp));