import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: '操作员账号',
    },
    rules: [{
      required: true, message: '请输入操作员账号',
    }],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '密码',
    },
    rules: [{
      required: true, message: '请输入密码!',
    }],
  },
  CheckCode: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="safety" className={styles.prefixIcon} />,
            placeholder: '验证码',
        },
        rules: [{
          required: true,
          message: '请输入验证码',
        }],
  },
  Mobile: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: 'mobile number',
    },
    rules: [{
      required: true, message: 'Please enter mobile number!',
    }, {
      pattern: /^1\d{10}$/, message: 'Wrong mobile number format!',
    }],
  },
  Captcha: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: 'captcha',
    },
    rules: [{
      required: true, message: 'Please enter Captcha!',
    }],
  },
};

export default map;
