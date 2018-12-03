import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'dva';

import styles from './index.less';

function Page01child(props) {
  return (
    <div className={styles.normal}>
      Route Component: Page01child
    </div>
  );
}

// Page03.propTypes = {
// };

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Page01child);
