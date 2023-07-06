const express = require('express')

// 导入用户逻辑
const userController = require('../controllers/UserController')

// 创建路由对象
const router = express.Router()

// 设置路由
router.post('/upload/avatar', userController.upload)

// 导入路由对象
module.exports = router