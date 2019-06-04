import React from 'react';
import { RegisterNode } from 'gg-editor';
import G6 from '@antv/g6';
const Util = G6.Util;
const Global = G6.Global;

class AlarmNode extends React.Component {
  render() {
    const config = {
      draw(item) {
        const keyShape = this.drawKeyShape(item);

        // draw label
        this.drawLabel(item);

        // draw image
        const group = item.getGraphicGroup();
        const model = item.getModel();

        group.addShape('image', {
          attrs: {
            x: -7,
            y: -7,
            img: model.icon,
          },
        });

        return keyShape;
      },
      drawLabel(item) {
        const group = item.getGraphicGroup();
        const label = this.getLabel(item);
        const model = item.getModel();
        const { labelOffsetX, labelOffsetY, labelRotate } = model;
        if (Util.isNil(label)) {
          return;
        }
        const attrs = Util.mix(true, {}, Global.labelStyle, {
          x: labelOffsetX ? labelOffsetX : 0,
          y: labelOffsetY ? labelOffsetY : 0,
          fill: '#ffffff',
        });
        if (!Util.isObject(label)) {
          attrs.text = label;
        } else {
          Util.mix(attrs, label);
        }


        const labelShape = group.addShape('text', {
          class: 'label',
          attrs
        });
        if (labelRotate) {
          labelShape.rotate(labelRotate);
        }
        return labelShape;
      },

      anchor(item){
          return[
              [0.5,0.5]
          ]
      }
    };

    return <RegisterNode name="alarm-node" config={config} />;
  }
}

export default AlarmNode;
