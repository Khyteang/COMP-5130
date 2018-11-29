import React from "react";
import SimplifiedMap from './SimplifedMap.jsx';

import './App.css';
import { Container, Row, Col } from 'reactstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disasterObj: null,
      updateFetchTweets: false
    };
  }

  render() {
    return (
      <div className="wrapper">
        <div id="mapWrapper">
          <SimplifiedMap infoWrapperCallback={(disasterObj, updatedFetchTweets) => this.setState({disasterObj, updateFetchTweets: updatedFetchTweets})}/>
        </div>
        <div id="infoWrapper">
          Hello
        </div>
      </div>
    );
  }
}
  
export default App;