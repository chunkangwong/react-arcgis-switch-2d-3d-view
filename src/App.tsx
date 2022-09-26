import Viewpoint from "@arcgis/core/Viewpoint";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import WebMap from "@arcgis/core/WebMap";
import WebScene from "@arcgis/core/WebScene";
import React, { useEffect, useRef } from "react";
import "./App.css";

const webmap = new WebMap({
  portalItem: {
    // autocasts as new PortalItem()
    id: "7ee3c8a93f254753a83ac0195757f137",
  },
});

const webScene = new WebScene({
  portalItem: {
    // autocasts as new PortalItem()
    id: "c8cf26d7acab4e45afcd5e20080983c1",
  },
});

const mapView = new MapView({
  zoom: 12,
  center: [-122.43759993450347, 37.772798684981126],
  map: webmap,
});

const sceneView = new SceneView({
  zoom: 12,
  center: [-122.43759993450347, 37.772798684981126],
  map: webScene,
});

function App() {
  const viewRef = useRef<HTMLDivElement>(null);
  const nullRef = useRef<HTMLDivElement>(null);
  const [viewType, setViewType] = React.useState<"2D" | "3D">("3D");
  const [viewpoint, setViewpoint] = React.useState<Viewpoint>();

  useEffect(() => {
    if (viewType === "2D") {
      setViewpoint(sceneView.viewpoint);
      sceneView.container = nullRef.current as HTMLDivElement;

      mapView.container = viewRef.current as HTMLDivElement;
      mapView.viewpoint = viewpoint as Viewpoint;
    } else {
      setViewpoint(mapView.viewpoint);
      mapView.container = nullRef.current as HTMLDivElement;

      sceneView.container = viewRef.current as HTMLDivElement;
      sceneView.viewpoint = viewpoint as Viewpoint;
    }
  }, [viewType]);

  const handleSwitch = () => {
    if (viewType === "2D") {
      setViewType("3D");
    } else {
      setViewType("2D");
    }
  };

  return (
    <>
      <div id="viewDiv" ref={viewRef}></div>
      <div id="infoDiv">
        <input
          className="esri-component esri-widget--button esri-widget esri-interactive"
          type="button"
          id="switch-btn"
          value={viewType}
          onClick={handleSwitch}
        />
      </div>
    </>
  );
}

export default App;
