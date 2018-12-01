import React from "react";
import SimplifiedMap from './SimplifedMap.jsx';
import InfoWrapper from './InfoWrapper.jsx';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disasterObj: null,
      updateFetchTweets: false,
      removeTweet: true
    };
  }

  render() {
    return (
      <div className="wrapper">
        <div id="mapWrapper">
          <SimplifiedMap infoWrapperCallback={(disasterObj, updatedFetchTweets, removeTweet) => this.setState({disasterObj, updateFetchTweets: updatedFetchTweets, removeTweet})} clickOnMap={(removeTweet) => this.setState({removeTweet})}/>
        </div>
        <div id="infoWrapper">
        <InfoWrapper removeTweet={this.state.removeTweet} disasterObj={this.state.disasterObj} fetchTweets={this.state.updateFetchTweets} updateFetchTweets={(updatedFetchTweets) => this.setState({updateFetchTweets: updatedFetchTweets})}/>
        </div>
      </div>
    );
  }
}
  
export default App;