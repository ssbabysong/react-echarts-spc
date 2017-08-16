import React from 'react';

export default class CommentForm extends React.Component {
    handleSubmit (e) {
        e.preventDefault();
        var name = this.refs.name.value.trim();
        var data1=this.refs.data1.value.trim();
        var data2=this.refs.data2.value.trim();
        var data3=this.refs.data3.value.trim();
        var data4=this.refs.data4.value.trim();
        var data5=this.refs.data5.value.trim();
        if (!name ||isNaN(data1)||isNaN(data2)||isNaN(data3)||isNaN(data4)||isNaN(data5)||!data1||!data2||!data3||!data4||!data5) {
          alert("请检查输入格式！");
          return;
        }
      this.props.onCommentSubmit({name: name, data1: data1, data2: data2, data3: data3, data4: data4, data5: data5});
      this.refs.name.value = '';
      this.refs.data1.value = '';
      this.refs.data2.value = '';
      this.refs.data3.value = '';
      this.refs.data4.value = '';
      this.refs.data5.value = '';
      return;
  }
  yep2(){
    $('.commentForm').hide('slow');
  }
  render () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
      <div className="warning">请输入完整的一组数据</div>
      <input type="text" placeholder="测试名称..." ref="name" />
      <input type="text" placeholder="data1..." ref="data1" />
      <input type="text" placeholder="data2..." ref="data2" />
      <input type="text" placeholder="data3..." ref="data3" />
      <input type="text" placeholder="data4..." ref="data4" />
      <input type="text" placeholder="data5..." ref="data5" />
      <input type="submit" value="发表" className="submit"/>
      </form>
      );
    }
}