import React, {Component, PropTypes} from 'react';
import {Select, Input, Button, Form} from 'antd'
import styles from './WayBillSearch.less'

const WayBillSearch = ({
  billCode,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      onSearch(getFieldsValue());
    });
  }

  return (
    <div className={styles.normal}>
      <div className={styles.search}>
        <Form inline onSubmit={handleSubmit}>
          <Form.Item hasFeedback label="运单号">
            {getFieldDecorator('billCode', {
              initialValue: billCode || '',
            })(
              <Input type="text" />
            )}
          </Form.Item>
          <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">查询</Button>
        </Form>
      </div>
      <div className={styles.create}>
        <Button type="ghost" onClick={onAdd}>添加</Button>
      </div>
    </div>
  );
};
//搜索组件由一个文本框两个按钮组成
//构建函数有4个参数
//1.文本框里面需要传入一个billCode值
//2.查询按钮需要一个查询事件
//3.添加按钮需要一个添加事件
//4.ant.design Form表单相关的 双相绑定,校验参数，获取输入值方法
//运单页面要使用该组件时必须传入这4个构造参数
WayBillSearch.propTypes = {

};
export default Form.create()(WayBillSearch);
