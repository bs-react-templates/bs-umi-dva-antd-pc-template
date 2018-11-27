
let routerData=null;
// function getFlatMenuData(menus) {
//   let keys = {};
//   menus.forEach(item => {
//     if (item.children) {
//       keys[item.path] = { ...item };
//       keys = { ...keys, ...getFlatMenuData(item.children) };
//     } else {
//       keys[item.path] = { ...item };
//     }
//   });
//   return keys;
// }
export const getRouterData=(routerConfig)=>{
  if (!routerData){
    routerData=createRouter(routerConfig)
  }
  return routerData;
}

const createRouter = (routerConfig) => {



  // Route configuration data
  // eg. {name,authority ...routerConfig }
  let routerData = {};
  // The route matches the menu
  routerConfig.forEach(item => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    let path=item['path'];
    if (!path){return;}

    let router =item;
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,


    };
    if (item.routes){
      routerData={...routerData,...getRouterData(item.routes)}
    }
    routerData[path] = router;
  });
  return routerData;
};
