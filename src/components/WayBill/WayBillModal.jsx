import React, { PropTypes } from 'react';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const WayBillModal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue(), key: item.key };
      onOk(data);
    });
  }

  function checkBillCode(rule, value, callback) {
    if (!value) {
      callback(new Error('运单号未填写'));
    }
    if (!/^[\d]{12}$/.test(value)) {
      callback(new Error('运单号不合法'));
    } else {
      callback();
    }
  }

  const modalOpts = {
    title: '修改运单',
    visible,
    onOk: handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
          label="运单号："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('billCode', {
            initialValue: item.billCode,
            rules: [
              { validator: checkBillCode },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="发件人地址："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('sendAddress', {
            initialValue: item.sendAddress,
            rules: [
              { required: true, message: '发件人未填写' },
            ],
          })(
            <Input type="address" />
          )}
        </FormItem>
        <FormItem
          label="收件人地址："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('recAddress', {
            initialValue: item.recAddress,
            rules: [
              { required: true, message: '收件人未填写' },
            ],
          })(
            <Input type="address" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

//运单增加/编辑 组件
//该组件有5个构造参数
//1.模态框是否显示参数
//2.如果是修改，要修改的这一行数据对像
//3.增加/编辑 确认事件
//4.取消事件
//5.antdesign 双向绑定校验获取表单对象的方法
//需要使用运单增加/编辑组件 必须传入这5个参数
WayBillModal.propTypes = {

};

export default Form.create()(WayBillModal);
