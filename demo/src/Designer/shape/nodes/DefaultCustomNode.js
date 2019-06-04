import React from 'react';
import { RegisterNode } from 'gg-editor';
import G6 from '@antv/g6';
const Util = G6.Util;

class DefaultCustomNode extends React.Component {

  render() {
    const config = {
        draw(item) {
            const group = item.getGraphicGroup();
            const model = item.getModel();
            const width = 200;
            const height = 55;
            const x = -width / 2;
            const y = -height / 2;
            const borderRadius = 4;
            const keyShape = group.addShape('rect', {
              attrs: {
                x,
                y,
                width,
                height,
                radius: borderRadius,
                fill: 'white',
                shadowColor: "rgba(0,0,0,0.4)",
                shadowBlur: 14,
                shadowOffsetX:2,
                shadowOffsetY:2,
                zIndex:30
              },
            });


            //  logo
            group.addShape('image', {
              attrs: {
                img: model.icon,
                x: x + 10,
                y: y + 10,
                width: 35,
                height: 35,
                stroke: '#000',
              },
            });

            // Name
            const label = model.label ? model.label : this.label;

            group.addShape('text', {
              attrs: {
                text: label,
                x: x + 65,
                y: y + 10,
                textAlign: 'start',
                textBaseline: 'top',
                fontWeight:"500",
                fill: 'rgba(0,0,0,1)',
              },
            });

            const description = model.description ? model.description : this.description;
            group.addShape('text', {
              attrs: {
                text: description,
                x: x + 65,
                y: y + 35,
                textAlign: 'start',
                textBaseline: 'top',
                fill: 'rgba(0,0,0,0.65)',
              },
            });


            return keyShape;
        },
        getSelectedStyle() {
            return {
            };
        },
        showAnchors:false,
        anchor(item){
            return [
                [0.5, 0], //Top
                [0.5, 0.5], //Center
                // [0.4, 1.2], //Bottom Left
                // [0.5, 1.2], //Bottom middle
                // [0.6, 1.2] //Bottom right
             ]
         },

  };


    return <RegisterNode
      name="model-card"
      config={config}
    />
  }
}

export default DefaultCustomNode;
