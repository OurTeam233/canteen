import axios from './request.js'
import API_axios from "axios"
import qs from 'qs'

/**
 * util工具类
 */
const utils = {
  vueObject: null,

  /**
   * @param {Vue} vueObject 
   * @description 创建utils实例，并且有netWork实例返回
   */
  init: function (vueObject) {
    this.vueObject = vueObject
  },

  /**
   * @param {Vue} vueObject 
   * @param {String} chartName 
   * @param {String}  args [2] 传入一个其他参数，用来设置其他接口
   * @returns {netWork}
   * @description 创建utils实例，并且有netWork实例返回
   */
  setConfig: function (vueObject, chartName) {
    this.vueObject = vueObject
    return new netWork(chartName, arguments[2])
  },

  /**
   * 
   * @param {List} doubleList_data 
   * @param {Object} value 
   * @returns 
   * @description 创建一个二维数组,默认值为value
   */
  createContainer_list(doubleList_data, value) {
    let dobuleList_cache = []
    doubleList_data.forEach((item, outer_index, obj) => {
      dobuleList_cache[outer_index] = []
      item.forEach((item, inner_index, obj) => {
        dobuleList_cache[outer_index][inner_index] = value
      })
    })
    return dobuleList_cache
  },

  /**
   * 
   * @param {String} chartName 
   * @param {String} API_name 
   * @returns {Promise}
   * @description 创建一个自定义API接口
   */
  createAPI_promise: function (chartName, API_name, obj_data) {
    return new Promise((resolve, reject) => {
      axios.post(`${chartName}/${API_name}`, obj_data).then(res => {
        if (res.data.success && utils.propertyHasValue_boolean(res.data, "rows")) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },

  // 重构对象，用于更新信息时获取行内记录（/updateNoNull）
  copyObject: function (object) {
    return JSON.parse(JSON.stringify(object))
  },

  /**
   * @param {*} res 请求的回调数据体
   * @param {String} message 展示的消息体
   * @param {Boolean} args 是否弹出显示消息-默认true
   * @returns {Boolean}
   */
  showMessage: function (res, message) {
    let isShow
    if (arguments[2] === false) {
      isShow = false
    } else {
      isShow = true
    }
    if (res.data.success === true) {
      if (isShow)
        this.vueObject.$message.success(`${message}成功`);
      return true
    } else {
      if (isShow)
        this.vueObject.$message.error(`${message}失败`);
      return false
    }
  },

  /**
   * @param {*} type 
   * @param {*} message 
   */
  notifyBr: function (type, message) {
    if (type === 'success') {
      this.vueObject.$notify({
        message: message,
        type: 'success',
        position: 'bottom-right',
        duration: 1500,
        offset: 5
      });
    } else if (type === 'error') {
      this.vueObject.$notify.error({
        message: message,
        position: 'bottom-right',
        duration: 1500,
        offset: 5
      });
    } else if (type === 'warning') {
      this.vueObject.$notify({
        message: message,
        type: 'warning',
        position: 'bottom-right',
        duration: 1500,
        offset: 5
      });
    } else if (type === 'info') {
      this.vueObject.$notify.info({
        message: message,
        position: 'bottom-right',
        duration: 1500,
        offset: 5
      });
    }
  },

  // 重置表单
  resetForm: function (formName) {
    this.vueObject.$refs[formName].resetFields();
  },

  //手机号正则校验
  checkMobile: function () {
    return (rule, value, cb) => {
      const regMobile =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法手机号"));
    };
  },

  //数组去重
  arrayUnique: function (arr) {
    return Array.from(new Set(arr));
  },

  // 消除字符串首尾的空格
  trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },

  // 防止注入攻击
  checkData: function (v) {
    var temp = v;
    v = v.replace(/\\|\/|\.|\'|\"|\<|\>/g, function (str) {
      return '';
    });
    v = this.trim(v);
    var searchTap = v.length < temp.length ? false : true;
    if (!searchTap) {
      this.vueObject.$message.warning('请勿输入特殊字符或非法字符！');
    }
    return v;
  },

  /**
   *@returns {Object}
   *@description 获取登录者信息对象
   */
  getPersonInfo_Object: function () {
    let str_object = window.sessionStorage.getItem("userInfo");
    let obj_person = JSON.parse(str_object);
    if (obj_person.roleType === 9786) {
      obj_person.str_roleType = "管理员"
    } else if (obj_person.roleType === 1) {
      obj_person.str_roleType = "营养师"
    } else if (obj_person.roleType === 3) {
      obj_person.str_roleType = "商家"
    }
    return obj_person;
  },

  //将对象的图片地址增加随机参数,七牛云缓存机制
  /**
   * @param {List} object
   * @deprecated 
   * @version 1.0
   */
  addRandomSuffixData: function (object) {
    object.forEach((item) => {
      if (item.imgUrl == null || item.imgUrl == "") {} else {
        //存在完整地址
        item.imgUrl = `${item.imgUrl}?random=${Date.now()}`;
      }
    });
  },

  removeRandomSuffix_Key: function (object) {
    let firstParamIndex = object.imgUrl.lastIndexOf("/");
    let secondParamIndex = object.imgUrl.lastIndexOf("?");
    object.imgUrl = object.imgUrl.substring(0, secondParamIndex)
    let key = object.imgUrl.substring(firstParamIndex + 1)
    return key
  },

  /**
   * 
   * @param {Object} object 
   * @param {String} propertyName 
   * @description 七牛云移除对应的后缀,并且返回key
   * @returns {String}
   */
  qnRemoveRandomSuffix_key: function (object, propertyName) {
    let firstParamIndex = object[propertyName].lastIndexOf("/");
    let secondParamIndex = object[propertyName].lastIndexOf("?");
    object[propertyName] = object[propertyName].substring(0, secondParamIndex)
    let key = object[propertyName].substring(firstParamIndex + 1)
    return key
  },

  /**
   * 
   * @param {Array} listData 
   * @param {String} propertyName 
   * @description 为每一项数据图片添加随机后缀
   * @returns {Array}
   */
  qnAddRandomSuffixData_list: function (listData, propertyName) {
    listData.forEach(item => {
      if (item[propertyName] == null || item[propertyName] == "") {

      } else {
        item[propertyName] = `${item[propertyName]}?random=${Date.now()}`
      }
    })
    return listData
  },

  /**
   * @param {object} object 
   * @param {string} propertyName 
   * @description 对象的属性是否含有值 有则返回true 无返回false
   */
  propertyHasValue_boolean: function (object, propertyName) {
    if (object[propertyName] === "" || object[propertyName] === null || object[propertyName].length === 0) {
      return false
    } else {
      return true
    }
  },

  /**
   * 
   * @param {object} object_person 
   * @returns 
   * @description 判断是否为管理员 
   */
  isAdmin_boolean(object_person) {
    if (object_person.str_roleType === "管理员") {
      return true;
    }
    return false;
  },

  /**
   * 
   * @param {Object} object 
   * @returns 
   * @description 判断对象是否为空对象 
   */
  isEmptyObject_boolean(object) {
    for (var key in object) {
      return false
    }
    return true
  },

  /**
   * 去除日期中的时分秒
   * @param {*} date：带time的日期格式 
   * @returns 
   */
  formatDate: function (date) {
    return date.substring(0, 11);
  },

  /**
   * 获取某月份的天数
   * @param {*} val 
   */
  getMonthDays: function (year, month) {
    var thisDate = new Date(year, month, 0);  //当天数为0 js自动处理为上一月的最后一天
    return thisDate.getDate();
  }
}



/**
 * 封装promise请求，对外使用promise调用
 */
const promise = {
  /**
   * @param {number} id 
   * @returns {Promise}
   * @deprecated 可被getAPI_promise()取代
   */
  getUserWeixinInfo_promise(id) {
    return new Promise((resolve, reject) => {
      let condition = `userweixin.id=${id}`;
      new netWork("UserManageAction")
        .getAPI({
          condition: condition
        })
        .then((res) => {
          if (res.data.success && utils.propertyHasValue_boolean(res.data, "rows")) {
            resolve(res);
          } else {
            reject(res)
          }
        });
    });
  },
  /**
   * 
   * @param {String} str_key 
   * @returns {promise}
   */
  getQiNiuToken_promise(str_key) {
    return new Promise((resolve, reject) => {
      QiNiu.getToken(str_key).then((res) => {
        if (res.data.success) {
          resolve(res);
        } else {
          reject(res)
        }
      });
    });
  },
  /**
   * 
   * @param {String} base64Str 
   * @param {String} token 
   * @param {String} keyStr 
   * @returns {promise}
   * @description 使用XMLHttpRequest请求封装函数
   */
  putBase64ImageWithXhr_promise(base64Str, token, keyStr) {
    return new Promise((resolve, reject) => {
      //需要key
      //对应的key需要转成base64
      let keyBase64 = btoa(encodeURI(keyStr));
      console.log('keyBase64', keyBase64);
      console.log("encodeURI(keystr)=", encodeURI(keyStr));
      let url = `http://upload.qiniup.com/putb64/-1/key/${keyBase64}`;
      let xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          //响应
          console.log("xhr.response===", xhr.response);
          resolve(true);
        }
      };

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.setRequestHeader("Authorization", `UpToken ${token}`);
      xhr.send(base64Str);
    });
  },
  /**
   * 
   * @param {netWork} netWork
   * @param {{pageSize:number,pageNum:number,condition:String}} queryInfo exist or null
   * @param {object} args -[2]显示showMessage()|true or false
   * @returns {Promise}
   */
  getAPI_promise(netWork, queryInfo) {
    return new Promise((resolve, reject) => {
      netWork.getAPI(queryInfo).then(res => {
        if (utils.showMessage(res, "获取数据", arguments[2])) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 
   * @param {netWork} netWork 
   * @param {Object} setInfo 
   * @returns {Promise}
   */
  setAPI_promise(netWork, setInfo) {
    return new Promise((resolve, reject) => {
      netWork.setAPI(setInfo), then(res => {
        if (utils.showMessage(res, "设置", arguments[2])) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 
   * @param {netWork} netWork 
   * @param {*} addInfo 
   * @returns {Promise}
   */
  addAPI_promise(netWork, addInfo) {
    return new Promise((resolve, reject) => {
      netWork.addAPI(addInfo).then(res => {
        if (utils.showMessage(res, "设置", arguments[2])) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 
   * @param {netWork} netWork 
   * @param {{ids:string}} list_ids example-"1,2,3"
   * @returns {Promise}
   */
  deleteAPI_promise(netWork, list_ids) {
    return new Promise((resolve, reject) => {
      netWork.deleteAPI(list_ids), then(res => {
        if (utils.showMessage(res, "设置", arguments[2])) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
}

/**
 *  quillEditor 编辑器含有特定的数据格式
 */
const quillEditor_utils = {
  /**
   * 
   * @param {String} str_data 
   * @returns {String}
   * @description 返回图片后缀名称
   */
  getImageSuffixName_str(str_data) {
    let firstParamIndex = str_data.indexOf("/");
    let secondParamIndex = str_data.indexOf(";");
    let str_formatData = str_data.substring(
      firstParamIndex + 1,
      secondParamIndex
    );
    return str_formatData;
  },
  /**
   * 
   * @param {List} list_data 
   * @returns {List}
   * @description 获取图象的base64码,并返回列表
   */
  getImageBase64_list(list_data) {
    let firstParamIndex;
    let list_formatData = [];
    list_data.forEach((item) => {
      firstParamIndex = item.indexOf(",");
      list_formatData.push(item.substring(firstParamIndex + 1));
    });
    return list_formatData;
  },
  /**
   * 
   * @param {String} str_data 
   * @returns {Boolean}
   * @description 返回的数据是否是图片
   */
  differImage_boolean(str_data) {
    let firstParamIndex = str_data.indexOf(":");
    let secondParamIndex = str_data.indexOf(";");
    let str_formatData = str_data.substring(
      firstParamIndex + 1,
      secondParamIndex
    );
    if (str_formatData === "image/jpeg" || str_formatData === "image/png") {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 
   * 对比旧数据与新数据 找出需要删除的key
   */
  toDeteleOldImage_list(oldImageValue, newImageValue) {
    let list_key = []
    return list_key
  }

}

/**
 * @description 自定义axios封装类，对外使用Axios调用
 * @instance 
 */
class Axios {
  API_axios
  timeout
  baseURL
  contentType
  boolean_qs
  static static_API_axios = new Axios({})
  /**
   * @param {{baseURL:string,timeout:number,contentType:string,boolean_qs:boolean}} axios_config  
   * @default baseURL:"/api",timeout:8000,contentType:"application/x-www-form-urlencoded",boolean_qs:true
   */
  constructor(axios_config) {
    this.baseURL = axios_config.baseURL || "/api"
    this.timeout = axios_config.timeout || 8000
    this.contentType = axios_config.contentType || "application/x-www-form-urlencoded"
    this.boolean_qs = axios_config.boolean_qs === false ? false : true
    this.API_axios = API_axios.create({
      baseURL: `${this.baseURL}`,
      timeout: this.timeout
    })
    this.setConfig()
    this.setReturnConfig()
  }

  setConfig() {
    this.API_axios.interceptors.request.use(config => {
      let token = sessionStorage.getItem('token')
      config.headers.token = token
      if (this.boolean_qs) {
        console.log("this.boolean_qs=", this.boolean_qs);
        config.data = qs.stringify(config.data)
      }
      config.headers["Content-Type"] = `${this.contentType}`
      return config
    })
  }
  setReturnConfig() {
    this.API_axios.interceptors.response.use(config => {
      return config
    })
  }
  /**
   * 
   * @param {String} chartName 
   * @param {String} API_name 
   * @param {Object} obj_data 
   * @returns {Promise}
   * @description 创建一个自定义接口
   */
  post_promise(chartName, API_name, obj_data) {
    return new Promise((resolve, reject) => {
      this.API_axios.post(`${chartName}/${API_name}`, obj_data).then(res => {
        if (res.data.success) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  }
}

/**
 * @param {String} chartName 
 * @param {String} arguments [1]
 * @returns {Object}
 * @description 保留基本API增删改查 以及附加一个arguments[1]对应的其他API功能接口，，对外使用netWork调用
 */
function netWork(chartName) {
  this.log_chartName = (chartName) => {
    console.log(chartName)
  }
  this.getAPI = (queryInfo) => axios.post(`${chartName}/getBasicInfos`, queryInfo)
  this.setAPI = (updateInfo) => axios.post(`${chartName}/updateNoNull`, updateInfo)
  this.addAPI = (addInfo) => axios.post(`${chartName}/addObject`, addInfo)
  /**
   * @param {{ids:String}} stringIds 
   * @returns 
   */
  this.deleteAPI = (stringIds) => axios.post(`${chartName}/deleteByIds`, stringIds)
  if (arguments[1] !== null) {
    /**
     * @param {Object} obj_info 
     * @returns  {Promise}
     * @description 自定义功能接口,包括自定义参数
     */
    this.otherAPI = (obj_info) => axios.post(`${chartName}/${arguments[1]}`, obj_info)
  }
  //用户管理使用密码重置
  // this.adminResetPwd = (stringIds) => axios.post(`${chartName}/adminResetPwd`, stringIds)
  // this.selfResetPwd = (oldPwd, newPwd) => axios.post(`${chartName}/selfSetPwd`, { oldPwd: oldPwd, newPwd: newPwd })
}

export {
  netWork,
  utils,
  promise,
  quillEditor_utils,
  Axios
}