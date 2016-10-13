import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import DomainServerApi from '../../../src/client-src/services/domain-server-api'
import ContentType from '../../../src/client-src/constants/ContentType'
import ServerUri from '../../../src/client-src/constants/ServerUri'

const dummyResultJsonObject = () => ({prop: 'value'});
const dummyResultXmlObject = () => '<xmlFakeResponse><fakeItem>1</fakeItem></xmlFakeResponse>';
const dummyXmlJsonRep = () => ({ xmlFakeResponse: { fakeItem: '1' } });
const responseParams = (contentType, result) => ({ body: result, headers: { 'content-type': contentType } });

// ============================================================================
// Assertion helpers
// ============================================================================

const assertCatch = async (asyncMethod, errorMessage, done) => {
  try {
    const result = await asyncMethod();
  } catch (error) {
    expect(error.message).toEqual(errorMessage);
    done();
  }
};

const assertResponseStatusFailure = async (uri, asyncMethod, done) => {
  fetchMock.mock(uri, 500);
  assertCatch(asyncMethod, `DomainServerApi request failed, response code 500`, done);
};

const assertApiSuccess = async (method, expectedResult) => {
  const result = await method();
  expect(result).toEqual(expectedResult);
};

// ============================================================================
// Tests
// ============================================================================

describe('DomainServicesApi', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  describe('data extraction', () => {

    it('should throw exception when unknown content type header is returned in the response', async (done) => {
      let unknownContentType = 'unknown-content-type';
      fetchMock.post(ServerUri.GET_DOMAIN_DATA, responseParams(unknownContentType, dummyResultXmlObject()) );
      assertCatch(DomainServerApi.getDomainData, `DomainServerApi request failed, unsupported response content type: ${unknownContentType}`, done);
    });

    it('should return json representation when response content type is xml', async (done) => {
      fetchMock.post(ServerUri.GET_DOMAIN_DATA, responseParams(ContentType.XML_CONTENT_TYPE, dummyResultXmlObject()) );
      await assertApiSuccess(DomainServerApi.getDomainData, dummyXmlJsonRep());
      done();
    });

    it('should throw exception when response contains bad xml', async (done) => {
      fetchMock.post(ServerUri.GET_DOMAIN_DATA, responseParams(ContentType.XML_CONTENT_TYPE, 'blahhhhh sdgbsfgb') );
      assertCatch(DomainServerApi.getDomainData, `DomainServerApi request failed due to bad xml`, done);
    });

  });

  describe('#getDomainData', () => {

    it('should return domain data', async done => {
      fetchMock.post(ServerUri.GET_DOMAIN_DATA, responseParams(ContentType.XML_CONTENT_TYPE, dummyResultXmlObject()) );
      await assertApiSuccess(DomainServerApi.getDomainData, dummyXmlJsonRep());
      done();
    });

    it('should return exception when request to domain data fails', async done => {
      assertResponseStatusFailure(ServerUri.GET_DOMAIN_DATA, DomainServerApi.getDomainData, done);
    });

  });

  describe('#getDomainTransferData', () => {

    it('should return domain transfer data', async done => {
      fetchMock.post(ServerUri.GET_DOMAIN_TRANSFER_DATA, responseParams(ContentType.XML_CONTENT_TYPE, dummyResultXmlObject()) );
      await assertApiSuccess(DomainServerApi.getDomainTransferData, dummyXmlJsonRep());
      done();
    });

    it('should return exception when request to domain transfer data fails', async done => {
      assertResponseStatusFailure(ServerUri.GET_DOMAIN_TRANSFER_DATA, DomainServerApi.getDomainTransferData, done);
    });

  });

  describe('#getRegistryCheckData', () => {

    it('should return domain registry data', async done => {
      fetchMock.post(ServerUri.GET_DOMAIN_REGISTRY_CHECK, responseParams(ContentType.XML_CONTENT_TYPE, dummyResultXmlObject()) );
      await assertApiSuccess(DomainServerApi.getRegistryCheckData, dummyXmlJsonRep());
      done();
    });

    it('should return exception when request to domain registry data fails', async done => {
      assertResponseStatusFailure(ServerUri.GET_DOMAIN_REGISTRY_CHECK, DomainServerApi.getRegistryCheckData, done);
    });

  });

  describe('#getPremiumDomainData', () => {

    it('should return premium domain data', async done => {
      fetchMock.post(ServerUri.GET_PREMIUM_DOMAIN_DATA, responseParams(ContentType.JSON_CONTENT_TYPE, dummyResultJsonObject()) );
      await assertApiSuccess(DomainServerApi.getPremiumDomainData, dummyResultJsonObject());
      done();
    });

    it('should return exception when request to premium domain data fails', async done => {
      assertResponseStatusFailure(ServerUri.GET_PREMIUM_DOMAIN_DATA, DomainServerApi.getPremiumDomainData, done);
    });

  });

});