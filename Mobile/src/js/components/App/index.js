import React from 'react';
import Navigation from '../Navigation/index';
import Routes from '../../pages/Routes';
import Mobile from '../../components/Mobile/index';

class App extends React.PureComponent {

  render() {

    return(
      <div className='container'>
        {/*<Navigation />*/}
        <Mobile />
      </div>
    )
  }
}

export default App;