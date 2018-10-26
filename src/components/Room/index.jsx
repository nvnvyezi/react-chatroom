import React from 'react'
import './index.less'
import ChatBox from "../Common/chatBox/index";
import io from 'socket.io-client';
import {withRouter} from "react-router-dom";
import Toast from '../Common/Toast/Index'
// import Recorder from "./Voice/recorder";

// let recorder = new Recorder();
let socket = null;
class Room extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: [],
      allUser: [],
      boxFlag: false,
      srcAudio: ''
    }
  }

  // componentWillMount() {
  //   console.log(this.props.location.state);
  //   if (!this.props.location.state) {
  //     this.props.history.push('/');
  //   }
  // }

  componentDidMount = () => {
    socket = io(`http://${window.location.hostname}:3005`);
    // socket = io(`http://193.112.4.143:3005`);
    socket.on('connect_error', (error) => {
      console.log(error);
    });

    socket.on('welcome', data => {
      Toast(`${data}已经加入房间`, 3000, {})
    })

    socket.on('disconnect', () => {
      socket.open();
    });

    socket.on('message', data => {
      let arr = [];
      if (this.state.text.length === 10) {
        arr = this.state.text.slice(1);
      } else {
        arr = this.state.text;
      }
      arr.push(data);
      this.setState({
        text: arr
      })
    })
    socket.emit('all');
    socket.on('allResult', (data) => {
      // console.log(data);
      this.setState({
        allUser: data
      })
    })

    socket.on('delResult', data => {
      // console.log(data);
      if (!data.err) {
        Toast(`${data.name}已经退出`);
      }
    })
  }
  componentWillUnmount = () => {
    if (this.props.location.state) {
      socket.emit('delete', this.props.location.state.name);
    }
    socket.close();
  }

  _send = () => {
    const inp = document.getElementById('user');
    const val = inp.value;
    let arr = [];
    socket.emit('user', {text: val, data: this.props.location.state, flag: false});
    if (this.state.text.length === 10) {
      arr = this.state.text.slice(1);
    } else {
      arr = this.state.text;
    }
    arr.push({text: val, data: this.props.location.state, flag: true});
    this.setState({
      text: arr
    })
    inp.value = '';
  }
  _exit = () => {
    if (this.props.location.state) {
      socket.emit('delete', this.props.location.state.name);
    }
    socket.close();
    this.props.history.push('/');
  }
  _change = () => {
    this.setState({
      boxFlag: !this.state.boxFlag
    })
  }
  _sound = () => {
    // recorder.start();
    // Recorder.get(function (rec) {
      // recorder = rec;
      // Recorder.start();
    // });
  }
  _soundStop = () => {
    // scriptNode.disconnect();
    // console.log(buffers)
  }

  render () {
    const prefixCls = 'room';
    const flag = this.state.boxFlag;
    return (
      <div className={prefixCls}>
        <header className={`${prefixCls}-header`}>
          <section className={`${prefixCls}-name`}>{'游客'}</section>
          <section>
            <h3 className={`${prefixCls}-title`}>chatroom</h3>
            <i className={`${prefixCls}-header-icon`} onClick={() => this._change()}></i>
          </section>
          <button className={`${prefixCls}-exit`} onClick={() => this._exit()}>退出</button>
        </header>
        {
          flag &&
          <div className={`${prefixCls}-users`}>
            {
              this.state.allUser.map((item, index) => {
                return (
                  <div key={index}>
                    <span>{item.name}</span>
                    <img src={item.img} alt=""/>
                  </div>
                )
              })
            }
          </div>
        }
        <main className={`${prefixCls}-middle`}>
        {
          this.state.text.map((item, index) =>
            <ChatBox text={item} key={index}/>
          )
        }
        <audio id="audio" src={this.state.srcAudio} controls className={`${prefixCls}-audio`}></audio>
        </main>
        <footer className={`${prefixCls}-footer`}>
          <section className={`${prefixCls}-voice`} onClick={() => this._sound()}></section>
          <input className={`${prefixCls}-input`} type="text" id="user"/>
          <section className={`${prefixCls}-icon`} onClick={() => this._soundStop()}></section>
          <button className={`${prefixCls}-btn`} onClick={() => this._send()}>提交</button>
        </footer>
      </div>
    );
  }
}

export default withRouter(Room);