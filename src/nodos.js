import data from "./data.json";

import Graph from "node-dijkstra";

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
  useEffect(() => {
    calculate();
  }, []);

  async function calculate() {
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

    console.log(g.path("N1", "N3")); // => ['A', 'B', 'C', 'D']*/
    // const route = new Graph();

    // route.addNode("N1", { B: await CalcularDistancia(data[0], data[1]) });
    // route.addNode("B", { N1: 1, C: 2, D: 4 });
    // route.addNode("C", { B: 2, D: 1 });
    // route.addNode("D", { C: 1, B: 4 });

    // console.log(route.path("N1", "D")); // => ['A', 'B', 'C', 'D']
    // // console.log("Dis res ", await CalcularDistancia(data[0], data[1]));
  }

  return <div></div>;
};
