import * as React from 'react';
import clsx from 'classnames';
import styles from './index.module.less';
import { useState, useEffect, useRef } from 'react';
import { echarts } from '@utils/echart';

interface DetailProps {
  option?: any;
}

const Detail: React.FC<DetailProps> = () => {
  const lineChartNodeRef = useRef<any>(null);
  const pieChartNodeRef = useRef<any>(null);

  useEffect(() => {
    const lineOption = {
      legend: {
        data: [
          {
            names: '平台'
          },
          {
            names: 'AAVE'
          },
          {
            names: 'compound'
          }
        ],
        backgroundColor: '#ccc'
      },
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          names: '平台',
          data: [120, 200, 150],
          type: 'line'
        },
        {
          names: 'AAVE',
          data: [50, 100, 120],
          type: 'line'
        },
        {
          names: 'compound',
          data: [80, 150, 230],
          type: 'line'
        }
      ]
    };
    const lineChart = echarts.init(lineChartNodeRef.current);
    lineChart.setOption(lineOption);

    const pieOption = {
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: '直接访问'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 1548,
              name: '搜索引擎'
            }
          ]
        }
      ]
    };
    const pieChart = echarts.init(pieChartNodeRef.current);
    pieChart.setOption(pieOption);
    return () => {
      lineChart.dispose();
      pieChart.dispose();
    };
  }, []);

  return (
    <div className={clsx(styles.detail)}>
      <div className={clsx(styles.tab)}>存款</div>
      <div className="flex">
        <div>
          <div>借款</div>
          <div
            ref={lineChartNodeRef}
            style={{ width: '700px', height: '500px' }}
          ></div>
        </div>
        <div>
          <div>按钮</div>
          <div
            ref={pieChartNodeRef}
            style={{ width: '500px', height: '500px' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
