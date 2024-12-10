export default ({names, series, isDark}) => {
  const colors = ['#249EFF', '#313CA9', '#21CCFF'];
  const darkColors = ['#3D72F6', '#A079DC', '#6CAAF5'];
  const options = {
    legend: {
      left: 'center',
      data: names,
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      textStyle: {
        color: isDark ? '#fff' : '#4E5969',
      },
      itemStyle: {
        borderWidth: 0,
      },
    },
    tooltip: {
      show: true,
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        label: {
          formatter: '{d}%',
          fontSize: 14,
          color: isDark ? '#fff' : '#4E5969',
        },
        itemStyle: {
          borderColor: isDark ? '#232324' : '#fff',
          borderWidth: 1,
        },
        data: series.map((v, i) => {
          const color = isDark ? darkColors[i] || darkColors[i%darkColors.length] : colors[i] || colors[i%colors.length];
          return {
            value: [v],
            name: names[i],
            itemStyle: { color },
          }
        }),
      },
    ],
  }

  return options
}