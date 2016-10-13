import { mount, shallow } from 'enzyme';
import React from 'react';
import BoDomainServicesPane from '../../../src/client-src/components/bo-domain-services-pane';

// ============================================================================
// Tests
// ============================================================================

describe('<BoDomainServicesPane/>', ()=> {

  let wrapper = null;
  let props = null;

  const getDomainDataClassName = '.domain-get-button';
  const getDomainTransferDataClassName = '.domain-transfer-get-button';
  const getDomainRegistryCheckDataClassName = '.registry-check-button';
  const getPremiumDomainDataClassName = '.premium-domain-data-button';
  const jsonResultContainerClassName = '.json-result-container';

  beforeEach(() => {
    props = {
      onDomainGetClick: jasmine.createSpy(),
      onDomainTransferGetClick: jasmine.createSpy(),
      onRegistryCheckClick: jasmine.createSpy(),
      onPremiumDomainDataClick: jasmine.createSpy()
    };
  });

  const simulateClickAndAssertCallback = (callbackSpy, buttonClass) => {
    wrapper.find(buttonClass).simulate('click');
    expect(callbackSpy).toHaveBeenCalledTimes(1);
  };

  it(`should trigger onDomainGetClick callback upon 'getDomainData' button click`, function () {
    wrapper = mount(<BoDomainServicesPane {...props}/>);
    simulateClickAndAssertCallback(props.onDomainGetClick, getDomainDataClassName);
  });

  it(`should trigger onDomainTransferGetClick callback upon 'getDomainTransferData' button click`, function () {
    wrapper = mount(<BoDomainServicesPane {...props}/>);
    simulateClickAndAssertCallback(props.onDomainTransferGetClick, getDomainTransferDataClassName);
  });

  it(`should trigger onRegistryCheckClick callback upon 'getDomainRegistryCheck' button click`, function () {
    wrapper = mount(<BoDomainServicesPane {...props}/>);
    simulateClickAndAssertCallback(props.onRegistryCheckClick, getDomainRegistryCheckDataClassName);
  });

  it(`should trigger onPremiumDomainDataClick callback upon 'getPremiumDomainData' button click`, function () {
    wrapper = mount(<BoDomainServicesPane {...props}/>);
    simulateClickAndAssertCallback(props.onPremiumDomainDataClick, getPremiumDomainDataClassName);
  });

  it(`should show the json tree when data exist`, function () {
    props.jsonTree = {jsonItem: 'json-item'};
    wrapper = mount(<BoDomainServicesPane {...props}/>);
    expect(wrapper.find(jsonResultContainerClassName).length).toBe(1);
  });

  it(`should not show the json tree when data does not exist`, function () {
    wrapper = mount(<BoDomainServicesPane {...props}/>);
    expect(wrapper.find(jsonResultContainerClassName).length).toBe(0);
  });


});