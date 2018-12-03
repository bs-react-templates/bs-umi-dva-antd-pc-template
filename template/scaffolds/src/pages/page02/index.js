import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'dva';

import styles from './index.less';

function Page02(props) {
  return (
    <div className={styles.normal}>
      Route Component: Page02
    </div>
  );
}

// Page01.propTypes = {
// };

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Page02);
