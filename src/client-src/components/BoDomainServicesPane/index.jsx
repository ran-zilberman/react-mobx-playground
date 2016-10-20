import React, { PropTypes, Component } from 'react';
import UI from 'wix-base-ui/dist/base-ui';
import JSONInspector from 'react-json-inspector';
require('./index.scss');

const returnTrue = () => true;

class BoDomainServicesPane extends Component {

  constructor(params) {
    super(params);
    this._onDomainGetClick = this._onDomainGetClick.bind(this);
    this._onDomainTransferGetClick = this._onDomainTransferGetClick.bind(this);
    this._onRegistryCheckClick = this._onRegistryCheckClick.bind(this);
    this._onPremiumDomainDataClick = this._onPremiumDomainDataClick.bind(this);
  }

  render() {
    let { jsonData, isLoading } = this.props;
    return (<div className="bo-domain-services-pane">
      <div className="actions-wrapper">
        <input ref="domainName" className="domain-name-input"/>
        <UI.button className="domain-get-button" onClick={ this._onDomainGetClick }>Domain Get</UI.button>
        <UI.button className="domain-transfer-get-button" onClick={ this._onDomainTransferGetClick }>Domain Transfer Get</UI.button>
        <UI.button className="registry-check-button" onClick={ this._onRegistryCheckClick }>Domain Registry Check</UI.button>
        <UI.button className="premium-domain-data-button" onClick={ this._onPremiumDomainDataClick }>Premium domain data</UI.button>
      </div>
      {
        isLoading ?
          <div className="loader"/>
        :
        <div className="results-container">
          { jsonData ? <JSONInspector className="json-result-container" isExpanded={ returnTrue } data={jsonData}  filterOptions={{ignoreCase: true}} /> : <div className="no-json-data">No data</div> }
        </div>
      }
    </div>);
  }

  _onDomainGetClick() {
    let {onDomainGetClick} = this.props;
    let domainName = this.refs.domainName.value;
    onDomainGetClick(domainName);
  }

  _onDomainTransferGetClick() {
    let {onDomainTransferGetClick} = this.props;
    let domainName = this.refs.domainName.value;
    onDomainTransferGetClick(domainName);
  }

  _onRegistryCheckClick() {
    let {onRegistryCheckClick} = this.props;
    let domainName = this.refs.domainName.value;
    onRegistryCheckClick(domainName);
  }

  _onPremiumDomainDataClick() {
    let {onPremiumDomainDataClick} = this.props;
    let domainName = this.refs.domainName.value;
    onPremiumDomainDataClick(domainName);
  }

}

BoDomainServicesPane.displayName = 'BoDomainServicesPane';

BoDomainServicesPane.propTypes = {
  onDomainGetClick: PropTypes.func.isRequired,
  onDomainTransferGetClick: PropTypes.func.isRequired,
  onRegistryCheckClick: PropTypes.func.isRequired,
  onPremiumDomainDataClick: PropTypes.func.isRequired,
  jsonData: PropTypes.object
};


export default BoDomainServicesPane;

