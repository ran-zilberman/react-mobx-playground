import reducer from '../../../src/client-src/reducers/bo-domain-services-pane';
import BoDomainServicesPaneActions from '../../../src/client-src/actions/bo-domain-services-pane';

// ============================================================================
// Tests
// ============================================================================

describe('Reducers: bo-domain-services-pane', function () {

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: 'UNKNOWN'})).toEqual({});
  });

  it(`should set state's isLoading flag to true when SHOW_LOADER action is triggered`, () => {
    expect(reducer(undefined, BoDomainServicesPaneActions.showLoader())).toEqual({isLoading: true});
  });

  it(`should remove state's isLoading flag when CLOSE_LOADER action is triggered`, () => {
    expect(reducer(undefined, BoDomainServicesPaneActions.closeLoader())).toEqual({});
  });

  it(`should return the state as is when CLOSE_LOADER action is triggered and state's isLoading: flag is not present`, () => {
    expect(reducer({isLoading: true}, BoDomainServicesPaneActions.closeLoader())).toEqual({});
  });

  it(`should return the state with jsonTree when CLOSE_LOADER action is triggered and state's loader flag is not present`, () => {
    const response = {someData: 'some-data'};
    expect(reducer(undefined, BoDomainServicesPaneActions.gotDataFromServer({response}))).toEqual({jsonTree: response});
  });

});