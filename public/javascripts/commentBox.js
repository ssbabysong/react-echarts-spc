import React  from 'react';
import ReactDOM  from 'react-dom';

import $  from 'jquery';

import Echartsbar from './echartsbar.js';
import Echartsline from './echartsline.js';
import Echartsbox from './echartsbox.js';
import Echartsnormaldis from './echartsnormaldis.js'
import CommentList from './commentlist.js';
import CommentForm from './commentform.js';
import Sider from './sider.js';
import Header from './header.js';
import {
  Row,
  Col
} from 'antd';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;


class CommentBox extends React.Component {
  constructor(props){
    super(props);
    this.state={
      collection:[],
      selected:''
    }
  }
//   deleteClick (index) {
//     var url = '/comm/'+index;
//     $.ajax({
//       url: url,
//       type: 'delete',
//       success : (data) => {
//         this.setState({data: data});
//     }
//   })
// }
loadCommentsFromServer () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success : (datafromdb) => {
        this.setState({collection: datafromdb});
    },
    error (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
    }
  });
}
handleaddProduct (newproduct) {
  var products = this.state.collection;
  products.push(newproduct);
  console.log('我刚刚添加了产品,产品现在变成'+products);
  this.setState({collection:products});
  $.ajax({
    url:'/addproduct',
    dataType:'json',
    type:'POST',
    data:newproduct,
    success : (datafromdb) => {
        this.setState({collection: datafromdb});
      },
    error (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
    }
  });
}
handleChangeProduct(newsel){
	this.setState({selected:newsel})
}
handleDataSubmit (newdata) {
  var products = this.state.collection;
  var selected = this.state.selected;
  products.map((product)=>{
    if(product._id==selected){
      product.data.push(newdata);
    }
  });
  newdata.parent=selected;
  this.setState({collection:products});
  $.ajax({
    url:this.props.url,
    dataType:'json',
    type:'POST',
    data:newdata,
    success : (datafromdb) => {
        this.setState({collection: datafromdb});
      },
    error (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
    }
  });
}

componentDidMount () {
    this.loadCommentsFromServer();
}
yep1(){
  $('.commentForm').show('slow');
}
render () {
	var sel=this.state.selected;

	var dat=this.state.collection;
	var indexseldata=[];
  var ccll=[];
	for(var i=0 ;i<dat.length;i++){
		if(dat[i]._id === sel){
	    	indexseldata=dat[i].data;
        ccll.push(dat[i].ucl);
        ccll.push(dat[i].cl);
        ccll.push(dat[i].lcl);
	    	console.log(indexseldata);
	    	// return 0;
		}
	}
	// var fi=dat.find(function (x) {
	//     if(x._id === sel){
	//     	indexseldata=x.data;
	//     	console.log(indexseldata);
	//     	// return 0;
	//     }
	    	
	// });
    return (
      <div>
          <div>
          <Header />
          </div>
        <Row>
        <Col span={4}>
          <Sider data={this.state.collection} selected={this.state.selected} onProductSubmit={this.handleaddProduct.bind(this)} onchangeselected={this.handleChangeProduct.bind(this)}/>
        </Col>
        <Col span={25} style={{marginLeft: 300}}>
        
          <Row>
			<div className="padding-lg content-container pull-left" style={{borderLeft:'1px solid #ccc'}}>
			<Tabs type="card">
			      
			      
			  <TabPane tab="平均值运行图" key="2"><Echartsbar data={indexseldata} cldata={ccll}/></TabPane>
			  <TabPane tab="样本运行图" key="3"><Echartsline data={indexseldata} /></TabPane>
			  <TabPane tab="箱线图" key="4"><Echartsbox data={indexseldata} /></TabPane>
			  <TabPane tab="Cpk分析图" key="5"><Echartsnormaldis data={indexseldata} cldata={ccll}/></TabPane>
			</Tabs>


			</div>
			<div className="padding-lg content-container2 pull-left">
			<CommentForm onCommentSubmit={this.handleDataSubmit.bind(this)} />
			</div>
			</Row>
			<Row>
			<div className="padding-lg content-container3 ">
			<CommentList data={indexseldata} />
			</div>
			</Row>
      
        </Col>

      </Row>
      </div>

      );
}
};





module.exports = CommentBox;



