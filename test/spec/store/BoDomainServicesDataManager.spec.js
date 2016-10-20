import BoDomainServicesDataManager from '../../../src/client-src/store/BoDomainServicesDataManager';
import DataMigrator from '../../../src/client-src/services/DataMigrator';

// ============================================================================
// Helpers
// ============================================================================

const unknownDummyJson = () => ({ dummyObject: { dummyProp: '1' } });
const serverResponseRelevantContentJson = () => ({ hereIsSomeData: 'i am relevant!!!!!' });
const serverResponseDummyJson = () => ({ serviceResponse: { response: serverResponseRelevantContentJson() } });
const readableDummyJson = () => ({ readable: 'prop' });

// ============================================================================
// Tests
// ============================================================================

describe('BoDomainServicesDataManager', () => {

  describe('#setJsonData', () => {

    it('should set the json data as is in case no server pattern is identified', () => {
      BoDomainServicesDataManager.setJsonData(unknownDummyJson());
      expect(BoDomainServicesDataManager.jsonData).toEqual(unknownDummyJson());
    });

    it('should set the json data relevant content if identified', () => {
      BoDomainServicesDataManager.setJsonData(serverResponseDummyJson());
      expect(BoDomainServicesDataManager.jsonData).toEqual(serverResponseRelevantContentJson());
    });

  });

  describe('#readableJsonData', () => {

    it('should return readable json data', () => {
      spyOn(DataMigrator, 'getReadableData').and.returnValue(readableDummyJson());
      BoDomainServicesDataManager.setJsonData(serverResponseDummyJson());
      expect(BoDomainServicesDataManager.readableJsonData).toEqual(readableDummyJson());
    });

  });

  describe('#isLoading', () => {

    it('should return true when isLoading flag is set to true', () => {
      BoDomainServicesDataManager.setIsLoading(true);
      expect(BoDomainServicesDataManager.isLoading).toEqual(true);
    });

    it('should return false when isLoading flag is set to false', () => {
      BoDomainServicesDataManager.setIsLoading(false);
      expect(BoDomainServicesDataManager.isLoading).toEqual(false);
    });

  });

});