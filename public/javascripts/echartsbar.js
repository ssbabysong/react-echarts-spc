/* 
* @Author: ChenShas
* @Date:   2017-04-14 03:19:51
* @Last Modified by:   ChenShas
* @Last Modified time: 2017-05-19 17:51:44
*/

import React from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'; 
echarts.dataTool = require("./dataTool");
var cal =require ('calcu_css');
 // var addon = require("/build/Release/addon");

export default class Echartbar extends React.Component{
  getOption(){
    var names = this.props.data.map(function(dateitem) {
      return (
        dateitem.name
      );
    });
    var scores1 = this.props.data.map(function(dateitem) {
      return (
        cal.calcuAve(dateitem)
      );
    });
    var sum=0;
    for(var i=0;i<scores1.length;i++){
      sum+=scores1[i];
    }
    var miu=(sum/scores1.length).toFixed(2);
    var colors=['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

    var high=this.props.cldata[0];
    var low=this.props.cldata[2];
    var middle=this.props.cldata[1];
    var datahigh=[];
    var datalow=[];
    var cl=[];

    var warning1=[];
    var warning2=[];
    for(var i=0;i<scores1.length;i++){
      datahigh[i]=high;
      datalow[i]=low;
      cl[i]=middle;
      if(scores1[i]>datahigh[i]){
        console.log(scores1[i],datahigh[i]);
        warning1.push({coord:[i,scores1[i]]});
      }
      else if(scores1[i]<datalow[i]){
        warning2.push({coord:[i,scores1[i]]});
      }
    }

    // var myChart = echarts.init(document.getElementById('charts'));
    // 指定图表的配置项和数据
    
    var lineOption = {
      title: [
            {
                text: '样本数='+scores1.length+'\n总体均值miu='+miu+'\n子组大小=5\n规格上限='+high+'\n目标值='+middle+'\n规格下限='+low+'\n',
                borderColor: '#999',
                borderWidth: 1,
                textStyle: {
                    fontSize: 12
                },
                left: '10%',
                top: '5%'
            }
        ],
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
                    // interval:0,//横轴信息全部显示
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
              name:'均值',
              type:'line',
              data:scores1,
              lineStyle:{
                normal:{
                  color:colors[2]
                }
              }
          },
          {
            name:'UCL',
            type:'line',
            lineStyle:{
                normal:{
                    color:'red',
                    type:'dashed'
                }
            },
            symbol: 'none',
            connectNulls: true,
            data:datahigh,
            markPoint: {
                itemStyle: {
                    normal: {
                        color: colors[0]
                    }
                },
                data: warning1
            }
        },
        {
            name:'LCL',
            type:'line',
            lineStyle:{
                normal:{
                    color:'red',
                    type:'dashed'
                }
            },
            symbol: 'none',
            connectNulls: false,
            data:datalow,
            markPoint: {
                itemStyle: {
                    normal: {
                        color: colors[0]
                    }
                },
                data: warning2
            }
        },
        {
            name:'CL',
            type:'line',
            lineStyle:{
                normal:{
                    color:colors[1],
                    type:'solid'
                }
            },
            symbol: 'none',
            connectNulls: true,
            data:cl,
        }
      ]
    };
    return lineOption;
  }
  render() {
    return (
        <ReactEcharts
          option={this.getOption()} 
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}/>
    );
  }
}