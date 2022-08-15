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




export const AsignacionNodos = ({nodo1,nodo2}) => {
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
      N6: await CalcularDistancia(data[1], data[5]),
    });
    g.addNode("N3", {
      N2: await CalcularDistancia(data[2], data[1]),
      N4: await CalcularDistancia(data[2], data[3]),
      N7: await CalcularDistancia(data[2], data[6]),
    });
    g.addNode("N4", {
      N3: await CalcularDistancia(data[3], data[2]),
      N5: await CalcularDistancia(data[3], data[4]),
      N8: await CalcularDistancia(data[3], data[7]),
    });
    g.addNode("N5", {
      N1: await CalcularDistancia(data[4], data[0]),
      N4: await CalcularDistancia(data[4], data[3]),
    });
    g.addNode("N6", {
      N2: await CalcularDistancia(data[5], data[1]),
      N7: await CalcularDistancia(data[5], data[6]),
      N32: await CalcularDistancia(data[5], data[31]),
    });
    g.addNode("N7", {
      N6: await CalcularDistancia(data[6], data[5]),
      N8: await CalcularDistancia(data[6], data[7]),
      N3: await CalcularDistancia(data[6], data[2]),
    });
    g.addNode("N8", {
      N7: await CalcularDistancia(data[7], data[6]),
      N9: await CalcularDistancia(data[7], data[8]),
      N4: await CalcularDistancia(data[7], data[3]),
    });
    g.addNode("N9", {
      N10: await CalcularDistancia(data[8], data[9]),
      N8: await CalcularDistancia(data[8], data[7]),
      N13: await CalcularDistancia(data[8], data[12]),
    });
    g.addNode("N10", {
      N11: await CalcularDistancia(data[9], data[10]),
      N12: await CalcularDistancia(data[9], data[11]),
      N9: await CalcularDistancia(data[9], data[8]),
    });
    g.addNode("N11", {
      N10: await CalcularDistancia(data[10], data[9]),
    });
    g.addNode("N12", {
      N10: await CalcularDistancia(data[11], data[9]),
    });
    g.addNode("N13", {
      N9: await CalcularDistancia(data[12], data[8]),
      N14: await CalcularDistancia(data[12], data[13]),
      N15: await CalcularDistancia(data[12], data[14]),
    });
    g.addNode("N14", {
      N13: await CalcularDistancia(data[13], data[12]),
    });
    g.addNode("N15", {
      N13: await CalcularDistancia(data[14], data[12]),
      N16: await CalcularDistancia(data[14], data[15]),
      N29: await CalcularDistancia(data[14], data[28]),
      N30: await CalcularDistancia(data[14], data[29]),
    });
    g.addNode("N16", {
      N15: await CalcularDistancia(data[15], data[14]),
      N29: await CalcularDistancia(data[15], data[28]),
    });
    g.addNode("N17", {
      N19: await CalcularDistancia(data[16], data[18]),
      N18: await CalcularDistancia(data[16], data[17]),
    });
    g.addNode("N18", {
      N17: await CalcularDistancia(data[17], data[16]),
      N20: await CalcularDistancia(data[17], data[19]),
    });
    g.addNode("N19", {
      N17: await CalcularDistancia(data[18], data[16]),
      N20: await CalcularDistancia(data[18], data[19]),
      N28: await CalcularDistancia(data[18], data[27]),
    });
    g.addNode("N20", {
      N19: await CalcularDistancia(data[19], data[18]),
      N21: await CalcularDistancia(data[19], data[20]),
      N18: await CalcularDistancia(data[19], data[17]),
    });
    g.addNode("N21", {
      N20: await CalcularDistancia(data[20], data[19]),
      N22: await CalcularDistancia(data[20], data[21]),
    });
    g.addNode("N22", {
      N21: await CalcularDistancia(data[21], data[20]),
      N23: await CalcularDistancia(data[21], data[22]),
    });
    g.addNode("N23", {
      N47: await CalcularDistancia(data[22], data[46]),
      N24: await CalcularDistancia(data[22], data[23]),
      N22: await CalcularDistancia(data[22], data[21]),
    });
    g.addNode("N24", {
      N45: await CalcularDistancia(data[23], data[44]),
      N25: await CalcularDistancia(data[23], data[24]),
      N46: await CalcularDistancia(data[23], data[45]),
      N23: await CalcularDistancia(data[23], data[22]),
    });
    g.addNode("N25", {
      N24: await CalcularDistancia(data[24], data[23]),
      N26: await CalcularDistancia(data[24], data[25]),
    });
    g.addNode("N26", {
      N25: await CalcularDistancia(data[25], data[24]),
      N27: await CalcularDistancia(data[25], data[26]),
      N37: await CalcularDistancia(data[25], data[36]),
      N45: await CalcularDistancia(data[25], data[44]),
    });
    g.addNode("N27", {
      N26: await CalcularDistancia(data[26], data[25]),
      N34: await CalcularDistancia(data[26], data[33]),
      N31: await CalcularDistancia(data[26], data[30]),
    });
    g.addNode("N28", {
      N29: await CalcularDistancia(data[27], data[28]),
      N31: await CalcularDistancia(data[27], data[30]),
      N19: await CalcularDistancia(data[27], data[18]),
    });
    g.addNode("N29", {
      N16: await CalcularDistancia(data[28], data[17]),
      N30: await CalcularDistancia(data[28], data[29]),
      N28: await CalcularDistancia(data[28], data[27]),
    });
    g.addNode("N30", {
      N15: await CalcularDistancia(data[29], data[14]),
      N29: await CalcularDistancia(data[29], data[28]),
      N32: await CalcularDistancia(data[29], data[31]),
      N31: await CalcularDistancia(data[29], data[30]),
    });
    g.addNode("N31", {
      N30: await CalcularDistancia(data[30], data[29]),
      N27: await CalcularDistancia(data[30], data[26]),
      N28: await CalcularDistancia(data[30], data[27]),
    });
    g.addNode("N32", {
      N6: await CalcularDistancia(data[31], data[5]),
      N30: await CalcularDistancia(data[31], data[29]),
      N33: await CalcularDistancia(data[31], data[32]),
    });
    g.addNode("N33", {
      N32: await CalcularDistancia(data[32], data[31]),
      N34: await CalcularDistancia(data[32], data[33]),
      N42: await CalcularDistancia(data[32], data[41]),
    });
    g.addNode("N34", {
      N33: await CalcularDistancia(data[33], data[32]),
      N40: await CalcularDistancia(data[33], data[39]),
      N27: await CalcularDistancia(data[33], data[26]),
    });
    g.addNode("N35", {
      N34: await CalcularDistancia(data[34], data[33]),
      N36: await CalcularDistancia(data[34], data[35]),
      N40: await CalcularDistancia(data[34], data[39]),
    });
    g.addNode("N36", {
      N35: await CalcularDistancia(data[35], data[34]),
      N39: await CalcularDistancia(data[35], data[38]),
      N37: await CalcularDistancia(data[35], data[36]),
    });
    g.addNode("N37", {
      N36: await CalcularDistancia(data[36], data[35]),
      N26: await CalcularDistancia(data[36], data[25]),
      N38: await CalcularDistancia(data[36], data[37]),
    });
    g.addNode("N38", {
      N37: await CalcularDistancia(data[37], data[36]),
      N39: await CalcularDistancia(data[37], data[38]),
      N43: await CalcularDistancia(data[37], data[42]),
    });
    g.addNode("N39", {
      N36: await CalcularDistancia(data[38], data[35]),
      N40: await CalcularDistancia(data[38], data[39]),
      N38: await CalcularDistancia(data[38], data[37]),
    });
    g.addNode("N40", {
      N35: await CalcularDistancia(data[39], data[34]),
      N41: await CalcularDistancia(data[39], data[40]),
      N39: await CalcularDistancia(data[39], data[38]),
    });
    g.addNode("N41", {
      N40: await CalcularDistancia(data[40], data[39]),
      N42: await CalcularDistancia(data[40], data[41]),
      N43: await CalcularDistancia(data[40], data[42]),
    });
    g.addNode("N42", {
      N33: await CalcularDistancia(data[41], data[32]),
      N53: await CalcularDistancia(data[41], data[52]),
      N41: await CalcularDistancia(data[41], data[40]),
    });
    g.addNode("N43", {
      N38: await CalcularDistancia(data[42], data[37]),
      N41: await CalcularDistancia(data[42], data[40]),
      N44: await CalcularDistancia(data[42], data[43]),
    });
    g.addNode("N44", {
      N43: await CalcularDistancia(data[43], data[42]),
      N45: await CalcularDistancia(data[43], data[44]),
      N50: await CalcularDistancia(data[43], data[49]),
    });
    g.addNode("N45", {
      N24: await CalcularDistancia(data[44], data[23]),
      N26: await CalcularDistancia(data[44], data[25]),
      N44: await CalcularDistancia(data[44], data[43]),
    });
g.addNode("N46", {
      N24: await CalcularDistancia(data[45], data[23]),
      N47: await CalcularDistancia(data[45], data[46]),
      N49: await CalcularDistancia(data[45], data[48]),
    });
g.addNode("N47", {
      N23: await CalcularDistancia(data[46], data[22]),
      N48: await CalcularDistancia(data[46], data[47]),
    });
g.addNode("N48", {
      N47: await CalcularDistancia(data[47], data[46]),
      N49: await CalcularDistancia(data[47], data[48]),
      N71: await CalcularDistancia(data[47], data[70]),
    });
g.addNode("N49", {
      N46: await CalcularDistancia(data[48], data[45]),
      N50: await CalcularDistancia(data[48], data[49]),
      N48: await CalcularDistancia(data[48], data[47]),
    });
g.addNode("N50", {
      N44: await CalcularDistancia(data[49], data[43]),
      N49: await CalcularDistancia(data[49], data[48]),
      N51: await CalcularDistancia(data[49], data[50]),
    });
g.addNode("N51", {
      N50: await CalcularDistancia(data[50], data[49]),
      N52: await CalcularDistancia(data[50], data[51]),
      N58: await CalcularDistancia(data[50], data[57]),
    });
g.addNode("N52", {
      N51: await CalcularDistancia(data[51], data[50]),
      N53: await CalcularDistancia(data[51], data[52]),
    });
g.addNode("N53", {
      N42: await CalcularDistancia(data[52], data[41]),
      N52: await CalcularDistancia(data[52], data[51]),
      N54: await CalcularDistancia(data[52], data[53]),
    });
g.addNode("N54", {
      N53: await CalcularDistancia(data[53], data[52]),
      N55: await CalcularDistancia(data[53], data[54]),
    });
g.addNode("N55", {
      N54: await CalcularDistancia(data[54], data[53]),
      N56: await CalcularDistancia(data[54], data[55]),
    });
g.addNode("N56", {
      N55: await CalcularDistancia(data[55], data[54]),
      N57: await CalcularDistancia(data[55], data[56]),
      N62: await CalcularDistancia(data[55], data[51]),
    });
g.addNode("N57", {
      N56: await CalcularDistancia(data[56], data[55]),
      N58: await CalcularDistancia(data[56], data[57]),
    });
g.addNode("N58", {
      N57: await CalcularDistancia(data[57], data[56]),
      N51: await CalcularDistancia(data[57], data[50]),
    });
g.addNode("N59", {
      N60: await CalcularDistancia(data[58], data[59]),
      N67: await CalcularDistancia(data[58], data[66]),
    });
g.addNode("N60", {
      N59: await CalcularDistancia(data[59], data[58]),
      N63: await CalcularDistancia(data[59], data[62]),
    });
g.addNode("N61", {
      N57: await CalcularDistancia(data[60], data[56]),
      N60: await CalcularDistancia(data[60], data[59]),
    });
g.addNode("N62", {
      N56: await CalcularDistancia(data[61], data[55]),
      N63: await CalcularDistancia(data[61], data[62]),
    });
g.addNode("N63", {
      N60: await CalcularDistancia(data[62], data[59]),
      N62: await CalcularDistancia(data[62], data[61]),
      N64: await CalcularDistancia(data[62], data[63]),
    });
g.addNode("N64", {
      N63: await CalcularDistancia(data[63], data[62]),
      N65: await CalcularDistancia(data[63], data[64]),
      N66: await CalcularDistancia(data[63], data[65]),
    });
g.addNode("N65", {
      N48: await CalcularDistancia(data[64], data[47]),
      N64: await CalcularDistancia(data[64], data[63]),
      N68: await CalcularDistancia(data[64], data[67]),
    });
g.addNode("N66", {
      N48: await CalcularDistancia(data[65], data[47]),
      N64: await CalcularDistancia(data[65], data[63]),
      N67: await CalcularDistancia(data[65], data[66]),
    });
g.addNode("N67", {
      N49: await CalcularDistancia(data[66], data[48]),
      N59: await CalcularDistancia(data[66], data[58]),
      N66: await CalcularDistancia(data[66], data[67]),
    });
g.addNode("N68", {
      N65: await CalcularDistancia(data[67], data[64]),
      N69: await CalcularDistancia(data[67], data[69]),
      N84: await CalcularDistancia(data[67], data[83]),
    });
g.addNode("N69", {
      N68: await CalcularDistancia(data[68], data[67]),
      N70: await CalcularDistancia(data[68], data[69]),
      N71: await CalcularDistancia(data[68], data[70]),
    });
g.addNode("N70", {
      N69: await CalcularDistancia(data[69], data[68]),
    });
g.addNode("N71", {
      N48: await CalcularDistancia(data[70], data[47]),
      N69: await CalcularDistancia(data[70], data[68]),
      N72: await CalcularDistancia(data[70], data[71]),
      N79: await CalcularDistancia(data[70], data[78]),
    });
g.addNode("N72", {
      N71: await CalcularDistancia(data[71], data[70]),
      N73: await CalcularDistancia(data[71], data[72]),
      N78: await CalcularDistancia(data[71], data[77]),
    });
g.addNode("N73", {
      N72: await CalcularDistancia(data[72], data[71]),
      N74: await CalcularDistancia(data[72], data[73]),
    });
g.addNode("N74", {
      N73: await CalcularDistancia(data[73], data[72]),
      N75: await CalcularDistancia(data[73], data[74]),
      N77: await CalcularDistancia(data[73], data[76]),
    });
g.addNode("N75", {
      N74: await CalcularDistancia(data[74], data[73]),
      N76: await CalcularDistancia(data[74], data[75]),
    });
g.addNode("N76", {
      N75: await CalcularDistancia(data[75], data[74]),
      N77: await CalcularDistancia(data[75], data[76]),
      N81: await CalcularDistancia(data[75], data[80]),
    });
g.addNode("N77", {
      N74: await CalcularDistancia(data[76], data[73]),
      N76: await CalcularDistancia(data[76], data[75]),
      N78: await CalcularDistancia(data[76], data[77]),
    });
g.addNode("N78", {
      N72: await CalcularDistancia(data[77], data[71]),
      N77: await CalcularDistancia(data[77], data[76]),
      N79: await CalcularDistancia(data[77], data[78]),
    });
g.addNode("N79", {
      N71: await CalcularDistancia(data[78], data[70]),
      N78: await CalcularDistancia(data[78], data[77]),
      N80: await CalcularDistancia(data[78], data[79]),
    });
g.addNode("N80", {
      N79: await CalcularDistancia(data[79], data[78]),
      N81: await CalcularDistancia(data[79], data[80]),
      N83: await CalcularDistancia(data[79], data[82]),
    });
g.addNode("N81", {
      N76: await CalcularDistancia(data[80], data[75]),
      N82: await CalcularDistancia(data[80], data[81]),
      N80: await CalcularDistancia(data[80], data[79]),
    });
g.addNode("N82", {
      N81: await CalcularDistancia(data[81], data[80]),
      N83: await CalcularDistancia(data[81], data[82]),
    });
g.addNode("N83", {
      N80: await CalcularDistancia(data[82], data[79]),
      N82: await CalcularDistancia(data[82], data[81]),
    });
g.addNode("N84", {
      N68: await CalcularDistancia(data[83], data[67]),
      N85: await CalcularDistancia(data[83], data[84]),
      N87: await CalcularDistancia(data[83], data[86]),
    });
g.addNode("N85", {
      N84: await CalcularDistancia(data[84], data[83]),
      N86: await CalcularDistancia(data[84], data[85]),
    });
g.addNode("N86", {
      N85: await CalcularDistancia(data[85], data[84]),
      N87: await CalcularDistancia(data[85], data[86]),
    });
g.addNode("N87", {
      N84: await CalcularDistancia(data[86], data[83]),
      N86: await CalcularDistancia(data[86], data[85]),
    });
  
        setarray(g.path(nodo1,nodo2))

      }
      
      
   

  return <div> {array.map( (x) =>{

    if (x!==array[array.length-1] ){ 
      var i =array.indexOf(x);
      var NodoI= data[Number(array[i].substring(1,array[i].length))-1] 
      var NodoF= data[Number(array[i+1].substring(1,array[i+1].length))-1]
  
      var pathC = [
        { lat: Number(NodoI.lat), lng: Number(NodoI.lon) },
        { lat: Number(NodoF.lat), lng: Number(NodoF.lon) },  ]
      
   var optionsC = {
    strokeColor: "blue",
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: "blue",
    fillOpacity: 1,
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
