const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./src/routers/index')

// 创建 app 实例
const app = express()

app.use('/public/', express.static('./public/'))

// 开启跨域支持
app.use(cors())
// 解析表单
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 注册路由
app.use('/user', router)

// 开启监听服务
app.listen('3001', () => {
  console.log('express serve running at http://localhost:3001');
})