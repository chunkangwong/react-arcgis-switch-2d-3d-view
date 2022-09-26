# [React + ArcGIS JS API] Switch view from 2D to 3D

This project is a React version of the sample code demonstrated [here](https://developers.arcgis.com/javascript/latest/sample-code/views-switch-2d-3d/) in the official ArcGIS Featured Samples.

## Explanation

A `viewType` state is created using `useState` hook to keep track of the current view type, i.e. `2D` or `3D`.

```js
const [viewType, setViewType] = React.useState<"2D"|"3D"> ("3D");
```

Clicking on the `2D`/`3D` button will toggle the view type and update the `viewType` state.

```js
const handleSwitch = () => {
  if (viewType === "2D") {
    setViewType("3D");
  } else {
    setViewType("2D");
  }
};
```

A side effect is created using `useEffect` hook to update the view type when the `viewType` state changes. This is done by setting the container of mapView and sceneView to `null` or `viewDiv` element respectively.

```js
useEffect(() => {
  if (viewType === "2D") {
    sceneView.container = nullRef.current as HTMLDivElement;
    mapView.container = viewRef.current as HTMLDivElement;
  } else {
    mapView.container = nullRef.current as HTMLDivElement;
    sceneView.container = viewRef.current as HTMLDivElement;
  }
}, [viewType]);
```

To improve user experience, a `viewpoint` state is created to keep track of the current viewpoint of the view. This is done by setting the `viewpoint` state when the `viewType` state changes.

```js
const [viewpoint, setViewpoint] = React.useState<Viewpoint>();

useEffect(() => {
  if (viewType === "2D") {
    setViewpoint(sceneView.viewpoint);
    mapView.viewpoint = viewpoint as Viewpoint;
    // Omit code for brevity
  } else {
    setViewpoint(mapView.viewpoint);
    sceneView.viewpoint = viewpoint as Viewpoint;
    // Omit code for brevity
  }
}, [viewType]);
```

## Installation

1. Install dependencies

   ```bash
   npm install / yarn install
   ```

2. Start project in development

   ```bash
   npm run dev / yarn dev
   ```
