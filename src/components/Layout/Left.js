import React, {PropTypes} from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';



import styles from './Left.less';
function getMenuKeyFromUrl(pathname) {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {
  }
  return key;
}

function Header({location}) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h1 className={styles.title}><Icon type="cloud" /> XX系统</h1>
      </div>
      <Menu
        selectedKeys={[getMenuKeyFromUrl(location.pathname)]}
        mode="inline"
        theme="dark"
      >
        <Menu.SubMenu key="sub1" title={<span><Icon type="user" />运单管理</span>}>
          <Menu.Item key="waybill">
            <Link to="/waybill">运单增删改查询</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.object,
};

export default Header;
