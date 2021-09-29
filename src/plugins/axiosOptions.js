import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router/index.js'

// 3. 配置信息
let config = {
    // 每次请求的协议、IP地址。  设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
    baseURL: "https://localhost:8011/api/",
    // 请求超时时间
    timeout: 10000
}

const instance = axios.create(config)

instance.interceptors.request.use(config => {
    const token = "Bearer " + localStorage.getItem("token");
    token && (config.headers.Authorization = token)
    return config;
}, error => {
    return Promise.error(error);
})

// instance.interceptors.response.use(response => {

// }, error => {
//     if (error.response.status) {
//         var message = "";
//         switch (error.response.status) {
//             case 401:
//                 localStorage.removeItem("token");
//                 Message.error("未授权，请重新登录");
//                 router.push("/");
//                 break;
//             case 404:
//                 Message.error()
//         }
//     }
// })

// 4. 导出
export default instance