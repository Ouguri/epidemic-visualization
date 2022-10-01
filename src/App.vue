<template>
  <div :style="{ background: `url(${bg})` }" class="box">
    <div style="color: white" class="box__left">
      <div class="box__left--card">
        <section>
          <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>

      <div id="pie" class="box__left--pie"></div>
      <div id="line" class="box__left--line"></div>
    </div>
    <div id="china" class="box__center"></div>
    <div style="color: #fff" class="box__right">
      <!-- cellspacing="0" 去除表格间隙 -->
      <table class="table" cellspacing="0" border>
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__flipInY" tag="tbody">
          <tr :key="item.name" v-for="item in store.item">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from './stores/index'
import { onMounted } from 'vue'
import { geoCoordMap } from './assets/geoMap'
import bg from './assets/bgc.jpg' // 要引入。。。因为编译后没有 assets 目录
import * as echarts from 'echarts' // 要把它所有 api 导出成一个对象：echarts5
import './assets/china.js' // 报错说找不到 echarts 是因为该文件用了 echarts 4 引入
import 'animate.css'

const store = useStore()

// echarts 要一个 dom 元素，要在 mounted 获取
onMounted(async () => {
  await store.getList()
  initCharts()
  initPie()
  initLine()
})

const initPie = () => {
  const charts = echarts.init(document.querySelector('#pie') as HTMLElement)
  console.log(store.cityDetail)

  charts.setOption({
    backgroundColor: '#223651',
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        // avoidLabelOverlap: false, 那个鼠标放上去图形字体变大
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
          },
        },
        data: store.cityDetail.map(v => {
          return {
            name: v.city,
            value: v.local_confirm_add,
          }
        }),
      },
    ],
  })
}

const initLine = () => {
  const charts = echarts.init(document.querySelector('#line') as HTMLElement)
  charts.setOption({
    backgroundColor: '#223651',
    tooltip: {
      // 折点信息提示
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: store.cityDetail.map(v => v.city),
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    label: {
      // 显示折点数字
      show: true,
    },
    series: [
      {
        data: store.cityDetail.map(v => v.local_confirm_add),
        type: 'line',
        smooth: true,
      },
    ],
  })
}

const initCharts = () => {
  // 如果这里 diseaseh5Shelf 报错就是要去断言一下 list 里面的属性
  const city = store.list.diseaseh5Shelf.areaTree[0].children
  store.item = city[5].children
  // 整理给 charts 的数据 data
  const data = city.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children,
    }
  })

  const charts = echarts.init(document.querySelector('#china') as HTMLElement)

  charts.setOption({
    geo: {
      map: 'china',
      aspectScale: 0.8,
      layoutCenter: ['50%', '50%'],
      layoutSize: '120%',
      itemStyle: {
        // normal: {
        areaColor: {
          type: 'linear-gradient',
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#152E6E', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0673AD', // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: '#0f5d9d',
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },
      },

      emphasis: {
        areaColor: '#0f5d9d',
      },

      regions: [
        {
          name: '南海诸岛',
          itemStyle: {
            areaColor: 'rgba(0, 10, 52, 1)',
            borderColor: 'rgba(0, 10, 52, 1)',
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: '#009cc9',
            },
            // },
          },
          label: {
            show: false,
            color: '#FFFFFF',
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: 'map',
        // selectedMode: 'multiple', 地图片多选
        map: 'china',
        aspectScale: 0.8,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '120%',
        zoom: 1, //当前视角的缩放比例
        roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 16,
        },
        itemStyle: {
          // normal: {
          areaColor: '#0c3653',
          borderColor: '#1cccff',
          borderWidth: 1.8,
          // },
        },

        emphasis: {
          areaColor: '#56b1da',
          label: {
            show: true,
            color: '#fff',
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          show: true,
          color: '#fff',
          formatter(value: any) {
            return value.data.value[2]
          },
        },
        itemStyle: {
          color: '#1E90FF', //标志颜色
        },
        data: data,
      },
    ],
  })
  window.onresize = charts.resize
  charts.on('click', (e: any) => {
    store.item = e.data.children
  })
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}

@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;

html,
body,
#app {
  height: 100%;
  font-size: 62.5%;
  box-sizing: border-box;
  overflow: hidden;
}

.table {
  width: 100%;
  background: #212028;
  tr {
    th {
      padding: 0.5rem;
      white-space: nowrap;
    }
    td {
      padding: 0.5rem 1rem;
      width: 10rem;
      white-space: nowrap;
    }
  }
}

.box {
  padding: 2rem;
  height: 100%;
  display: flex;
  &__left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40rem;
    // background: red;
    &--card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
      section {
        background: @itemBg;
        border: 0.1rem solid @itemBorder;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem 0;
        div:nth-child(2) {
          color: @itemColor;
          padding: 1rem 0;
          font-size: 2rem;
          font-weight: bold;
        }
      }
    }
    &--pie {
      height: 32rem;
      margin-top: 2rem;
    }
    &--line {
      height: 32rem;
      margin-top: 2rem;
    }
  }
  &__center {
    flex: 1;
  }
  &__right {
    width: 40rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
