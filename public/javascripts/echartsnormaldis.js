/* 
* @Author: ChenShas
* @Date:   2017-05-02 21:43:53
* @Last Modified by:   ChenShas
* @Last Modified time: 2017-05-25 21:08:37
*/

import React from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'; 
var cal =require ('calcu_css');
 // var addon = require("/build/Release/addon");

export default class Echartbar extends React.Component{
  
  
  getOption(){
    var names = this.props.data.map(function(dataitem) {
      return (
        dataitem.name
      );
    });
    // 均值
    var scores1 = this.props.data.map(function(dataitem) {
      return (
        cal.calcuAve(dataitem)
      );
    });

    var colors=['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
    // var miu = 0;
    var sigma=0;
    var su = 0;
    for(var i = 0;i<scores1.length;i++){
      su+=scores1[i];
     
    }

     var miu=su/scores1.length;
     for(var i=0;i<scores1.length;i++){
      sigma+=(scores1[i]-miu)*(scores1[i]-miu);
    }
    sigma=Math.sqrt(sigma/(scores1.length-1));
    console.log(scores1);
    console.log(miu,sigma);

    var index=[0,0,0,0,0,0,0,0,0];
    var indexx=[];

    for(var i=0;i<scores1.length;i++){
    	if(scores1[i]<(miu-3.5*sigma)){index[0]++}
    	else if(scores1[i]>=(miu-3.5*sigma)&&scores1[i]<(miu-2.5*sigma)){index[1]++}
    	else if(scores1[i]>=(miu-2.5*sigma)&&scores1[i]<(miu-1.5*sigma)){index[2]++}
    	else if(scores1[i]>=(miu-1.5*sigma)&&scores1[i]<(miu-0.5*sigma)){index[3]++}
    	else if(scores1[i]>=(miu-0.5*sigma)&&scores1[i]<(miu+0.5*sigma)){index[4]++}
    	else if(scores1[i]>=(miu+0.5*sigma)&&scores1[i]<(miu+1.5*sigma)){index[5]++}
    	else if(scores1[i]>=(miu+1.5*sigma)&&scores1[i]<(miu+2.5*sigma)){index[6]++}
    	else if(scores1[i]>=(miu+2.5*sigma)&&scores1[i]<(miu+3.5*sigma)){index[7]++}
    	else{index[8]++}

    }
  function normal_dis(x,miu=0,sigma=1){
	    return Math.pow(Math.E,-(x-miu)*(x-miu)/(2*sigma*sigma))/(sigma*Math.sqrt(2*Math.PI));
	  }

  var i = 0;
  var j=miu-4*sigma;
  var length = scores1.length;
  var warning=[];
  for (; j <=(miu+4*sigma);) {
        var x = j;
        var y = index[i]/length;
        indexx.push([x, y]);
        console.log(y,sigma*normal_dis(x,miu,sigma));
        if(j<this.props.cldata[2]||j>this.props.cldata[0]){
        	warning.push({gt:j-sigma/2,lte:j+sigma/2,color:colors[0]});
        }
        else{
        	warning.push({gt:j-sigma/2,lte:j+sigma/2,color:colors[2]});
        }
        i++;
        j+=sigma;
    }
    

    var normal_data = [];
    var N_POINT = 30;
    var i=0;
    for (var i = (miu-6*sigma); i <=(miu+4*sigma);) {
        var x = i;
        var y = normal_dis(x,miu,sigma);
        normal_data.push([x, y]);
        i+=0.01*sigma;
    }
    var cp=(3.33/sigma).toFixed(2);
    var cpk=(Math.min((miu-10)/(3*sigma),(30-miu)/(3*sigma))).toFixed(2);

    var lineOption = {
      title: [
            {
                text: 'Cp='+cp+'\nCpk='+cpk,
                borderColor: '#999',
                borderWidth: 1,
                textStyle: {
                    fontSize: 12
                },
                left: '10%',
                top: '5%'
            }
        ],
      legend: {
          data:['正态分布曲线','分布图']
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
              type : 'value',
              boundaryGap : false,
              axisLabel: {
                    show: true,//是否显示刻度标签
                    // interval:0,//横轴信息全部显示
                    textStyle: {
                        fontSize: 8,
                    }
                }
          },
      ],
      yAxis : [
          {
              type : 'value',
              splitArea: {
                show: true
            },
            axisLabel:{
            	show:false
            }
          },
          {
              type : 'value',
              show:false
          }
      ],
      visualMap: {
        show: false,
        dimension: 0,
        pieces: warning
    },
      series : [
          {
              name:'正态分布曲线',
              type:'line',
              smooth: true,
              // stack: 'zhengtai',
              data:normal_data,
              showSymbol: false
          },
          {
              name:'分布图',
              type:'bar',
              barWidth: '50%',
              data:indexx,
              yAxisIndex:1,
              markLine : {
                lineStyle: {
                    normal: {
                        type: 'solid',
                        color:colors[0]
                    }
                },
                data : [
                    { xAxis: this.props.cldata[2],name:'lcl' },
                    { xAxis: this.props.cldata[0] ,name:'ucl'},
                    { xAxis: this.props.cldata[1] ,name:'cl'},

                ]
            }
          }

      
    ]};
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