/* global window */
import axios from 'axios'
import qs from 'qs'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import router from 'umi/router';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};
function checkStatus(response) {

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;

  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}
const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
    paramsSerializer=null,
  } = options

  const cloneData = lodash.cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/)
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    message.error(e.message)
  }



  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      return axios.post(url, cloneData)
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {
  /*if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS'
      } else if (YQL && YQL.indexOf(origin) > -1) {
        options.fetchType = 'YQL'
      } else {
        options.fetchType = 'JSONP'
      }
    }
  }*/

  return fetch(options).then((response) => {
    checkStatus(response)
    const { statusText, status } = response
    let data = response.data

    const {respCode,respMsg}=data;
    if (respCode==='00'){
      return Promise.resolve({
        ...data,
        success: true,
      })
    }else{

      const error = new Error(respMsg);
      error.name = response.status;
      error.response = response;
      throw error;
    }

  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode,respCode;
    if (response && response instanceof Object) {
      const { data } = response
      statusCode = response.status
      msg = data.respMsg ? data.respMsg : 'Network Error';
      respCode=data.respCode;
      if (respCode==='1001015'||respCode==='1001005'|| respCode==='1001999'){
        //router.push('/login')
        setTimeout(()=>{
          window.location.href='/login';
        }, 2000);

      }
        if(respCode === '1001023'|| respCode === '1001007'|| respCode === '1001001'){
            let dom = document.getElementById('changeCode');
            if(dom){
                dom.src='/api/operator/getOperatorVertify?rnd='+ Math.random();
            }
        }
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }

    return Promise.reject({ success: false, statusCode,respCode, message: msg })
  })
}
