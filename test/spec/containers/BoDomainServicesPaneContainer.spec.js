import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import BoDomainServicesPaneContainer from '../../../src/client-src/containers/BoDomainServicesPaneContainer';
import BoDomainServicesDataManager from '../../../src/client-src/store/BoDomainServicesDataManager';
import fetchMock from 'fetch-mock';
import ServerUri from '../../../src/client-src/constants/ServerUri';
import ContentType from '../../../src/client-src/constants/ContentType';


describe('<BoDomainServicesPaneContainer/>', () => {

  // ============================================================================
  // Constants
  // ============================================================================

  const noJsonDataClassName = '.no-json-data';
  const jsonInspectorClass = '.json-result-container';
  const getDomainDataClassName = '.domain-get-button';
  const getDomainTransferDataClassName = '.domain-transfer-get-button';
  const getDomainRegistryCheckDataClassName = '.registry-check-button';
  const getPremiumDomainDataClassName = '.premium-domain-data-button';

  // ============================================================================
  // Helpers
  // ============================================================================

  const responseParams = (contentType, result) => ({ body: result, headers: { 'content-type': contentType } });
  const dummyResultXmlObject = () => '<xmlFakeResponse><fakeItem>1</fakeItem></xmlFakeResponse>';
  const dummyResultJsonObject = () => ({prop: 'value'});

  const simulateClickAndAssertClassExists = (testedClass, buttonClass, done) => {
    wrapper.find(buttonClass).simulate('click');
    setTimeout(() => {
      expect(wrapper.find(testedClass).length).toEqual(1);
      done();
    }, 0)
  };

  // ============================================================================
  // Tests
  // ============================================================================

  afterEach(() => {
    fetchMock.restore();
  });

  beforeEach(() => {
    wrapper = mount(
      <BoDomainServicesPaneContainer />
    );
  });

  let wrapper = null;

  it('should display no data after initialization', () => {
    expect(wrapper.find(noJsonDataClassName).length).toEqual(1)
  });

  it('should display json viewer after fetching data from the server - DomainGet', done => {
    fetchMock.post(ServerUri.GET_DOMAIN_DATA, responseParams(ContentType.XML_CONTENT_TYPE, dummyResultXmlObject()));
    simulateClickAndAssertClassExists(jsonInspectorClass, getDomainDataClassName, done)
  });

  it('should display json viewer after fetching data from the server - DomainTransferGet', done => {
    fetchMock.post(ServerUri.GET_DOMAIN_TRANSFER_DATA, responseParams(ContentType.XML_CONTENT_TYPE, dummyResultXmlObject()));
    simulateClickAndAssertClassExists(jsonInspectorClass, getDomainTransferDataClassName, done)
  });

  it('should display json viewer after fetching data from the server - DomainRegistryCheck', done => {
    fetchMock.post(ServerUri.GET_DOMAIN_REGISTRY_CHECK, responseParams(ContentType.XML_CONTENT_TYPE, dummyResultXmlObject()));
    simulateClickAndAssertClassExists(jsonInspectorClass, getDomainRegistryCheckDataClassName, done)
  });

  it('should display json viewer after fetching data from the server - PremiumDomainDataGet', done => {
    fetchMock.post(ServerUri.GET_PREMIUM_DOMAIN_DATA, responseParams(ContentType.JSON_CONTENT_TYPE, dummyResultJsonObject()));
    simulateClickAndAssertClassExists(jsonInspectorClass, getPremiumDomainDataClassName, done)
  });

});