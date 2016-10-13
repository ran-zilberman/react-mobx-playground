import { call, put, fork} from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import DomainServerApi from '../services/domain-server-api';
import actions from '../actions/bo-domain-services-pane'
import ActionTypes from '../constants/BoDomainServicesActionTypes'

// ============================================================================
// SAGA TASKS
// ============================================================================

const executeDomainDataCall = function *(method, {domainName}) {
  yield put(actions.showLoader());
  try {
    const response = yield call(() => method(domainName));
    yield put(actions.gotDataFromServer({response}));
  } catch (e) {
    // trigger popup action
  }
  yield put(actions.closeLoader());
};

const getDomainData = function* (action) {
  yield* executeDomainDataCall(DomainServerApi.getDomainData, action);
};

const getDomainTransferData = function* (action) {
  yield* executeDomainDataCall(DomainServerApi.getDomainTransferData, action);
};

const getRegistryCheckData = function* (action) {
  yield* executeDomainDataCall(DomainServerApi.getRegistryCheckData, action);
};

const getPremiumDomainData = function* (action) {
  yield* executeDomainDataCall(DomainServerApi.getPremiumDomainData, action);
};

// ============================================================================
// WATCHERS
// ============================================================================

const waiter = (EVENT, handler) => function*() {
    yield* takeEvery(EVENT, handler);
};

const waitForGetDomainData = waiter(ActionTypes.GET_DOMAIN_DATA, getDomainData);
const waitForGetDomainTransferData = waiter(ActionTypes.GET_TRANSFER_DOMAIN_DATA, getDomainTransferData);
const waitForGetDomainRegistryData = waiter(ActionTypes.GET_DOMAIN_REGISTRY_DATA, getRegistryCheckData);
const waitForGetPremiumDomainData = waiter(ActionTypes.GET_PREMIUM_DOMAIN_DATA, getPremiumDomainData);

// ============================================================================
// DEFAULT SAGA EXPORT
// ============================================================================


export default function* domainRootSaga() {
  yield [
    fork(waitForGetDomainData),
    fork(waitForGetDomainTransferData),
    fork(waitForGetDomainRegistryData),
    fork(waitForGetPremiumDomainData)
  ];
}