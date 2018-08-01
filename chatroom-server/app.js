const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const register = require('./register/register');
const del = require('./delete/delete');
const all = require('./all/all');

const app = express();

const server = app.listen(3005, () => {
  console.log(`3005 is ok`);
})
const io = require('socket.io')(server);

app.use(cors({
  origin: 'http://localhost:3000',
  // origin: 'http://193.112.4.143',
  credentials: true
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));

io.on('connection', function (socket) {
  socket.on('login', function (req) {
    register(req , (flag, data) => {
      socket.emit('loginResult', {err: flag, data});
      if (!flag) {
        socket.broadcast.emit('welcome', req.name);
      }
    });
  });

  socket.on('user', (data) => {
    socket.broadcast.emit('message', data);
  })

  socket.on('all', () => {
    all((flag, data) => {
      if (!flag) {
        socket.emit('allResult', data);
        socket.broadcast.emit('allResult', data);
      }
    })
  })

  socket.on('delete', (dat) => {
    del(dat, (flag, data) => {
      socket.broadcast.emit('delResult', {err: flag, data, name: dat});
    })
  })
  socket.on('disconnect', function () {});
});



// server.listen(3000, () => {
//   console.log(`3000 is ok`)
// });
