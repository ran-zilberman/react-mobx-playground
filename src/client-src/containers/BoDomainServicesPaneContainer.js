import BoDomainServicesPane from '../components/BoDomainServicesPane';
import boDomainServicesDataManager from '../store/BoDomainServicesDataManager';
import { observer } from 'mobx-react';

import React from 'react'

// ============================================================================
// Container spec
// ============================================================================

const mapStoreToProps = () => ({
  onDomainGetClick: (domainName) => { boDomainServicesDataManager.getDomainData(domainName) },
  onDomainTransferGetClick: (domainName) => { boDomainServicesDataManager.getDomainTransferData(domainName) },
  onRegistryCheckClick: (domainName) => { boDomainServicesDataManager.getDomainRegistryCheckData(domainName) },
  onPremiumDomainDataClick: (domainName) => { boDomainServicesDataManager.getPremiumDomainData(domainName) },
  isLoading: boDomainServicesDataManager.isLoading,
  jsonData: boDomainServicesDataManager.readableJsonData
});

const BoDomainServicesPaneContainer = observer(() =>
  <BoDomainServicesPane {...mapStoreToProps()}/>
);

export default BoDomainServicesPaneContainer;
