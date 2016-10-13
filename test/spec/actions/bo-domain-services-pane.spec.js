import BoDomainServicesPaneActions from '../../../src/client-src/actions/bo-domain-services-pane';
import ActionTypes from '../../../src/client-src/constants/BoDomainServicesActionTypes';

// ============================================================================
// Tests
// ============================================================================

describe('Actions: bo-domain-services-pane', function () {
  
  it('should return GET_DOMAIN_DATA action object', function () {
    let domainName = 'blahhhh.com';
    const expectedAction = {
      type:ActionTypes.GET_DOMAIN_DATA,
      domainName
    };
    expect(BoDomainServicesPaneActions.getDomainData({domainName})).toEqual(expectedAction);
  });

  it('should return GET_TRANSFER_DOMAIN_DATA action object', function () {
    let domainName = 'blahhhh.com';
    const expectedAction = {
      type:ActionTypes.GET_TRANSFER_DOMAIN_DATA,
      domainName
    };
    expect(BoDomainServicesPaneActions.getDomainTransferData({domainName})).toEqual(expectedAction);
  });

  it('should return GET_DOMAIN_REGISTRY_DATA action object', function () {
    let domainName = 'blahhhh.com';
    const expectedAction = {
      type:ActionTypes.GET_DOMAIN_REGISTRY_DATA,
      domainName
    };
    expect(BoDomainServicesPaneActions.getDomainRegistryCheckData({domainName})).toEqual(expectedAction);
  });

  it('should return GET_PREMIUM_DOMAIN_DATA action object', function () {
    let domainName = 'blahhhh.com';
    const expectedAction = {
      type:ActionTypes.GET_PREMIUM_DOMAIN_DATA,
      domainName
    };
    expect(BoDomainServicesPaneActions.getPremiumDomainData({domainName})).toEqual(expectedAction);
  });

  it('should return SHOW_LOADER action object', function () {
    const expectedAction = {
      type: ActionTypes.SHOW_LOADER
    };
    expect(BoDomainServicesPaneActions.showLoader()).toEqual(expectedAction);
  });

  it('should return CLOSE_LOADER action object', function () {
    const expectedAction = {
      type: ActionTypes.CLOSE_LOADER
    };
    expect(BoDomainServicesPaneActions.closeLoader()).toEqual(expectedAction);
  });

  it('should return GOT_DATA_FROM_SERVER action object', function () {
    const response = {data: 'my-data'};
    const expectedAction = {
      type: ActionTypes.GOT_DATA_FROM_SERVER,
      response
    };
    expect(BoDomainServicesPaneActions.gotDataFromServer({response})).toEqual(expectedAction);
  });

});