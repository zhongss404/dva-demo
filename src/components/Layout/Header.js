import React, { Component, PropTypes } from 'react';
import {
  Row,
  Col,
  Icon,
  Badge,
  Tooltip,
  Breadcrumb
} from 'antd';

import styles from  './Header.less';

export default class Header extends Component {

  handleSearch(e) {
    if (e.which === 13) {
      alert('搜索功能尚未添加...')
    }
  }

  render() {
    return (
      <Row type="flex" align="middle" className={styles.container}>
        <Col span={12} className={styles.left}>
          <Row type="flex" align="middle" justify="start">
            <div className={styles.breadcrumb}>
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                <Breadcrumb.Item>某应用</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Row>
        </Col>

        <Col span={12} className={styles.right}>
          <Row type="flex" align="middle" justify="end">
            <Tooltip placement="bottom" title="日历">
              <Icon type="calendar" className={styles.icon} />
            </Tooltip>

            <Tooltip placement="bottom" title="通知">
              <Badge dot className={styles.badge}>
              <Icon type="notification" className={styles.notification} />
              </Badge>
            </Tooltip>

            <Tooltip placement="bottom" title="设置">
              <Icon type="setting" className={styles.icon} />
            </Tooltip>
          </Row>
        </Col>

      </Row>
    );
  }
}
