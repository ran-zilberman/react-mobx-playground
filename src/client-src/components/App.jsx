import React from 'react'
import BoDomainServicesPaneContainer from '../containers/BoDomainServicesPaneContainer';
import DevTools from 'mobx-react-devtools';
require('./index.scss');

const App = () => (
  <div>
    <DevTools/>
    <BoDomainServicesPaneContainer/>
  </div>
);

export default App;