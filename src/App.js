import React, { useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';
//import ReactSlider from 'react-slider';
//import Select from 'react-select';

import { states } from './states.js';

console.log(process.env);
mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhY2tzaGVlcHNoYXduIiwiYSI6ImNseXlraGN5bDJiNTkycXE3am1keHhmOXIifQ.FZSVAtASwzAIKFfdLRVAPg';

export default function App() {
  //defaults
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().lng.toFixed(2));
  });

  let geoJsonForm = { 'type': 'FeatureCollection', 'features':[]};

  console.log(states)
  states.foeEach(elemetn => {
    console.log(element);
    let tempData = {
      'type': 'Feature',
      'properties': {
        'name': element['name']
      },
      'geometry': {
        'type': 'Polygon',
        'coordinates': element['geometry']
      }
    }

  });

  //render the map
  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

