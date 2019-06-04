import React from 'react';
import { Row, Col, PageHeader, Icon } from 'antd';

import styles from '../index.less';

const Header = () => {

  return (
        <Row type="flex">
            <PageHeader className={styles.pageHeader} title="RCA" subTitle="Root Cause Analysis">
                    <span style={{margin: "auto", fontWeight: "500"}}>Current st2-demos.diskspace_remediation {" "}
                        <Icon style={{fontSize:"18px", verticalAlign:"bottom"}} type="setting" />
                    </span>
                    <span style={{fontWeight: "500", display:"flex", height:"55px", marginRight:"-10px", alignItems:"center"}}>
                        <span>
                        st2admin@192.168.16.20:443{" "}<Icon style={{fontSize:"18px", verticalAlign:"sub"}}  type="user" />
                        </span>
                        <Icon style={{fontSize:"18px", marginRight:"10px", verticalAlign:"sub"}}  type="question-circle" />
                        <Icon style={{fontSize:"18px", verticalAlign:"middle", height:"100%",width:"33px", backgroundColor:"#792E6F", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}  type="up" />
                    </span>
            </PageHeader>
        </Row>
    );
};

export default Header;
