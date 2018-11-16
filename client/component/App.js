import React from "react";
import SimplifiedMap from './SimplifedMap.jsx';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        total: null,
        next: null,
        operation: null,
      };
    }
  
    /*
    handleClick = buttonName => {
      this.setState(calculate(this.state, buttonName));
    };
    */

    render() {
      return (
        <SimplifiedMap />
      );
    }
  }
  
  export default App;