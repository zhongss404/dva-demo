import React, { PropTypes } from 'react';
import styles from './Layout.less';
import Left from './Left';
import Header from './Header'

function Layout({ children, location }) {
  return (
    <div className={styles.normal}>
      <div className={styles.left}>
        <Left location={location} />
      </div>
      <div className={styles.content}>
        <div>
          <Header/>
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
};

export default Layout;
