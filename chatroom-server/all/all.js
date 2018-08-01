const mysql = require('../mysql/mysql');
module.exports = (cb) => {
  mysql.findAllSql((flag, data) => {
    if (flag) {
      cb(true, '查询错误');
      return;
    } else {
      cb(false, data);
    }
  })
}