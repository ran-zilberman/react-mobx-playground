import ActionTypes from '../constants/BoDomainServicesActionTypes'

const getDomainData = ({domainName}) => ({type:ActionTypes.GET_DOMAIN_DATA, domainName});
const getDomainTransferData = ({domainName}) => ({type:ActionTypes.GET_TRANSFER_DOMAIN_DATA, domainName});
const getDomainRegistryCheckData = ({domainName}) => ({type:ActionTypes.GET_DOMAIN_REGISTRY_DATA, domainName});
const getPremiumDomainData = ({domainName}) => ({type:ActionTypes.GET_PREMIUM_DOMAIN_DATA, domainName});
const gotDataFromServer = ({response}) => ({type:ActionTypes.GOT_DATA_FROM_SERVER, response});
const showLoader = () => ({type: ActionTypes.SHOW_LOADER});
const closeLoader = () => ({type: ActionTypes.CLOSE_LOADER});

export default {
  getDomainData,
  getDomainTransferData,
  getDomainRegistryCheckData,
  getPremiumDomainData,
  gotDataFromServer,
  showLoader,
  closeLoader
};
