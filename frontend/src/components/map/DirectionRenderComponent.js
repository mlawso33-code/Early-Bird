import React, { useState, useEffect, useContext, Component } from 'react';
const { Marker, DirectionsRenderer } = require('react-google-maps');
import GlobalContext from '../../contexts/context.js';


const DirectionRenderComponent = (props) => {
  // const [fromLat, setFromLat] = useState(props.from.lat);
  // const [fromLng, setFromLng] = useState(props.from.lng);
  // const [toLat, setToLat] = useState(props.to.lat);
  // const [toLng, setToLng] = useState(props.to.lng);
  const [directions, setDirections] = useState();
  const { userInfo, setUserInfo, currStore, setCurrStore } = useContext(GlobalContext);

  let delayFactor = 0;

  useEffect(() => {
    const startLoc = userInfo.latitude + ", " + userInfo.longitude;
    const destinationLoc = currStore.latitude + ", " + currStore.longitude;
    getDirections(startLoc, destinationLoc);
  }, [currStore, userInfo]);


  const getDirections = (startLoc, destinationLoc) => {
    const directionService = new window.google.maps.DirectionsService();
    directionService.route(
      {
        origin: startLoc,
        destination: destinationLoc,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else if (
          status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
        ) {
          delayFactor += 0.2;
          setTimeout(() => {
            getDirections(startLoc, destinationLoc);
          }, delayFactor * 200);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }


  let originMarker = null;
  let destinationMarker = null;
  if (directions) {
    originMarker = (
      <Marker
        icon={{ url: "Bird-ReSized.png", scaledSize: new google.maps.Size(48, 48) }}
        position={{
          lat: parseFloat(userInfo.latitude),
          lng: parseFloat(userInfo.longitude)
        }}
      />
    );
    destinationMarker = (
      <Marker
        icon={{ url: "coffee-cup.png", scaledSize: new google.maps.Size(48, 48) }}
        position={{
          lat: parseFloat(currStore.latitude),
          lng: parseFloat(currStore.longitude)
        }}
      />
    );
  }
  return (
    <div>
      {originMarker}
      {destinationMarker}
      {/* {currStore && (
        <Marker
          icon={{ url: "coffee-cup.png", scaledSize: new google.maps.Size(48, 48) }}
          position={{
            lat: Number(currStore.latitude),
            lng: Number(currStore.longitude)
          }}
        />
      )} */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: '#921d25',
              strokeWeight: 4
            },
            preserveViewport: true,
            suppressMarkers: true,
            icon: { scale: 3 }
          }}
        />
      )}
    </div>
  );
}

export default DirectionRenderComponent;












