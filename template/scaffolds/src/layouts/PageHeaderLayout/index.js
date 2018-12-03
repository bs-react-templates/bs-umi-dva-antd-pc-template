import React from 'react';
import Link from 'umi/link';
import PageHeader from 'components/PageHeader';
import styles from './index.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div className={wrapperClassName}>
    {top}
    <PageHeader key="pageheader" {...restProps} linkElement={Link} />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);
