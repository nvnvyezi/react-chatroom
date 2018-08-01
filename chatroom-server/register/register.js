const mysql = require('../mysql/mysql');
module.exports = ({name, headImg}, cb) => {
  if (name == '') {
    cb(true, 'ID为空');
    return ;
  }
  mysql.findSql(name, (flag, data) => {
    if (flag) {
      cb(true, '查询错误');
      return;
    } else {
      if (data.length === 0) {
        mysql.addSql({
          name,headImg
        }, (flag, data) => {
          if (flag) {
            cb(true, '添加错误');
            return;
          } else {
            cb(false, '添加成功');
            return;
          }
        })
      } else {
        cb(true, 'ID已经存在');
        return;
      }
    }
  })
}