//Global Variables
let restaurantName= document.getElementById("nameOfResto");
let address = document.getElementById("address");
let phoneNumber = document.getElementById("phone");
let website = document.getElementById("website");
let hours = document.getElementById("hours");
let notes =document.getElementById("notes")

//Function creates the content for the page
function createsContentForPage(){

  let restaurantsDiv = document.getElementById("restaurants");
//This gets the array of names after the slash so you can find the proper id for the site. 
  let websitePath = document.location.pathname.split("/");
  
  let path= websitePath[2];

//This path variable is the id that the server uses to take me to the correct path  
  fetch("https://json-server.burlingtoncodeacademy.now.sh/restaurants/"+ path)
  .then((res)=>{
      //Creates the Json object which you can iterate over for data
    let json =res.json();
    return json;
  }).then((json)=>{
      //Adds the data information for the restaurant
    restaurantName.innerHTML =`<div id="restaurantName">Name :${json.name}</div>`;

    address.innerHTML =`<div id="address">Address :${json.address}</div>`;

    phoneNumber.innerHTML =`<div id="address">Phone Number :${json.phone}</div>`;

    hours.innerHTML =`<div id="hours">Restaurant Hours : ${json.hours}</div>`;

    website.innerHTML =`<a id="website" href=${json.website}>Restaurant Website </a>`;

    notes.innerHTML =`<div id="notes">Notes: ${json.notes} </div>`;

    placeMarker(json.address)
    
    
  })


}

createsContentForPage();


//Creates the map
let myMap = L.map("myMap").setView([44.4759, -73.2121], 15);

//Give tile layer
var Stadia_OSMBright = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
).addTo(myMap);

//Placemarkers given an address to a latitude and longitude using nominatim
function placeMarker(address) {
  //Sanitizes the address so that it comes in as a URL address
  let urlAddress = encodeURI(address);

  fetch(
    `https://nominatim.openstreetmap.org/search?q=${urlAddress}&format=json`
  )
    .then((res) => res.json())
    .then((json) => {
      //Manipulation of data. Grab values out of the json. Do map manipulations in second .then
      let latLngArr = [json[0].lat, json[0].lon];

      let marker = L.marker(latLngArr).addTo(myMap);
    });
}



placeMarker();
