import { createElement, forwardRef, useCallback, useRef } from 'react';
import ThreeForceGraph from 'three-forcegraph';

import fromThree from './fromThree';

const ForceGraphComp = fromThree(ThreeForceGraph, {
  initPropNames: [],
  methodNames: ['emitParticle', 'getGraphBbox', 'd3ReheatSimulation', 'd3Force', 'resetCountdown', 'tickFrame', 'refresh']
});

const getGraphEventObj = ({ intersections }) => {
  const lookupGlobeObj = o => // recurse up object chain until finding the graph object
    !o ? null : o.hasOwnProperty('__graphObjType') ? o : lookupGlobeObj(o.parent);

  return lookupGlobeObj(intersections.find(d => lookupGlobeObj(d.object))?.object);
};

const getObjData = obj => obj?.__data;

const ForceGraph = forwardRef(({ onNodeHover, onLinkHover, onNodeClick, onLinkClick, ...ptProps }, ref) => {
  const curHoverObjRef = useRef(null);

  const onHoverInt = useCallback((e) => {
    if (!onNodeHover && !onLinkHover) return;

    const hoverObj = getGraphEventObj(e);
    if (hoverObj !== curHoverObjRef.current) {
      const prevObj = curHoverObjRef.current;
      curHoverObjRef.current = hoverObj;

      if (prevObj && (!hoverObj || hoverObj.__graphObjType !== prevObj.__graphObjType)) {
        // Trigger null hovers when leaving a type
        ({ node: onNodeHover, link: onLinkHover }[prevObj?.__graphObjType] || (() => {}))(null, getObjData(prevObj));
      }

      ({ node: onNodeHover, link: onLinkHover }[hoverObj?.__graphObjType] || (() => {}))
        (getObjData(hoverObj), hoverObj?.__graphObjType === prevObj?.__graphObjType ? getObjData(prevObj) : null);
    }
  },[onNodeHover, onLinkHover]);

  const onClickInt = useCallback((e) => {
    const obj = getGraphEventObj(e);
    const clickFn = { node: onNodeClick, link: onLinkClick }[obj?.__graphObjType];
    if(obj && clickFn) {
      clickFn(getObjData(obj), e);
      e.stopPropagation();
    }
  }, [onNodeClick, onLinkClick]);

  return createElement(ForceGraphComp, {
    ...ptProps,
    ref,
    onPointerOver: onHoverInt,
    onPointerOut: onHoverInt,
    onClick: onClickInt
  });
});

export default ForceGraph;