import React from 'react';
import $  from 'jquery';
import 'antd/dist/antd.min.css';
import {
  Row,
  Col,
  Icon,
  Badge,
  Tooltip
} from 'antd';

export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.state={
      us:''
    }
  }
  
  getuser () {
    var user='css';
    $.ajax({
      url: '/user',
      dataType: 'json',
      cache: false,
      success : (datafromdb) => {
        user=datafromdb.name;
        this.setState({us:user});
      }
    });    
  }
  componentWillMount(){
        this.getuser();
  }
  render() {
    return (
      <div className="contain">
      <h1>xxx公司SPC统计过程控制软件</h1>
      <div className="logout">
      <h3>欢迎{this.state.us}</h3>
      <a href='/logout'>登出</a>
      </div>

      </div>
    );
  }
}