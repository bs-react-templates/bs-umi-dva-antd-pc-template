import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import { connect } from 'dva';
import classNames from 'classnames';
import { enquireScreen  } from 'enquire-js';
import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import SiderMenu from 'components/SiderMenu';
import { setMenuData,getMenuData } from 'common/menu';
import PageHeaderLayout from '../PageHeaderLayout/index';
import {Modal} from 'antd'
import logo from 'assets/logo.png'
import '../../themes/index.less';
const { Content, Header, Footer } = Layout;


const links = [];
const copyright = (<Fragment>
    福建博思软件<br/>
    闽ICP备17021229号 客服电话：400-877-1666 服务时间：9:00-17:30
</Fragment>);



/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
  const result = {};
  const childResult = {};
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i;
    }else{
      routerData[i.path]['name'] = i['name'];
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
    }
  }
  return Object.assign({}, routerData, result, childResult);
};
const query = {
  'screen-xs': {
    maxWidth: 575,
    height:'100%',
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
    height:'100%',
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
    height:'100%',
  },
  'screen-xl': {
    minWidth: 1200,
    height:'100%',
  },
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
@connect(({ login,user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
}))
export default class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  state = {
    isMobile,
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(),routerData),
    };
  }
  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'user/getLogin',
  })
  }
  getPageTitle() {
    let title = 'Umi Dva Antd Starter';
    return title;
  }

  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };


  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      Modal.confirm({
        title:'您确定要退出登录吗？',
        okText:'确定',
        cancelText:'取消',
        content:'',
        onOk:()=>{
          this.props.dispatch({
            type: 'login/logout',
          })
        },
      });
    }
  }
  getMenu=(menuData)=>{
    let menus=[];
    let _that=this;
    menuData.forEach((item)=>{
      const {childMenus,name,path,menuGrade,url,btnMenus} = item;
      let children=[]
      if (childMenus&&childMenus.length>0){
         children=_that.getMenu(childMenus);
      }
      menus.push({name,path,icon:'form',children,btnMenus,hideInMenu:menuGrade===3,url});
    });
    return menus;

  }
  render() {
    const {
      currentUser,
      collapsed,
      location,
      children,
      routerData,
    } = this.props;
    let breadcrumbNameMap = getBreadcrumbNameMap(getMenuData(),routerData);
    let menuData= [
      {
        name: '概况',
        icon: 'dashboard',
        path: 'home',
      },
      {
        name: 'page01',
        icon: 'dashboard',
        path:'page01',
        children:[{
          name: 'page01child',
          icon: 'dashboard',
          path: 'page01child',
        }],
      },
      {
        name: 'page02',
        icon: 'dashboard',
        path: 'page02',
      },
      {
        name: 'page03',
        icon: 'dashboard',
        path: 'page03',
      },
    ];
    setMenuData(menuData);
    const layout = (
      <Layout className={'layout-content'}>
        <SiderMenu
        logo={logo}
        title={'Ant Design Pro'}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout >
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              currentUser={currentUser}
              collapsed={collapsed}
              isMobile={this.state.isMobile}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
            />
          </Header>
          <PageHeaderLayout breadcrumbNameMap={breadcrumbNameMap}></PageHeaderLayout>
          <Content style={{ height: '100%', overflow: 'auto',margin:'20px',backgroundColor:'#FFF',padding:'15px'}}>
            {children}
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter links={links} copyright={copyright}/>
          </Footer>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
            {params => <div className={classNames(params,'container-query')}>{currentUser?layout:null}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}