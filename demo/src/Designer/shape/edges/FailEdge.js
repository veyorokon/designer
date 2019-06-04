import React from 'react';
import { RegisterEdge } from 'gg-editor';
import G6 from '@antv/g6';
import {Icon } from 'antd'

const ARROW_SIZE = 4;

class FailEdge extends React.Component {
  render() {
    const config = {
        draw(item) {
            const group = item.getGraphicGroup();
            const points = item.getPoints();
            const path = G6.Util.pointsToPolygon(points);
            return group.addShape('path', {
              attrs: {
                path,
                stroke: "#C46246",
                lineWidth: 6,
                endArrow: {
                    shorten(item) {
                      const keyShape = item.getKeyShape();
                      return ARROW_SIZE * 3.1;
                    },
               }
              }
            });

        },
        getActiveStyle() {
            return {
              stroke: "#C46246",
              lineWidth: 6
            };
        },
        getSelectedStyle() {
            return {
              stroke: "#C46246",
              lineWidth: 6
            };
        },
        getStyle() {
            return {
              stroke: "#C46246",
              lineWidth: 6
            };
      },
      afterDraw(item) {
          const group = item.getGraphicGroup();
          const keyShape = item.getKeyShape();

          var center = keyShape.getPoint(0.5);
          const labelShape = group.addShape('text', {
             attrs: {
             x: center.x,
             y: center.y,
           },
           zIndex: 4
         });

         var labelPadding = 6;
         const  labelBox = labelShape.getBBox();
          // 文本框
           group.addShape('circle', {
            attrs: {
              x: center.x,
              y: center.y,
              fill:  "#C46246",
              r: 10
            },
            zIndex: 3
          });

          group.addShape('image', {
             attrs: {
             img: 'https://upload.wikimedia.org/wikipedia/commons/7/72/VisualEditor_-_Icon_-_Close_-_white.svg',
             x: center.x - 9,
             y: center.y - 9,
             width: 18,
             height: 18,
           },
           zIndex: 5
         });

         return keyShape;
      },

    };

    return <RegisterEdge
              name="fail-edge"
              config={config}
            />
  }
}

export default FailEdge;
