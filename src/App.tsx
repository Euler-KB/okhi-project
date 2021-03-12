import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap, {withGoogleMaps} from "./Components/GoogleMap";


function App() {

    const MyMapComponent = withGoogleMaps({
        apiKey: "AIzaSyBuf35xtWpGx7xnZNT3vDM8xSwPj-OJdVg",
        options: {
            zoom: 8,
            mapId: 'googleMaps',
            markers: [],
            center: {lat: 0.1540843, lng: 33.4099837},
            onDrag: () => {

            },
            mapStyle: {
                width: "100%",
                height: 480,
            },

            onMapLoaded: (map: google.maps.Map) => {

            }
        }});

  return (<div className="App">
        <MyMapComponent />
    </div>
  );
}

export default App;
