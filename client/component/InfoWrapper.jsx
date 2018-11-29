import React, { Component } from 'react';
import {Tweet} from 'react-twitter-widgets';

export default class InfoWrapper extends Component {
    constructor(props) {
        console.log("InfoWrapper Constructor");
        super(props);
        this.state = {
            tweets: []
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        if (this.props.disasterObj && this.props.fetchTweets) {
            const keywordsToSearch = `${this.props.disasterObj.title} ${this.props.disasterObj.metaData.Country}`
            fetch(`http://localhost:3002/AngelViewApi/v1/tweets?keywords=${keywordsToSearch}`)
            .then((res) => res.json())
            .then((result) => {
                let tweetComps = result.reduce((memo, id) => {
                    memo.push(<Tweet tweetId={`${id}`}/>);
                    return memo;
                }, []);
                this.props.updateFetchTweets(false);
                this.setState({
                    tweets: tweetComps
                });
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
        }
        console.log('InfoWrapper Did Update');
    }

    render() {
        if (this.state.tweets.length > 0) {
            return (
                <div>
                    {this.state.tweets}
                </div>
            )    
        } else {
            return (
                <div>
                    Hello
                </div>
            )    
        }
    }
}