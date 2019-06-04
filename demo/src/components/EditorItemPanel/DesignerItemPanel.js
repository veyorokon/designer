import React from 'react';
import { ItemPanel, Item } from 'gg-editor';
import styles from './index.less';

import { Card, Alert, Collapse, Icon, Drawer, Input   } from 'antd';
const Panel = Collapse.Panel;

const Search = Input.Search;

const genExtra = () => (
  <Icon
    type="robot"
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);


class FlowItemPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: true
        }
    }

    render(){
      const {open} = this.state;
      return (
          <Drawer
          placement={"left"}
          closable={false}
          visible={open}
          mask={false}
          className={styles.itemDrawer}
        >
        <Card bordered={false} className={styles.toggleButtonContainer}>
            <a onClick={()=>{this.setState({open: !open})}}>
                <Icon className={styles.toggleButton} type={open ? 'left' : 'right'} />
            </a>
        </Card>
        <div className={styles.searchBoxWrapper}>
            <Search
              placeholder="Search..."
              onSearch={value => console.log(value)}
              className={styles.searchBox}
              size="large"
            />
        </div>
        <ItemPanel className={styles.itemPanel}>
            <Collapse  defaultActiveKey={['0']} className={styles.category}>
                <Panel header="resources" key="0" extra={genExtra()}>
                    <Item
                      type="node"
                      size="200*55"
                      shape="model-card"
                      model={{
                        label: 'server',
                        description:'basic server',
                        icon: 'https://image.flaticon.com/icons/svg/272/272340.svg',
                        category: 'resource'
                      }}
                    >
                    <Card className={styles.itemCard} bordered={false} style={{borderBottom:"1px solid #eee"}}>
                    <img
                        style={{height:"30px", marginRight: "20px", marginBottom:"10px", marginLeft:"10px"}}
                        alt="example"
                        src="https://image.flaticon.com/icons/svg/272/272340.svg"
                      />
                      <div style={{margin:"unset", width:"100px"}}>
                        <h4 style={{marginBottom:"unset"}}>server</h4>
                        <p style={{marginBottom:"10px"}}>basic server</p>
                      </div>
                    </Card>
                    </Item>

                    <Item
                      type="node"
                      size="200*55"
                      shape="model-card"
                      model={{
                        label: 'virtual machine',
                        description:'vm instance',
                        icon: 'https://image.flaticon.com/icons/svg/272/272340.svg',
                        category: 'resource'
                      }}

                    >
                    <Card className={styles.itemCard} bordered={false} style={{borderBottom:"1px solid #eee"}}>
                    <img
                        style={{height:"30px", marginRight: "20px", marginBottom:"10px", marginLeft:"10px"}}
                        alt="example"
                        src="https://image.flaticon.com/icons/svg/272/272340.svg"
                      />
                      <div style={{margin:"unset",width:"100%"}}>
                        <h4 style={{marginBottom:"unset"}}>virtual machine</h4>
                        <p style={{marginBottom:"10px"}}>vm instance</p>
                      </div>
                    </Card>
                    </Item>
                </Panel>

                <Panel header="alarms" key="1" extra={genExtra()}>
                    <Item
                      type="node"
                      size="50*50"
                      shape="alarm-node"
                      model={{
                        color: 'red',
                        label: 'Alarm',
                        category: 'alarm'
                      }}
                    >
                    <Card className={styles.itemCard} bordered={false} style={{borderBottom:"1px solid #eee"}}>
                    <img
                        style={{height:"30px", marginRight: "20px", marginBottom:"10px", marginLeft:"10px"}}
                        alt="example"
                        src="https://image.flaticon.com/icons/svg/272/272340.svg"
                      />
                      <div style={{margin:"unset",width:"100%"}}>
                        <h4 style={{marginBottom:"unset"}}>alarm</h4>
                        <p style={{marginBottom:"10px"}}>alarm instance</p>
                      </div>
                    </Card>
                    </Item>

                </Panel>
            </Collapse>


        </ItemPanel>
        </Drawer>
      );
    }
}

export default FlowItemPanel;
