import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'dva';

import styles from './index.less';

function Page03(props) {
  return (
    <div className={styles.normal}>
      Route Component: Page03
    </div>
  );
}

// Page02.propTypes = {
// };

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Page03);
