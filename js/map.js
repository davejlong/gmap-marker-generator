var map = '';

// Infinitely runs a function at a slowing time interval
function setDeceleratingTimeout( callback, factor, times ){
  var internalCallback = function( t, counter ){
    return function(){
      //if ( --t > 0 ){
        window.setTimeout( internalCallback, ++counter * factor );
        callback();
      //}
    }
  }( times, 0 );

  window.setTimeout( internalCallback, factor );
};

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}
function initialize() {
  var myOptions = {
    center: new google.maps.LatLng(4.289374,4.570313),
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  map.setTilt(45);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(addUser);
  }
}

function addUser(position){
  map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  addMarker(position);
  setDeceleratingTimeout(addMarker,1, 10);

}
function addMarker(position){
  try{
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  } catch(err) {
    var latLng = new google.maps.LatLng(getRandomInRange(-180, 180, 3), getRandomInRange(-180, 180, 3));
  }
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title:"Hello World!",
    animation: google.maps.Animation.DROP
  });
}