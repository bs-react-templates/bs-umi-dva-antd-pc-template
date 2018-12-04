import { isUrl } from 'utils/utils';

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
let formatMenuData=[];
let menuMap=null;

let funcMap={};
export function setMenuData(newMenuData) {
  menuData=newMenuData;
/*  formatMenuData=[];
  funcMap={};
  menuMap={};*/

}
export function getFuncMap(newMenuData) {
  return funcMap;
}
function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path,btnMenus } = item;
    if (!isUrl(path)) {
        path = parentPath + item.path;
    }
    if (btnMenus&&btnMenus.length>0){
      funcMap[path]=[];
      btnMenus.forEach(item=>{
        funcMap[path].push(item.menuId);
      })
    }
    const result = {
            ...item,
        path,
        authority: item.authority || parentAuthority,
};
if (item.children&&item.children.length>0) {
    result.children = formatter(
        item.children,
                `${parentPath}${item.path}/`,
    item.authority
);
}else{
  result.children=[];
}

return result;
});
}
export const getMenuData = () => {
  if (formatMenuData.length===0)
    formatMenuData=formatter(menuData);
  return formatMenuData;
}
const createMenuMap=(items)=>{
   let menuMap={};
   items.forEach((item)=>{
     const {path,children}=item;
       menuMap[path]=path;
       if (children&&children.length){
         menuMap={...menuMap,...createMenuMap(children)}
       }
   })
return menuMap;

}
export const getMenuMap=()=>{
  if (!menuMap){
    menuMap=createMenuMap(menuData)
  }
  return menuMap;
}
function formatterBreadcrumb(data) {
    return data.reduce((result, current) => {
        let childrenResult = {};
    if (current.children) {
        childrenResult = formatterBreadcrumb(current.children);
    }
    return {
        ...result,
        [current.path]: {
        name: current.name,
    },
...childrenResult,
};
}, {});
}

export const getBreadcrumbNameMap = () => formatterBreadcrumb(getMenuData(menuData));
