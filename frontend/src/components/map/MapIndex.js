import React, { useState, useEffect, useContext, Component } from 'react';
import { compose, withProps } from 'recompose';
import DirectionRenderComponent from './DirectionRenderComponent';
const { withScriptjs, withGoogleMap, GoogleMap } = require('react-google-maps');
import GlobalContext from '../../contexts/context.js';
import { GOOGLE_API_KEY } from '../../../../config.js'

const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&&v=3.exp&libraries=geometry,drawing,places`;

const MapIndex = () => {
  const { userInfo, setUserInfo, storeData, setStoreData } = useContext(GlobalContext);
  const [defaultZoom, setDefaultZoom] = useState(15);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 40.751530, lng: -73.938980 })


  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      center={center}
      defaultCenter={new window.google.maps.LatLng(23.21632, 72.641219)}
    >

      <DirectionRenderComponent
        strokeColor={"#f68f54"}
        from={{ lat: '40.751530', lng: ' -73.938980', fromTitle: 'NY' }}
        to={{ lat: '40.748720', lng: ' -73.942560', toTitle: 'NY' }}
      />


    </GoogleMap>
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















































































