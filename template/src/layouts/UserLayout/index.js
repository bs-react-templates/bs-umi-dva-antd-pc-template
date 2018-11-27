import React, { Fragment } from 'react';
import Link from 'umi/link';
import DocumentTitle from 'react-document-title';
import GlobalFooter from 'components/GlobalFooter';
import styles from './index.less';
import loginBgImg from 'assets/loginBg.jpg';
import loginTitleImg from 'assets/loginTitle.png';

const links = [];
const copyright = (<Fragment>
  <span style={{
       color: '#fff',
    }}
  >
    福建博思软件<br/>
    闽ICP备17021229号 客服电话：400-877-1666 服务时间：9:00-17:30
  </span>
</Fragment>);

class UserLayout extends React.PureComponent {
  state = {
    
  };
  getPageTitle() {
    let title = 'Umi Dva Antd Starter';
    return title;
  }

  render() {
    const { children } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div
          className={styles.container}
          style={{
            backgroundImage: 'url(' + loginBgImg + ')',
          }}
        >
          <div
            style={{
              height: '100%',
              overflow: 'auto',
            }}
          >
            <div className={styles.content}>
              <div className={styles.top}>
                <div className={styles.header}>
                  <Link to="/">
                      <img src={loginTitleImg} alt="" />
                  </Link>
                </div>
                <div className={styles.desc}>服务于商户，帮助商户快速接入，迅速开展业务，实现营收</div>
              </div>
              {children}
            </div>
            <div className={styles.footer}>
            <GlobalFooter links={links} copyright={copyright} />
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;