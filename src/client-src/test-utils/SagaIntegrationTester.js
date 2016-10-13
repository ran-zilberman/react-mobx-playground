import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

const SAGA_INTEGRATION_TESTER_RESET_ACTION = 'SAGA_INTEGRATION_TESTER_RESET';

export default class SagaIntegrationTester {
  constructor(initialState, reducers) {
    this.initialState = initialState || {};
    this.actions = {};
    this.actionsCalled = {};
    this.actions[SAGA_INTEGRATION_TESTER_RESET_ACTION] = (() => null);
    this.actionsCalledList = [];
    this.store = null;
    this.reducers = reducers || {};
    this.reducers.mainReducer = (state, action) => {
      let newState = null;

      if (action.type.indexOf('@@redux') !== 0) {      // Don't monitor redux actions
        this.actionsCalledList.push(action);
        this.actionsCalled[action.type] = (this.actionsCalled[action.type] || 0) + 1;
      }

      if (this.actions[action.type]) {
        newState = this.actions[action.type](Object.assign({}, state), action);
      }

      return newState || state || this.initialState;
    };

    // A global i18n reducer
    this.i18nReducer = () => {
      return {
        i18n: {
          getComponentHeader: (base) => {
            return {I18N: (a, b, p) => `${base}${a}|${JSON.stringify(p)}`};
          },
          getLocale: () => 'en_US'
        }
      };
    };
  }

  on(type) {
    this.actionsCalled[type] = 0;

    return {
      justListen: this,
      updateState: (action) => {
        this.actions[type] = action;
        return this;
      }
    };
  }

  resetState() {
    if (this.store) {
      this.store.dispatch({type: SAGA_INTEGRATION_TESTER_RESET_ACTION});
    }
  }

  start(sagas) {
    const sagaMiddleware = createSagaMiddleware();
    this.store = createStore(combineReducers({...this.reducers, i18n: this.i18nReducer}), applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(sagas);

    const ret = {
      withAction: action => {
        this.store.dispatch(action);
        return ret; // So we can call withAction numerous times
      }
    };
    return ret;
  }

  hasCalled(action) {
    return !!this.actionsCalled[action];
  }

  numCalled(action) {
    return this.actionsCalled[action];
  }

  getActionsCalled() {
    return this.actionsCalledList;
  }

  getActionExecutionOrder(action, allExecutions = false) {
    let actionCallsOrder = this.actionsCalledList.map((item, index) => item.type === action ? index : null ).filter((a) => a !== null );
    if(allExecutions) {
      return actionCallsOrder;
    }
    return actionCallsOrder[0];
  }

  getState(reducer) {
    return this.store.getState()[reducer];
  }

  getRootState() {
    return this.store.getState();
  }

  dispatch(action) {
    this.store.dispatch(action);
    return this;
  }
}