/*
 * @Author: niezihao 1332421989@qq.com
 * @Date: 2023-07-07 09:40:35
 * @LastEditors: niezihao 1332421989@qq.com
 * @LastEditTime: 2023-07-07 17:17:48
 * @FilePath: \file_upload_serve\app.js
 */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./src/routers/index')
const config = require('./config')

// 创建 app 实例
const app = express()

app.use(config.staticPath, express.static(`.${config.staticPath}`))

// 开启跨域支持
app.use(cors())
// 解析表单
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 注册路由
app.use('/user', router)

// 开启监听服务
app.listen(config.post, () => {
  console.log(`express serve running at http://localhost:${config.post}`);
})