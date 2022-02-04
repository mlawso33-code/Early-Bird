import React, { useState, useEffect, useContext, Component } from 'react';
import { compose, withProps } from 'recompose';
import DirectionRenderComponent from './DirectionRenderComponent';
const { withScriptjs, withGoogleMap, GoogleMap } = require('react-google-maps');
import GlobalContext from '../../contexts/context.js';
import { GOOGLE_API_KEY } from '../../../../config.js'

const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&&v=3.exp&libraries=geometry,drawing,places`;

const MapIndex = () => {
  const { userInfo, setUserInfo, storeData, setStoreData, currStore, setCurrStore } = useContext(GlobalContext);
  const [fromObj, setFromObj] = useState({});
  const [toObj, setToObj] = useState({});
  const [defaultZoom, setDefaultZoom] = useState(15);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({})

  useEffect(() => {
    const { latitude: fromLat, longitude: fromLng, state: fromState } = userInfo;
    const { latitude: toLat, longitude: toLng, state: toState } = currStore;

    setFromObj({ lat: fromLat, lng: fromLng, fromTitle: fromState });
    setToObj({ lat: toLat, lng: toLng, toTitle: toState });

    let centerLat = ((Number(fromLat) + Number(toLat)) / 2);
    let centerLng = ((Number(fromLng) + Number(toLng)) / 2);
    setCenter({ lat: centerLat, lng: centerLng })
    console.log('CENTER LAT & LNG:::', centerLat, ' ::: ', centerLng);

  }, [userInfo, currStore])

  return (
    < GoogleMap
      defaultZoom={12}
      center={center}
      defaultCenter={new window.google.maps.LatLng(23.21632, 72.641219)}
    >
      {Object.keys(fromObj).length ?
        <DirectionRenderComponent
          strokeColor={"#921d25"}
          from={fromObj}
          to={toObj}
        />
        : null
      }
    </GoogleMap >
  );
}


export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px`, border: '6px ridge #8B442F' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(MapIndex);















































































