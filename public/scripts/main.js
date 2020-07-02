let myMap = L.map("myMap").setView([44.4759, -73.2121], 14);

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
function placeMarker(id,address) {
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

      marker.on("click", ()=>{
        window.location = ("/restaurants/"+ id)
     })
      
    });
}

//This creates an array of restaurant address and an array of names
function jsonObjCreation(obj) {
  fetch("https://json-server.burlingtoncodeacademy.now.sh/restaurants")
    .then((res) => res.json())
    .then((json) => {
      let addressValueArr = [];
      let nameValueArr = [];
      for (let key in json) {
        if (json.hasOwnProperty(key)) {
          let addressValue = json[key].address;
          let nameValue = json[key].id;
          //Add a mark to the map that you can click on
          placeMarker(nameValue, addressValue);
          
        }
      }
    
    
    });
}

jsonObjCreation();

//Creates a list of restaurants for the nav bar. Creates links for each item. Adds items to a container div
function createListOfRestaurants() {
  let list = document.getElementById("restaurantNames");

  fetch("https://json-server.burlingtoncodeacademy.now.sh/restaurants")
    .then((res) => res.json())
    .then((json) => {
      for (let name of json) {
        let nameOfRestaurant = `${name.name}`;
        let itemToDisplay = document.createElement("a");
        let container = document.createElement("nav");
        container.appendChild(itemToDisplay);
        itemToDisplay.setAttribute("href", "/restaurants/" + name.id);
        itemToDisplay.textContent = nameOfRestaurant;
        list.appendChild(container);
      }
    });
}

createListOfRestaurants();

