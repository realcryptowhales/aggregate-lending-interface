import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { echarts } from '@utils/echart';

function capitalizeString(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function MarketItem() {
  const { id } = useParams<'id'>();
  const chartNodeRef = useRef<any>(null);
  useEffect(() => {
    console.log('do echart');
    const myChart = echarts.init(chartNodeRef.current);
    const option = {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25]
        }
      ]
    };
    myChart.setOption(option);
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div className="w-full">
      <h1>This is item page for market</h1>
      <h2>
        Welcome to the {id!.split('-').map(capitalizeString).join(' ')} course!
      </h2>
      <div ref={chartNodeRef} style={{ width: '500px', height: '500px' }}></div>
      <Link to="/markets">back to markets</Link>
    </div>
  );
}

export default MarketItem;
