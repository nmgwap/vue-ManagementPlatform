/**
* 图表界面
*/ 
<template>
  <!-- 组件主盒子 -->
  <div class="stbox">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据可视化</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索，切换 -->
    <el-row :gutter="23">
      <el-col :span="18">
        <div class="stbgc">
          <el-row :gutter="23">
            <el-col :span="7">
              <el-input size="small" v-model="machineNo" placeholder="请输入所属公司"></el-input>
            </el-col>
            <el-col :span="7">
              <el-input size="small" v-model="machineNo" placeholder="请输入资产编号"></el-input>
            </el-col>
            <el-col :span="7">
              <el-input size="small" v-model="machineNo" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="3" class="stsearch">
              <el-button size="small" type="primary">搜索</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stbgc">
          <el-row>
            <el-col :span="8" class="text-c">
              <el-radio v-model="type" label="day">日</el-radio>
            </el-col>
            <el-col :span="8" class="text-c">
              <el-radio v-model="type" label="month">月</el-radio>
            </el-col>
            <el-col :span="8" class="text-c">
              <el-radio v-model="type" label="years">年</el-radio>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 统计图 -->
    <el-row :gutter="23">
      <el-col :span="8" class="text-c">
        <div class="st-gbox">
          <div class="cavasbox" ref="SCEchart"></div>
        </div>
      </el-col>
      <el-col :span="8" class="text-c">
        <div class="st-gbox">
          <div class="cavasbox" ref="SUMEchart"></div>
        </div>
      </el-col>
      <el-col :span="8" class="text-c">
        <div class="st-gbox">
          <div class="cavasbox" ref="ClickEchart"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 统计图 -->
    <div>
      <el-row :gutter="23">
        <el-col :span="12" class="text-c">
          <div class="paybox">
            <div class="cavasbox" ref="payEchart"></div>
          </div>
        </el-col>
        <el-col :span="12" class="text-c">
          <div class="paybox">
            <div class="cavasbox" ref="payNumEchart"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Chart from 'echarts'
export default {
  name: "welcome",
  data() {
    return {
      machineNo: '',
      type: 'day',
      //  销售总笔数 
      SCEoption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}月 : {c}"
        },
        legend: {
          data: [{
            name: '销售总笔数',
            icon: 'rect'
          }],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: [{
          name: '销售总笔数',
          type: 'bar',
          barGap: 0,
          data: [50000, 70000, 80000, 40000, 50000, 30000, 40000, 60000, 50000, 40000, 60000, 40000],
          barWidth: 10,
          itemStyle: {
            normal: {
              color: new Chart.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              color: new Chart.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            }
          }
        }]
      },
      //  销售总金额 
      SUMoption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}月 : {c}"
        },
        legend: {
          data: [{
            name: '销售总金额',
            icon: 'rect'
          }],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: [{
          name: '销售总金额',
          //   type: 'bar',
          type: 'line',
          barGap: 0,
          data: [50000, 70000, 80000, 40000, 50000, 30000, 40000, 60000, 50000, 40000, 60000, 40000],
          barWidth: 10,
          itemStyle: {
            color: "#108ff9"
          }
        }]
      },
      //  总点击量
      Clickoption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}月 : {c}"
        },
        legend: {
          data: [{
            name: '总点击量',
            icon: 'rect'
          }],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: [{
          name: '总点击量',
          type: 'bar',
          barGap: 0,
          data: [50000, 10000, 80000, 30000, 50000, 60000, 40000, 80000, 50000, 20000, 60000, 40000],
          barWidth: 10,
          itemStyle: {
            color: "#48cefd"
          }
        }]
      },
      //  支付方式统计
      payoption: {
        backgroundColor: '#2c343c',
        title: {
          text: '支付方式统计(金额)',
          left: 10,
          top: 5,
          textStyle: {
            fontSize: 12,
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '支付方式统计(金额)',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '支付宝' },
              { value: 310, name: '银商二维码' },
              { value: 274, name: '会员' },
              { value: 235, name: '微信支付' },
              { value: 100, name: 'Pos通' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      },
      payNumoption: {
        backgroundColor: '#2c343c',
        title: {
          text: '支付方式统计(笔数)',
          left: 10,
          top: 5,
          textStyle: {
            fontSize: 12,
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '支付方式统计(笔数)',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '支付宝' },
              { value: 310, name: '银商二维码' },
              { value: 274, name: '会员' },
              { value: 235, name: '微信支付' },
              { value: 100, name: 'Pos通' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      },
    }
  },
  // 导入组件
  components: {
    // 点聚合组件
  },
  // 创建完毕状态(里面是操作)
  created() { },
  // 挂载结束状态(里面是操作)
  mounted() {
    this.getSCE()
    this.getSUM()
    this.getClick()
    this.getpay()
    this.getpayNum()
  },
  // 里面的函数只有调用才会执行
  methods: {
    // 交易总笔数
    getSCE() {
      this.chart = Chart.init(this.$refs.SCEchart)
      this.chart.setOption(this.SCEoption)
    },
    // 交易总金额
    getSUM() {
      this.chart = Chart.init(this.$refs.SUMEchart)
      this.chart.setOption(this.SUMoption)
    },
    // 总点击量
    getClick() {
      this.chart = Chart.init(this.$refs.ClickEchart)
      this.chart.setOption(this.Clickoption)
    },
    // 支付方式统计
    getpay() {
      this.chart = Chart.init(this.$refs.payEchart)
      this.chart.setOption(this.payoption)
    },
    // 支付方式统计
    getpayNum() {
      this.chart = Chart.init(this.$refs.payNumEchart)
      this.chart.setOption(this.payNumoption)
    }

  }
};
</script>
<style>
.stbox {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.stbgc {
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  padding: 0px 16px;
}
.stsearch {
  text-align: center;
}
.text-c {
  text-align: center;
}
.st-gbox {
  background-color: #fff;
  margin-top: 20px;
  border-radius: 5px;
  height: 30vh;
  box-sizing: border-box;
  padding: 10px;
}
.cavasbox {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.paybox {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 20px;
  height: 32vh;
}
</style>