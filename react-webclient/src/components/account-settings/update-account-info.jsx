import React from 'react';
import {updateAccountInfo} from '../../data/user';
import {currentUser,prettyServerErrors} from '../../utils/helpers';
import InputField from '../forms/input_field';
import {get, round, assign} from 'lodash';
import {browserHistory} from 'react-router';
import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Modal,
  Row,
  Upload,
} from 'antd';

class UpdateAccountInfoClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: currentUser(),
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: '',
        status: 'done',
        url: currentUser().avatar,
      }],
    };
  }

  handleCancel = () => {
    this.props.form.resetFields();
    this.setState({ previewVisible: false, confirmPasswordVisible: false })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  _fetchDataFail = (e) => {
    apiError(e.message)
  }

  update = (e) => {
    const user = Object.assign({}, this.state.user, {[e.target.id]: e.target.value});
    this.setState({user});
  }

  save = () => {
    const data = {user: this.state.user, current_password: this.state.user.current_password}
    updateAccountInfo(data)
      .then((resp) => {
        const user = assign({}, this.state.user, resp);
        this.setState({user})

        if (!resp.errors) {
          this.saveDone(resp.message);
        } else {
          showError(prettyServerErrors(resp.errors));
        }
      })
      .catch(this._fetchDataFail)
  }

  saveDone = (message) => {
    showMessage(message);
    let user    = assign({}, this.state.user, {current_password:'', errors: ''});
    let current = assign({}, currentUser(), user);

    this.setState({user});
    localStorage.setItem('user', JSON.stringify(current));
    browserHistory.replace('/account-settings');
  }

  handleFile = (file) => {
    const reader = new FileReader();

    if (round(file.size / 1048576, 2) > 1) {
      showError('Your photo is too large. The limit is 1 MB')
    } else {
      reader.onload = (upload) => {
        const user = assign({}, this.state.user, {avatar: upload.target.result});
        const fileList = [{
          uid: -1,
          name: file.name,
          status: 'done',
          url: user.avatar,
        }];
        this.setState({user, fileList});
      }

      reader.readAsDataURL(file);
    }
  }

  selectFile = (e) => {
    e.preventDefault();
    this.refs.file.click();
  }

  handleOnOk = (e) => {
    if (e)
      e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handleCancel();
        this.save();
        this.props.form.resetFields();
      } else {
        showError("Please check form for errors")
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({confirmPasswordVisible: true});
  }

  uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = get({0: this.uploadButton}, fileList.length, null);
    const user = this.state.user;
    const { getFieldDecorator } = this.props.form;

    return (
      <Row>
        <div className='header-row'>
          <h3>Account Info</h3>
        </div>
        <div className="body-row account-settings clearfix">
          <Form horizontal onSubmit={this.handleSubmit}>
            <Col span={8} className='text-center'>
              <Upload action="/"
                beforeUpload={(file) => {this.handleFile(file);return false}}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}>
                  {uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="avatar" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Col>
            <Col span={16}>
              <Form.Item {...this.formItemLayout} label="First Name" hasFeedback>
                {getFieldDecorator('first_name', {
                  initialValue: user.first_name,
                  onChange: this.update,
                  rules: [{
                    required: true, message: "First Name is required"
                  }],
                })(
                  <Input addonBefore={<Icon type="user" />} />
                )}
              </Form.Item>
              <Form.Item {...this.formItemLayout} label="Last Name" hasFeedback>
                {getFieldDecorator('last_name', {
                  initialValue: user.last_name,
                  onChange: this.update,
                  rules: [{
                    required: true, message: "Last Name is required"
                  }],
                })(
                  <Input addonBefore={<Icon type="user" />} />
                )}
              </Form.Item>
              <Form.Item {...this.formItemLayout} label="Email" hasFeedback>
                {getFieldDecorator('email', {
                  initialValue: user.email,
                  onChange: this.update,
                  rules: [{
                    type: 'email', message: 'That does not look like a valid E-mail!',
                  }, {
                    required: true, message: 'E-mail is required',
                  }],
                })(
                  <Input addonBefore={<Icon type="mail" />} type="email" />
                )}
              </Form.Item>
              <Col span={8} offset={16}>
                <Button type="primary" htmlType="submit" className="right" size="large">Update Account Info</Button>
              </Col>
            </Col>
          </Form>
          <Modal width="300px" title="Confirm Password To Continue" visible={this.state.confirmPasswordVisible} onOk={this.handleOnOk} okText="Confirm Password" onCancel={this.handleCancel}>
            <Form onSubmit={this.handleOnOk}>
              <Form.Item label="Password" hasFeedback>
                        {this.props.form.getFieldDecorator('current_password', {
                          onChange: this.update,
                          rules: [{
                            required: true, message: 'Current Password is required',
                          }],
                        })(
                        <Input addonBefore={<Icon type="lock" />} type="password" />
                        )}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Row>
    )
  }
}

export default Form.create()(UpdateAccountInfoClass);
