import React from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import { getMenuData } from 'common/menu';
function IndexPage({ login }) {
  if (login) {
    return <Redirect to="/login" />;
  }
  let menuData=getMenuData();
if (menuData.length>0){
  let firstUrl='';
  const {path,url,children} =menuData[0];
  if (!url && children.length>0){
    firstUrl=children[0].path;
  }else{
    firstUrl=path;
  }
  return <Redirect to={firstUrl}/>;
}
  return (
   <div></div>
  );
}

IndexPage.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    login: state.global.login,
  };
}

export default connect(mapStateToProps)(IndexPage);

