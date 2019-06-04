import React, {Component} from 'react';
import { RegisterBehaviour } from 'gg-editor';
import G6 from '@antv/g6';
const Util = G6.Util;

const nodeMouseEnterBehavior = (page) =>{
  page.on('node:mouseenter', ev=>{
    page.update(ev.item, {
        color: 'white',
    });
  });
};

const NodeMouseEnterBehavior = () => (
<RegisterBehaviour name="nodeMouseEnter" behaviour={nodeMouseEnterBehavior} />
);

const NodeOrbitBehavior = () => (
<RegisterBehaviour name="orbit" behaviour={()=>{}} />
);



const nodeSelectBehavior = (page) =>{
  page.on('node:click', ev=>{
      const item = ev.item;
      const model = item.getModel();
      const group = item.getGraphicGroup();
      const width = 200;
      const height = 55;
      const x = -width / 2;
      const y = -height / 2;
     //  group.addShape('circle', {
     //   attrs: {
     //     anchorId:2,
     //     x: x+(width/2.5),
     //     y: y+height+12,
     //     r: 8,
     //     fill: "#70994C",
     //   },
     //   zIndex: 3
     // });
    })
};

const NodeSelectBehavior = () => (
<RegisterBehaviour name="nodeSelect" behaviour={nodeSelectBehavior} />
);

export { NodeMouseEnterBehavior, NodeSelectBehavior, NodeOrbitBehavior }
