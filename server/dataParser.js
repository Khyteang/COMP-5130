import fs from 'fs';

function readTextFile(file, callback) {
    var data = fs.readFileSync(file, 'utf-8');
    var eventsMap = JSON.parse(data);
    callback(eventsMap);
}

function ParseData(url) {
    return readTextFile("./data/map_event.json", function(events){
        var eventMap = [];
        for (let key in events) {
            let eventObj = events[key];
            let event = new Event(eventObj["id"], eventObj["lat"], eventObj["lon"], eventObj["title"], eventObj["icon"]);
            eventMap.push(event);
        }
        return eventMap;
    });
}

export default ParseData;