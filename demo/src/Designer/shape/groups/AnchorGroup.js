import React from 'react';
import { RegisterGroup } from 'gg-editor';
import G6 from '@antv/g6';
import {Icon } from 'antd'

const ARROW_SIZE = 4;

class AnchorGroup extends React.Component {
  render() {
    const config = {
        draw(item) {
            const group = item.getGraphicGroup();
            const childrenBox = item.getChildrenBBox();
            
            return group.addShape('rect', {
                attrs: {
                  ...childrenBox,
                  stroke: ''
                }
            });
        },
        getStyle() {
            return {
            };
        },
    };

    return <RegisterGroup
              name="anchor-group"
              config={config}
            />
  }
}

export default AnchorGroup;
