React-Three-Fiber Force-Directed Graph
======================================

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

<p align="center">
  <a href="//vasturiano.github.io/r3f-forcegraph/example/basic/"><img width="80%" src="https://vasturiano.github.io/r3f-forcegraph/example/preview.png"></a>
</p>

[React-Three-Fiber](https://github.com/pmndrs/react-three-fiber) bindings for the [three-forcegraph](https://github.com/vasturiano/three-forcegraph) ThreeJS component.


## Quick start

```js
import R3fForceGraph from 'r3f-forcegraph';
```
or using a *script* tag
```html
<script src="//unpkg.com/r3f-forcegraph"></script>
```
then
```jsx
useFrame(() => fgRef.current.tickFrame());

...

<Canvas>
  <R3fForceGraph
    ref={fgRef}
    graphData={myData}
  />
</Canvas>
```

## API reference

### Data input

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>graphData</b> | <i>object</i> | `{ nodes: [], links: [] }` | Graph data structure (see below for syntax details). Can also be used to apply incremental updates. |
| <b>nodeId</b> | <i>string</i> | `id` | Node object accessor attribute for unique node id (used in link objects source/target). |
| <b>linkSource</b> | <i>string</i> | `source` | Link object accessor attribute referring to id of source node. |
| <b>linkTarget</b> | <i>string</i> | `target` | Link object accessor attribute referring to id of target node. |

### Node styling

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>nodeRelSize</b> | <i>number</i> | 4 | Ratio of sphere volume (cubic px) per value unit. |
| <b>nodeVal</b> | <i>number</i>, <i>string</i> or <i>func</i> | `val` | Node object accessor function, attribute or a numeric constant for the node numeric value (affects node size). |
| <b>nodeVisibility</b>| <i>bool</i>, <i>string</i> or <i>func</i> | `true` | Node object accessor function, attribute or a boolean constant for whether to display the node. |
| <b>nodeColor</b> | <i>string</i> or <i>func</i> | `color` | Node object accessor function or attribute for node color. |
| <b>nodeAutoColorBy</b> | <i>string</i> or <i>func</i> | | Node object accessor function or attribute to automatically group colors by. Only affects nodes without a color attribute. |
| <b>nodeOpacity</b> | <i>number</i> | 0.75 | Nodes sphere opacity, between [0,1]. |
| <b>nodeResolution</b> | <i>number</i> | 8 | Geometric resolution of each node's sphere, expressed in how many slice segments to divide the circumference. Higher values yield smoother spheres. Only applicable to 3D modes. |
| <b>nodeThreeObject</b> | <i>Object3d</i>, <i>string</i> or <i>func</i> | *default 3D node object is a sphere, sized according to `val` and styled according to `color`.* | Node object accessor function or attribute for generating a custom 3d object to render as graph nodes. Should return an instance of [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D). If a <i>falsy</i> value is returned, the default 3d object type will be used instead for that node. |
| <b>nodeThreeObjectExtend</b> | <i>bool</i>, <i>string</i> or <i>func</i> | `false` | Node object accessor function, attribute or a boolean value for whether to replace the default node when using a custom `nodeThreeObject` (`false`) or to extend it (`true`). |
| <b>nodePositionUpdate</b> | <i>func(nodeObject, coords, node)</i> | | Custom function to call for updating the position of nodes at every render iteration. It receives the respective node `ThreeJS Object3d`, the coordinates of the node (`{x,y,z}` each), and the node's `data`. If the function returns a truthy value, the regular position update function will not run for that node. |

### Link styling

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>linkVisibility</b>| <i>bool</i>, <i>string</i> or <i>func</i> | `true` | Link object accessor function, attribute or a boolean constant for whether to display the link line. |
| <b>linkColor</b>| <i>string</i> or <i>func</i> | `color` | Link object accessor function or attribute for line color. |
| <b>linkAutoColorBy</b> | <i>string</i> or <i>func</i> | | Link object accessor function or attribute to automatically group colors by. Only affects links without a color attribute. |
| <b>linkOpacity</b> | <i>number</i> | 0.2 | Line opacity of links, between [0,1]. |
| <b>linkWidth</b> | <i>number</i>, <i>string</i> or <i>func</i> | 1 | Link object accessor function, attribute or a numeric constant for the link line width. |
| <b>linkResolution</b> | <i>number</i> | 6 | Geometric resolution of each link 3D line, expressed in how many radial segments to divide the cylinder. Higher values yield smoother cylinders. Applicable only to links with positive width. |
| <b>linkCurvature</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Link object accessor function, attribute or a numeric constant for the curvature radius of the link line. A value of `0` renders a straight line. `1` indicates a radius equal to half of the line length, causing the curve to approximate a semi-circle. For self-referencing links (`source` equal to `target`) the curve is represented as a loop around the node, with length proportional to the curvature value. |
| <b>linkCurveRotation</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Link object accessor function, attribute or a numeric constant for the rotation along the line axis to apply to the curve. Has no effect on straight lines. At `0` rotation, the curve is oriented in the direction of the intersection with the `XY` plane. The rotation angle (in radians) will rotate the curved line clockwise around the "start-to-end" axis from this reference orientation. |
| <b>linkMaterial</b> | <i>Material</i>, <i>string</i> or <i>func</i> | *default link material is [MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial) styled according to `color` and `opacity`.* | Link object accessor function or attribute for specifying a custom material to style the graph links with. Should return an instance of [ThreeJS Material](https://threejs.org/docs/#api/materials/Material). If a <i>falsy</i> value is returned, the default material will be used instead for that link. |
| <b>linkThreeObject</b> | <i>Object3d</i>, <i>string</i> or <i>func</i> | *default 3D link object is a line or cylinder, sized according to `width` and styled according to `material`.* | Link object accessor function or attribute for generating a custom 3d object to render as graph links. Should return an instance of [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D). If a <i>falsy</i> value is returned, the default 3d object type will be used instead for that link. |
| <b>linkThreeObjectExtend</b> | <i>bool</i>, <i>string</i> or <i>func</i> | `false` | Link object accessor function, attribute or a boolean value for whether to replace the default link when using a custom `linkThreeObject` (`false`) or to extend it (`true`). |
| <b>linkPositionUpdate</b> | <i>func(linkObject, { start, end }, link)</i> | | Custom function to call for updating the position of links at every render iteration. It receives the respective link `ThreeJS Object3d`, the `start` and `end` coordinates of the link (`{x,y,z}` each), and the link's `data`. If the function returns a truthy value, the regular position update function will not run for that link. |
| <b>linkDirectionalArrowLength</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Link object accessor function, attribute or a numeric constant for the length of the arrow head indicating the link directionality. The arrow is displayed directly over the link line, and points in the direction of `source` > `target`. A value of `0` hides the arrow. |
| <b>linkDirectionalArrowColor</b> | <i>string</i> or <i>func</i> | `color` | Link object accessor function or attribute for the color of the arrow head. |
| <b>linkDirectionalArrowRelPos</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.5 | Link object accessor function, attribute or a numeric constant for the longitudinal position of the arrow head along the link line, expressed as a ratio between `0` and `1`, where `0` indicates immediately next to the `source` node, `1` next to the `target` node, and `0.5` right in the middle. |
| <b>linkDirectionalArrowResolution</b> | <i>number</i> | 8 | Geometric resolution of the arrow head, expressed in how many slice segments to divide the cone base circumference. Higher values yield smoother arrows. |
| <b>linkDirectionalParticles</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Link object accessor function, attribute or a numeric constant for the number of particles (small spheres) to display over the link line. The particles are distributed equi-spaced along the line, travel in the direction `source` > `target`, and can be used to indicate link directionality. |
| <b>linkDirectionalParticleSpeed</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.01 | Link object accessor function, attribute or a numeric constant for the directional particles speed, expressed as the ratio of the link length to travel per frame. Values above `0.5` are discouraged. |
| <b>linkDirectionalParticleWidth</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.5 | Link object accessor function, attribute or a numeric constant for the directional particles width. Values are rounded to the nearest decimal for indexing purposes. |
| <b>linkDirectionalParticleColor</b> | <i>string</i> or <i>func</i> | `color` | Link object accessor function or attribute for the directional particles color. |
| <b>linkDirectionalParticleResolution</b> | <i>number</i> | 4 | Geometric resolution of each 3D directional particle, expressed in how many slice segments to divide the circumference. Higher values yield smoother particles. |

| Method | Arguments | Description |
| --- | :--: | --- |
| <b>emitParticle</b> | (<i>link</i>) | An alternative mechanism for generating particles, this method emits a non-cyclical single particle within a specific link. The emitted particle shares the styling (speed, width, color) of the regular particle props. A valid `link` object that is included in `graphData` should be passed as a single parameter. |

### Force engine configuration

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>numDimensions</b> | <i>1</i>, <i>2</i> or <i>3</i> | 3 | Number of dimensions to run the force simulation on. |
| <b>forceEngine</b> | <i>string</i> | `d3` | Which force-simulation engine to use ([*d3*](https://github.com/vasturiano/d3-force-3d) or [*ngraph*](https://github.com/anvaka/ngraph.forcelayout)). |
| <b>dagMode</b> | <i>string</i> | *-* | Apply layout constraints based on the graph directionality. Only works correctly for [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph) graph structures (without cycles). Choice between `td` (top-down), `bu` (bottom-up), `lr` (left-to-right), `rl` (right-to-left), `zout` (near-to-far), `zin` (far-to-near), `radialout` (outwards-radially) or `radialin` (inwards-radially). |
| <b>dagLevelDistance</b> | <i>number</i> | *auto-derived from the number of nodes* | If `dagMode` is engaged, this specifies the distance between the different graph depths. |
| <b>dagNodeFilter</b> | <i>func</i> | `node => true` | Node accessor function to specify nodes to ignore during the DAG layout processing. This accessor method receives a node object and should return a `boolean` value indicating whether the node is to be included. Excluded nodes will be left unconstrained and free to move in any direction. |
| <b>onDagError</b> | <i>func</i> | *-* | Callback to invoke if a cycle is encountered while processing the data structure for a DAG layout. The loop segment of the graph is included for information, as an array of node ids. By default an exception will be thrown whenever a loop is encountered. You can override this method to handle this case externally and allow the graph to continue the DAG processing. Strict graph directionality is not guaranteed if a loop is encountered and the result is a best effort to establish a hierarchy. |
| <b>d3AlphaMin</b> | <i>number</i> | 0 | Sets the [simulation alpha min](https://github.com/vasturiano/d3-force-3d#simulation_alphaMin) parameter. Only applicable if using the d3 simulation engine. |
| <b>d3AlphaDecay</b> | <i>number</i> | 0.0228 | Sets the [simulation intensity decay](https://github.com/vasturiano/d3-force-3d#simulation_alphaDecay) parameter. Only applicable if using the d3 simulation engine. |
| <b>d3AlphaTarget</b> | <i>number</i> | 0 | Sets the [simulation alpha target](https://github.com/vasturiano/d3-force-3d#simulation_alphaTarget) parameter, only applicable if using the d3 simulation engine. |
| <b>d3VelocityDecay</b> | <i>number</i> | 0.4 | Nodes' [velocity decay](https://github.com/vasturiano/d3-force-3d#simulation_velocityDecay) that simulates the medium resistance. Only applicable if using the d3 simulation engine. |
| <b>ngraphPhysics</b> | <i>object</i> | *-* | Specify custom physics configuration for ngraph, according to its [configuration object](https://github.com/anvaka/ngraph.forcelayout#configuring-physics) syntax. Only applicable if using the ngraph simulation engine. |
| <b>warmupTicks</b> | <i>number</i> | 0 | Number of layout engine cycles to dry-run at ignition before starting to render. |
| <b>cooldownTicks</b> | <i>number</i> | Infinity | How many build-in frames to render before stopping and freezing the layout engine. |
| <b>cooldownTime</b> | <i>number</i> | 15000 | How long (ms) to render for before stopping and freezing the layout engine. |
| <b>onEngineTick</b> | <i>func</i> | *-* | Callback function invoked at every tick of the simulation engine. |
| <b>onEngineStop</b> | <i>func</i> | *-* | Callback function invoked when the simulation engine stops and the layout is frozen. |

| Method | Arguments | Description |
| --- | :--: | --- |
| <b>d3Force</b> | (<i>string</i>, [<i>func</i>]) | Access to the internal forces that control the d3 simulation engine. Follows the same interface as `d3-force-3d`'s [simulation.force](https://github.com/vasturiano/d3-force-3d#simulation_force). Three forces are included by default: `'link'` (based on [forceLink](https://github.com/vasturiano/d3-force-3d#forceLink)), `'charge'` (based on [forceManyBody](https://github.com/vasturiano/d3-force-3d#forceManyBody)) and `'center'` (based on [forceCenter](https://github.com/vasturiano/d3-force-3d#forceCenter)). Each of these forces can be reconfigured, or new forces can be added to the system. Only applicable if using the d3 simulation engine. |
| <b>d3ReheatSimulation</b> | () | Reheats the force simulation engine, by setting the `alpha` value to `1`. Only applicable if using the d3 simulation engine. |
| <b>resetCountdown</b> | () | Resets the engine countdown timer to the initial value. Useful when you want to keep the engine ticking for a while after the last user interaction. |

### Interaction

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>onNodeClick</b> | <i>func</i> | *-* | Callback function for node clicks. The node object and the event object are included as arguments `onNodeClick(node, event)`. |
| <b>onNodeHover</b> | <i>func</i> | *-* | Callback function for node mouse over events. The node object (or `null` if there's no node under the pointer line of sight) is included as the first argument, and the previous node object (or null) as second argument: `onNodeHover(node, prevNode)`. |
| <b>onLinkClick</b> | <i>func</i> | *-* | Callback function for link clicks. The link object and the event object are included as arguments `onLinkClick(link, event)`. |
| <b>onLinkHover</b> | <i>func</i> | *-* | Callback function for link mouse over events. The link object (or `null` if there's no link under the pointer line of sight) is included as the first argument, and the previous link object (or null) as second argument: `onLinkHover(link, prevLink)`. |

### Render control

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>onFinishUpdate</b> | <i>func</i> | *-* | Callback function for notification that the component has finished updating, done iterating through the warmup phase (if needed) and the simulation engine has been resumed. |

| Method | Arguments | Description |
| --- | :--: | --- |
| <b>tickFrame</b> | *-* | This method should be called on each cycle of the global renderer to iterate the underlying force simulation engine and update the nodes/links objects' positions. |
| <b>refresh</b> | *-* | Redraws all the nodes/links. |

###  Utility

| Method | Arguments | Description |
| --- | :--: | --- |
| <b>getGraphBbox</b> | ([<i>nodeFilterFn</i>]) | Returns the current bounding box of the nodes in the graph, formatted as `{ x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }`. If no nodes are found, returns `null`. Accepts an optional argument to define a custom node filter: `node => <boolean>`, which should return a truthy value if the node is to be included. This can be useful to calculate the bounding box of a portion of the graph. |


### Input JSON syntax

```json
{
    "nodes": [ 
        { 
          "id": "id1",
          "name": "name1",
          "val": 1 
        },
        { 
          "id": "id2",
          "name": "name2",
          "val": 10 
        },
        ...
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        ...
    ]
}
```

## Giving Back

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url) If this project has helped you and you'd like to contribute back, you can always [buy me a ☕](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url)!

[npm-img]: https://img.shields.io/npm/v/r3f-forcegraph
[npm-url]: https://npmjs.org/package/r3f-forcegraph
[build-size-img]: https://img.shields.io/bundlephobia/minzip/r3f-forcegraph
[build-size-url]: https://bundlephobia.com/result?p=r3f-forcegraph
[npm-downloads-img]: https://img.shields.io/npm/dt/r3f-forcegraph
[npm-downloads-url]: https://www.npmtrends.com/r3f-forcegraph
