import React, {Component} from 'react';
import {connect} from 'dva';
import Link from 'umi/link';
import Exception from './components/index.js';
import qs from 'qs';
import styles from './index.less';
class Error extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		const {location} = this.props;
    let {urldata}=location;
    if (!urldata){
      urldata=qs.parse(location.search,{ignoreQueryPrefix:true})
    }
		return (
      <Exception
      type={urldata.msg}
      className={styles.exception}
      linkElement={Link}
    />
		)
	}
	
}

export default connect(({error}) => ({
	error,
}))(Error);
