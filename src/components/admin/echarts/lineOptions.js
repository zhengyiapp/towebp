export default ({xAxis, series, echarts, isDark, legend=[]}) => {
  const lineStyles = [
    {
      width: 3,
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: 'rgba(255, 0, 60, .3)',
        },
        {
          offset: 0.5,
          color: 'rgba(255, 0, 72, .4)',
        },
        {
          offset: 1,
          color: 'rgba(255, 0, 72, .5)',
        },
      ]),
    },{
      width: 3,
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: 'rgba(30, 231, 255, 1)',
        },
        {
          offset: 0.5,
          color: 'rgba(36, 154, 255, 1)',
        },
        {
          offset: 1,
          color: 'rgba(111, 66, 251, 1)',
        },
      ]),
    },
  ]
  const areasStyle = [
    {
      opacity: 0.8,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: 'rgba(255, 0, 72, .2)',
        },
        {
          offset: 1,
          color: 'rgba(255, 0, 72, .01)',
        },
      ]),
    },{
      opacity: 0.8,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: 'rgba(17, 126, 255, 0.8)',
        },
        {
          offset: 1,
          color: 'rgba(17, 128, 255, 0.1)',
        },
      ]),
    },
  ]
  const legendColors = ['rgba(255, 0, 72, .5)', 'rgba(111, 66, 251, 1)']

  const options = {
    legend: {
      data: legend.map((v, i) => ({
        name: v,
        itemStyle: {
          color: legendColors[i]
        },
      })),
    },
    grid: {
      left: '40',
      right: '10',
      top: legend.length ? '30' : '10',
      bottom: '20',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxis,
      splitLine: {
        show: true,
        interval: (idx) => {
          if (idx === 0) return false
          if (idx === xAxis.length - 1) return false
          return true
        },
        lineStyle: {
          color: isDark ? '#333' : '#E5E8EF',
        },
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: isDark ? '#333' : '#E5E8EF',
        },
      },
    },
    series: series.map((data, i) => (
      {
        name: legend[i],
        data,
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2,
          },
        },
        showSymbol: false,
        lineStyle: lineStyles[i],
        areaStyle: areasStyle[i]
      }
    ))
  }

  return options
}