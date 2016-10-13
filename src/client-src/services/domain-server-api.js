/**
 * Created by Ran_Zilberman on 17/05/2016.
 */

import ContentType from '../constants/ContentType';
import ServerUri from '../constants/ServerUri';
import { Parser } from 'xml2js'

// ============================================================================
// XML 2 JSON
// ============================================================================

const xml2JsonParser = new Parser({explicitArray : false});

const convertXmlToJson = async (xmlString) => {
  return new Promise((resolve, reject) => {
    xml2JsonParser.parseString(xmlString, function (err, json) {
      if (err) {
        reject(err);
      }
      else {
        resolve(json);
      }
    });
  });
};

const convertXmlToJsonOrThrow = async (response) => {
  try {
    let text = await response.text();
    return await convertXmlToJson(text);
  } catch(error) {
    throw new Error('DomainServerApi request failed due to bad xml');
  }
};

const verifyStatusCodeOkOrThrow = (response) => {
  if (!response.ok) {
    throw new Error(`DomainServerApi request failed, response code ${response.status}`);
  }
};

const extractDataOrThrow = async (response) => {
  let contentType = response.headers.get('Content-Type');
  switch (contentType) {
    case ContentType.JSON_CONTENT_TYPE:
      return response.json();
    case ContentType.XML_CONTENT_TYPE:
      return convertXmlToJsonOrThrow(response);
    default:
      throw new Error(`DomainServerApi request failed, unsupported response content type: ${contentType}`);
  }
};

const createPostOptions = (payload, contentType) => {
  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': contentType
    },
    body: JSON.stringify(payload)
  };
};

const getServerResponse = async (uri, params, contentType) => {
  const options = createPostOptions(params, contentType);
  let response = await fetch(uri, options);
  verifyStatusCodeOkOrThrow(response);
  return extractDataOrThrow(response);
};

class DomainServerApi {

  async getDomainData(domainName) {
    return getServerResponse(ServerUri.GET_DOMAIN_DATA, {domainName: domainName}, ContentType.XML_CONTENT_TYPE);
  }

  async getDomainTransferData(domainName) {
    return getServerResponse(ServerUri.GET_DOMAIN_TRANSFER_DATA, {domainName: domainName}, ContentType.XML_CONTENT_TYPE);
  }

  async getRegistryCheckData(domainName) {
    return getServerResponse(ServerUri.GET_DOMAIN_REGISTRY_CHECK, {domainName: domainName}, ContentType.XML_CONTENT_TYPE);
  }

  async getPremiumDomainData(domainName) {
    return getServerResponse(ServerUri.GET_PREMIUM_DOMAIN_DATA, {domainName: domainName}, ContentType.JSON_CONTENT_TYPE);
  }

}

export default new DomainServerApi();
