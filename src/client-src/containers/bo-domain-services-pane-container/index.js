import BoDomainServicesPaneActions from '../../actions/bo-domain-services-pane';
import { connect } from 'react-redux';
import BoDomainServicesPane from '../../components/bo-domain-services-pane';
import { createSelector } from 'reselect';

// ============================================================================
// Data manipulation
// ============================================================================

const getData = state => {
  if(state.BoDomainServicesPane.jsonTree && state.BoDomainServicesPane.jsonTree.serviceResponse ) {
    return state.BoDomainServicesPane.jsonTree.serviceResponse.response
  }
  return state.BoDomainServicesPane.jsonTree;
};

const unCamelCase = (str) => {
  return str
  // insert a space between lower & upper
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // space before last upper in a sequence followed by lower
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })
};

const toHumanReadableObject = (data) => {
  if(!data) return data;

  const result = Array.isArray(data) ? [] : {};

  Object.entries(data).forEach(([key, value]) => {
    let hrValue = value;
    if(Array.isArray(value) || typeof value == 'object'){
      hrValue = toHumanReadableObject(value);
    }
    result[unCamelCase(key)] = hrValue
  });

  return result;
};


const getReadableData = createSelector([getData], (data) => {
  return toHumanReadableObject(data);
});

// ============================================================================
// Container spec
// ============================================================================

const mapStateToProps = (state) => {
  return {
    isLoading: state.BoDomainServicesPane.isLoading,
    jsonTree: getReadableData(state)
  }
};

const mapDispatchToProps = {
  onDomainGetClick: BoDomainServicesPaneActions.getDomainData,
  onDomainTransferGetClick: BoDomainServicesPaneActions.getDomainTransferData,
  onRegistryCheckClick: BoDomainServicesPaneActions.getDomainRegistryCheckData,
  onPremiumDomainDataClick: BoDomainServicesPaneActions.getPremiumDomainData
};

const BoDomainServicesPaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoDomainServicesPane);

export default BoDomainServicesPaneContainer;