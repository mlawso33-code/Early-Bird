import React, { useState, useEffect, useContext, Component } from 'react';
import { compose, withProps } from 'recompose';
import DirectionRenderComponent from './DirectionRenderComponent';
const { withScriptjs, withGoogleMap, GoogleMap } = require('react-google-maps');
import GlobalContext from '../../contexts/context.js';
import { GOOGLE_API_KEY } from '../../../../config.js'

const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&&v=3.exp&libraries=geometry,drawing,places`;

const MapIndex = () => {
  const { userInfo, setUserInfo, storeData, setStoreData } = useContext(GlobalContext);
  const [fromObj, setFromObj] = useState({});
  const [toObj, setToObj] = useState({});
  const [defaultZoom, setDefaultZoom] = useState(15);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: Number(userInfo.latitude), lng: Number(userInfo.longitude) })

  useEffect(() => {
    setFromObj({ lat: userInfo.latitude, lng: userInfo.longitude, fromTitle: userInfo.state });
    //settoObj({lat: userInfo.latitude, lng: userInfo.longitude, toTitle: userInfo.state})
  }, [userInfo])

  return (
    console.log('FROMOBJ::: ', fromObj),
    < GoogleMap
      defaultZoom={12}
      center={center}
      defaultCenter={new window.google.maps.LatLng(23.21632, 72.641219)}
    >
      {Object.keys(fromObj).length ?
        <DirectionRenderComponent
          strokeColor={"#921d25"}
          from={fromObj}
          to={{ lat: '40.0502', lng: '-105.2892', toTitle: 'NY' }}
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
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(MapIndex);















































































