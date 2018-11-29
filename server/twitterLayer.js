const Twitter = require('twitter'),
    config = require('./../config.json');

twitter_client = new Twitter(config['twitter_options']);

var keyword_search_params = { q: '"business cards", "buying"', count: 100, tweet_mode: 'extended' };

var retrieveTweets = function(keywords) {
    return new Promise((resolve, reject) => {
        keyword_search_params.q = `${keywords} -filter:retweets`;
        console.log(`Keywords ${keyword_search_params}`);
        twitter_client.get('search/tweets', keyword_search_params, function(error, result, response) {
            if (error) {
                reject(error);
            }

            let tweets = (result.statuses).map(x => x.id_str);
            console.log(tweets);
            resolve(tweets);
        });
    });
}

module.exports = {retrieveTweets};