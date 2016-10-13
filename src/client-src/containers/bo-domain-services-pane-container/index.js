import BoDomainServicesPaneActions from '../../actions/bo-domain-services-pane';
import { connect } from 'react-redux';
import BoDomainServicesPane from '../../components/bo-domain-services-pane';
import { createSelector } from 'reselect';
import DataMigrator from '../../services/data-migrator'

// ============================================================================
// Data manipulation
// ============================================================================

const getData = state => {
  if(state.BoDomainServicesPane.jsonTree && state.BoDomainServicesPane.jsonTree.serviceResponse ) {
    return state.BoDomainServicesPane.jsonTree.serviceResponse.response
  }
  return state.BoDomainServicesPane.jsonTree;
};

// ============================================================================
// Container spec
// ============================================================================

const mapStateToProps = (state) => {
  return {
    isLoading: state.BoDomainServicesPane.isLoading,
    jsonTree: DataMigrator.getReadableData(getData(state))
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