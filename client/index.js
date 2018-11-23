'use strict';

//var ParseData = require('../server/dataParser');
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import 'bootstrap/dist/css/bootstrap.min.css';
//import "./index.css";
//import "github-fork-ribbon-css/gh-fork-ribbon.css";

ReactDOM.render(<App />, document.getElementById("root"));

// function initialize() {
//     var markerCenter = new google.maps.LatLng(20.2547,44.2658);
//     //var events = ParseData();
//     var mapProp = {
//         center: new google.maps.LatLng(51.508742,-0.120850),
//         zoom: 5,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
//     var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    
//     /*
//     for (let event in events) {
        
//         let marketCenter = 
//         let marker = new google.maps.Marker({
//             position: markerCenter,
//             animation: google.maps.Animation.BOUNCE
//         });
        
//         console.log(event.id);
//     }
//     */

//     var marker = new google.maps.Marker({
//         position: markerCenter,
//         animation: google.maps.Animation.BOUNCE
//     });

//     marker.setMap(map);
//     google.maps.event.addListener(marker,'click',function() {
//         alert("You clicked on the marker");
//     });
// }

// google.maps.event.addDomListener(window, 'load', initialize);