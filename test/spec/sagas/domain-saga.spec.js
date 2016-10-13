import domainSaga                  from '../../../src/client-src/sagas/domain-saga';
import actions                     from '../../../src/client-src/actions/bo-domain-services-pane';
import actionTypes                 from '../../../src/client-src/constants/BoDomainServicesActionTypes';
import DomainServerApi             from '../../../src/client-src/services/domain-server-api'
import SagaIntegrationTester       from '../../../src/client-src/test-utils/SagaIntegrationTester.js';

describe('BO Domain Saga', () => {

  let sagaIntegrationTester = null;

  const boDomainServicesReducer = (state, action) => {
    if (action.type ===  actionTypes.SHOW_LOADER){
      return {loader: true};
    } else if (action.type == actionTypes.CLOSE_LOADER) {
      return {loader: false};
    }
    return state || {loader: null};

  };

  beforeEach(() => {
    sagaIntegrationTester = new SagaIntegrationTester({}, {boDomainServicesReducer: boDomainServicesReducer});
  });

  const testSaga = (actionFunc, actionType, isFailure) => {
    sagaIntegrationTester.start(domainSaga).withAction(actionFunc("myStunningDomain.com"));
    assertSideEffectCalled(actionType, isFailure);
    assertSideEffectExecutionOrder(actionType, isFailure);
  };

  const assertSideEffectExecutionOrder = (actionType, isFailure) => {
    expectExecutionOrder(actionType, 0);
    expectExecutionOrder(actionTypes.SHOW_LOADER, 1);
    if (!isFailure) {
      expectExecutionOrder(actionTypes.GOT_DATA_FROM_SERVER, 2);
      expectExecutionOrder(actionTypes.CLOSE_LOADER, 3);
    } else {
      expectExecutionOrder(actionTypes.CLOSE_LOADER, 2);
    }
  };

  const assertSideEffectCalled = (actionType, isFailure) => {
    expectExecutionsNumber(actionTypes.SHOW_LOADER, 1);
    expectExecutionsNumber(actionType, 1);
    expectExecutionsNumber(actionTypes.CLOSE_LOADER, 1);
    if (!isFailure) {
      expectExecutionsNumber(actionTypes.GOT_DATA_FROM_SERVER, 1);
    } else {
      expectExecutionsNumber(actionTypes.CLOSE_LOADER, 1);
    }
  };

  const expectExecutionOrder = (actionType, order) => {
    expect(sagaIntegrationTester.getActionExecutionOrder(actionType)).toEqual(order);
  };

  const expectExecutionsNumber = (actionType, executionNumber) => {
    expect(sagaIntegrationTester.numCalled(actionType)).toEqual(executionNumber);
  };

  describe(`'GET_DOMAIN_DATA' handler`, () => {
    it('return domain data while showing loader upon waiting for response ', () => {
      spyOn(DomainServerApi, 'getDomainData').and.returnValue({});
      testSaga(actions.getDomainData, actionTypes.GET_DOMAIN_DATA);
    });

    it('close loader upon failure', () => {
      spyOn(DomainServerApi, 'getDomainData').and.callFake(function() { throw new Error() });
      testSaga(actions.getDomainData, actionTypes.GET_DOMAIN_DATA, true);
    });
  });

  describe(`'GET_TRANSFER_DOMAIN_DATA' handler`, () => {
    it('return transfer domain data while showing loader upon waiting for response ', () => {
      spyOn(DomainServerApi, 'getDomainTransferData').and.returnValue({});
      testSaga(actions.getDomainTransferData, actionTypes.GET_TRANSFER_DOMAIN_DATA);
    });

    it('close loader upon failure', () => {
      spyOn(DomainServerApi, 'getDomainTransferData').and.callFake(function() { throw new Error() });
      testSaga(actions.getDomainTransferData, actionTypes.GET_TRANSFER_DOMAIN_DATA, true);
    });
  });

  describe(`'GET_DOMAIN_REGISTRY_DATA' handler`, () => {
    it('return domain registry data while showing loader upon waiting for response ', () => {
      spyOn(DomainServerApi, 'getRegistryCheckData').and.returnValue({});
      testSaga(actions.getDomainRegistryCheckData, actionTypes.GET_DOMAIN_REGISTRY_DATA);
    });

    it('close loader upon failure', () => {
      spyOn(DomainServerApi, 'getRegistryCheckData').and.callFake(function() { throw new Error() });
      testSaga(actions.getDomainRegistryCheckData, actionTypes.GET_DOMAIN_REGISTRY_DATA, true);
    });
  });

  describe(`'GET_PREMIUM_DOMAIN_DATA' handler`, () => {
    it('return domain premium data while showing loader upon waiting for response ', () => {
      spyOn(DomainServerApi, 'getPremiumDomainData').and.returnValue({});
      testSaga(actions.getPremiumDomainData, actionTypes.GET_PREMIUM_DOMAIN_DATA);
    });

    it('close loader upon failure', () => {
      spyOn(DomainServerApi, 'getPremiumDomainData').and.callFake(function() { throw new Error() });
      testSaga(actions.getPremiumDomainData, actionTypes.GET_PREMIUM_DOMAIN_DATA, true);
    });
  });
});
