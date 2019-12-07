import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuildr from './containers/BurgerBuilder/BurgerBuilder'

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuildr />
      </Layout>
    );
  }
}

export default App;
