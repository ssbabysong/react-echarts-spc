import React from 'react';
import 'antd/dist/antd.min.css';
import NewCollection from './newcollection.js';
import { Menu ,Icon,Switch} from 'antd';
const SubMenu = Menu.SubMenu;

export default class Sider extends React.Component {
  state={
    current: '591ea984bc0dbd266b7340a5',
  }
  componentWillMount(){
    this.props.onchangeselected(this.state.current);
    console.log('加载了'+this.state.current);
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    this.props.onchangeselected(e.key);
    console.log('选中了'+e.key);
    // this.props.selected=e.key;
  }
  render() {
    var items = [];
    var datalist=this.props.data;
    for (var i = 0; i < datalist.length; i++) {
        items.push(<Menu.Item key = {datalist[i]._id} >
        {datalist[i].name}
        </Menu.Item>);
    }
    return (
      
      <div className='sidebar'>
      <div  className='createpro'>
       <NewCollection onProductSubmit={this.props.onProductSubmit.bind(this)}/>
      </div>
        <Menu
          onClick={this.handleClick}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
          theme="dark"
        >
            {items}


        
        </Menu>
      </div>
    );
  }
}