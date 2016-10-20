import {action, observable, useStrict, computed, asStructure} from 'mobx';
import { Provider } from 'mobx-react';
import DomainServerApi from '../services/DomainServerApi';
import DataMigrator from '../services/DataMigrator';
useStrict(true);

// ============================================================================
// API helpers
// ============================================================================

const executeDomainDataCall = async (method, domainName) => {
  boDomainServicesDataManager.setIsLoading(true);
  try {
    const response = await method(domainName);
    boDomainServicesDataManager.setJsonData(response);
  } catch (e) {
    // trigger popup action
  }
  boDomainServicesDataManager.setIsLoading(false);
};

// ============================================================================
// Data Store
// ============================================================================

const boDomainServicesDataManager = new class BoDomainServicesDataManager {
  @observable _isLoading = false;
  @observable _jsonData = null;

  @action getDomainData = domainName => {
    executeDomainDataCall(DomainServerApi.getDomainData, domainName);
  };

  @action getDomainTransferData = domainName => {
    executeDomainDataCall(DomainServerApi.getDomainTransferData, domainName);
  };

  @action getDomainRegistryCheckData = domainName => {
    executeDomainDataCall(DomainServerApi.getRegistryCheckData, domainName);
  };

  @action getPremiumDomainData = domainName => {
    executeDomainDataCall(DomainServerApi.getPremiumDomainData, domainName);
  };

  @action setJsonData(jsonData) {
    let relevantData = jsonData && jsonData.serviceResponse ? jsonData.serviceResponse.response : jsonData;
    this._jsonData = relevantData;
  };

  @computed get readableJsonData () {
    return DataMigrator.getReadableData(this._jsonData);
  };

  @action setIsLoading(val) {
    this._isLoading = val;
  };

  get isLoading() {
    return this._isLoading;
  };

  get jsonData() {
    return this._jsonData;
  };

};

export default boDomainServicesDataManager;
