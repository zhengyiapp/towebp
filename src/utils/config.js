const isDev = import.meta.env.DEV
const port = import.meta.env.VITE_PORT

const mapApp = {
  6001: '',
  6003: '_pic',
  6002: '_nav',
}

const mapFetchUrl = {
  6001: 'https://api.dly6.cn',
  6002: 'https://maonavapi.dly6.cn',
  6003: 'https://dly6.cn:6003',
}

export default {
  fetchURL: mapFetchUrl[port],
  redirectURL: '',
  tgURL: 'https://api.telegram.org',
}