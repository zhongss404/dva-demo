import { hashHistory } from 'dva/router';
import { query,create,update,remove} from '../services/waybill';

export default {
  namespace:"waybills",
  state:{
    list:[],
    billCode: '',
    total:null,
    loading:false,
    current:null,
    currentItem:{},
    modalVisible:false,
    modalType:'create',
  },
  // Quick Start 已经介绍过 subscriptions 的概念，这里不在多说
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (location.pathname === '/waybill') {
  //         dispatch({
  //           type: 'query',
  //           payload: {}
  //         });
  //       }
  //     });
  //   },
  // },
  effects:{
    *query({ payload }, { select, call, put }){
      yield put({ type: 'showLoading' });
      const { data } = yield call(query,payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },
    *'delete'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, { id: payload });
      if (data && data.success) {
        yield put({
          type: 'deleteSuccess',
          payload,
        });
      }
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
            field: '',
            keyword: '',
          },
        });
      }
    },
    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ waybills }) => waybills.currentItem.id);
      const newWayBill = { ...payload, id };
      const { data } = yield call(update, newWayBill);
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newWayBill,
        });
      }
    },
  },
  reducers:{
    showLoading(state) {
      return { ...state, loading: true };
    },
    createSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.list.filter(waybill => waybill.id !== id);
      return { ...state, list: newList, loading: false };
    },
    updateSuccess(state, action) {
      const updateWaybill = action.payload;
      const newList = state.list.map(waybill => {
        if (waybill.id === updateWaybill.id) {
          return { ...waybill, ...updateWaybill };
        }
        return waybill;
      });
      return { ...state, list: newList, loading: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  }
}
