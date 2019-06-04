import React from 'react';
import { RegisterEdge } from 'gg-editor';
import G6 from '@antv/g6';
import {Icon } from 'antd'

const ARROW_SIZE = 4;

class SuccessEdge extends React.Component {
  render() {
    const config = {
        draw(item) {
            const group = item.getGraphicGroup();
            const points = item.getPoints();
            const path = G6.Util.pointsToPolygon(points);
            return group.addShape('path', {
              attrs: {
                path,
                stroke: "#70994C",
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
              stroke: "#70994C",
              lineWidth: 6
            };
        },
        getSelectedStyle() {
            return {
              stroke: "#70994C",
              lineWidth: 6
            };
        },
        getStyle() {
            return {
              stroke: "#70994C",
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
              fill:  "#70994C",
              r: 10
            },
            zIndex: 3
          });

          group.addShape('image', {
             attrs: {
             img: "https://upload.wikimedia.org/wikipedia/commons/2/27/White_check.svg",
             x: center.x - 7,
             y: center.y - 7,
             width: 14,
             height: 14,
           },
           zIndex: 5
         });

         return keyShape;
      },

    };

    return <RegisterEdge
              name="success-edge"
              config={config}
            />
  }
}

export default SuccessEdge;
