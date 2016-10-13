import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga'

const createStoreWithMiddleware = applyMiddleware();
const logger = createLogger();

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(reducer, initialState, applyMiddleware(/* other middleware, */sagaMiddleware, logger)),
    runSaga: sagaMiddleware.run
  };
}
