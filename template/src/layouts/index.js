import React from 'react';
import pathToRegexp from 'path-to-regexp';
import BasicLayout from 'layouts/BasicLayout/index';
import UserLayout from 'layouts/UserLayout/index';
import withRouter from 'umi/withRouter';
import {getRouterData} from '../common/router'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';


export default withRouter(({ children, location,route, ...restProps }) => {
  const {routes}=route;
  let routerData=getRouterData(routes);
  const { pathname } = window.location;
  let LayoutComponent = BasicLayout;
  if (pathToRegexp('/login(.*)').test(pathname)) {
    LayoutComponent = UserLayout;
  } else {
    LayoutComponent = BasicLayout;
  }
  return (
    <LocaleProvider locale={zhCN}>
      <LayoutComponent location={location} routerData={routerData}>{children}</LayoutComponent>
    </LocaleProvider>
  );
});

