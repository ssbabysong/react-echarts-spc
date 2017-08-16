/* 
* @Author: ChenShas
* @Date:   2017-04-14 03:48:22
* @Last Modified by:   ChenShas
* @Last Modified time: 2017-05-19 01:49:52
*/

import React from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
echarts.dataTool = require("./dataTool");
var cal =require ('calcu_css');
 // var addon = require("/build/Release/addon");

export default class Echart extends React.Component{
  getOption(){
    var names = this.props.data.map(function(dataitem) {
      return (
        dataitem.name
      );
    });
    var sc=[];
    var scores3=this.props.data.map(function(dataitem){
      var strin=[];
      strin.push(parseInt(dataitem.data1));
      strin.push(parseInt(dataitem.data2));
      strin.push(parseInt(dataitem.data3));
      strin.push(parseInt(dataitem.data4));
      strin.push(parseInt(dataitem.data5));
      sc.push(strin.sort());
    });
    var data=echarts.dataTool.prepareBoxplotData(sc);
    var boxOption = {
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
                    // interval:0,//横轴信息全部显示
                    textStyle: {
                        fontSize: 8,
                    }
                }
          }
      ],
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
    return boxOption;
  }
  render() {
    return (
      <ReactEcharts
    option={this.getOption()} 
	notMerge={true}
	lazyUpdate={true}
	theme={"theme_name"} />
    );
  }
}