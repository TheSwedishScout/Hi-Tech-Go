/*screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;

if (screen.lockOrientationUniversal("portrait")) {
  // orientation was locked
} else {
  // orientation lock failed
}*/
      var map; //skapa en variable att spara kartan i, skaar den utanför då den behövs i flera olika funktioner
      var draws = 0; //en variabel som sparar värdet på hur många gånger som positionen hämtats
      var myCirkel;  // en variabel att spara den utritade positionen för att nolla den gamla innan en ny skapas
      var wpid;
      var intressePungter = [
        {
          name: "akademin",
          center: {lat: 57.785142, lng: 14.157818},
          //57.785142, 14.157818
          storlek: 100,
          played: false,
          game: function (id) {akademin(id)}
        },
        {
          name: "systemet",
          center: {lat: 57.780455, lng: 14.172033},
          //57.780455, 14.172033
          storlek: 100,
          played: false,
          game: function (id){systemet(id)}
        },
        {
          name: "biblioteket",
          center: {lat: 57.778703, lng: 14.162645},
          storlek: 100,
          played: false,
          game: function (id){ biblan(id)}

        }
      ];
function distans(myPos, toPos){
  /*
  code to calculate the distance betwene 2 gps cordinates is fetched from
  http://www.movable-type.co.uk/scripts/latlong.html 
  and simplified to make me figure out whats hapening
  */
  lng1 = myPos.lng;
  lat1 = myPos.lat;
  lng2 = toPos.lng;
  lat2 = toPos.lat;
  var R = 6371e3; // metres around the equator
  var latitude1 = lat1*(Math.PI / 180); // get latitude in radians
  var latitude2 = lat2*(Math.PI / 180);
  var deltaLatitude = (lat2-lat1)*(Math.PI / 180); 
  var deltaLongitude  = (lng2-lng1)*(Math.PI / 180);

  var a = Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2) + Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(deltaLongitude /2) * Math.sin(deltaLongitude /2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
function drawLocation(position){ // draw your location o the map and runs the distans calculations
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  map.setCenter(pos); //centrerar kartan för positionen

  if (draws > 0) {
    myCirkel.setMap(null); // döljer din gamla position
  }
  myCirkel = new google.maps.Circle({
    strokeColor: '#1FD02A',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#1FD02A',
    fillOpacity: 0.35,
    map: map,
    center: pos,
    radius: 10
  });

  var maxDistansToEvent = 160; 
  var box = document.getElementById("box");
  for (var i = 0; i <intressePungter.length; i ++ ) {
    if(distans(pos, intressePungter[i].center) < maxDistansToEvent && intressePungter[i].played == false){
      box.style.background = "#F00"
      box.innerText = intressePungter[i].name;
      navigator.geolocation.clearWatch(wpid);
      intressePungter[i].game(i);
      
    }
      console.log(intressePungter[i].name + " " + distans(pos, intressePungter[i].center));
      box.innerText = intressePungter[2].name + " " + distans(pos, intressePungter[2].center);
  } 
  
  console.log(draws);

draws++ // ökar antalet draws som har gjorts
}
function geo_error(error){ // ger medelanden vid errors
  /*
  1 = blocked
  2 = unavalebale
  3 = timeout
  */
  if (error.code === 1) {
    alert('unable to get location')
  }
  if (error.code === 3) {
    alert('Timeout');
  }
}
function myLocation(){ // whit sucsessfully got location
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    var geo_options = {
      enableHighAccuracy: true, //true 
      maximumAge        : 30000
    };
    // get position whit parameters above
    wpid=navigator.geolocation.watchPosition(drawLocation,geo_error,geo_options);
      
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

function init() {
  document.addEventListener("DOMContentLoaded", initMap)
}

function initMap() {
  // Create the map.
  navigator.geolocation.getCurrentPosition(startLocation,geo_error ,{
    enableHighAccuracy: true, 
    maximumAge        : 30000, 
    timeout           : 2700000
  });
  function startLocation(position) {
    
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    var zoom = 18;

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: pos, // din start position var den fick positionen från första hemtnigen
      mapTypeId: 'roadmap',
      //disableDefaultUI: true,
      //draggable: false,
      scrollwheel: false,
      panControl: false,
      //maxZoom: zoom,
      //minZoom: zoom,


      // style generated on https://snazzymaps.com/
      styles: [{"featureType": "all","elementType": "geometry","stylers": [{"color": "#f6fb00"}]},{"featureType": "all","elementType": "labels.text","stylers": [{"visibility": "off"}]},{"featureType": "all","elementType": "labels.text.fill","stylers": [    {"gamma": 0.01    },    {"lightness": 20    }]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [    {"saturation": -31    },    {"lightness": -33    },    {"weight": 2    },    {"gamma": 0.8    }]},{"featureType": "all","elementType": "labels.icon","stylers": [    {"visibility": "off"    }]},{"featureType": "landscape","elementType": "geometry","stylers": [    {"lightness": 30    },    {"saturation": 30    },    {"color": "#000000"    }]},{"featureType": "poi","elementType": "geometry","stylers": [    {"saturation": 20    }]},{"featureType": "poi","elementType": "labels.text","stylers": [    {"visibility": "off"    }]},{"featureType": "poi.park","elementType": "geometry","stylers": [    {"lightness": 20    },    {"saturation": -20    }]},{"featureType": "road","elementType": "geometry","stylers": [    {"lightness": 10    },    {"saturation": -30    }]},{"featureType": "road","elementType": "geometry.stroke","stylers": [    {"saturation": 25    },    {"lightness": 25    }]},{"featureType": "road","elementType": "labels.text","stylers": [    {"visibility": "off"    }]},{"featureType": "water","elementType": "all","stylers": [    {"lightness": -20    }]}]
    });
    

    function clickOnCercel(id) {
             debugger
         }; 

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the storlek.
    for (var location in intressePungter) {
      // Add the circle for this city to the map.
      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: intressePungter[location].center,
        radius: Math.sqrt(intressePungter[location].storlek)
      });
    (function() {
      cityCircle.addListener('click', function() {
         
         clickOnCercel(location);
      });
      
      }
    )
    }
    myLocation();
    //document.addEventListener("DOMContentLoaded", myLocation);
  }
        
}




