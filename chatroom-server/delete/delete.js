const mysql = require('../mysql/mysql');

module.exports = (name, cb) => {
  if (name == '') {
    cb(true, 'ID为空');
    return ;
  }
  mysql.findSql(name, (flag, data) => {
    if (flag) {
      cb(true, '查询错误');
      return;
    } else {
      if (data.length !== 0) {
        mysql.deleteSql({
          name
        }, (flag, data) => {
          if (flag) {
            cb(true, '删除错误');
            return;
          } else {
            cb(false, '删除成功');
            return;
          }
        })
      } else {
        cb(true, 'ID不存在');
        return;
      }
    }
  })
}