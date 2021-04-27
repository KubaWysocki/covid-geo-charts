import React, {useEffect, useRef} from 'react'
import ChartJS from 'chart.js/auto'
import styles from './Chart.module.css'

const Chart = React.memo(({data}) => {
  const chartRef = useRef()

  useEffect(() => {
    const chart = new ChartJS(chartRef.current, {
      type: 'bar',
      data: {
          labels: data.map(reg => reg.key),
          datasets: [{
              label: 'Confirmed cases',
              data: data.map(reg => reg.confirmed),
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 2,
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    })
    return () => chart.destroy()
  }, [data])

  return <div className={styles.chart}>
    <div className={styles.scroll} style={{width: data?.length > 10 ? data.length * 40 + 'px' : 'auto'}}>
      <canvas ref={chartRef}/>
    </div>
  </div>
})

export default Chart