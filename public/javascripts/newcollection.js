/* 
* @Author: ChenShas
* @Date:   2017-05-11 18:11:29
* @Last Modified by:   ChenShas
* @Last Modified time: 2017-05-25 21:07:35
*/
import React from 'react';

import { Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="添加生产线"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="生产线名称">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入生产线名称' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="LCL(控制下限)">
            {getFieldDecorator('lcl', {
              rules: [{ required: true, message: '请输入LCL' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="CL(目标值)">
            {getFieldDecorator('cl', {
              rules: [{ required: true, message: '请输入CL' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="UCL(规格上限)">
            {getFieldDecorator('ucl', {
              rules: [{ required: true, message: '请输入UCL' }],
            })(
              <Input />
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
);

export default class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      var newpro={name:values.title,lcl:values.lcl,ucl:values.ucl,cl:values.cl};
      this.props.onProductSubmit(newpro);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>新建生产线</Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}