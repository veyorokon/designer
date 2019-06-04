import React from 'react';
import { Card, Icon, Drawer } from 'antd';
import { NodePanel, EdgePanel, GroupPanel, MultiPanel, CanvasPanel, DetailPanel } from 'gg-editor';
import DetailForm from './DetailForm';
import styles from './index.less';

import YAMLViewer from "./YAMLViewer"

class FlowDetailPanel extends React.Component {
constructor(props){
    super(props);
    this.state = {
        open: true,
        editor:false
    }
}

render(){
      const {open} = this.state;
      return (
          <Drawer
          title=""
          placement={"right"}
          closable={false}
          visible={open}
          mask={false}
          className={styles.detailDrawer}
        >
            <Card bordered={false} className={styles.toggleButtonContainer}>
                <a onClick={()=>{this.setState({open: !open})}}>
                    <Icon className={styles.toggleButton} type={open ? 'right' : 'left'} />
                </a>
            </Card>
            {this.state.editor ? (
                <DetailPanel className={styles.detailPanel}>
                  <NodePanel>
                    <DetailForm type="node" />
                  </NodePanel>
                  <EdgePanel>
                    <DetailForm type="edge" />
                  </EdgePanel>
                  <GroupPanel>
                    <DetailForm type="group" />
                  </GroupPanel>
                  <MultiPanel>
                    <Card type="inner" size="small" title="Multi Select" bordered={false} />
                  </MultiPanel>
                  <CanvasPanel>
                    <Card type="inner" size="small" title="Canvas" bordered={false} />
                  </CanvasPanel>
                </DetailPanel>
            ):(
                <YAMLViewer json={this.props.json}/>
            )}

        </Drawer>
      );
    }
}

export default FlowDetailPanel;
