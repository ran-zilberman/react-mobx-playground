import fetchMock from 'fetch-mock';
var Q = require("q");

let realFetchMock = fetchMock.fetchMock;
const testabilityFetch = (url, options) => {
  fetchMock.defer = Q.defer();
  let result = realFetchMock.call(fetchMock, url, options);
  setTimeout(() => fetchMock.defer.resolve(result), 0);
  return fetchMock.defer.promise;
};

fetchMock.fetchMock = testabilityFetch;

export default fetchMock;

