import axios from 'axios'

// 3. 配置信息
let config = {
    // 每次请求的协议、IP地址。  设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
    baseURL: "https://localhost:8011/api/",
    // 请求超时时间
    timeout: 10000,
    // 每次请求携带token,
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
}

const instance = axios.create(config)

// 4. 导出
export default instance