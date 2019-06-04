import React from 'react';
import { Row, Col } from 'antd';
import Header from "./components/Header";
import GGEditor, { Koni } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { DesignerContextMenu } from '../components/EditorContextMenu';
import { DesignerToolbar } from '../components/EditorToolbar';
import { DesignerItemPanel } from '../components/EditorItemPanel';
import { DesignerDetailPanel } from '../components/EditorDetailPanel';

import DefaultCustomNode from './shape/nodes/DefaultCustomNode';
import AnchorNode from './shape/nodes/AnchorNode';
import AlarmNode from './shape/nodes/AlarmNode';

import SuccessEdge from './shape/edges/SuccessEdge';
import FailEdge from './shape/edges/FailEdge';

import AnchorGroup from "./shape/groups/AnchorGroup";

import { NodeMouseEnterBehavior, NodeSelectBehavior, NodeOrbitBehavior } from './behaviours';

import G6 from '@antv/g6';
const Util = G6.Util;

import styles from './index.less';

const DATA = {
    // nodes: [{
    //     id: 'node1',
    //     x: 850,
    //     y: 150,
    //     label:"virtual_machine",
    //     shape:"model-card",
    //     type:'test-type',
    //     category: 'temp'
    //   },{
    //     id: 'node2',
    //     x: 700,
    //     y: 350,
    //     shape:"model-card",
    //     label:"server",
    //     description:"test description 2",
    //     type:'test-type',
    //     category: 'temp'
    // }],
    //   edges: [{
    //     id: 'edge1',
    //     target: 'node2',
    //     source: 'node1',
    //     shape:"fail-edge",
    //     relation: 'not_on',
    //     sourceAnchor: 1
    // }],
    groups: [{
        id: 'anchorGroup',
        label: '',
        shape:"anchor-group",
      }]
};

class DesignerPage extends React.Component {

    constructor(props){
        super(props)

        this.state={
            lastSelectedNode:null,
            selected:null,
            data: DATA,
            json: {}
        }
    }

    // purgeAnchorNodes = () => {
    //     const {graph} = this.graphNode;
    //     const graphNodes = graph.getNodes();
    //     const anchorNodes = graphNodes.filter(node => {
    //       return node.model.shape === 'anchor-node'
    //     })
    //     anchorNodes.map(anchor => {
    //         graph.remove(anchor)
    //     });
    // }

    createNode = (node) => {
        const {graph} = this.graphNode;
        try{
            graph.add('node', node);
        }catch{}
    }

    createAnchorNodes = () => {
        this.createNode({
            id: 'success-anchor',
            x: 0,
            y: 0,
            img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjYgMjYiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtLjMsMTRjLTAuMi0wLjItMC4zLTAuNS0wLjMtMC43czAuMS0wLjUgMC4zLTAuN2wxLjQtMS40YzAuNC0wLjQgMS0wLjQgMS40LDBsLjEsLjEgNS41LDUuOWMwLjIsMC4yIDAuNSwwLjIgMC43LDBsMTMuNC0xMy45aDAuMXYtOC44ODE3OGUtMTZjMC40LTAuNCAxLTAuNCAxLjQsMGwxLjQsMS40YzAuNCwwLjQgMC40LDEgMCwxLjRsMCwwLTE2LDE2LjZjLTAuMiwwLjItMC40LDAuMy0wLjcsMC4zLTAuMywwLTAuNS0wLjEtMC43LTAuM2wtNy44LTguNC0uMi0uM3oiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgZGF0YS1vbGRfY29sb3I9IiNmZmZmZmYiPjwvcGF0aD48L2c+IDwvc3ZnPg==",
            color: '#70994C',
            shape:"anchor-node",
            size: 16,
            r: 8,
            type:'success',
            parent: 'anchorGroup'
        })
        this.createNode({
            id: 'fail-anchor',
            x: 0,
            y: 0,
            img: 'https://upload.wikimedia.org/wikipedia/commons/7/72/VisualEditor_-_Icon_-_Close_-_white.svg',
            color: '#C46246',
            shape:"anchor-node",
            size: 16,
            r: 8,
            type:'fail',
            parent: 'anchorGroup'
        })
    }

    getAnchorGroupNodes = () => {
        const {graph} = this.graphNode;
        const graphNodes = graph.getNodes();
        return graphNodes.filter(node => {
          return node.model.parent === 'anchorGroup'
        })
    }

    hideAnchorGroup = () => {
        const anchors = this.getAnchorGroupNodes();
        anchors.map(anchor => { anchor.hide() });
        this.setState({selected:null})
        this.getGraphRulesJSON();
    }

    showAnchorGroup = (ev) => {
        this.createAnchorNodes();
        const anchors = this.getAnchorGroupNodes();
        if(ev && ev.item.isNode){
            anchors.map(anchor => {
                anchor.show();
            });
        }
    }

    alignAnchorsToNode = (node) => {
        const {graph} = this.graphNode;
        const anchors = this.getAnchorGroupNodes();
        const model = node.model;
        let x = model.x-3, y = model.y+50;
        for(var i = 0; i < anchors.length; i++){
            graph.update(anchors[i], {
                x:x,
                y:y
            });
            x += 20;
        }
    }

    hideNodeDefaultAnchors = node =>{
        if(node.model.shape !== 'anchor-node'){
            const anchors = node.getAllAnchors();
            anchors.map(anchor => {
                anchor.hide();
            });
        }
    }

    handleItemActive = ev =>{
        if(ev && ev.item && ev.item.isNode){
            const node = ev.item;
            this.hideNodeDefaultAnchors(node)
        }
    }

    handleNodeSelected = ev => {
        if(ev && ev.item && ev.item.isNode){
            const node = ev.item;
            this.hideNodeDefaultAnchors(node)
            this.alignAnchorsToNode(node)
            this.showAnchorGroup()
            this.setState({lastSelectedNode:node, selected:node});
        }
        if(ev && ev.item && ev.item.isEdge){
            const edge = ev.item;
            this.setState({selected:edge});
        }
        this.getGraphRulesJSON();
    }

    getNewEdge = () =>{
        const {graph} = this.graphNode;
        const edges = graph.getEdges();
        return edges.filter(edge => {
          const source = edge.model.source;
          return source.includes('anchor')
      })[0]
    }

    handleAddEdge = ev => {
        const {graph} = this.graphNode;
        const newEdge = this.getNewEdge();
        const lastSelectedNode = this.state.lastSelectedNode;
        const cond = newEdge && lastSelectedNode
        if(cond){
            const sourceAnchorId = lastSelectedNode.id;
            const shape = newEdge.model.source.replace('anchor', 'edge')
            graph.update(newEdge, {
                source: sourceAnchorId,
                sourceAnchor: 1,
                targetAnchor: 0,
                shape: shape
            });
            Util.toBack(newEdge)
        }

        if(ev && ev.item && ev.item.isNode && ev.item.model && ev.item.model.shape !== 'anchor-node'){
            const node = ev.item;
            this.setState({selected:node});
        }
        else if(ev && ev.item && ev.item.isEdge){
            const edge = ev.item;
            this.setState({selected:edge});
        }
        this.getGraphRulesJSON();
    }

    getValidGraphNodes = () => {
        const {graph} = this.graphNode;
        const graphNodes = graph.getNodes();
        return graphNodes.filter(node => {
          return node.model.shape !== "anchor-node"
        })
    }

    getEntityJSON = (node) => {
        let selected = false;
        if(this.state.selected && node.id === this.state.selected.id)
            selected = true;

        const template_name = this.getNodeTemplateId(node);
        return {
            'entity': {
                'category': node.model.category,
                'type': node.model.type,
                'template_id': template_name,
                'name': node.model.label,
                'description': node.model.description,
                selected: selected
            }
        }
    }

    getEntities = () => {
        const validNodes = this.getValidGraphNodes()
        return validNodes.map(node => {
            return this.getEntityJSON(node)
        });
    }

    getNodeTemplateId = (node) => {
        return node.model.label.split(' ').join('_')+'_'+node.id
    }

    getRelationshipJSON = (edge) => {
        let selected = false;
        if(this.state.selected && edge.id === this.state.selected.id)
            selected = true;
        let relation = 'not_on'
        if(edge.model.shape === 'success-edge')
            relation = 'on';

        const source_template_name = this.getNodeTemplateId(edge.source);
        const target_template_name = this.getNodeTemplateId(edge.target);

        const template_id = source_template_name + '_'+relation+'_'+target_template_name


        return {
            'relationship': {
                'source': source_template_name,
                'target': target_template_name,
                'relationship_type': relation,
                'id': edge.id,
                'template_id': template_id,
                selected: selected
            }
        }
    }

    getRelationships = () => {
        const {graph} = this.graphNode;
        const edges = graph.getEdges()
        return edges.map(edge => {
            return this.getRelationshipJSON(edge)
        });
    }

    getScenarios = (relationships) =>{
        const conditions = relationships.map(relationship => {
            return relationship.relationship.template_id
        });
        return {condition: conditions.join(' and ')}
    }

    getGraphRulesJSON = () => {
        const {graph} = this.graphNode;
        const entities = this.getEntities()
        const relationships = this.getRelationships()
        const scenario = this.getScenarios(relationships);
        this.setState({
            json: {
                entities: entities,
                relationships: relationships,
                scenario: scenario,
            }
        })
        this.forceUpdate()
    }

    componentDidMount(){
        const {graph} = this.graphNode;
        graph.addBehaviour('nodeSelect')
        graph.addBehaviour('orbit')
        this.createAnchorNodes();
        console.log(graph);
        this.getGraphRulesJSON();
    }





  render(){

      return (
        <GGEditor className={styles.editor} >
              <Header />
              <Row type="flex" className={styles.editorHd}>
                <Col span={24}>
                  <DesignerToolbar />
                </Col>
              </Row>
              <Row type="flex" className={styles.editorBd}>
                  <DesignerItemPanel />
                <Col span={24} className={styles.editorContent}>
                     <Koni
                        mode={this.state.mode}
                        data={this.state.data}
                        ref={e => (this.graphNode = e)}
                        className={styles.koni}

                        onClick={this.handleAddEdge}

                        onAfterItemActived={this.handleItemActive}

                        onBeforeItemUnselected={this.hideAnchorGroup}
                        onAfterItemSelected={this.handleNodeSelected}
                        onNodeDoubleClick={()=>{console.log('here')}}
                        onAfterChange={this.handleAddEdge}

                        />
                </Col>
                  {/*<EditorMinimap />*/}
              </Row>
              <DesignerContextMenu />
              <DesignerDetailPanel json={this.state.json}/>

              {/* Custom Nodes */}
              <DefaultCustomNode />
              <AnchorNode />
              <AlarmNode />

              {/* Custom Edges */}
              <SuccessEdge />
              <FailEdge />

              {/* Custom Groups */}
              <AnchorGroup />

              {/* Custom Behavior */}
              <NodeMouseEnterBehavior />
              <NodeSelectBehavior />
              <NodeOrbitBehavior />
        </GGEditor>
      );
  }
};

export default DesignerPage;
