import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';
import WayBillList from '../components/WayBill/WayBillList';
import WayBillModal from '../components/WayBill/WayBillModal';
import WayBillSearch from '../components/WayBill/WayBillSearch';
import Layout from '../components/Layout/Layout';
// 引入 connect 工具函数
import { connect } from 'dva';

function WayBill({ location, dispatch, waybills }) {

  const {
    loading, list, total, current,field, keyword,
    currentItem, modalVisible, modalType
  } = waybills;

  const userSearchProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      dispatch({
        type: 'waybills/query',
        payload: fieldsValue
      });
    },
    onAdd() {
      dispatch({
        type: 'waybills/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
  };
  const userListProps = {
    dataSource: list,
    total,
    current,
    loading,
    onPageChange(page) {
      dispatch({
        type: 'waybills/query',
        payload: {page:page}
      });
    },
    onDeleteItem(id) {
      dispatch({
        type: 'waybills/delete',
        payload: id,
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'waybills/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
  };
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `waybills/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'waybills/hideModal',
      });
    },

  };
  // 解决 Form.create initialValue 的问题
  // 每次创建一个全新的组件, 而不做diff
  // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
  const WayBillModalGen = () =>
    <WayBillModal {...userModalProps} />;
  return (
    //布局Layout组件
    <Layout location={location}>
      <div>
        <WayBillSearch {...userSearchProps}/>
        <WayBillList {...userListProps}/>
        <WayBillModalGen/>
      </div>
    </Layout>
  );
}

WayBill.propTypes = {
  waybills: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}
// 指定订阅数据，这里关联了 waybills.js
function mapStateToProps({ waybills}) {
  return {waybills};
}

// 建立数据关联关系
export default connect(mapStateToProps)(WayBill);
