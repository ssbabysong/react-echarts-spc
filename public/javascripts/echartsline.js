/* 
* @Author: ChenShas
* @Date:   2017-04-14 03:42:19
* @Last Modified by:   ChenShas
* @Last Modified time: 2017-05-19 17:17:02
*/

import React from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'; 
var cal =require ('calcu_css');
 // var addon = require("/build/Release/addon");

export default class Echart extends React.Component{
  getOption(){
    var names = this.props.data.map(function(dataitem) {
      return (
        dataitem.name
      );
    });
    var scores2 = this.props.data.map(function(dataitem) {
      return (
        (Math.sqrt(cal.calcuDx(dataitem))).toFixed(2)
      );
    });
    // 均值
    var scores1 = this.props.data.map(function(dataitem) {
      return (
        cal.calcuAve(dataitem)
      );
    });
    var su=0;
    for(var i=0;i<scores1.length;i++){
      su+=scores1[i];
    }
    var miu=su/scores1.length;
    var sigma=0;
    for(var i=0;i<scores1.length;i++){
      sigma+=(scores1[i]-miu)*(scores1[i]-miu);
    }
    sigma=(Math.sqrt(sigma/(scores1.length-1))).toFixed(2);

    var barOption={
      title: [
            {
                text: '整体标准差sigma='+sigma,
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
              name:'方差',
              type:'bar',
              barWidth: '40%',
              stack: '测量值',
              data:scores2
          },
      ]
    };
    return barOption;
  }
  render() {
    return (
      <ReactEcharts
    option={this.getOption()} 
	notMerge={true}
	lazyUpdate={true}
	theme={"theme_name"}
    />
    );
  }
}