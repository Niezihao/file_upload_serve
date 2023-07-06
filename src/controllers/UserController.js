const uploadAvatar = require('../multer/upload')

// 用户的逻辑控制器
class UserController {

  // 头像上传
  async upload(req, res) {
    try {
      const uploadRes = await uploadAvatar(req, res)
      console.log(uploadRes);
      res.send({
        meta: { code: 200, msg: '上传成功！' },
        data: { id: uploadRes.id, img_url: uploadRes.img_url }
      })
    } catch (error) {
      res.send(error)
    }
  }

}

module.exports = new UserController()