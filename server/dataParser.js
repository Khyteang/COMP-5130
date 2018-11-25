const fs = require('fs');

function readTextFile(file) {
    return new Promise((resolve, reject) => {
        var data = fs.readFileSync(file, 'utf-8');
        var eventsMap = JSON.parse(data);
        resolve(eventsMap);
    });
}

function dataParser() {
    let path = __dirname + "/data/map_event.json";
    console.log(`trying to parse ${path}`);
    return readTextFile(path)
    .then((events) => {
        var eventMap = [];
        for (let key in events) {
            let eventObj = events[key];
            //let event = new Event(eventObj["id"], eventObj["lat"], eventObj["lon"], eventObj["title"], eventObj["icon"]);
            eventMap.push(eventObj);
        }
        return eventMap;
    })
    .catch((err) => {
        console.log(`Error has occurred trying to parse data from ${path}`);
        reject(err);
    })
}

module.exports = {dataParser};