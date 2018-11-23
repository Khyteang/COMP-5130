import React from "react";
import SimplifiedMap from './SimplifedMap.jsx';
import './App.css';
import { Container, Row, Col } from 'reactstrap';

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
        <div className="wrapper">
          <div id="mapWrapper">
            <SimplifiedMap />
          </div>
          <div id="infoWrapper">
            
          </div>
        </div>
      );
    }
  }
  
  export default App;