/**
 * Created by Ran_Zilberman on 16/05/2016.
 */

import domainSaga from './domain-saga'

const sagas = [
  domainSaga
];

const createRootSaga = function*() {
  yield sagas.map(saga => saga());
};

export default createRootSaga;

