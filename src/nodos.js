import data from "./data.json";

import Graph from "node-dijkstra";
import React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  Polyline,
  Polygon,
  DistanceMatrixService,
} from "@react-google-maps/api";
import { Divider } from "@chakra-ui/react";
import { useEffect } from "react";


async function CalcularDistancia(nodo1, nodo2) {
  var distancia = 0;
  // initialize services
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-undef
  const service = await new google.maps.DistanceMatrixService();

  const origin1 = {
    lat: Number(nodo1.lat),
    lng: Number(nodo1.lon),
  };
  const end2 = {
    lat: Number(nodo2.lat),
    lng: Number(nodo2.lon),
  };

  const request = {
    origins: [origin1],
    destinations: [end2],
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
    // eslint-disable-next-line no-undef
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };

  try {
    const response = await service.getDistanceMatrix(request);
    return response.rows[0].elements[0].distance.value;
  } catch (error) {
    return null;
  }

  
}




export const AsignacionNodos = () => {
  const [array,setarray] = React.useState([]);
  useEffect(() => {
     calculate()  
    

  }, []);

  async function  calculate() {
    var g = new Graph();
    g.addNode("N1", {
      N2: await CalcularDistancia(data[0], data[1]),
      N5: await CalcularDistancia(data[0], data[4]),
    });
    g.addNode("N2", {
      N1: await CalcularDistancia(data[1], data[0]),
      N3: await CalcularDistancia(data[1], data[2]),
    });
    g.addNode("N3", {
      N2: await CalcularDistancia(data[2], data[1]),
      N4: await CalcularDistancia(data[2], data[3]),
    });
    g.addNode("N4", {
      N3: await CalcularDistancia(data[3], data[2]),
      N5: await CalcularDistancia(data[3], data[4]),
    });
    g.addNode("N5", {
      N1: await CalcularDistancia(data[4], data[0]),
      N4: await CalcularDistancia(data[4], data[3]),
    });
    
        //console.log(g.path("N1", "N3"))
      // return PintarRecorrido(g.path("N1", "N3")) 
        
        setarray(g.path("N1", "N5"))
  //    console.log(array)
      }
      
      
   

  return <div> {array.map( (x) =>{
   // console.log(array)
  //     console.log(x) 
  //    var pathC = [
  //   { lat: -11.983702353375579, lng: -77.01002225748856 },
  //   { lat: -11.984136487329181, lng: -77.01016260648828 },  ]

  // var optionsC = {
  //   strokeColor: "red",
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: "red",
  //   fillOpacity: 0.35,
  //   clickable: false,
  //   draggable: false,
  //   editable: false,
  //   visible: true,
  //   radius: 30000,
  //   paths: [
  //     { lat: -11.983702353375579, lng: -77.01002225748856 },
  //     { lat: -11.984136487329181, lng: -77.01016260648828 },  ],
  //   zIndex: 1,
  // };
  // return (<Polyline onLoad={onLoad} path={pathC} options={optionsC} />)
    //return(<li>{x}</li>)
    if (x!==array[array.length-1] ){ // N1 , N2 ,N3
      var i =array.indexOf(x);
      var NodoI= data[Number(array[i].substring(1,array[i].length))-1] 
      var NodoF= data[Number(array[i+1].substring(1,array[i+1].length))-1]
      //  console.log(NodoI)
      var pathC = [
        { lat: Number(NodoI.lat), lng: Number(NodoI.lon) },
        { lat: Number(NodoF.lat), lng: Number(NodoF.lon) },  ]
      
   var optionsC = {
    strokeColor: "red",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "red",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
      { lat: Number(NodoI.lat), lng: Number(NodoI.lon) },
      { lat: Number(NodoF.lat), lng: Number(NodoF.lon) },
    ],
    zIndex: 1,
  };
  
      return(<Polyline onLoad={onLoad} path={pathC} options={optionsC} /> )
    
    }else{
      
    return (<div> </div> )
    
    }


  })}  </div>;
};





const onLoad = (polyline) => {
  console.log("polyline2: ", polyline);
};
