import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import { AsignacionNodos } from "./nodos";

import data from "./data.json";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  Polyline,
  Polygon,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const center = { lat: -11.987504, lng: -77.00561 };

function App() {
  //Conexion a google maps api
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAuUYZORtWcGLjDnCNOKsuqh6DGur0soos",
    libraries: ["places"],
  });

  //Seteo de estados
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("N");
  const [duration, setDuration] = useState("N");
  const [click, setClick] = useState(false);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();
  const showroute = () => {
    setClick(true);
  };

  if (!isLoaded) {
    return <SkeletonText />;
  }
  //Limpiar dibujo al clickar en boton "X"
  function clearRoute() {
    setClick(false);
    originRef.current.value = "N";
    destiantionRef.current.value = "N";
  }

  const onLoad = (polyline) => {
    console.log("polyline: ", polyline);
  };

  //Nodos para mapear los bordes de la zona
  const path = [
    { lat: -11.983208, lng: -77.011162 },
    { lat: -11.984275, lng: -77.011161 },
    { lat: -11.98503, lng: -77.009262 },
    { lat: -11.985524, lng: -77.009338 },
    { lat: -11.98566, lng: -77.008715 },
    { lat: -11.985775, lng: -77.008737 },
    { lat: -11.986353, lng: -77.009338 },
    { lat: -11.987287, lng: -77.008479 },
    { lat: -11.988042, lng: -77.009262 },
    { lat: -11.988934, lng: -77.00835 },
    { lat: -11.988662, lng: -77.007996 },
    { lat: -11.988756, lng: -77.007943 },
    { lat: -11.988531, lng: -77.006823 },
    { lat: -11.989904, lng: -77.006823 },
    { lat: -11.989917, lng: -77.006951 },
    { lat: -11.990541, lng: -77.006836 },
    { lat: -11.991402, lng: -77.006351 },
    { lat: -11.991627, lng: -77.006759 },
    { lat: -11.992026, lng: -77.006568 },
    { lat: -11.991851, lng: -77.006223 },
    { lat: -11.991726, lng: -77.005751 },
    { lat: -11.991739, lng: -77.005522 },
    { lat: -11.991177, lng: -77.005381 },
    { lat: -11.991227, lng: -77.004871 },
    { lat: -11.991439, lng: -77.004833 },
    { lat: -11.991389, lng: -77.002893 },
    { lat: -11.991502, lng: -77.00288 },
    { lat: -11.991614, lng: -77.002396 },
    { lat: -11.991726, lng: -77.002383 },
    { lat: -11.991876, lng: -77.001949 },
    { lat: -11.992001, lng: -77.001936 },
    { lat: -11.992026, lng: -77.001388 },
    { lat: -11.992488, lng: -77.001337 },
    { lat: -11.992725, lng: -77.000826 },
    { lat: -11.992937, lng: -76.999959 },
    { lat: -11.991926, lng: -76.999831 },
    { lat: -11.991926, lng: -77.000329 },
    { lat: -11.992038, lng: -77.000444 },
    { lat: -11.990815, lng: -77.003467 },
    { lat: -11.986435, lng: -77.001847 },
    { lat: -11.985786, lng: -77.00325 },
    { lat: -11.984837, lng: -77.006695 },
    { lat: -11.983202, lng: -77.011135 },
    { lat: -11.983208, lng: -77.011162 },
  ];

  //Opciones para el draw del borde de la zona
  const options = {
    strokeColor: "green",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "green",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
      { lat: -11.983208, lng: -77.011162 },
      { lat: -11.984275, lng: -77.011161 },
      { lat: -11.98503, lng: -77.009262 },
      { lat: -11.985524, lng: -77.009338 },
      { lat: -11.98566, lng: -77.008715 },
      { lat: -11.985775, lng: -77.008737 },
      { lat: -11.986353, lng: -77.009338 },
      { lat: -11.987287, lng: -77.008479 },
      { lat: -11.988042, lng: -77.009262 },
      { lat: -11.988934, lng: -77.00835 },
      { lat: -11.988662, lng: -77.007996 },
      { lat: -11.988756, lng: -77.007943 },
      { lat: -11.988531, lng: -77.006823 },
      { lat: -11.989904, lng: -77.006823 },
      { lat: -11.989917, lng: -77.006951 },
      { lat: -11.990541, lng: -77.006836 },
      { lat: -11.991402, lng: -77.006351 },
      { lat: -11.991627, lng: -77.006759 },
      { lat: -11.992026, lng: -77.006568 },
      { lat: -11.991851, lng: -77.006223 },
      { lat: -11.991726, lng: -77.005751 },
      { lat: -11.991739, lng: -77.005522 },
      { lat: -11.991177, lng: -77.005381 },
      { lat: -11.991227, lng: -77.004871 },
      { lat: -11.991439, lng: -77.004833 },
      { lat: -11.991389, lng: -77.002893 },
      { lat: -11.991502, lng: -77.00288 },
      { lat: -11.991614, lng: -77.002396 },
      { lat: -11.991726, lng: -77.002383 },
      { lat: -11.991876, lng: -77.001949 },
      { lat: -11.992001, lng: -77.001936 },
      { lat: -11.992026, lng: -77.001388 },
      { lat: -11.992488, lng: -77.001337 },
      { lat: -11.992725, lng: -77.000826 },
      { lat: -11.992937, lng: -76.999959 },
      { lat: -11.991926, lng: -76.999831 },
      { lat: -11.991926, lng: -77.000329 },
      { lat: -11.992038, lng: -77.000444 },
      { lat: -11.990815, lng: -77.003467 },
      { lat: -11.986435, lng: -77.001847 },
      { lat: -11.985786, lng: -77.00325 },
      { lat: -11.984837, lng: -77.006695 },
      { lat: -11.983202, lng: -77.011135 },
      { lat: -11.983208, lng: -77.011162 },
    ],
    zIndex: 1,
  };

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}

        <GoogleMap
          center={center}
          zoom={16.5}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {/*Pone como marcadores los nodos del data.json*/}

          {data.map((data) => {
            return (
              <Marker
                position={{ lat: Number(data.lat), lng: Number(data.lon) }}
                label={{ text: data.id, color: "white" }}
                key={data.id}
              />
            );
          })}
          {/*Recomendaciones en los input*/}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          <Polyline onLoad={onLoad} path={path} options={options} />
<<<<<<< HEAD
        
         {
          click?(
            <AsignacionNodos nodo1={originRef.current.value} nodo2={destiantionRef.current.value}/>
          ):(<div></div>)
            
          
         } 
         
=======

          {/*Se setea el inicio y el final de la ruta a calcular*/}
          {click ? (
            <AsignacionNodos
              nodo1={originRef.current.value}
              nodo2={destiantionRef.current.value}
            />
          ) : (
            <div></div>
          )}
>>>>>>> 857a597cf31b37f0647e6780ec0492e15067aab2
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
<<<<<<< HEAD
              <Input type="text" placeholder="INICIO: N1-N87" ref={originRef} />
=======
              {/*Input del punto de inicio*/}

              <Input type="text" placeholder="Origin" ref={originRef} />
>>>>>>> 857a597cf31b37f0647e6780ec0492e15067aab2
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
<<<<<<< HEAD
        
=======
              {/*Input del punto final*/}

>>>>>>> 857a597cf31b37f0647e6780ec0492e15067aab2
              <Input
                type="text"
                placeholder="FINAL: N1-N87"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button
              colorScheme="pink"
              type="submit"
              onClick={() => showroute()}
            >
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
             
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          {/*Zoom*/}

          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default App;
