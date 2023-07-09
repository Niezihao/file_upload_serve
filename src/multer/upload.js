/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2023-07-06 21:30:34
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2023-07-08 23:52:06
 * @FilePath: \file_upload_server\src\multer\upload.js
 */
// 引入配置好的 multerConfig
const multerConfig = require('./multerConfig')
const path = require('path') 
const fs = require('fs')
const config = require('../../config')

// 上传到服务器地址
const BaseURL = `${config.host}:{${config.post}}`
// 上传到服务器的目录
const imgPath = '/public/'

const handlePath = (dir) => {
  return path.join(__dirname, './', dir)
}

// 上传接口的 请求参数req  响应参数res
function uploadAvatar(req, res) {
  return new Promise((resolve, reject) => {
    multerConfig.single('file')(req, res, function (err) {
      if (err) {
        reject(err)
      } else {
        // 对图片进行去重删除和重命名
        hanldeImgDelAndRename(req.body.id, req.file.filename, handlePath('../../public'))
        const img = req.file.filename.split('.')
        resolve({
          id: req.body.id,
          img_url: BaseURL + imgPath + img[0] + '.' + req.body.id + '.' + img[1]
        })
      }
    })
  })
}

// 对图片进行去重删除和重命名
const hanldeImgDelAndRename = (id, filename, dirPath) => {
  // TODO 查找该路径下的所有图片文件
  fs.readdir(dirPath, (err, files) => {
    for (let i in files) {
      // 当前图片的名称
      const currentImgName = path.basename(files[i])
      // 图片的名称数组：[时间戳, id, 后缀]
      const imgNameArr = currentImgName.split('.')

      // TODO 先查询该id命名的文件是否存在，有则删除
      if (imgNameArr[1] === id) {
        const currentImgPath = dirPath + '/' + currentImgName
        fs.unlink(currentImgPath, (err) => { })
      }

      // TODO 根据新存入的文件名(时间戳.jpg)，找到对应文件，然后重命名为: 时间戳 + id.jpg
      if (currentImgName === filename) {
        const old_path = dirPath + '/' + currentImgName
        const new_path = dirPath + '/' + imgNameArr[0] + '.' + id  + path.extname(files[i])
        // 重命名该文件，为用户 id
        fs.rename(old_path, new_path, (err) => { })
      }
    }
  })
}

module.exports = uploadAvatar