// import { ECharts, EChartsOption, init} from "echarts";
import {ref, onMounted} from 'vue'
import * as echarts from "echarts";
function initChart(){
  const chartEle = ref(null);
const option = {
  legend: {
    orient: 'vertical',
    x: 'left',
    // data: ['A', 'B', 'C', 'D', 'E']
    data: ['简单', '中等', '困难']
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      data: [
        { value: 335, name: '简单'},
        { value: 310, name: '中等' },
        { value: 234, name: '困难' },
        // { value: 135, name: 'D' },
        // { value: 1548, name: 'E' }
      ]
    }
  ]
};
let myChart : echarts.ECharts;
onMounted(() => {
  myChart = echarts.init(chartEle.value);
  myChart.setOption(option);
})
return chartEle;
}
export default initChart;