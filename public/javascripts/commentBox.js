import React  from 'react';
import ReactDOM  from 'react-dom';
import marked  from 'marked';
import $  from 'jquery';
import echarts from 'echarts';
var cal =require ('calcu_css');
echarts.dataTool = require("./dataTool");

class Comment extends React.Component {
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
  }

  render() {
    return (
      // <div className="comment">
        <tr
        style={{'cursor': 'pointer'}}
        >
        <td className='itemTd'>{this.props.author}</td>
        <td className='itemTd'>{this.props.children}</td>
        <td className='itemTd'>{this.props.data1}</td>
        <td className='itemTd'>{this.props.data2}</td>
        <td className='itemTd'>{this.props.data3}</td>
        <td className='itemTd'>{this.props.data4}</td>
        <td className='itemTd'>{this.props.data5}</td>
        
        </tr>

      // </div>
    );
  }
};

class CommentList extends React.Component {
  clicks(index){this.props.delete(index)}
  render () {
    return (
      <table className='itemPanel'>
        <thead>
          <th className='itemTd'>姓名</th>
          <th className='itemTd'>测试名称</th>
          <th className='itemTd'>数据1</th>
          <th className='itemTd'>数据2</th>
          <th className='itemTd'>数据3</th>
          <th className='itemTd'>数据4</th>
          <th className='itemTd'>数据5</th>
        </thead>
        <tbody>
        {this.props.data.map((comment)=>{
          return (
            <Comment 
            author={comment.author} 
            index = {comment._id} 
            data1={comment.data1} 
            data2={comment.data2} 
            data3={comment.data3} 
            data4={comment.data4} 
            data5={comment.data5} 
            click={this.clicks.bind(this)}>
            {comment.text}
            </Comment>
            );
        })}
      </tbody>
      </table>
    );
  }
};

class CommentForm extends React.Component {
    handleSubmit (e) {
        e.preventDefault();
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        var data1=this.refs.data1.value.trim();
        var data2=this.refs.data2.value.trim();
        var data3=this.refs.data3.value.trim();
        var data4=this.refs.data4.value.trim();
        var data5=this.refs.data5.value.trim();
        if (!text || !author ||!data1 ||!data2 ||!data3 ||!data4 ||!data5) {
          // alert("请输入完整！");
          return;
        }
      this.props.onCommentSubmit({author: author, text: text, data1: data1, data2: data2, data3: data3, data4: data4, data5: data5, });
      this.refs.author.value = '';
      this.refs.text.value = '';
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
      <input type="text" placeholder="你的名字..." ref="author" />
      <input type="text" placeholder="测试名称..." ref="text" />
      <input type="text" placeholder="data1..." ref="data1" />
      <input type="text" placeholder="data2..." ref="data2" />
      <input type="text" placeholder="data3..." ref="data3" />
      <input type="text" placeholder="data4..." ref="data4" />
      <input type="text" placeholder="data5..." ref="data5" />
      <input type="submit" value="发表" className="submit"/>
      <input className="submit exit" onClick={this.yep2} value="关闭"/>
      </form>
      );
    }
};



class CommentBox extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
  }
  deleteClick (index) {
    var url = '/comments/'+index;
    $.ajax({
      url: url,
      type: 'delete',
      success : (data) => {
        this.setState({data: data});
    }
  })
}
loadCommentsFromServer () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success : (data) => {
        this.setState({data: data});
    },
    error (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
    }
  });
}
handleCommentSubmit (comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});    
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success : (data) => {
        this.setState({data: data});
    },
    error (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
    }
});    
}
componentDidMount () {
    this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
}
yep1(){
  $('.commentForm').show('slow');
}

render () {
    return (
      <div className="commentBox">
      <h1>测量指标统计</h1>
      <input className="submit addBtn" onClick={this.yep1} value="添加新数据"/>
      <CommentList data={this.state.data} delete={this.deleteClick.bind(this)}/>
      <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      <Echart data={this.state.data} />
      </div>
      );
}
};


class Echart extends React.Component{
  drawLineCharts(){
    var names = this.props.data.map(function(comment) {
      return (
        comment.text
      );
    });
    var scores1 = this.props.data.map(function(comment) {
      return (
        cal.calcuAve(comment)
        // (parseInt(comment.data1)+parseInt(comment.data2)+parseInt(comment.data3)+parseInt(comment.data4)+parseInt(comment.data5))/5
      );
    });
    var scores2 = this.props.data.map(function(comment) {
      return (
        cal.calcuDx(comment)
      );
    });

    var sc=[];
    var scores3=this.props.data.map(function(comment){
      var strin=[];
      strin.push(parseInt(comment.data1));
      strin.push(parseInt(comment.data2));
      strin.push(parseInt(comment.data3));
      strin.push(parseInt(comment.data4));
      strin.push(parseInt(comment.data5));
      sc.push(strin.sort());
    });
    var data=echarts.dataTool.prepareBoxplotData(sc);
    console.log(scores1);
    console.log(scores2);
        var myChart = echarts.init(document.getElementById('charts'));
        var myChart2 = echarts.init(document.getElementById('charts2'));
        var myChart3 = echarts.init(document.getElementById('charts3'));
        // 指定图表的配置项和数据
        
        var lineOption = {
          title: {
            text: '均值对比图'
          },
          tooltip : {
              trigger: 'axis'
          },
          legend: {
              data:['均值']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : names,
                  axisLabel: {
                        show: true,//是否显示刻度标签
                        interval:0,//横轴信息全部显示
                        textStyle: {
                            fontSize: 8,
                        }
                    }
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  splitArea: {
                    show: true
                }
              }
        //       {
        //     type: 'value',
        //     name: '组件1测量值',
        //     min: 0,
        //     max: 250,
        //     interval: 50,
        //     axisLabel: {
        //         formatter: '{value}'
        //     }
        // },
        // {
        //     type: 'value',
        //     name: '组件2测量值',
        //     min: 0,
        //     max: 50,
        //     interval: 5,
        //     axisLabel: {
        //         formatter: '{value}'
        //     }
        // }
          ],
          series : [
              {
                  name:'均值',
                  type:'line',
                  stack: '测量值1',
                  data:scores1
              }
          ]
        };
        var barOption={
          title: {
            text: '方差分析图'
          },
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          legend: {
              data:['方差']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {show: true}
              }
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : names,
                  axisLabel: {
                        show: true,//是否显示刻度标签
                        interval:0,//横轴信息全部显示
                        textStyle: {
                            fontSize: 8,
                        }
                    }
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  splitArea: {
                    show: true
                }
                }

          ],
          series : [
              {
                  name:'方差',
                  type:'bar',
                  barWidth: '60%',
                  stack: '测量值',
                  data:scores2
              },
          ]
        };
        var Option3 = {
            title: [
                {
                    text: '箱线图',
                    left: 'center',
                },
                {
                    text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                    borderColor: '#999',
                    borderWidth: 1,
                    textStyle: {
                        fontSize: 12
                    },
                    left: '10%',
                    top: '5%'
                }
            ],
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                }
            },
            toolbox: {
              feature: {
                  saveAsImage: {}
              }
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : names,
                  axisLabel: {
                        show: true,//是否显示刻度标签
                        interval:0,//横轴信息全部显示
                        textStyle: {
                            fontSize: 8,
                        }
                    }
              }
          ],
            // xAxis: {
            //     type: 'category',
            //     data: names,
            //     boundaryGap: true,
            //     nameGap: 30,
            //     splitArea: {
            //         show: false
            //     },
            //     axisLabel: {
            //         formatter: 'expr {value}'
            //     },
            //     splitLine: {
            //         show: false
            //     }
            // },
            yAxis: {
                type: 'value',
                // name: 'km/s minus 299,000',
                splitArea: {
                    show: true
                }
            },
            series: [
                {
                    name: 'boxplot',
                    type: 'boxplot',
                    data: data.boxData,
                    tooltip: {
                        formatter: function (param) {
                            return [
                                'Experiment ' + param.name + ': ',
                                'upper: ' + param.data[4],
                                'Q3: ' + param.data[3],
                                'median: ' + param.data[2],
                                'Q1: ' + param.data[1],
                                'lower: ' + param.data[0]
                            ].join('<br/>')
                        }
                    }
                },
                {
                    name: 'outlier',
                    type: 'scatter',
                    data: data.outliers
                }
            ]
        };
        //使用刚指定的配置项和数据显示图表。
        myChart.setOption(lineOption);
        myChart2.setOption(barOption);
        myChart3.setOption(Option3);
      //   window.addEventListener('resize', function () {
      // myChart.resize();
    //});
  }
  render() {
    this.drawLineCharts();
    return (
      <div></div>
    );
  }
};


module.exports = CommentBox;