import React from "react";
import './index.less'
import classNames from 'classnames'

class ChatBox extends React.Component {
  render () {
    const prefixCls = 'chatbox';
    let data = this.props.text;
    let flag = false;
    if (data.flag) {
      flag = true;
    }
    let cla = classNames(`${prefixCls}`, {
      direction: flag,
    })
    return (
      <div className={cla}>
        <div className={`${prefixCls}-img`}>
          <img src={data.data.headImg} alt=""/>
        </div>
        <div className={`${prefixCls}-text`}>
          <span className={`${prefixCls}-name`}>{data.data.name}</span>
          <p>{data.text}</p>
        </div>
      </div>
    )
  }
}

export default ChatBox;