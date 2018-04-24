import React, {Component, PropTypes} from 'react';
import {Table, Popconfirm, Pagination} from 'antd'

const WayBillList = ({
  total,
  current,
  loading,
  dataSource,
  onPageChange,
  onDeleteItem,
  onEditItem,
}) => {
  const columns = [{
    title: '运单号',
    dataIndex: 'billCode',
    key: 'billCode',
    render: (text) => <a href="#">{text}</a>,
  }, {
    title: '发件人地址',
    dataIndex: 'sendAddress',
    key: 'sendAddress',
  }, {
    title: '收件人地址',
    dataIndex: 'recAddress',
    key: 'recAddress',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onEditItem(record)}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={10}
        onChange={onPageChange}/>
    </div>

  );
}

//运单结果集组件由一个table组件加一个分页组件组成
//运单结果集组件构建函数有7个参数
//1.结果集的总页数
//2.当前第几页
//3.结果集是否处于加载中
//4.结果集的数据对像
//5.结果集的当前页发生变化的事件
//6.结果集中某一行删除事件
//7.结果集中某一行编辑事件
//运单页面需要使用该组必须传入这7个构造参数
WayBillList.propTypes = {

};

export default WayBillList;
