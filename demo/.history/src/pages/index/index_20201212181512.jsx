import React, { Component } from "react";
import { View } from "@tarojs/components";
import EChart from "techarts";
import geoJson from './mapData.js';
import * as echarts from "./echarts";

import "./index.less";

let pageInstance = {}

export default class Index extends Component {
  chart = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      xData,
      yData,
      option: onInit,
    };
  }

  componentDidMount() {
    // this.manualSetOption();
  }

  render() {
    const { option } = this.state;
    return (
      <View className="page-index">
        <View className="line-chart">
          {/* 通过 option 设置数据 */}
          <EChart echarts={echarts} option={option} />
        </View>
      </View>
    );
  }



  onInit = (canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);
  
    echarts.registerMap('henan', geoJson);
  
    const option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'click',
        formatter: function (e, t, n) {
          pageInstance.BindEvent(e);
          return e.name
        }
      },
      series: [{
        type: 'map',
        mapType: 'henan',
        label: {
          normal: {
            show: true
          },
          emphasis: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        itemStyle: {
  
          normal: {
            borderColor: '#08C062',
            areaColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            borderColor: "#78A4FA",
            areaColor: '#08C062',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            borderWidth: 2
          }
        },
        animation: false,
        data: []
  
      }],
  
    };
  
    chart.setOption(option);
  
    return chart;
  };
}