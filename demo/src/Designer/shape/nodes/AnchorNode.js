import React from 'react';
import { RegisterNode } from 'gg-editor';
import G6 from '@antv/g6';
const Util = G6.Util;

class AnchorNode extends React.Component {

  render() {
    const config = {
        draw(item) {
            const group = item.getGraphicGroup();
            const model = item.getModel();
            const width = model.size;
            const height = model.size;
            const x = -width / 2;
            const y = -height / 2;
            const r = model.r
            const keyShape = group.addShape('circle', {
              attrs: {
                r,
                x: x,
                y: y,
                fill: model.color
              },
              zIndex: 3
            });

            return keyShape;
        },
        afterDraw(item){
            const group = item.getGraphicGroup();
            const model = item.getModel();
            const width = model.size;
            const height = model.size;
            const x = -width / 2;
            const y = -height / 2;
            const r = model.r
            const keyShape = group.addShape('circle', {
              attrs: {
                r,
                x: x,
                y: y,
                fill:  model.color
              },
              zIndex: 3
            });

            group.addShape('image', {
               attrs: {
               img: model.img,
               x: x - (model.size-r),
               y: y - (model.size-r),
               width: model.size,
               height: model.size,
             },
             zIndex: 5
           });
           return keyShape;
       },
        getActiveStyle(item) {
            const model = item.getModel();
            return{
                color: model.color
            }
        },
        getSelectedStyle(item) {
            return{

            }
        },
        anchor(item){
            return [
                [0.5, 0.5],
             ]
         },

  };


    return <RegisterNode
      name="anchor-node"
      config={config}
    />
  }
}

export default AnchorNode;
