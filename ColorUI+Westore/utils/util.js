const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const json2Form = json => {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('/');
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
 */
function formatTimeTwo(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

// 定义url字符串拼接的方法
const urlQuery = (options) => {
  let {
    url,
    query
  } = options;
  if (!url) return '';
  if (query) {
    let queryArr = [];
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        queryArr.push(`${key}=${query[key]}`)
      }
    }
    if (url.indexOf('?') !== -1) {
      url = `${url}&${queryArr.join('&')}`
    } else {
      url = `${url}?${queryArr.join('&')}`
    }
  }
  return url;
}


// module.exports = {
//   formatTime: formatTime,
//   json2Form: json2Form,
//   formatDate: formatDate,
//   formatTimeTwo: formatTimeTwo,
//   urlQuery: urlQuery,
// }

export {
  formatTime,
  json2Form,
  formatDate,
  formatTimeTwo,
  urlQuery,
}