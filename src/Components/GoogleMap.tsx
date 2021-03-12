import React, {useState, createContext, useEffect, useContext} from 'react';
import LoadScript from "./LoadScript";
import MarkerInfo from "../types/MarkerInfo";

type GoogleMapsBaseProps = {
    mapId: string;
    zoom: number;
    mapStyle?: object;
    center: { lat: number , lng: number },
    onDrag(evt: any): void;
    markers: MarkerInfo[];
    onMapLoaded(map: google.maps.Map): void;
};


type GoogleMapProps = GoogleMapsBaseProps & {
    apiUrl: string;
    children?: any;
};

type GoogleMapsContextType = {
    map?: google.maps.Map
};

export const GoogleMapsContext = createContext<GoogleMapsContextType>({});

export function useGoogleMaps() {
    return useContext(GoogleMapsContext);
}

const Toolbar = () => {

    const { map } = useGoogleMaps();

    return <div style={{ backgroundColor: "#d2d2d2" , padding: 24 }}>

        <button onClick={() => {
            map?.setCenter(new google.maps.LatLng({ lat: 0.1540843, lng: 33.4099837 }));
        }}>Center Map</button>

    </div>
};

const GoogleMap = ({   mapId ,
                       center ,
                       children ,
                       mapStyle,
                       onMapLoaded ,
                       markers,
                       apiUrl,
                       onDrag,
                       zoom } : GoogleMapProps) => {

    const [state,setState] = useState<GoogleMapsContextType>({});

    useEffect(() => {

        if(state.map){
            onMapLoaded(state.map);
        }

    },[state.map]);

    console.log('Rendering maps...');

    return <GoogleMapsContext.Provider value={state}>

        <LoadScript id={'googlemaps'}
                    async={true}
                    url={apiUrl }
                    onLoaded={() => {


                        const googleMaps = new google.maps.Map(
                            document.getElementById(mapId) as HTMLElement,{
                                zoom,
                                center: new google.maps.LatLng({ lat: center.lat , lng: center.lng })
                            }
                        );

                        google.maps.event.addListener(googleMaps,'dragend', function(evt: any)  {
                            const center = googleMaps.getCenter();
                            console.log(`Latitude: ${center?.lat()} , Longitude: ${center?.lng()}`);
                        });


                        setState({
                            ...state,
                            map: googleMaps
                        });

                    }}>


            <Toolbar/>

            <div id={mapId} style={mapStyle}/>

            {children}

        </LoadScript>

    </GoogleMapsContext.Provider>

};

type WithGoogleMapsProps =  {
    apiKey : string,
    options: GoogleMapsBaseProps
};

export const withGoogleMaps  = ({ apiKey , options } : WithGoogleMapsProps)  => {

    return class HOCWithGoogleMaps extends React.Component<{}, {}>{

        render(){
            return <GoogleMap {...options} apiUrl={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}/>
        }
    }
}



export default GoogleMap;
