const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  // host: '193.112.4.143',
  port: 3306,
  database: 'chatroom',
  user: 'root',
  password: '521zhuzhu**'
  // password: ''
});
pool.getConnection(function (err, connection) {
  if (err) {
    console.log(err);
  } else {
    const add = function (data, cb) {
      const addSql = 'insert into user (name, img) value(?, ?)';
      const addData = [data.name, data.headImg];
      // console.log(connection.escape(data.name));
      connection.query(addSql, addData, function (err, rows) {
        // connection.release();   //释放连接
        if (err) {
          cb(true, err);
        } else {
          cb(false, rows);
        }
      })
    }

    const find = function (data, cb) {
      const findSql = `select * from user where name=?`;
      const findData = [data];
      connection.query(findSql, findData, function (err, res) {
        // connection.release();   //释放连接
        if (err) {
          cb(true, err);
        } else {
          cb(false, res);
        }
      })
    }

    const findAll = function (cb) {
      const findSql = 'select * from user';
      connection.query(findSql, function (err, res) {
        // connection.release();   //释放连接
        if (err) {
          cb(true, err);
        } else {
          cb(false, res);
        }
      })
    }

    // const update = function (data, cb) {
    //   const updateSql = 'update userInfo set bookShelf=? where id=?'
    //   const updateData = [data.bookShelf, data.id];
    //   connection.query(updateSql, updateData, (err, res) => {
    //     if (err) {
    //       cb(true, err);
    //     } else {
    //       cb(false, res);
    //     }
    //   })
    // }
    // const updateData = function (data, cb) {
    //   const updateSql = 'update userInfo set img=?, info=?, sex=?, birth=? where id=?'
    //   const updateData = [data.img, data.intro, data.gender, data.birth, data.nickname];
    //   connection.query(updateSql, updateData, (err, res) => {
    //     if (err) {
    //       cb(true, err);
    //     } else {
    //       cb(false, res);
    //     }
    //   })
    // }

    const Delete = function(data, cb) {
      const deleteSql = 'delete from user where name = ?';
      const deleteData = [data.name];
      console.log(deleteData)
      connection.query(deleteSql, deleteData, (err, res) => {
        if (err) {
          cb(true, err);
        } else {
          cb(false, res);
        }
      })
    }

    // exports.updateSql = update;
    // exports.updateData = updateData;
    exports.addSql = add;
    exports.findSql = find;
    exports.deleteSql = Delete;
    exports.findAllSql = findAll;
  }
})