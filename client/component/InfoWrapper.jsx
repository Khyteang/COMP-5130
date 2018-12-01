import React, { Component } from 'react';
import {Tweet} from 'react-twitter-widgets';
import {TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'reactstrap';
import classnames from 'classnames';
import {Radar} from 'react-chartjs-2';

const host = "http://localhost:3002/";

//fake data since these information aren't publicly available. 
//This is just to prove a concept.
const data = {
    labels: ['Water', 'Medication', 'Food', 'First Aid Kit', 'Clothing', 'Cleaning Products'],
    datasets: [
      {
        label: 'Current Donation',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: [80, 70, 90, 81, 75, 65]
      }
    ]
};

export default class InfoWrapper extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            tweets: [],
            activeTab: '1',
            disasterObj: null
        }
    }

    componentDidMount() {
        
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidUpdate() {
        if (this.props.disasterObj && this.props.fetchTweets) {
            const keywordsToSearch = `${this.props.disasterObj.title} ${this.props.disasterObj.metaData.Country}`
            fetch(`${host}AngelViewApi/v1/tweets?keywords=${keywordsToSearch}`)
            .then((res) => res.json())
            .then((result) => {
                let tweetComps = result.reduce((memo, id) => {
                    memo.push(<Tweet tweetId={`${id}`}/>);
                    return memo;
                }, []);
                this.props.updateFetchTweets(false);
                this.setState({
                    tweets: tweetComps,
                    disasterObj: this.props.disasterObj
                });
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
        }
    }

    render() {
        
        let eventInfoContent = <div className="initialTextDiv">
                                    Shown on the map are natural disaster events that are currently occuring around the world.<br /><br />
                                    Click on a marker to learn more about the event and see live tweets regarding the event.
                                </div>

        let donationContent = <div className="initialTextDiv">
                                    Click on the marker to learn how you can donate to help those affected by the natural disaster
                                </div>

        let tweetContent = null;

        if (this.state.disasterObj) {
            eventInfoContent = <div className="eventInfoContentWrapper">
                <div className="infoPairWrapper">
                    <h5>Event:</h5>
                    <h6>{this.state.disasterObj.title}</h6>
                </div>
                <div className="infoPairWrapper">
                    <h5>Date:</h5>
                    <h6>{this.state.disasterObj.metaData.Date}</h6>
                </div>
                <div className="infoPairWrapper">
                    <h5>Location:</h5>
                    <h6>{this.state.disasterObj.metaData.Location}</h6>
                </div>
                <div className="infoPairWrapper">
                    <h5>Country:</h5>
                    <h6>{this.state.disasterObj.metaData.Country}</h6>
                </div>
                <div className="infoPairWrapper">
                    <h5>Continent:</h5>
                    <h6>{this.state.disasterObj.metaData.Continent}</h6>
                </div>
                <div className="infoPairWrapper">
                    <h5>Event Detail:</h5>
                    <h6>{this.state.disasterObj.description}</h6>
                </div>
            </div>

            if (this.state.disasterObj.isEarthquake) {
                eventInfoContent = <div className="eventInfoContentWrapper">
                    <div className="infoPairWrapper">
                        <h5>Event:</h5>
                        <h6>{this.state.disasterObj.title}</h6>
                    </div>
                    <div className="infoPairWrapper">
                        <h5>Date:</h5>
                        <h6>{this.state.disasterObj.metaData.Date}</h6>
                    </div>
                    <div className="infoPairWrapper">
                        <h5>Location:</h5>
                        <h6>{this.state.disasterObj.metaData.Location}</h6>
                    </div>
                    <div className="infoPairWrapper">
                        <h5>Country:</h5>
                        <h6>{this.state.disasterObj.metaData.Country}</h6>
                    </div>
                    <div className="infoPairWrapper">
                        <h5>Continent:</h5>
                        <h6>{this.state.disasterObj.metaData.Continent}</h6>
                    </div>
                    <div className="infoPairWrapper">
                        <h5>Event Detail:</h5>
                        <h6>{this.state.disasterObj.description}</h6>
                    </div>
                    <div className="infoPairWrapper">
                        <h5>Magnitude:</h5>
                        <h6>{this.state.disasterObj.metaData.Magnitude}</h6>
                    </div>
                    <div className="infoPairWrapper">
                        <h5>Depth:</h5>
                        <h6>{this.state.disasterObj.metaData.Depth}</h6>
                    </div>
                </div>
            }
            
          donationContent = <div className="chartWrapper" ><Radar data={data} /></div>
        }

        //Populate tab contents
        if (!(this.props.removeTweet)) {
            if (this.state.tweets.length > 0) { //if we find tweets
                tweetContent = this.state.tweets;
            } else {
                tweetContent = 
                    <div className="initialTextDiv">
                        This event does not have any associating tweet yet!
                    </div>
            }
        } else {
            tweetContent = <div className="initialTextDiv">
                                Click on a marker to see real-time tweets regarding the event
                            </div>
        }

        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                        >
                        Event Information
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                        >
                        Real-Time Tweets
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                        >
                        Donation
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        {eventInfoContent}
                    </TabPane>
                    <TabPane tabId="2" style={{padding: "10px 20px"}}>
                        {tweetContent}
                    </TabPane>
                    <TabPane tabId="3" style={{padding: "10px 20px"}}>
                        {donationContent}
                        <div className="center">
                            <Button color="primary">Make a donation</Button>{' '}
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        )   
    }
}