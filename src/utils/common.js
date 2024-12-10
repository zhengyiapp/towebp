/**
 * @description: 平面数组转树形结构
 * @param {Object} options
 * @return {Array}
 */
export const toTree = options => {
  let {data = [], key = '_id', pKey = 'pid', cKey = 'children'} = options
  if (!(data instanceof Array) && data.length === 0) return []
  data = JSON.parse(JSON.stringify(data))
  return data.filter(father => {
    let children = data.filter(child => father[key] === child[pKey])
    if (children.length) father[cKey] = children
    return !father[pKey] || father[pKey] == '0'
  })
}

// query对象转url格式
export const query2str = (query) => {
  const params = new URLSearchParams()
  for (const key in query) {
    params.append(key, query[key])
  }
  return params.toString()
}

export const preZero = (n) => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export const dateFormat = (date, format='YYYY-MM-DD') => {
  if (!(date instanceof Date)) {
    date = date ? new Date(date) : new Date()
  }
	const year = date.getFullYear()
	const month = preZero(date.getMonth()+1)
	const day = preZero(date.getDate())
  const hours = preZero(date.getHours())
  const minutes = preZero(date.getMinutes())
  const seconds = preZero(date.getSeconds())
	return format.replace('YYYY', year).replace('MM', month).replace('DD', day).replace('hh', hours).replace('mm', minutes).replace('ss', seconds)
}

export const dateFromID = (id, format='YYYY-MM-DD') => {
  if (!id) return
  const t = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000)
  return dateFormat(t, format)
}

export const numFormat = num => {
  if (num > 10000) return `${Math.round(num/1000*10)/100}w`
  if (num > 1000) return `${Math.round(num/100*10)/100}k`
  return num || 0
}

export const byteFormat = size => {
  const KB=1024,MB=KB*1024,GB=MB*1024,TB=GB*1024;
  if (size>TB) return `${Math.round(size/TB*100)/100}T`;
  if (size>GB) return `${Math.round(size/GB*100)/100}G`;
  if (size>MB) return `${Math.round(size/MB*100)/100}M`;
  if (size>KB) return `${Math.round(size/KB*100)/100}K`;
  else return `${size}B`;
}

export const copy = (str) => {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(str).then(resolve).catch(reject)
    } else {
      const input = document.createElement('textarea')
      input.value = str
      input.style.cssText = 'position:fixed;opacity:0'
      document.body.append(input)
      input.select()
      document.execCommand('copy')
      input.remove()
      resolve()
    }
  })
}

/*
	获取随机字符串
	@params:
	len: 字符串长度
	@return[String]：字符串
*/
export const generateMixed = (len=6, justNum=false) => {
	const nums = '0123456789';
	let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (justNum) chars = nums
  else chars += nums
	let cLen = chars.length - 1
	let res=''
	for(let i=0; i<len; i++){
		let index=Math.ceil(Math.random()*cLen)
		res+=chars[index]
	}
	return res
}