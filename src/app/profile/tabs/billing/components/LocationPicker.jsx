import React, { useEffect, useRef, useState, useMemo } from "react";
import MapComponent from "@terrestris/react-geo/dist/Map/MapComponent/MapComponent";
import OlLayerTile from "ol/layer/Tile";
import OlMap from "ol/Map";
import { fromLonLat, toLonLat } from "ol/proj";
import OlSourceOsm from "ol/source/OSM";
import OlView from "ol/View";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import Modify from "ol/interaction/Modify";
import Collection from "ol/Collection";

import "ol/ol.css";
import "../../../../../react-geo.css";

const LocationPicker = ({
  setLocation,
  location = [4899113.013567734, 4326807.948463461],
  isEdit = false,
}) => {
  const [marker, setMarker] = useState();
  const [map, setMap] = useState();
  const vectorSourceRef = useRef(new VectorSource({}));
  const vectorLayer = useMemo(
    () =>
      new VectorLayer({
        source: vectorSourceRef.current,
      }),
    []
  );

  useEffect(() => {
    const newMap = new OlMap({
      target: undefined,
      layers: [
        new OlLayerTile({
          source: new OlSourceOsm(),
        }),
        vectorLayer,
      ],
    });

    // Function to handle setting up the map view and marker
    const setupMap = (coords) => {
      const view = new OlView({
        center: coords,
        zoom: 16,
      });
      newMap.setView(view);

      const newMarker = new Feature({
        geometry: new Point(coords),
      });

      newMarker.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scale: 1,
          }),
        })
      );

      vectorSourceRef.current.addFeature(newMarker);
      setMarker(newMarker);

      const modify = new Modify({
        features: new Collection([newMarker]),
      });

      modify.on("modifyend", () => {
        const newPos = toLonLat(newMarker.getGeometry().getCoordinates());
        console.log("New draggable position:", newPos);
        setLocation(newMarker.getGeometry().getCoordinates());
      });

      newMap.addInteraction(modify);
    };

    // Try to get user's current location
    if (navigator.geolocation && !isEdit) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback - use user's location
          const userCoords = fromLonLat([
            position.coords.longitude,
            position.coords.latitude,
          ]);
          setupMap(userCoords);
          setLocation(userCoords);
        },
        (error) => {
          // Error callback - use default location
          console.warn("Geolocation error:", error);
          setupMap(location);
        }
      );
    } else {
      // Geolocation not supported - use default location
      console.warn("Geolocation is not supported by this browser");
      setupMap(location);
    }

    setMap(newMap);
  }, []);

  useEffect(() => {
    // Handle map click to place marker
    if (map) {
      const clickHandler = (e) => {
        const clickedCoord = e.coordinate;
        setLocation(clickedCoord);

        if (marker) {
          marker.getGeometry().setCoordinates(clickedCoord);
        }
      };

      map.on("click", clickHandler);

      // Cleanup function
      return () => {
        map.un("click", clickHandler);
      };
    }
  }, [map, marker, setLocation]);

  if (!map) return null;

  return (
    <MapComponent
      map={map}
      style={{
        height: "300px",
        flex: 1,
        minwidth: "400px",
        maxWidth: "100%",
      }}
    />
  );
};

export default LocationPicker;
