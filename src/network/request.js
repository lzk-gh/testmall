import axios from 'axios'
// 封装axios
export function request(config) {
  // 创建实例
  const instance = new axios.create({
    // baseURL:'http://123.207.32.32:8000',
    // baseURL:'http://adi-v3.dev',
    // baseURL: 'http://152.136.185.210:7878/api/m5',
    // baseURL: 'http://localhost:3000/',
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout:5000
  });

  // 请求拦截器
  instance.interceptors.request.use(config => {
    //拦截后需要将拦截下来的请求数据返回发送
    return config;
  }, err => {
    console.log(err);
  })

  // 响应拦截器
  instance.interceptors.response.use(res => {
    // 拦截后需要将拦截下来处理成的结果返回
    return res.data
  }, err => {
    console.log(err)
  })

  // 发送真正的网络请求
  return instance(config)
}
