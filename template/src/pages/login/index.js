import React, { Component } from 'react';
import { connect } from 'dva';
import Login from 'components/Login/index';
import styles from './index.less';
const {  UserName, Password, Submit,CheckCode } = Login;

@connect(({ login }) => ({
  login:login,
}))
export default class LoginPage extends Component {
  handleSubmit = (err, values) => {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
  }


  changeCode  = () => {

  }
  render() {
    const { submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login onSubmit={this.handleSubmit}>
          <div key="account" tab="账户密码登录">
            <UserName name="operatorAccount" placeholder="操作员账号" />
            <Password name="password" placeholder="密码" />
            <div className={styles.checkcode}>
                <CheckCode placeholder="" name="macCode" className={styles.codeinput} />
                <img
                  src=""
                  alt=""
                  id="changeCode"
                  className={styles.codeImg}
                  onClick={this.changeCode}
                />
            </div>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
