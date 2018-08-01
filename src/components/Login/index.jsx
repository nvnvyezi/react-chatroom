import React, { Component } from 'react';
import './index.less'
import io from 'socket.io-client';
import {withRouter} from "react-router-dom";
import Toast from '../Common/Toast/Index'

let socket = null;
const imgArr = [];
for (let i = 1; i <= 40; i++) {
  imgArr.push(i);
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headImg: 'http://193.112.4.143/img/default.png'
    }
  }


  componentWillUnmount = () => {
    if (socket) {
      socket.close();
    }
  }

  _login = () => {
    const val = document.getElementById('name').value;
    let userData = {
      name: val,
      headImg: this.state.headImg
    }
    if (val) {
      socket = io(`http://${window.location.hostname}:3005`);
      // socket = io(`http://193.112.4.143:3005`);
      socket.on('connect_error', (error) => {
        console.log(error);
      });
      socket.emit('login', userData);
      socket.on('loginResult', (data) => {
        Toast(data.data, 1000, {});
        if (!data.err) {
          setTimeout(() => {
            this.props.history.push({
              pathname: '/Room',
              state: userData
            });
          }, 500);
        } else {
          socket.close();
        }
      });
      socket.on('disconnect', () => {
        socket.open();
      });
    } else {
      alert('error');
    }
  }
  _selectImg = (e) => {
    this.setState({
      headImg: e.target.src
    })
    let imgList = document.getElementsByClassName(`login-img`);
    for (let i = 0; i < imgList.length; i++) {
      imgList[i].classList.remove('select');
    }
    e.target.classList.add('select');
  }

  render() {
    const prefixCls = 'login';
    return (
      <div className={prefixCls}>
        <header className={`${prefixCls}-header`}>
          <h1 className={`${prefixCls}-title`}>Welcome to Chatroom</h1>
        </header>
        <div className={`${prefixCls}-middle`}>
          <div>
            <input className={`${prefixCls}-input`} type="text" id="name" placeholder="请输入你要使用的ID" />
            <button className={`${prefixCls}-btn`} onClick={() => this._login()}>确认</button>
          </div>
          <div className={`${prefixCls}-headImg`}>
            {
              imgArr.map((item, index) => <img onClick={(e) => this._selectImg(e)} className={`${prefixCls}-img`} src={`http://193.112.4.143/img/${item}.jpg`}  key={index} alt="头像"/>)
            }
          </div>
        </div>
        <footer className={`${prefixCls}-footer`}>
          <p>在这里面你可以为所欲为</p>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);